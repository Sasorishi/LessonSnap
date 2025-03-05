import torch
import numpy as np
import yaml
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from utils.tts import text_to_speech
from models.text_generation_model import TextGenerationModel
from data.tokenizer import tokenize_text

def load_config(config_path='config/config.yaml'):
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    return config

def load_vocab(config):
    vocab_data = torch.load(config["vocab_save_path"])
    return vocab_data["stoi"], vocab_data["itos"]

def generate_text(model, start_text, length, stoi, itos, tokenizer_type='letter'):
    model.eval()
    tokens = tokenize_text(start_text, tokenizer_type)
    input_ids = torch.tensor([stoi[t] for t in tokens], dtype=torch.long).unsqueeze(0)
    hidden = model.init_hidden(1)
    generated = tokens.copy()
    
    for _ in range(length):
        outputs, hidden = model(input_ids, hidden)
        temperature = 0.7  # ou 0.8, à tester
        logits = outputs[-1] / temperature
        probs = torch.softmax(logits, dim=0).detach().numpy()
        next_id = np.random.choice(len(probs), p=probs)
        next_token = itos[next_id]
        generated.append(next_token)
        input_ids = torch.tensor([[next_id]], dtype=torch.long)
    
    if tokenizer_type == 'letter':
        return "".join(generated)
    else:
        return " ".join(generated)

def main():
    config = load_config()
    stoi, itos = load_vocab(config)
    vocab_size = len(stoi)
    
    model = TextGenerationModel(
        vocab_size=vocab_size,
        embed_size=config["embed_size"],
        hidden_size=config["hidden_size"],
        num_layers=config["num_layers"],
        rnn_type=config["rnn_type"]
    )
    
    # Charger le modèle entraîné
    model.load_state_dict(torch.load(config["model_save_path"]))
    
    generated = generate_text(model, config["start_text"], config["generation_length"], stoi, itos, tokenizer_type=config["tokenizer_type"])
    print("=== Texte généré ===")
    print(generated)
    text_to_speech(generated)

if __name__ == '__main__':
    main()

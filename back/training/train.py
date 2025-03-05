import torch
import torch.nn as nn
import torch.optim as optim
import yaml
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from models.text_generation_model import TextGenerationModel
from data.dataset_loader import load_wikitext_dataset
from data.tokenizer import tokenize_text, build_vocab
from utils.helpers import get_batch

def load_config(config_path='config/config.yaml'):
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    return config

def main():
    config = load_config()
    
    # Chargement et préparation des données
    full_text = load_wikitext_dataset()
    tokens = tokenize_text(full_text, config["tokenizer_type"])
    stoi, itos = build_vocab(tokens)
    vocab_size = len(stoi)
    data = [stoi[t] for t in tokens]
    
    # Instanciation du modèle
    model = TextGenerationModel(
        vocab_size=vocab_size,
        embed_size=config["embed_size"],
        hidden_size=config["hidden_size"],
        num_layers=config["num_layers"],
        rnn_type=config["rnn_type"]
    )
    
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=config["learning_rate"])
    
    for epoch in range(config["num_epochs"]):
        model.train()
        hidden = model.init_hidden(config["batch_size"])
        inputs, targets = get_batch(data, config["batch_size"], config["seq_length"])
        
        optimizer.zero_grad()
        outputs, hidden = model(inputs, hidden)
        loss = criterion(outputs, targets.view(-1))
        loss.backward()
        optimizer.step()
        
        print(f"Epoch {epoch+1}/{config['num_epochs']}, Loss: {loss.item():.4f}")
    
    # Sauvegarde du modèle et du vocabulaire
    torch.save(model.state_dict(), config["model_save_path"])
    torch.save({"stoi": stoi, "itos": itos}, config["vocab_save_path"])

if __name__ == '__main__':
    main()

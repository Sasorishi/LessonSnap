import torch
import yaml
from transformers import BartForConditionalGeneration, BartTokenizer

def load_config(config_path='config/config.summarization.yaml'):
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    return config

def summarize_text(text, config):
    """Génère un résumé basé sur la configuration chargée."""
    # Charger le modèle et le tokenizer
    model_name = config["model"]["name"]
    tokenizer = BartTokenizer.from_pretrained(model_name)
    model = BartForConditionalGeneration.from_pretrained(model_name)

    # Tokenisation du texte
    inputs = tokenizer(text, return_tensors="pt", max_length=1024, truncation=True)

    # Générer le résumé avec les paramètres du fichier de config
    summary_ids = model.generate(
        inputs["input_ids"],
        max_length=config["model"]["max_length"],
        min_length=config["model"]["min_length"],
        length_penalty=config["model"]["length_penalty"],
        num_beams=config["model"]["num_beams"],
        early_stopping=config["model"]["early_stopping"]
    )

    # Décoder le résumé
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    summary = summary.replace('"', '').strip()
    return summary

def summarization_model(text):
    # Charger la configuration
    config = load_config()

    summary = summarize_text(text, config)

    if not isinstance(summary, str):
        raise ValueError("Le résumé généré n'est pas une chaîne de caractères.")
    
    print("Résumé :", summary)
    return summary

if __name__ == "__main__":
    summarization_model()

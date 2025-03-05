from datasets import load_dataset

def load_wikitext_dataset():
    """
    Charge le dataset WikiText-2 (version raw) et retourne le texte complet concaténé.
    """
    # Vous pouvez utiliser "wikitext-2-raw-v1" ou "wikitext-2-v1" selon vos besoins
    dataset = load_dataset("wikitext", "wikitext-2-raw-v1", split="train")
    full_text = " ".join(dataset["text"])
    return full_text

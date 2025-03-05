def tokenize_text(text, tokenizer_type='word'):
    """
    Tokenise le texte selon le type choisi :
    - 'letter' : tokenisation caractère par caractère.
    - 'word'   : tokenisation par mot.
    - 'bpe'    : non implémenté ici, mais possibilité d’extension.
    """
    if tokenizer_type == 'letter':
        return list(text)
    elif tokenizer_type == 'word':
        return text.split()
    elif tokenizer_type == 'bpe':
        raise NotImplementedError("Tokenizer BPE non implémenté.")
    else:
        raise ValueError("Type de tokenizer inconnu.")

def build_vocab(tokens):
    """
    Construit un vocabulaire à partir de la liste des tokens.
    Retourne deux dictionnaires : token -> indice et indice -> token.
    """
    vocab = sorted(list(set(tokens)))
    stoi = {s: i for i, s in enumerate(vocab)}
    itos = {i: s for i, s in enumerate(vocab)}
    return stoi, itos

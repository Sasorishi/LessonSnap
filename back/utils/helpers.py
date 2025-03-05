import random
import torch

def get_batch(data, batch_size, seq_length):
    """
    Génère un batch d'inputs et de cibles à partir de la séquence de données.
    """
    inputs = []
    targets = []
    for _ in range(batch_size):
        start = random.randint(0, len(data) - seq_length - 1)
        seq = data[start:start + seq_length]
        target = data[start + 1:start + seq_length + 1]
        inputs.append(seq)
        targets.append(target)
    return torch.tensor(inputs, dtype=torch.long), torch.tensor(targets, dtype=torch.long)

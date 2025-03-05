from gtts import gTTS
import os

def text_to_speech(text, lang='fr', filename='output.mp3'):
    # Créer un objet gTTS
    tts = gTTS(text=text, lang=lang, slow=False)
    
    # Sauvegarder le fichier audio
    tts.save(filename)
    print(f"Fichier audio sauvegardé sous : {filename}")

    # Optionnel : jouer le fichier audio (sur macOS)
    os.system(f"afplay {filename}")  # Utilisez 'start' sur Windows ou 'mpg123' sur Linux
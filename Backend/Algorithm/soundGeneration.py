from pydub import AudioSegment
from pydub.generators import Sine
import json
import tempfile

def dict_morse_to_text():
    with open('Backend/Algorithm/data/morse_code.json', "r", encoding='utf-8') as file:
        morse_code = json.load(file)
    from_morse = {}
    for key, value in morse_code.items():
        from_morse[key] = value
    return from_morse


def text_to_morse(text: str) -> str:
    morse_code_dict = dict_morse_to_text()
    text = text.upper()
    text_morse_words = []
    for word in text.split(" "):
        text_morse_letters = []
        for letter in word:
            if letter in morse_code_dict:
                text_morse_letters.append(morse_code_dict[letter])
        text_morse_words.append("_".join(text_morse_letters))
    return ' '.join(text_morse_words)


def generate_morse_code_audio(text: str, base_length: int) -> str:
    morse_text = text_to_morse(text)
    audio = AudioSegment.silent(duration=base_length)  # Silence between characters
    for char in morse_text:
        if char == '.':
            audio += Sine(1000).to_audio_segment(duration=base_length)
        elif char == '-':
            audio += Sine(1000).to_audio_segment(duration=3*base_length)
        elif char == '_':
            audio += AudioSegment.silent(duration=base_length)
        elif char == ' ':
            audio += AudioSegment.silent(duration=5*base_length)
        audio += AudioSegment.silent(duration=base_length)
    return audio


def generate_morse_code_audio_file(text_in_morse: str, dot_length: int = 100):
    morse_audio = generate_morse_code_audio(text_in_morse, dot_length)
    temp = tempfile.NamedTemporaryFile(delete=False)
    with open(temp.name, mode='wb') as tmp_file:
        morse_audio.export(tmp_file, format="wav")
    return temp.name

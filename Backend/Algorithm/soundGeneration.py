from pydub import AudioSegment
from pydub.generators import Sine
import json


def generate_morse_code_audio_file(text_in_morse: str, file_name: str):
    def dict_morse_to_text():
        with open('Backend/Algorithm/data/morse_code.json', "r", encoding='utf-8') as file:
            morse_code = json.load(file)
        from_morse = {}
        for key, value in morse_code.items():
            from_morse[key] = value
        return from_morse

    def text_to_morse(text: str) -> str:
        text_morse = []
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

    def generate_morse_code_audio(text: str):
        morse_text = text_to_morse(text)
        audio = AudioSegment.silent(duration=100)  # Silence between characters
        for char in morse_text:
            if char == '.':
                audio += Sine(1000).to_audio_segment(duration=100)
            elif char == '-':
                audio += Sine(1000).to_audio_segment(duration=300)
            elif char == '_':
                audio += AudioSegment.silent(duration=100)
            elif char == ' ':
                audio += AudioSegment.silent(duration=500)
            audio += AudioSegment.silent(duration=100)
        return audio

    morse_audio = generate_morse_code_audio(text_in_morse)
    fl_name = 'Backend/tmp/' + file_name + '.wav'
    morse_audio.export(fl_name, format="wav")
    return
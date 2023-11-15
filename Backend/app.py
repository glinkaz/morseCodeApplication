import os
from flask import Flask, request
from Algorithm.MorseCodeTranslator import sound_translator

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './tmp/'


@app.route('/translate_from_morse/', methods=['POST'])
def translate_from_morse():
    x = request.files['inputSoundFile']
    path = os.path.join(app.config['UPLOAD_FOLDER'], x.filename)
    translated_text = sound_translator(path)
    # TODO: Add deleting the file after it's been translated
    return translated_text


@app.route('/translate_to_morse/', methods=['POST'])
def translate_to_morse():
    # TODO: Add sound generating module
    pass


if __name__ == '__main__':
    app.run()

import os
import random
import string
import tempfile
from google.cloud import storage
from flask import Flask, request, send_file, render_template
from Algorithm.MorseCodeTranslator import sound_translator
from Algorithm.soundGeneration import generate_morse_code_audio_file


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'Backend/tmp/'

def initiate_gcp_bucket():
    storage_client = storage.Client()
    return storage_client.bucket('morse-code-backend.appspot.com')


@app.route('/')
def default():
    return render_template('home.html')

@app.route('/translate_from_morse/', methods=['POST'])
def translate_from_morse():
    x = request.files['inputSoundFile']
    tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.wav')
    x.save(tmp_file.name)
    translated_text = sound_translator(tmp_file.name)
    tmp_file.close()
    os.remove(tmp_file.name)
    return translated_text

@app.route('/translate_to_morse/', methods=['POST', 'GET'])
def translate_to_morse():
    bucket = initiate_gcp_bucket()
    if request.method == 'POST':
        msg = request.get_json()['morse']
        file_name = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        tmp_name = generate_morse_code_audio_file(msg)
        blob = bucket.blob(file_name + '.wav')
        blob.upload_from_filename(tmp_name)
        return file_name
    else:
        file_name = request.args.get('filename') + '.wav'
        tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.wav')
        blob = bucket.blob(file_name)
        with open(tmp_file.name, 'wb') as tf:
            tf.write(blob.download_as_string())
        blob.delete()
        return send_file(tmp_file.name)


if __name__ == '__main__':
    app.run()
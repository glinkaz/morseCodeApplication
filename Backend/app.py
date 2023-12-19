import os
import random
import string
from flask import Flask, request, send_file
from Algorithm.MorseCodeTranslator import sound_translator
from Algorithm.soundGeneration import generate_morse_code_audio_file
from flask_cors import CORS, cross_origin
import base64
import wave
import io

app = Flask(__name__)
cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
 
# app.use(cors())

app.config['UPLOAD_FOLDER'] = 'Backend/tmp/'
CORS(app)

@app.route('/')
def default():
    return 'It\'s working!'

@app.route('/translate_from_morse', methods=['POST'])
def translate_from_morse():
    x = request.files['inputSoundFile']
    path = os.path.join(app.config['UPLOAD_FOLDER'], x.filename)
    print(x)
    x.save(path)
    translated_text = sound_translator(path)
    print(translated_text)
    os.remove(path)
    return translated_text

# @app.route('/translate_from_morse', methods=['POST'])
# def translate_from_morse():
#     x = request.files['inputSoundFile']
#     print(x)
#     # wav_file = open("temp.wav", "wb")
#     # decode_string = base64.b64decode(x)
#     # wav_file.write(decode_string)
#     path = os.path.join(app.config['UPLOAD_FOLDER'],x.filename)
#     with open("audio.wav", "wb") as aud:
#         aud_stream = x.read()
#         aud.write(aud_stream)
#     print(aud)
#     # x.save(path)
#     translated_text = sound_translator("audio.wav")
#     # x.flush()
#     # x.close()
#     os.remove(path)
#     return translated_text

# @app.route('/translate_from_morse', methods=['POST'])
# def translate_from_morse():
#     x = request.form['inputSoundFile']
   
#     # encode_string = base64.b64encode(open("audio.wav", "rb").read())
#     path = os.path.join(app.config['UPLOAD_FOLDER'],"temp.wav")

#     # wav_file = open(path, "wb")
#     # print(x)
#     base64_to_wav(x,path)
#     # decode_string = base64.b64decode(x)
#     # wav_file.write(decode_string)
#     # wav_file.close()
#     # wav_file.save(path)
#     translated_text = sound_translator(path)
#     # wav_file.flush()
#     print(translated_text)
#     # wav_file.close()
#     os.remove(path)
#     return translated_text


@app.route('/translate_to_morse', methods=['POST', 'GET'])
def translate_to_morse():
    if request.method == 'POST':
        x = request.get_json()['morse']
        file_name = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        generate_morse_code_audio_file(x, file_name)
        return file_name
    else:
        file_name = request.args.get('filename')
        print(file_name)
        path = os.path.join('tmp/', file_name)
        # path = app.config['UPLOAD_FOLDER'] + file_name
        print(path)
        return send_file(path,mimetype="audio/wav")


@app.route('/delete_file', methods=['POST'])
def delete_file():
    file_name = request.get_json()['file_name']
    print(file_name)
    try:
        path = app.config['UPLOAD_FOLDER'] + file_name+'.wav'
        os.remove(path)
        print('File deleted successfully')
        return 'File deleted successfully'
    except:
        print('File could not be deleted')
        return 'File could not be deleted'

def base64_to_wav(base64_string, output_file_path):
    # Decode the base64 string to binary data
    audio_data = base64.b64decode(base64_string)

    # Open a file-like object using BytesIO
    audio_io = io.BytesIO(audio_data)

    # Create a WAV file
    with wave.open(output_file_path, 'wb') as wav_file:
        # Set WAV file parameters (1 channel, 16 bits per sample, 44100 Hz)
        # wav_file.setnchannels(1)
        # wav_file.setsampwidth(2)
        # wav_file.setframerate(44100)

        # Write the binary audio data to the WAV file
        wav_file.writeframes(audio_io.read())


if __name__ == '__main__':
    app.run()
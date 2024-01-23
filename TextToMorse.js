import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import {  Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import axios from "axios";
import { Audio } from 'expo-av';
import RNFS from 'react-native-fs';

export default function TextToMorseScreen() { 

  const backendUrl = 'https://morse-code-backend.ew.r.appspot.com'; //"http://127.0.0.1:5000";//
  const [playing, setPlaying] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [inputText, setInputText] = useState(''); 
  const [audioUrl, setAudioUrl] = useState();
  const [fileName, setFileName] = useState();
  
  const base64ToWav = async (base64String, filePath) => {
    try {
      // Write the Uint8Array to a file
      await RNFS.writeFile(filePath, base64String, 'base64');
  
      console.log('WAV file saved at:', filePath);
    } catch (error) {
      console.error('Error converting base64 to WAV:', error);
    }
  };


const postTextToTranslate = async () => {

    console.log(inputText)
    const res = await axios.post(backendUrl+'/translate_to_morse/',{"morse" : inputText})
    setFileName(res.data)
    console.log(res.data);
    data_sound =  await axios.get(backendUrl+'/translate_to_morse/?filename='+res.data, 
    {
      responseType: 'arraybuffer',
      headers: {'Content-Type': 'audio/wav'}
      })
    console.log(fileName)
    const base64File = data_sound.request._response
    const DIR = FileSystem.documentDirectory + 'recordings/';
    const fileurl = DIR + res.data+'.wav';
    base64ToWav(base64File,fileurl)
    setAudioUrl(fileurl)
    setGenerated(true)

};

 


  async function resetInputText() {
    try {

      if (generated === true) {
          console.log('Reset Input Text')
          setInputText('');
          setGenerated(false);
          setAudioUrl();
          setFileName('');
          setPlaying(false);
      }
    }
    catch (error) {
        console.error('Failed to reset recording', error);
      }
  }

  async function playSound() {
        try {
          if (generated & fileName !== null){
          setPlaying(!playing)
          const playbackObject = new Audio.Sound();
          await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${fileName}`+'.wav' });
          console.log(FileSystem.documentDirectory + 'recordings/' + `${fileName}`+'.wav')
          await playbackObject.setVolumeAsync(1);
          await playbackObject.playAsync();
         setPlaying(false)  
          }    
    } catch (error) {
      console.error('Failed to play recording', error);
    }
  }

  async function downloadMorse() {
    try {
      if (generated) {
        console.log(audioUrl)
        await Sharing.shareAsync(audioUrl);
      }
    } catch (error) {
      console.error('Failed to play recording', error);
    }
  }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:40
      },
      buttonCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: 'red',
      },
      input: {
        height: '40%',
        width: '90%',
        margin: 5,
        borderWidth: 0,
        padding: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 5
      },
      buttonStyle: {
        marginHorizontal: 5,
        marginTop: 15,
        marginBottom: 15,
        borderBlockColor: 'grey',
        borderWidth: 1,
        padding:10,
        borderRadius: 5,

      },
  });

  return (
      <View style={styles.container}>
      
        <TextInput
          style={styles.input}
          multiline = {true}
          textAlignVertical = 'top'
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholder="Text to be translated into Morse code."
        />
    
        <View style={{ flexDirection:"row" }}>
          <TouchableOpacity style={styles.buttonStyle} onPress={postTextToTranslate}>
            <Text>
              Generate
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={downloadMorse}>
            <Text>
              Download
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={resetInputText}>
            <Text>
              Reset
            </Text>
          </TouchableOpacity>
        </View>  
        <TouchableOpacity style={styles.buttonCircle} onPress={playSound} >
          <FontAwesome name={'play-circle'} size={64} color="white" />{/* playing ? 'stop-circle' : */}
        </TouchableOpacity>   
      </View>
    );
  }
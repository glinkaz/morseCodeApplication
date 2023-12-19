import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import {  Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import axios from "axios";
import { Audio } from 'expo-av';
import RNFS from 'react-native-fs';

// var Buffer = require('buffer/').Buffer 
export default function TextToMorseScreen() { 

  const backendUrl = "http://127.0.0.1:5000";
  const [playing, setPlaying] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [inputText, setInputText] = useState(''); 
  const [audioUrl, setAudioUrl] = useState();
  const [sound, setSound] = useState();
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

    // const response =
    console.log(inputText)
    const res = await axios.post(backendUrl+'/translate_to_morse',{"morse" : inputText})
      // responseType: 'arraybuffer',  // Ustawienie typu odpowiedzi na arraybuffer
    
    setFileName(res.data)

    console.log(res.data);
    data_sound =  await axios.get(backendUrl+'/translate_to_morse?filename='+res.data+'.wav', 
    {
      responseType: 'arraybuffer',
      headers: {'Content-Type': 'audio/wav'}
      })
    console.log(fileName)
    await axios.post(backendUrl+'/delete_file', {'file_name':res.data})
    const base64File = data_sound.request._response
    const DIR = FileSystem.documentDirectory + 'recordings/';
    // const filename = res.data+'.wav';
    const fileurl = DIR + res.data+'.wav';
    base64ToWav(base64File,fileurl)
    console.log("log 1: "+fileurl)
    setAudioUrl(fileurl)//data.request.responseURL)
    console.log("log 2")
    setGenerated(true)
    console.log("translated")
    console.log("Playing: "+ playing)
//     console.error("Error translating to Morse:", error);
//     // Obsłuż błędy tutaj
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
  function isPlaying(playing) {
    return new Promise(resolve => setPlaying(resolve, playing));
}
  async function playSound() {
        try {
        // This is for simply playing the sound back
        // if( !playing){
          setPlaying(!playing)
          const playbackObject = new Audio.Sound();
          await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${fileName}`+'.wav' });
          console.log(FileSystem.documentDirectory + 'recordings/' + `${fileName}`+'.wav')
          await playbackObject.setVolumeAsync(1);
          await playbackObject.playAsync();
         setPlaying(false)
        // }
      

    } catch (error) {
      console.error('Failed to play recording', error);
    }
  }

  

    // const playSound = async () => {

    //     setPlaying(!playing)
    //     console.log(generated == true) // && playing == true
    //     // if (generated === true){ // && playing == true
    //     console.log('Loading Sound');
    //     console.log(audioUrl)
    //     const playbackObject = new Audio.Sound();
    //     playbackObject.setOnPlaybackStatusUpdate();
    //     await playbackObject.loadAsync({ uri: audioUrl });
    //     await playbackObject.playAsync();
    //     console.log("Stop sound")
    //     setPlaying(false)
    
    // }
  
    // useEffect(() => {
    //   return sound
    //     ? () => {
    //       // playSound()
    //         setPlaying(false)
    //         console.log('Unloading Sound');
    //         sound.unloadAsync();
    //       }
    //     : undefined;
    // }, [sound]);

  


  async function playMorse() {
    try {

      console.log(generated)
      if (generated && audioUrl) {
        setPlaying(true)
        console.log("Playing")
        console.log(audioUrl)

        const playbackObject = new Audio.Sound();
        console.log('playbackObject')
        await playbackObject.loadAsync( {uri:audioUrl});//loadAsync({uri: audioUrl });
        setSound(playbackObject);
        // await sound.setPositionAsync(0);
        await playbackObject.playAsync();
        await playbackObject.unloadAsync();
        console.log('play')
 
        console.log('Playing Sound');
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
      
        const ifSharing = await Sharing.shareAsync(audioUrl);
      
        // console.log('share async '+ ifSharing)

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
        // backgroundColor:'grey',

      },
  });

  return (
      <View style={styles.container}>
      
        <TextInput
          style={styles.input}
          multiline = {true}
          textAlignVertical = 'top'
          // onChangeText={onChangeText}
          value={inputText}
          // placeholder="Type here to translate!"
          onChangeText={text => setInputText(text)}
          // value={inputText}
          // ref = {(el) => { this.textToTranslate = el; }}
          placeholder="Tekst to przetłumaczenia na kod Morsa"
        />
    
        <View style={{ flexDirection:"row" }}>
          <TouchableOpacity style={styles.buttonStyle} onPress={postTextToTranslate}>
            <Text>
              Generate
            </Text>
            {/* <FontAwesome name={'trash'} size={20} color="white" /> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={downloadMorse}>
            {/* <FontAwesome name={'download'} size={20} color="white" /> */}
            <Text>
              Download
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle} onPress={resetInputText}>
            {/* <FontAwesome name={'translate'} size={64} color="white" /> */}
            <Text>
              Reset
            </Text>
          </TouchableOpacity>
        </View>  
  
        <TouchableOpacity style={styles.buttonCircle} onPress={playSound} >

          <FontAwesome name={playing ? 'stop-circle' :'play-circle'} size={64} color="white" />
          {/* playing ? 'stop-circle' :  */}
        </TouchableOpacity>
      
      </View>
    );
  }
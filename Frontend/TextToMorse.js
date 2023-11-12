import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Button, Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

 
export default function TextToMorseScreen() { 


  const [playing, setPlaying] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [inputText, setInputText] = useState('');

 

  async function resetInputText() {
    try {

      if (generated === true) {
        console.log('Reset Input Text')
        setInputText(null);
        // await FileSystem.deleteAsync( FileSystem.documentDirectory + 'recordings/' + `${savedFileName}` )
        setGenerated(false);
      }
    }
    catch (error) {
        console.error('Failed to reset recording', error);
      }
    }


  async function playMorse() {
    try {

      if (generated) {
      
        // This is for simply playing the sound back
        // zalezy jak plik bedzie przesylany i przechowywany
         
        // const playbackObject = new Audio.Sound();
        // await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${savedFileName}` });
        console.log(inputText)
        // await playbackObject.playAsync();

      }

    } catch (error) {
      console.error('Failed to play recording', error);
    }
  }

  async function downloadMorse() {
    try {

      if (generated) {
        console.log('Download Recording')
      
        // const ifSharing = await Sharing.shareAsync(FileSystem.documentDirectory + 'recordings/' + `${savedFileName}`);
      
        // console.log('share async '+ ifSharing)

      }

    } catch (error) {
      console.error('Failed to play recording', error);
    }
  }

  async function generateMorse() {
    try {
      // console.log(inputText)
      if (inputText) {
        // console.log('Generate sound')
      
        // const ifSharing = await Sharing.shareAsync(FileSystem.documentDirectory + 'recordings/' + `${savedFileName}`);
      
        console.log('Input text: '+ inputText)

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
          <TouchableOpacity style={styles.buttonStyle} onPress={generateMorse}>
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
  
        <TouchableOpacity style={styles.buttonCircle} onPress={playMorse}>
          <FontAwesome name={playing ? 'stop-circle' : 'play-circle'} size={64} color="white" />
        </TouchableOpacity>
      
      </View>
    );
  }
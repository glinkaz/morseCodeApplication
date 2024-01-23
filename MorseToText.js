import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Text, TouchableOpacity, View, StyleSheet, TextInput} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import axios from "axios";
import RNFS from 'react-native-fs';

export default function MorseToTextScreen() {

  const backendUrl = 'https://morse-code-backend.ew.r.appspot.com'; //"http://127.0.0.1:5000";//
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioPermission, setAudioPermission] = useState(null);
  const [savedFileName, setSavedFileName] = useState(null);
  const [text, setText] = useState(null);

  const postMorseToTranslate = async () => {
    try {
      //Get the path to the file in the device's memory
      const filePath = FileSystem.documentDirectory + 'recordings/' + savedFileName;// Zastąp ścieżką i nazwą pliku

      // Create object FormData
      const formData = new FormData();
      formData.append('inputSoundFile', {
        uri: 'file://' + filePath,
        type: 'multipart/form-data',
        name: savedFileName, // Zastąp nazwą pliku
      });

      // Send request POST to backend
      const response = await axios.post(backendUrl+'/translate_from_morse/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        setText(response.data)
    } catch (error) {
    }
  };

  useEffect(() => {
    // Simply get recording permission upon first render
    async function getPermission() {
      await Audio.requestPermissionsAsync().then((permission) => {
        console.log('Permission Granted: ' + permission.granted);
        setAudioPermission(permission.granted)
      }).catch(error => {
        console.log(error);
      });
    }

    // Call function to get permission
    getPermission()
    // Cleanup upon first render
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  async function startRecording() {
    try {
      // needed for IoS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        interruptionModeIOS: 1,

        })
      }
      const newRecording = new Audio.Recording();
      console.log('Starting Recording')
      await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus('recording');
      setSavedFileName(null);

    } catch (error) {
      console.error('Failed to start recording', error);
    }
  }

  async function stopRecording() {
    try {

      if (recordingStatus === 'recording') {
        console.log('Stopping Recording')
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();
        // Create a file name for the recording
        const fileName = `recording-${Date.now()}.wav`;
        // Move the recording to the new directory with the new file name
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          interruptionModeIOS: 0,
        });
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
        await FileSystem.moveAsync({
          from: recordingUri,
          to: FileSystem.documentDirectory + 'recordings/' + fileName
        });
        console.log(FileSystem.documentDirectory + 'recordings/' + fileName);
        setRecording(null);
        setRecordingStatus('stopped');
        setSavedFileName(fileName);

      }

    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  }


  async function uploadFile() {
    const result = await DocumentPicker.getDocumentAsync({})
    console.log(result.assets[0].uri)
    if (result != null && !result.canceled) {
          console.log('File not empty')
          setRecordingStatus('stopped');
          await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'recordings/', { intermediates: true });
          await FileSystem.moveAsync({
            from: result.assets[0].uri,
            to: FileSystem.documentDirectory + 'recordings/' + `${result.assets[0].name}`

          });
          console.log(FileSystem.documentDirectory + 'recordings/' + `${result.assets[0].name}`);
          setRecording(null);
          setRecordingStatus('stopped');
          setSavedFileName(result.assets[0].name);
          }
    }

  async function resetRecording() {
    try {

      if (recordingStatus === 'stopped') {
        console.log('Reset Recording')
        setRecording(null);
        if (savedFileName !== null & RNFS.exists(FileSystem.documentDirectory + 'recordings/' + `${savedFileName}`)){
          console.log(FileSystem.documentDirectory + 'recordings/' + `${savedFileName}`)
          await FileSystem.deleteAsync(FileSystem.documentDirectory + 'recordings/' + `${savedFileName}`)
        }
        setSavedFileName(null);
        setText('');

      }

    } catch (error) {
      console.error('Failed to reset recording', error);
    }
  }

  async function playRecording() {
    try {
      if (recordingStatus === 'stopped') {
        // This is for simply playing the sound back
        const playbackObject = new Audio.Sound();
        await playbackObject.loadAsync({ uri: FileSystem.documentDirectory + 'recordings/' + `${savedFileName}` });
        console.log(FileSystem.documentDirectory + 'recordings/' + `${savedFileName}`)
        await playbackObject.setVolumeAsync(1);
        await playbackObject.playAsync();
      }

    } catch (error) {
      console.error('Failed to play recording', error);
    }
  }

  async function downloadRecording() {
    try {
      if (recordingStatus === 'stopped') {
        console.log('Download Recording')
        await Sharing.shareAsync(FileSystem.documentDirectory + 'recordings/' + `${savedFileName}`);
      }
    } catch (error) {
      console.error('Failed to play recording', error);
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        console.log('Saved audio file to', savedUri);
      }
    } else {
      await startRecording();
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40
    },
    buttonCircle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 128,
      height: 128,
      borderRadius: 64,
      backgroundColor: 'red',
    },
    buttonStyle: {
      marginHorizontal: 5,
      marginTop: 5,
      marginBottom: 5,
      borderBlockColor: 'grey',
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
    buttonUpload: {
      marginHorizontal: 5,
      marginTop: 15,
      marginBottom: 5,
      borderWidth: 1,
      padding: 10,
      backgroundColor:'black',
      borderRadius: 5
    },
    outputText: {
      margin: 20,
      height: '40%',
      width: '90%',
      backgroundColor: 'lightgrey',
      padding: 10,
      borderRadius: 5
    }
  });

  return (
    <View style={styles.container}>
      <Text>
        {recordingStatus == "recording" ? "\n\nStop recording\n" : "\n\nStart recording\n"}
      </Text>
      <TouchableOpacity style={styles.buttonCircle} onPress={handleRecordButtonPress}>
        <FontAwesome name={recording ? 'stop-circle' : 'circle'} size={64} color="white" />
      </TouchableOpacity>
      <View>
      <TouchableOpacity
        style={styles.buttonUpload}
        activeOpacity={0.5}
        onPress={uploadFile}>
          <FontAwesome name={'upload'} color="white" >
        <Text>Upload File</Text>
        </FontAwesome>
      </TouchableOpacity>
    </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.buttonStyle} onPress={resetRecording}>
          <Text>
            Reset
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={downloadRecording}>
          <Text>
            Download
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={postMorseToTranslate}>
          <Text>
            Translate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={playRecording}>
          <Text>
            Play
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.outputText}>
        <TextInput 
        editable = {false}
        value={text}
        multiline = {true}>
        </TextInput>
      </View>
    </View>
  );
}
import { Button, Text, View, StyleSheet,ScrollView} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export function DetailsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
  
  export function HomeScreen() {
    return (
      <ScrollView >
        <Text style = {styles.title}>WHAT IS MORSE CODE?</Text>
        <Text style = {styles.text} >
          Since you've decided to download this app, you probably know something about it, but let's get over the history and theory. Morse code is a method of communication through coding letters using dits (short sounds), dahs (long sounds) and different lenghts of silences between them. If we consider dit having length equal to 1, a silence between symbols within a letter would also be of length 1, a dah and a silence separating letters would be of length 3 and a space would be of length 7. Each letter or digit can be written with one to five dits and dahs, combination of which is defined as International Morse Code. In our app, we use that version of Morse code and we assume that the message you try to translate is following those guidelines at least approximately. The sound you can generate in Text to Morse tab will follow them precisely.
          </Text>
          <Text style = {styles.title} > WHAT IS THIS APP AND HOW TO USE IT?</Text>
        <Text style = {styles.text}>
        This app is meant to do two things: translate an audio file containing Morse code to text or generate such an audio file coding a provided message. {"\n"}
To use the Morse to Text tab, first upload or record audio (make sure dits and dahs are loud and clear), then click Translate, wait for a while and there you go! The translation will be shown in the grey area at the bottom. In case the audio is not clear enough for the program to translate it, it will print out "Can't translate sound" instead. If you want to download the sound you recorded, simply press Download. Reset button reverts the tab to it's original state. {"\n"}
To use the Text to Morse tab, enter the text you want translated (only latin alphabet letters, digits and punctuation marks) in the grey area and press Generate. Once the file has been generated, you can play it using the big red button or download it to your device. Reset button reverts the tab to it's original state.
        </Text>
        <Text style = {styles.author}>     
This application has been designed and created as an engineering thesis by Zuzanna Glinka and Jakub Kasprzak, fourth year students at the Warsaw University of Technology. We hope you enjoy it!
        </Text>
      </ScrollView>
    );
  }
  
  export function SettingsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }
  
  const HomeStack = createNativeStackNavigator();

  
  export const SettingsStack = createNativeStackNavigator();
  
  export function SettingsStackScreen() {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="Settings" component={SettingsScreen} />
        <SettingsStack.Screen name="Details" component={DetailsScreen} />
      </SettingsStack.Navigator>
    );
  }
  
    export const Tab = createBottomTabNavigator();
  

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: 'red',
      },
      recordingStatusText: {
        marginTop: 16,
      },
      input: {
        height: '40%',
        width: '70%',
        margin: 15,
        borderWidth: 0,
        padding: 10,
      },
      title: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        paddingTop: 10,
      },
      text:{
        margin: 15,
      },
      author:{
        margin: 15,
        fontSize:12,
        color:'grey',
      }
    });
    
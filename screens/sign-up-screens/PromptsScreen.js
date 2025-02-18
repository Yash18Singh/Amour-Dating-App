import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import Colors from '../../Colors'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils'

const PromptsScreen = () => {
  const [userData, setUserData] = useState();
  const [invalid, setInvalid] = useState(false);
  const [promptss, setPromptss] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProgress = async () => {
      const progressData = await getRegistrationProgress('Prompts');
      console.log('Prompts :', progressData?.prompts);
      setPromptss(route?.params?.prompts);
    };

    fetchProgress();
  }, []);

  const handleNext = () => {
    saveRegistrationProgress('Prompts', {prompts: route?.params?.prompts });
    navigation.navigate('PreFinal');
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{marginTop:80, padding:20}}>

        <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{height:50, width:50, borderWidth:2, borderRadius:30, borderColor:Colors.black, justifyContent:'center', alignItems:'center'}}>
              <MaterialCommunityIcons name='thought-bubble-outline' size={32} color={Colors.black} />
            </View>
            <Image style={{width:100, height:40}} source={{uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png'}}/>
        </View>

        <View style={{marginTop:40, flexDirection:'column', gap:20}}>
          <Text style={{fontSize:30, fontFamily:'font-med'}}>Let people know about YOU</Text>

          <View style={{marginTop:30, gap:20}}>
              {promptss ? (
                promptss?.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => navigation.navigate('ShowPrompts')}
                    style={{
                      borderColor: '#707070',
                      borderWidth: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderStyle: 'dashed',
                      borderRadius: 10,
                      height: 70,
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontStyle: 'italic',
                        fontSize: 15,
                      }}>
                      {item?.question}
                    </Text>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontStyle: 'italic',
                        fontSize: 15,
                        marginTop: 3,
                      }}>
                      {item?.answer}
                    </Text>
                  </Pressable>
                ))
              ) : (
                <View>
                  <Pressable
                    onPress={() => navigation.navigate('ShowPrompts')}
                    style={{
                      borderColor: '#707070',
                      borderWidth: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderStyle: 'dashed',
                      borderRadius: 10,
                      height: 70,
                    
                    }}>
                    <Text
                      style={{
                        color: 'gray',
                        fontWeight: '600',
                        fontStyle: 'italic',
                        fontSize: 15,
                      }}>
                      Select a Prompt
                    </Text>
                    <Text
                      style={{
                        color: 'gray',
                        fontWeight: '600',
                        fontStyle: 'italic',
                        fontSize: 15,
                        marginTop: 3,
                      }}>
                      And write your own answer
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => navigation.navigate('ShowPrompts')}
                    style={{
                      borderColor: '#707070',
                      borderWidth: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderStyle: 'dashed',
                      borderRadius: 10,
                      height: 70,
                      marginVertical: 15
                    }}>
                    <Text
                      style={{
                        color: 'gray',
                        fontWeight: '600',
                        fontStyle: 'italic',
                        fontSize: 15,
                      }}>
                      Select a Prompt
                    </Text>
                    <Text
                      style={{
                        color: 'gray',
                        fontWeight: '600',
                        fontStyle: 'italic',
                        fontSize: 15,
                        marginTop: 3,
                      }}>
                      And write your own answer
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => navigation.navigate('ShowPrompts')}
                    style={{
                      borderColor: '#707070',
                      borderWidth: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderStyle: 'dashed',
                      borderRadius: 10,
                      height: 70,
                    }}>
                    <Text
                      style={{
                        color: 'gray',
                        fontWeight: '600',
                        fontStyle: 'italic',
                        fontSize: 15,
                      }}>
                      Select a Prompt
                    </Text>
                    <Text
                      style={{
                        color: 'gray',
                        fontWeight: '600',
                        fontStyle: 'italic',
                        fontSize: 15,
                        marginTop: 3,
                      }}>
                      And write your own answer
                    </Text>
                  </Pressable>
                </View>
              )}
          </View>

                {invalid && (
                  <Text style={{ marginTop: 15, fontFamily: "font-med", color: "red" }}>
                    PLEASE PROVIDE SOME PROMPTS!
                  </Text>
                )}


          <TouchableOpacity onPress={handleNext} style={{marginTop:40, marginLeft:'auto'}}>
              <MaterialCommunityIcons name='arrow-right-circle' size={50} color={route?.params?.prompts ? Colors.primary : Colors.pink} />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default PromptsScreen

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import Colors from '../../Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils'

const LookingFor = () => {
  const [lookingFor, setLookingFor] = useState('');
  const [visible, setVisible] = useState(true);
  const [invalid, setInvalid] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchProgress = async () => {
      const progressData = await getRegistrationProgress('LookingFor');
      console.log('LookingFor :', progressData.lookingFor)
      if (progressData) {
        setLookingFor(progressData.lookingFor || '');
      }
    };
        
    fetchProgress();
  }, []);
      
  const handleNext = () => {
        if(lookingFor.trim() == ''){
          setInvalid(true);
        } else{
          saveRegistrationProgress('LookingFor', {lookingFor})
          navigation.navigate('Photos')
        }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{marginTop:80, padding:20}}>

        <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{height:50, width:50, borderWidth:2, borderRadius:30, borderColor:Colors.black, justifyContent:'center', alignItems:'center'}}>
              <FontAwesome name='eye' size={32} color={Colors.black} />
            </View>
            <Image style={{width:100, height:40}} source={{uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png'}}/>
        </View>

        <View style={{marginTop:40, flexDirection:'column', gap:20}}>
          <Text style={{fontSize:30, fontFamily:'font-med'}}>Your dating intention?</Text>

          <View style={{marginTop:30, gap:20}}>

              <Pressable onPress={() => setLookingFor('Life Partner')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{fontFamily:'font-reg', fontSize:22}}>Life Partner</Text>
                <Pressable onPress={() => setLookingFor('Life Partner')}>
                  <FontAwesome name={lookingFor === "Life Partner" ? 'circle' : 'circle-o'} size={30} color={lookingFor === "Life Partner" ? Colors.primary : Colors.pink} />
                </Pressable>
              </Pressable>

              <Pressable onPress={() => setLookingFor('Long Term Dating')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{fontFamily:'font-reg', fontSize:22}}>Long Term Dating</Text>
                <Pressable onPress={() => setLookingFor('Long Term Dating')}>
                  <FontAwesome name={lookingFor === "Long Term Dating" ? 'circle' : 'circle-o'} size={30} color={lookingFor === "Long Term Dating" ? Colors.primary : Colors.pink} />
                </Pressable>
              </Pressable>

              <Pressable onPress={() => setLookingFor('Short Term Dating')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{fontFamily:'font-reg', fontSize:22}}>Short Term Dating</Text>
                <Pressable onPress={() => setLookingFor('Short Term Dating')}>
                  <FontAwesome name={lookingFor === "Short Term Dating" ? 'circle' : 'circle-o'} size={30} color={lookingFor === "Short Term Dating" ? Colors.primary : Colors.pink} />
                </Pressable>
              </Pressable>

              <Pressable onPress={() => setLookingFor('Open to Chat')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{fontFamily:'font-reg', fontSize:22}}>Open to Chat</Text>
                <Pressable onPress={() => setLookingFor('Open to Chat')}>
                  <FontAwesome name={lookingFor === "Open to Chat" ? 'circle' : 'circle-o'} size={30} color={lookingFor === "Open to Chat" ? Colors.primary : Colors.pink} />
                </Pressable>
              </Pressable>
          </View>

          <Pressable onPress={() => setVisible(!visible)} style={{marginTop:30, flexDirection:'row', alignItems:'center', gap:8}}> 
            <MaterialCommunityIcons name={visible ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color={visible ? Colors.primary : Colors.pink} /> 
            <Text style={{fontFamily:'font-reg', color:Colors.text, fontSize:14}}>Visible on profile</Text>
          </Pressable>

          {
              invalid && 
              <Text style={{marginTop:15, fontFamily:'font-med', color:'red'}}>PLEASE SELECT AN OPTION!</Text>
          }


          <TouchableOpacity onPress={handleNext} style={{marginTop:40, marginLeft:'auto'}}>
              <MaterialCommunityIcons name='arrow-right-circle' size={50} color={lookingFor ? Colors.primary : Colors.pink} />
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  )
}

export default LookingFor

const styles = StyleSheet.create({})
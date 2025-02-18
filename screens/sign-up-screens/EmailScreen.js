import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import Colors from '../../Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils'

const EmailScreen = () => {
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
      const fetchProgress = async () => {
        const progressData = await getRegistrationProgress('Email');
        console.log('Email :', progressData.email)
        if (progressData) {
          setEmail(progressData.email || '');
        }
      };
    
      fetchProgress();
  }, []);
  
  const handleNext = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === '' || !emailRegex.test(email.trim())) {
      setInvalidEmail(true);
    }
    else {
      setInvalidEmail(false);
      saveRegistrationProgress('Email', { email });
      navigation.navigate('Password');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>

      <View style={{marginTop:80, padding:20}}>

        <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{height:50, width:50, borderWidth:2, borderRadius:30, borderColor:Colors.black, justifyContent:'center', alignItems:'center'}}>
              <Fontisto name='email' size={32} color={Colors.black} />
            </View>
            <Image style={{width:100, height:40}} source={{uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png'}}/>
        </View>


        <View style={{marginTop:40, flexDirection:'column', gap:30}}>
          <Text style={{fontSize:30, fontFamily:'font-med'}}>Please provide your Email</Text>
            <TextInput 
              autoFocus={true} 
              value={email} 
              onChangeText={(text) => setEmail(text)} 
              placeholder="Enter your Email" 
              placeholderTextColor={Colors.text} 
              style={{fontSize:20, fontFamily:'font-reg', marginTop:10, borderBottomWidth:1, borderBottomColor:Colors.black, paddingBottom:10}}
            />
        </View>

        <Text style={{marginTop:5, color:Colors.text, fontFamily:'font-reg', fontSize:10}}>Note: You will be asked to verify your email.</Text>

        {
          invalidEmail && 
          <Text style={{marginTop:15, fontFamily:'font-med', color:'red'}}>ENTER A VALID EMAIL!!</Text>
        }
        
        
        <TouchableOpacity onPress={handleNext} style={{marginTop:40, marginLeft:'auto'}}>
          <MaterialCommunityIcons name='arrow-right-circle' size={50} color={email ? Colors.primary : Colors.pink} />
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

export default EmailScreen

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import Colors from '../../Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils'

const PasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
      const fetchProgress = async () => {
        const progressData = await getRegistrationProgress('Password');
      
        if (progressData) {
          setPassword(progressData.password || '');
        }
        console.log('Password :',progressData.password)
      };
    
      fetchProgress();
    }, []);
  
  const handleNext = () => {
    if(password.length < 4 || password.trim() == ''){
      setInvalid(true);
    } else{
      saveRegistrationProgress('Password', {password})
      navigation.navigate('Birth');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>

      <View style={{marginTop:80, padding:20}}>

        <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{height:50, width:50, borderWidth:2, borderRadius:30, borderColor:Colors.black, justifyContent:'center', alignItems:'center'}}>
              <MaterialCommunityIcons name='lock' size={32} color={Colors.black} />
            </View>
            <Image style={{width:100, height:40}} source={{uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png'}}/>
        </View>


        <View style={{marginTop:40, flexDirection:'column', gap:30}}>
          <Text style={{fontSize:30, fontFamily:'font-med'}}>Please set a password</Text>
            <TextInput 
              autoFocus={true}
              secureTextEntry={true} 
              value={password} 
              onChangeText={(text) => setPassword(text)} 
              placeholder="Enter a password" 
              placeholderTextColor={Colors.text} 
              style={{fontSize:20, fontFamily:'font-reg', marginTop:10, borderBottomWidth:1, borderBottomColor:Colors.black, paddingBottom:10}}
            />
        </View>

        <Text style={{marginTop:5, color:Colors.text, fontFamily:'font-reg', fontSize:10}}>Please choose a strong password</Text>

        {
          invalid && 
          <Text style={{marginTop:15, fontFamily:'font-med', color:'red'}}>MINIMUM 4 CHARACTERS!</Text>
        }
        
        <TouchableOpacity onPress={handleNext} style={{marginTop:40, marginLeft:'auto'}}>
          <MaterialCommunityIcons name='arrow-right-circle' size={50} color={password ? Colors.primary : Colors.pink} />
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

export default PasswordScreen

const styles = StyleSheet.create({})
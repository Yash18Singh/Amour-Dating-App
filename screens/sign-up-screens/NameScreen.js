import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils'

const NameScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchProgress = async () => {
      const progressData = await getRegistrationProgress('Name');
      console.log('First Name :', progressData.firstName)
      console.log('Last Name :', progressData.lastName)
      if (progressData) {
        setFirstName(progressData.firstName || '');
        setLastName(progressData.lastName || '');
      }
    };
  
    fetchProgress();
    
  }, []);

  const handleNext = () => {
    if(firstName.trim() !== ''){
        saveRegistrationProgress('Name', {firstName, lastName})
    }

    navigation.navigate('Email');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{marginTop:80, padding:20}}>

        <View style={{flexDirection:'row', alignItems:'center'}}>
          <View style={{height:50, width:50, borderWidth:2, borderRadius:30, borderColor:Colors.black, justifyContent:'center', alignItems:'center'}}>
            <MaterialCommunityIcons name='newspaper-variant-outline' size={32} color={Colors.black} />
          </View>
          <Image style={{width:100, height:40}} source={{uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png'}}/>
        </View>

        <View style={{marginTop:40, flexDirection:'column', gap:30}}>
          <Text style={{fontSize:30, fontFamily:'font-med'}}>What's your name?</Text>
          <TextInput 
            autoFocus={true} 
            value={firstName} 
            onChangeText={(text) => setFirstName(text)} 
            placeholder="First Name (required)" 
            placeholderTextColor={Colors.text} 
            style={{fontSize:20, fontFamily:'font-reg', marginTop:10, borderBottomWidth:1, borderBottomColor:Colors.black, paddingBottom:10}}
          />

          <TextInput 
            value={lastName} 
            onChangeText={(text) => setLastName(text)} 
            placeholder="Last Name" 
            placeholderTextColor={Colors.text} 
            style={{fontSize:20, fontFamily:'font-reg', marginTop:10, borderBottomWidth:1, borderBottomColor:Colors.black, paddingBottom:10}}
          />
        </View>

        <TouchableOpacity onPress={handleNext} style={{marginTop:40, marginLeft:'auto'}}>
          <MaterialCommunityIcons name='arrow-right-circle' size={50} color={firstName ? Colors.primary : Colors.pink} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NameScreen

const styles = StyleSheet.create({})
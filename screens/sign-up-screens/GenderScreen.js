import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import Colors from '../../Colors'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils'

const GenderScreen = () => {
  const [gender, setGender] = useState('');
  const [invalid, setInvalid] = useState('');
  const [visible, setVisible] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
      const fetchProgress = async () => {
        const progressData = await getRegistrationProgress('Gender');
        console.log('Gender :', progressData.gender)
        if (progressData) {
          setGender(progressData.gender || '');
        }
      };
    
      fetchProgress();
  }, []);
  
  const handleNext = () => {
    if(gender.trim() == ''){
      setInvalid(true);
    } else{
      saveRegistrationProgress('Gender', {gender})
      navigation.navigate('Type')
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{marginTop:80, padding:20}}>

        <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{height:50, width:50, borderWidth:2, borderRadius:30, borderColor:Colors.black, justifyContent:'center', alignItems:'center'}}>
              <FontAwesome5 name='transgender-alt' size={32} color={Colors.black} />
            </View>
            <Image style={{width:100, height:40}} source={{uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png'}}/>
        </View>

        <View style={{marginTop:40, flexDirection:'column', gap:20}}>
          <Text style={{fontSize:30, fontFamily:'font-med'}}>What describes you the best?</Text>
          
          <Text style={{fontSize:15, fontFamily:'font-med', color:Colors.text}}>Users are matched based on these gender groups.</Text>
        
          <View style={{marginTop:30, gap:20}}>
            <Pressable onPress={() => setGender('Man')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{fontFamily:'font-reg', fontSize:22}}>Man</Text>
              <Pressable onPress={() => setGender('Man')}>
                <FontAwesome name={gender==='Man' ? 'circle' : 'circle-o'} size={30} color={gender==='Man' ? Colors.primary : Colors.pink} />
              </Pressable>
            </Pressable>

            <Pressable onPress={() => setGender('Woman')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{fontFamily:'font-reg', fontSize:22}}>Woman</Text>
              <Pressable onPress={() => setGender('Woman')}>
                <FontAwesome name={gender==='Woman' ? 'circle' : 'circle-o'} size={30} color={gender==='Woman' ? Colors.primary : Colors.pink} />
              </Pressable>
            </Pressable>

            <Pressable onPress={() => setGender('Non Binary')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{fontFamily:'font-reg', fontSize:22}}>Non Binary</Text>
              <Pressable onPress={() => setGender('Non Binary')}>
                <FontAwesome name={gender==='Non Binary' ? 'circle' : 'circle-o'} size={30} color={gender==='Non Binary' ? Colors.primary : Colors.pink} />
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
              <MaterialCommunityIcons name='arrow-right-circle' size={50} color={gender ? Colors.primary : Colors.pink} />
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  )
}

export default GenderScreen

const styles = StyleSheet.create({})
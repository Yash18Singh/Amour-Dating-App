import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import Colors from '../../Colors'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils'

const TypeScreen = () => {
  const [datingPreferences, setDatingPreferences] = useState([])
  const [visible, setVisible] = useState(true);
  const [invalid, setInvalid] = useState(false);

  const chooseOption = (option) => {
    if(datingPreferences.includes(option)){
      setDatingPreferences(datingPreferences.filter(selectedOption => selectedOption != option))
    } else{
      setDatingPreferences([...datingPreferences, option])
    }
  }
  
  const navigation = useNavigation();

  useEffect(() => {
          const fetchProgress = async () => {
            const progressData = await getRegistrationProgress('DatingPreferences');
            console.log('DatingPreferences :', progressData.datingPreferences)
            if (progressData) {
              setDatingPreferences(progressData.datingPreferences || []);
            }
          };
        
          fetchProgress();
    }, []);
      
  const handleNext = () => {
        if(datingPreferences.length == 0){
          setInvalid(true);
        } else{
          saveRegistrationProgress('DatingPreferences', {datingPreferences})
          navigation.navigate('LookingFor')
        }
  } 
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{marginTop:80, padding:20}}>

        <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{height:50, width:50, borderWidth:2, borderRadius:30, borderColor:Colors.black, justifyContent:'center', alignItems:'center'}}>
              <FontAwesome5 name='grin-hearts' size={30} color={Colors.black} />
            </View>
            <Image style={{width:100, height:40}} source={{uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png'}}/>
        </View>

        <View style={{marginTop:40, flexDirection:'column', gap:20}}>
          <Text style={{fontSize:30, fontFamily:'font-med'}}>Who do you want to date?</Text>
          
          <Text style={{fontSize:15, fontFamily:'font-med', color:Colors.text}}>Select all your choices.</Text>
        
          <View style={{marginTop:30, gap:20}}>

            <Pressable onPress={() => chooseOption('Men')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{fontFamily:'font-reg', fontSize:22}}>Men</Text>
              <Pressable onPress={() => chooseOption('Men')}>
                <FontAwesome name={datingPreferences.includes('Men') ? 'circle' : 'circle-o'} size={30} color={datingPreferences.includes('Men') ? Colors.primary : Colors.pink} />
              </Pressable>
            </Pressable>

            <Pressable onPress={() => chooseOption('Women')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{fontFamily:'font-reg', fontSize:22}}>Women</Text>
              <Pressable onPress={() => chooseOption('Women')}>
                <FontAwesome name={datingPreferences.includes('Women') ? 'circle' : 'circle-o'} size={30} color={datingPreferences.includes('Women') ? Colors.primary : Colors.pink} />
              </Pressable>
            </Pressable>

            <Pressable onPress={() => chooseOption('Everyone')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{fontFamily:'font-reg', fontSize:22}}>Everyone</Text>
              <Pressable onPress={() => chooseOption('Everyone')}>
                <FontAwesome name={datingPreferences.includes('Everyone') ? 'circle' : 'circle-o'} size={30} color={datingPreferences.includes('Everyone') ? Colors.primary : Colors.pink} />
              </Pressable>
            </Pressable>

          </View>

          <Pressable onPress={() => setVisible(!visible)} style={{marginTop:30, flexDirection:'row', alignItems:'center', gap:8}}> 
            <MaterialCommunityIcons name={visible ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color={visible ? Colors.primary : Colors.pink} /> 
            <Text style={{fontFamily:'font-reg', color:Colors.text, fontSize:14}}>Visible on profile</Text>
          </Pressable>

          {
            invalid && 
            <Text style={{marginTop:15, fontFamily:'font-med', color:'red'}}>SELECT ATLEAST 1 OPTION!</Text>
          }
          


          <TouchableOpacity onPress={handleNext} style={{marginTop:40, marginLeft:'auto'}}>
              <MaterialCommunityIcons name='arrow-right-circle' size={50} color={datingPreferences.length>0 ? Colors.primary : Colors.pink} />
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  )
}

export default TypeScreen

const styles = StyleSheet.create({})
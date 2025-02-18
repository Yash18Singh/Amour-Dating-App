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
  const [type, setType] = useState('');
  const [visible, setVisible] = useState(true);
  const [invalid, setInvalid] = useState(false);
  
  const navigation = useNavigation();

  useEffect(() => {
        const fetchProgress = async () => {
          const progressData = await getRegistrationProgress('Type');
          console.log('Type :', progressData.type)
          if (progressData) {
            setType(progressData.type || '');
          }
        };
      
        fetchProgress();
  }, []);
    
  const handleNext = () => {
      if(type.trim() == ''){
        setInvalid(true);
      } else{
        saveRegistrationProgress('Type', {type})
        navigation.navigate('Dating')
      }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{marginTop:80, padding:20}}>

        <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{height:50, width:50, borderWidth:2, borderRadius:30, borderColor:Colors.black, justifyContent:'center', alignItems:'center'}}>
              <FontAwesome6 name='rainbow' size={30} color={Colors.black} />
            </View>
            <Image style={{width:100, height:40}} source={{uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png'}}/>
        </View>

        <View style={{marginTop:40, flexDirection:'column', gap:20}}>
          <Text style={{fontSize:30, fontFamily:'font-med'}}>What's your sexuality?</Text>
          
          <Text style={{fontSize:15, fontFamily:'font-med', color:Colors.text}}>Users are matched based on these type groups.</Text>
        
          <View style={{marginTop:30, gap:20}}>
            <Pressable onPress={() => setType('Straight')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{fontFamily:'font-reg', fontSize:22}}>Straight</Text>
              <Pressable onPress={() => setType('Straight')}>
                <FontAwesome name={type==='Straight' ? 'circle' : 'circle-o'} size={30} color={type==='Straight' ? Colors.primary : Colors.pink} />
              </Pressable>
            </Pressable>

            <Pressable onPress={() => setType('Gay')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{fontFamily:'font-reg', fontSize:22}}>Gay</Text>
              <Pressable onPress={() => setType('Gay')}>
                <FontAwesome name={type==='Gay' ? 'circle' : 'circle-o'} size={30} color={type==='Gay' ? Colors.primary : Colors.pink} />
              </Pressable>
            </Pressable>

            <Pressable onPress={() => setType('Lesbian')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{fontFamily:'font-reg', fontSize:22}}>Lesbian</Text>
              <Pressable onPress={() => setType('Lesbian')}>
                <FontAwesome name={type==='Lesbian' ? 'circle' : 'circle-o'} size={30} color={type==='Lesbian' ? Colors.primary : Colors.pink} />
              </Pressable>
            </Pressable>

            <Pressable onPress={() => setType('Bisexual')} style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Text style={{fontFamily:'font-reg', fontSize:22}}>Bisexual</Text>
              <Pressable onPress={() => setType('Bisexual')}>
                <FontAwesome name={type==='Bisexual' ? 'circle' : 'circle-o'} size={30} color={type==='Bisexual' ? Colors.primary : Colors.pink} />
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
              <MaterialCommunityIcons name='arrow-right-circle' size={50} color={type ? Colors.primary : Colors.pink} />
          </TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  )
}

export default TypeScreen

const styles = StyleSheet.create({})
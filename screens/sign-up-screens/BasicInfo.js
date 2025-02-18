import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import Colors from '../../Colors'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'

const BasicInfo = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex:1, backgroundColor:Colors.background}}>
      <View style={{marginTop:80, padding:10}}>
      <Text style={{fontFamily:'font-bold', fontSize:40, color:Colors.primary}}>AMOUR</Text>
        <Text style={{marginTop:15, fontFamily:'font-bold', fontSize:25, color:Colors.black}}>You're one of a kind.</Text>
        <Text style={{marginTop:10, fontFamily:'font-bold', fontSize:15, color:Colors.text}}>Your profile should be too! 😊</Text>
      </View>

      <View>
        <LottieView 
          autoPlay 
          loop 
          style={{width:400, height:400, alignSelf:'center'}}
          speed={0.7}
          source={require("../../assets/data/love.json")} 
        />
      </View>

      <Pressable 
        style={{backgroundColor:Colors.primary, padding:15, margiTop:'auto', alignItems:'center', position:'absolute', bottom:0, width:'100%', height:80}}
        onPress={() => navigation.navigate('Name')}  
      >
        <Text style={{color:Colors.white, fontFamily:'font-med', fontSize:20}}>Enter basic Info</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default BasicInfo

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Entypo, Feather, FontAwesome5, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';

const MyAmour = () => {
  return (
   <>
      <View style={{gap:10, paddingHorizontal:20, borderWidth:0.2, paddingVertical:10, borderRadius:10, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
        <View style={{backgroundColor:'#d6d6d6c2', padding:10, borderRadius:30}}>
          <FontAwesome5 name='list-ul' size={20} color='black' />
        </View>
        
        <Text style={{fontFamily:'font-med'}}>Add a Prompt Poll</Text>
        <Text style={{fontFamily:'font-med', fontSize:10}}>Kick-start the conversation with your matches</Text>
        
        <TouchableOpacity style={{borderWidth:1, borderRadius:30, paddingVertical:7, paddingHorizontal:15}}>
          <Text style={{fontFamily:'font-reg', fontSize:10}}>Check it out</Text>
        </TouchableOpacity>
      </View>


      <View style={{paddingHorizontal:20, borderWidth:0.2, paddingVertical:10, borderRadius:10, backgroundColor:'white'}}>
          <TouchableOpacity style={{flexDirection:'row', gap:15}}>
            <View style={{backgroundColor:'#d6d6d6c2', padding:10, borderRadius:30}}>
              <FontAwesome5 name='question' size={20} color='black' />
            </View>

            <View>
              <Text style={{fontFamily:'font-med', fontSize:14}}>Help Centre</Text>
              <Text style={{fontFamily:'font-reg', fontSize:10}}>Safety, Security, and more</Text>
            </View>
          </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal:20, borderWidth:0.2, paddingVertical:10, borderRadius:10, backgroundColor:'white'}}>
          <TouchableOpacity style={{flexDirection:'row', gap:15}}>
            <View style={{backgroundColor:'#d6d6d6c2', padding:10, borderRadius:30}}>
              <Foundation name='lightbulb' size={20} color='black' />
            </View>

            <View>
              <Text style={{fontFamily:'font-med', fontSize:14}}>What Works</Text>
              <Text style={{fontFamily:'font-reg', fontSize:10}}>Check out our expert dating tips</Text>
            </View>
          </TouchableOpacity>
      </View>
    </>
  )
}

export default MyAmour

const styles = StyleSheet.create({})
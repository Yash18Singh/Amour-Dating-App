import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Entypo, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';


const Safety = () => {
  return (
    <>
      <View style={{paddingHorizontal:20, borderWidth:0.2, paddingVertical:10, borderRadius:10, backgroundColor:'white'}}>
          <TouchableOpacity style={{flexDirection:'row', gap:15}}>
            <View style={{backgroundColor:'#8638c2', padding:10, borderRadius:30}}>
              <Octicons name='verified' size={20} color='white' />
            </View>

            <View>
              <Text style={{fontFamily:'font-med', fontSize:14}}>Selfie Verification</Text>
              <Text style={{fontFamily:'font-reg', fontSize:10}}>You're Verified</Text>
            </View>
          </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal:20, borderWidth:0.2, paddingVertical:10, borderRadius:10, backgroundColor:'white'}}>
          <TouchableOpacity style={{flexDirection:'row', gap:15}}>
            <View style={{backgroundColor:'#8638c2', padding:10, borderRadius:30}}>
              <Entypo name='eye-with-line' size={20} color='white' />
            </View>

            <View>
              <Text style={{fontFamily:'font-med', fontSize:14}}>Comment Filter</Text>
              <Text style={{fontFamily:'font-reg', fontSize:10}}>Hiding likes containing disrespectful language</Text>
            </View>
          </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal:20, borderWidth:0.2, paddingVertical:10, borderRadius:10, backgroundColor:'white'}}>
          <TouchableOpacity style={{flexDirection:'row', gap:15}}>
            <View style={{backgroundColor:'#d6d6d6c2', padding:10, borderRadius:30}}>
              <Ionicons name='hand-right-outline' size={20} color='black' />
            </View>

            <View>
              <Text style={{fontFamily:'font-med', fontSize:14}}>Block List</Text>
              <Text style={{fontFamily:'font-reg', fontSize:10}}>Block people you know</Text>
            </View>
          </TouchableOpacity>
      </View>

      <View style={{marginTop:20}}>
        <Text style={{fontFamily:'font-med', fontSize:18}}>Explore safety resources</Text>

        <View style={{flexDirection:'row', justifyContent:'space-between', gap:10, marginTop:10}}>
          <TouchableOpacity style={{flexDirection:'row', gap:10, backgroundColor:'white', padding:20, borderRadius:10, borderWidth:0.2, minWidth:'50%'}}>
            <Feather name='phone' size={20} color='black' />
            <Text>Crisis Hotlines</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection:'row', gap:10, backgroundColor:'white', padding:20, borderRadius:10, borderWidth:0.2, minWidth:'50%'}}>
            <AntDesign name='questioncircleo' size={20} color='black' />
            <Text>Help Centre</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default Safety

const styles = StyleSheet.create({})
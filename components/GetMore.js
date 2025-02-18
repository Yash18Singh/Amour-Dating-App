import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Entypo, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';


const GetMore = () => {
  return (
    <>
        <View style={{paddingHorizontal:20, borderWidth:0.2, paddingVertical:10, borderRadius:10, backgroundColor:'white'}}>
          <TouchableOpacity style={{flexDirection:'row', gap:15}}>
            <View style={{backgroundColor:'#007155', padding:7, borderRadius:30}}>
              <MaterialIcons name='electric-bolt' size={25} color='white' />
            </View>

            <View>
              <Text style={{fontFamily:'font-med', fontSize:14}}>Boost</Text>
              <Text style={{fontFamily:'font-reg', fontSize:10}}>Get seen by 11x more people</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{paddingHorizontal:20, borderWidth:0.2, paddingVertical:10, borderRadius:10, backgroundColor:'white'}}>
          <TouchableOpacity style={{flexDirection:'row', gap:15}}>
            <View style={{backgroundColor:'#730047', padding:7, borderRadius:30}}>
              <Ionicons name='rose-outline' size={25} color='white' />
            </View>

            <View>
              <Text style={{fontFamily:'font-med', fontSize:14}}>Roses</Text>
              <Text style={{fontFamily:'font-reg', fontSize:10}}>2x as likely to lead to a date</Text>
            </View>
          </TouchableOpacity>
        </View>
    </>
  )
}

export default GetMore

const styles = StyleSheet.create({})
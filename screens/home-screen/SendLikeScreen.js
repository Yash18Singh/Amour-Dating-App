import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Colors from '../../Colors'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'

const SendLikeScreen = () => {
    const route = useRoute();
    const [comment, setComment] = useState('');
    const navigation = useNavigation();

    const likeProfile = async () => {
      try {
          const response = await axios.post('http://192.168.1.5:6000/like-profile', {
              userId: route.params.userId,
              likedUserId: route.params.likedUserId,
              image: route.params.image,
              comment: comment,
          });
          
          //console.log('LIKED RESPONSE :', response);

          if(response.status == 200){
              navigation.goBack();
          }

      } catch (error) {
          console.log("Error sending like :", error);
      }
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:Colors.background}}>
        <View style={{paddingVertical:80, paddingHorizontal:20}}>

            <View style={{flexDirection:'column', gap:30}}>
                <Text style={{fontFamily:'font-bold', fontSize:45}}>{route?.params?.name}</Text>
                <Image style={styles.likedImage} source={{uri:route?.params?.image}} />

                <TextInput style={styles.comment} value={comment} onChangeText={(text) => setComment(text)} placeholder='Say something to them!'/>
            
                <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', backgroundColor:Colors.gold, paddingHorizontal:14, paddingVertical:10, gap:4, borderRadius:50}}>
                        <Text style={{color:'black', fontWeight:800, fontSize:16}}>3</Text>
                        <Ionicons name='rose-outline' size={22} color='black' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={likeProfile} style={{backgroundColor:Colors.primary, width:'80%', padding:10, borderRadius:50}}>
                        <Text style={{color:'white', fontFamily:'font-med', fontSize:16, textAlign:'center'}}>Send Like</Text>
                    </TouchableOpacity>
                </View>

                <View style={{width:'100%', alignItems:'center'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{width:'50%', padding:5, borderRadius:10, borderWidth:0.2}}>
                        <Text style={{textAlign:'center'}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                
            </View>

        </View>
    </SafeAreaView>
  )
}

export default SendLikeScreen

const styles = StyleSheet.create({
    likedImage:{
        width:'100%', 
        height:400, 
        resizeMode:'cover',
        borderRadius:20,
        boxShadow:'10px 10px 10px rgba(0, 0, 0, 0.68)'
    },
    comment:{
        backgroundColor:'white',
        padding:15,
        fontFamily:'font-reg',
        borderRadius:10,
        borderWidth:0.5
    }
})
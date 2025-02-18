import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const UserChat = ({item, userId}) => {
    const navigation = useNavigation();

    const openChatRoom = () => {
        navigation.navigate('ChatRoom', {
            image: item?.imageUrls[0],
            name: item?.firstName,
            receiverId: item?._id,
            senderId: userId,
        });
    }

  return (
    <>
        <TouchableOpacity onPress={openChatRoom} style={{flexDirection:'row', alignItems:'center', gap:20, marginVertical:5, backgroundColor:'white', padding:10, borderWidth:0.2, borderRadius:10}}>
            <View>
                <Image style={{width:60, height:60, borderRadius:100, borderWidth:1}} source={{uri:item.imageUrls[0]}} />
            </View>
            <View>
                <Text style={{fontSize:20, fontFamily:'font-med', marginTop:2}}>{item?.firstName}</Text>
                <Text style={{fontSize:12, fontFamily:'font-reg', marginTop:2}}>{`Start Chat with ${item.firstName}`}</Text>
            </View>
        </TouchableOpacity>
    </>
  )
}

export default UserChat

const styles = StyleSheet.create({})
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, TextInput, ScrollView, Keyboard } from 'react-native'
import React, { useLayoutEffect, useState, useRef, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo, Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../Colors';
import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { io } from 'socket.io-client';
import axios from 'axios';

const SOCKET_URL = "http://192.168.1.5:6000";

const ChatRoomScreen = () => {
    const socketRef = useRef(null);
    const navigation = useNavigation();
    const route = useRoute();
    const [currentMessage, setCurrentMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);

    useEffect(() => {
        // Prevent multiple socket connections
        if (!socketRef.current) {
            socketRef.current = io(SOCKET_URL);

            socketRef.current.on("connect", () => {
                console.log("CONNECTED TO THE SOCKET");
            });

            socketRef.current.on("receiveMessage", (newMessage) => {
                console.log("New message received:", newMessage);
                setAllMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        }

        return () => {
            socketRef.current?.disconnect();
            socketRef.current = null;
        };
    }, []);

    const sendMessage = () => {
        if (!socketRef.current) {
            console.log("Socket is not connected!");
            return;
        }

        let senderId = route?.params?.senderId;
        let receiverId = route?.params?.receiverId;

        console.log("Sending message:", senderId, receiverId, currentMessage);

        socketRef.current.emit("sendMessage", { senderId, receiverId, message: currentMessage });
        setCurrentMessage("");
    };

    const fetchMessages = async() => {
        try {
            const senderId = route?.params?.senderId;
            const receiverId = route?.params?.receiverId;

            const response = await axios.get('http://192.168.1.5:6000/messages', {
                params:{senderId, receiverId}
            });

            setAllMessages(response.data);
            
        } catch (error) {
            console.log('ERROR GETTING MESSAGES :',error)
        }
    } 

    useEffect(() => {
        fetchMessages();
        //console.log('ALL MESSAGES ', allMessages);
    }, [allMessages]);

    const formatTime = (time) => {
        const options = {hour:'numeric', minute:'numeric'};
        return new Date(time).toLocaleString('en-US', options);
    }

  return (
    <>
        <View style={{flexDirection:'row', borderBottomWidth:0.4, alignItems:'center', justifyContent:'space-between', backgroundColor:Colors.primary, paddingVertical:'2%', paddingHorizontal:20}}>
            <Pressable onPress={() => navigation.goBack()} style={{flexDirection:'row', alignItems:'center', gap:10, marginTop:40}}>
                <Ionicons name='arrow-back' size={24} color='white' />
                <View>
                    <Text style={{fontSize:20, fontFamily:'font-med', marginTop:2, color:'white'}}>
                        {route?.params?.name}
                    </Text>
                </View>
            </Pressable>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', gap:20, marginTop:40}}>
                <TouchableOpacity>
                    <Entypo name='phone' size={22} color='white' />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome5 name='video' size={22} color='white' />
                </TouchableOpacity>
                <TouchableOpacity>
                    <SimpleLineIcons name='options' size={20} color='white' />
                </TouchableOpacity>
            </View>
        </View>

        <KeyboardAvoidingView style={{flex:1, backgroundColor:Colors.background, padding:3, height:'100%'}}>
            
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                {allMessages?.map((item, index) => (
                    <Pressable style={[
                        item?.senderId == route?.params?.senderId 
                        ? 
                        {alignSelf:'flex-end', backgroundColor:Colors.pink, padding:10, minWidth:'20%', maxWidth:'60%', borderRadius:10, marginRight:10, marginTop:2, borderWidth:0.2}
                        : 
                        {alignSelf:'flex-start', backgroundColor:Colors.white, padding:10, minWidth:'20%', maxWidth:'60%', borderRadius:10, marginLeft:10, marginTop:2, borderWidth:0.2}
                    ]} key={index}>
                        <Text style={{fontFamily:'font-reg', fontSize:14}}>
                            {item?.message}
                        </Text>
                        <Text style={{fontSize:9, alignSelf:'flex-end'}}>
                            {formatTime(item?.timestamp)}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>

            <View style={{backgroundColor:'white', flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:10, height:60, borderTopWidth:0.2}}>
                <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
                    <TouchableOpacity>
                        <Entypo name='emoji-happy' size={22} color='black' />
                    </TouchableOpacity>
                    <TextInput value={currentMessage} onChangeText={(text) => setCurrentMessage(text)} style={{fontFamily:'font-reg', width:'80%', fontSize:14, borderWidth:0.3, borderRadius:30, paddingHorizontal:10}} placeholder='Send a message...'/>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', gap:5, marginLeft:-35}}>
                    <TouchableOpacity>
                        <Entypo name='camera' size={20} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name='mic' size={20} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={sendMessage} style={{height:35, width:35, backgroundColor:Colors.primary, justifyContent:'center', alignItems:'center', borderRadius:100}}>
                        <MaterialCommunityIcons name='send' size={24} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    </>

  )
}

export default ChatRoomScreen

const styles = StyleSheet.create({})
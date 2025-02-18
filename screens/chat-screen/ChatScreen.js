import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Colors from '../../Colors';
import UserChat from '../../components/UserChat';

const ChatScreen = () => {
  const [matches, setMatches] = useState([]);
  const [userId, setUserId] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    }

    fetchUser();
  }, []);

  const fetchMatches = async() => {
    try {
      const response = await axios.get(`http://192.168.1.5:6000/get-matches/${userId}`);
      setMatches(response.data.matches);

    } catch (error) {
      console.log("ERROR FETCHING MATCHES FOR CHAT :", error);
    }
  }

  useEffect(() => {
    if(userId){
      fetchMatches();
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      if(userId){
        fetchMatches();
      }
    }, [userId])
  );


  // useEffect(() => {
  //   console.log("MATCHES :", matches);
  // }, [matches]);


  return (
    <ScrollView style={{backgroundColor:Colors.background, padding:15, flex:1}}>

      <View style={{marginTop:50}}>
        <Text style={{fontSize:30, fontFamily:'font-bold'}}>Your Matches</Text>

        <View style={{marginVertical:20}}>
          {matches?.map((item, index) => (
            <UserChat key={index} userId={userId} item={item}/>
          ))}
        </View>
      </View>

    </ScrollView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})
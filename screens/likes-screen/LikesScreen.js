import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Pressable, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import Colors from '../../Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import 'core-js/stable/atob'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

const LikesScreen = () => {
  const navigation = useNavigation();
  const [option, setOption] = useState("Recent");
  const [userId, setUserId] = useState("");
  const [likes, setLikes] = useState([]);

  //fetching user id
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.userId;
      setUserId(userId);
    }

    fetchUser();
  }, []);


  //function to fetch received likes
  const fetchReceivedLikes = async() => {
    try {
      const response = await axios.get(`http://192.168.1.5:6000/received-likes/${userId}`);
      const receivedLikes = response.data.receivedLikes;

      setLikes(receivedLikes.receivedLikes);

    } catch (error) {
      console.log("ERROR RECEIVING LIKES :", error);
    }
  }

  const matchWithUser = async() => {
    navigation.navigate('HandleLike', {
      name: likes[0].userId?.firstName,
      image: likes[0].image,
      imageUrls: likes[0].userId?.imageUrls,
      prompts: likes[0].userId?.prompts,
      userId: userId,
      selectedUserId: likes[0].userId?._id,
      likes:likes?.length,
    })
  }

  //fetching likes
  useEffect(() => {
    if(userId){
      fetchReceivedLikes();
    }
  }, [userId]);


  useEffect(() => {
    console.log("RECEIVED LIKES :", likes);
  }, [likes]);

  return (
    <ScrollView style={{backgroundColor:Colors.background, padding:15, flex:1}}>

        <View style={{marginTop:50, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <Text style={{fontSize:30, fontFamily:'font-bold'}}>Likes you</Text>

          <TouchableOpacity style={{marginTop:10, flexDirection:'row', alignItems:'center', gap:5, backgroundColor:Colors.gold, padding:8, borderRadius:30}}>
            <SimpleLineIcons name='fire' size={18} color="black" /> 
            <Text style={{fontFamily:'font-reg', fontSize:12, marginTop:5}}>Boost</Text>
          </TouchableOpacity>
        </View>


        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
          <TouchableOpacity style={{width:38, height:38, borderRadius:19, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
            <Ionicons name='filter' size={20} color='black' />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderColor: option === "Recent" ? "black" : 'transparent',
              borderWidth:0.7, padding:10, borderRadius:20,
              backgroundColor: option === "Recent" ? Colors.pink : "transparent"
            }}
            onPress={() => setOption("Recent")}
          >
            <Text style={{fontFamily:'font-reg', fontSize:12}}>Recent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderColor: option === "Your Type" ? "black" : 'transparent',
              borderWidth:0.7, padding:10, borderRadius:20,
              backgroundColor: option === "Your Type" ? Colors.pink : "transparent"
            }}
            onPress={() => setOption("Your Type")}
          >
            <Text style={{fontFamily:'font-reg', fontSize:12}}>Your Type</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderColor: option === "Last Active" ? "black" : 'transparent',
              borderWidth:0.7, padding:10, borderRadius:20,
              backgroundColor: option === "Last Active" ? Colors.pink : "transparent"
            }}
            onPress={() => setOption("Last Active")}
          >
            <Text style={{fontFamily:'font-reg', fontSize:12}}>Last Active</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderColor: option === "Nearby" ? "black" : 'transparent',
              borderWidth:0.7, padding:10, borderRadius:20,
              backgroundColor: option === "Nearby" ? Colors.pink : "transparent"
            }}
            onPress={() => setOption("Nearby")}
          >
            <Text style={{fontFamily:'font-reg', fontSize:12}}>Nearby</Text>
          </TouchableOpacity>
        </View>


        <View>
          {
            likes?.length > 0 && 
            (
              <Pressable onPress={matchWithUser} style={{marginTop:40, backgroundColor:'white', padding:20, borderRadius:10, borderWidth:0.3}}>
                <View>
                  <View style={{alignItems:'flex-start', paddingHorizontal:10, paddingVertical:8, backgroundColor:Colors.highlight, borderRadius:5, marginBottom:8, width:200}}>
                    <Text style={{fontSize:16, fontFamily:'font-bold'}}>Liked your photo!</Text>
                  </View>

                  <View style={{}}>
                    <Text style={{fontSize:30, fontFamily:'font-bold'}}>{likes[0].userId?.firstName}</Text>
                    <Image style={{width:'100%', height:350, resizeMode:'cover', borderRadius:20, marginTop:10}} source={{uri:likes[0].userId.imageUrls[0]}} />
                    {/* <Text style={{marginTop:20, fontSize:20, fontFamily:'font-med'}}>{likes[0].comment}</Text>
                    
                    <TouchableOpacity   
                      onPress={matchWithUser}
                      style={styles.likeButton}
                    >
                      <Ionicons name='heart-outline' size={40} color={Colors.gold} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dislikeButton}>
                      <Entypo name='cross' size={45} color={Colors.gold} />
                    </TouchableOpacity> */}
                  </View>

                </View>
              </Pressable>
            )

          }
        </View>    

        <Text style={{fontSize:20, fontFamily:'font-med', marginTop:20}}>Up Next</Text>

        <View style={{width:'90%', flexDirection:'row', marginBottom:50, gap:20}}>
          {likes?.slice(1).map((like, index) => (
              <View style={{width:'50%'}} key={index}>
                <View>
                  <Pressable style={{marginTop:10, backgroundColor:'white', padding:10, borderRadius:10, borderWidth:0.3}}>
                    <View>
                      <View style={{alignItems:'flex-start', paddingHorizontal:10, paddingVertical:8, backgroundColor:Colors.highlight, borderRadius:5, marginBottom:8, width:'100%'}}>
                        <Text style={{fontSize:16, fontFamily:'font-bold'}}>Liked your photo!</Text>
                      </View>

                      <View>
                        <Text style={{fontSize:18, fontFamily:'font-bold'}}>{like.userId?.firstName}</Text>
                        <Image style={{width:'100%', height:200, resizeMode:'cover', borderRadius:20}} source={{uri:like.userId.imageUrls[0]}} />
                      </View>

                    </View>
                  </Pressable>
                </View>
              </View>
          ))}
        </View>

    </ScrollView>
  )
}

export default LikesScreen

const styles = StyleSheet.create({
  likeButton:{
    backgroundColor:'white', 
    position:'absolute', 
    bottom:-5, 
    right:60, 
    width:55, 
    height:55, 
    borderRadius:50, 
    justifyContent:'center', 
    alignItems:'center', 
    borderColor:'black', 
    borderWidth:3,
  },
  dislikeButton:{
    backgroundColor:'white', 
    position:'absolute', 
    bottom:-5, 
    right:-10, 
    width:55, 
    height:55, 
    borderRadius:50, 
    justifyContent:'center', 
    alignItems:'center', 
    borderColor:'black', 
    borderWidth:3,
  },
})
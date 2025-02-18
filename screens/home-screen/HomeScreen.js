import { StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Colors from '../../Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import 'core-js/stable/atob';
import axios from 'axios';
import { Entypo, Feather, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const [userId, setUserId] = useState('');
  const [profilesData, setProfilesData] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [option, setOption] = useState("Compatible");

  var uniqueKey = 1;

  const navigation = useNavigation();

  // Fetch the userId from AsyncStorage and JWT Token
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  // Log the userId whenever it changes
  useEffect(() => {
    console.log("USER ID IN HOME SCREEN", userId);
  }, [userId]);

  // Fetch profiles when userId changes
  const fetchProfiles = async () => {
    try {
      const response = await axios.get(`http://192.168.1.5:6000/profiles?userId=${userId}`);
      const profiles = response.data;
      setProfilesData(profiles);
    } catch (error) {
      console.log("Error fetching profiles in frontend:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfiles();
    }
  }, [userId]);

  // Set current profile when profiles data is available
  useEffect(() => {
    if (profilesData.length > 0) {
      setCurrentProfile(profilesData[0]);
    }
  }, [profilesData]);

  
  // Function to send "like" image
  const sendLikeImage = (imageUrl) => {
    navigation.navigate('SendLike', {
      image: imageUrl,
      name:currentProfile?.firstName,
      userId: userId,
      likedUserId: currentProfile?._id
    })
  }

  // Fetch profiles when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchProfiles();
      }
    }, [userId])
  );

  // Log current profile whenever it changes
  // useEffect(() => {
  //   console.log("CURRENT PROFILE", currentProfile);
  // }, [currentProfile]);

  // useEffect(() => {
  //   const token = AsyncStorage.removeItem('token');
  // }, []);





  return (
  <>
    <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={{paddingVertical:40, backgroundColor:Colors.background}}>
      <View style={{padding:20, flexDirection:'row', alignItems:'center', gap:10}}>

        <View style={{width:40, height:40, borderRadius:19, justifyContent:'center', alignItems:'center'}}>
          <Ionicons name='sparkles-sharp' size={35} color='black' />
        </View>

        <TouchableOpacity
          style={{
            borderColor: option === "Compatible" ? "black" : 'transparent',
            borderWidth:0.7, padding:10, borderRadius:20,
            backgroundColor: option === "Compatible" ? Colors.pink : "transparent"
          }}
          onPress={() => setOption("Compatible")}
        >
          <Text style={{fontFamily:'font-reg', fontSize:12}}>Compatible</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{
            borderColor: option === "Active Today" ? "black" : 'transparent',
            borderWidth:0.7, padding:10, borderRadius:20,
            backgroundColor: option === "Active Today" ? Colors.pink : "transparent"
          }}
          onPress={() => setOption("Active Today")}
        >
          <Text style={{fontFamily:'font-reg', fontSize:12}}>Active Today</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{
            borderColor: option === "New here" ? "black" : 'transparent',
            borderWidth:0.7, padding:10, borderRadius:20,
            backgroundColor: option === "New here" ? Colors.pink : "transparent"
          }}
          onPress={() => setOption("New here")}
        >
          <Text style={{fontFamily:'font-reg', fontSize:12}}>New here</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginHorizontal:12}}>
          <>
            <View>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>

                <View style={{flexDirection:'row', alignItems:'center', gap:10, alignItems:'center'}}>
                  <Text style={{fontFamily:'font-bold', fontSize:30}}>{currentProfile?.firstName} {currentProfile?.lastName}</Text>
                  <View style={{marginTop:6, backgroundColor:Colors.gold, paddingHorizontal:12, paddingVertical:5, alignItems:'center', borderRadius:100}}>
                    <Text style={{fontFamily:'font-reg', fontSize:10}}>New here</Text>
                  </View>
                </View>

                <TouchableOpacity>
                  <Entypo name='dots-three-horizontal' size={20} color="black" />
                </TouchableOpacity>

              </View>

              {/* image */}
              <View style={{marginVertical:15}}>
                <View>
                  {currentProfile?.imageUrls?.slice(0,1).map((img, index) => (
                        <View style={{marginTop:30}} key={uniqueKey++}>
                          <Image source={{uri: img}} style={styles.profileImg} />
                        
                          <TouchableOpacity 
                            onPress={() => sendLikeImage(img)}
                            style={styles.likeButton}
                          >
                            <Ionicons name='heart-outline' size={40} color={Colors.gold} />
                          </TouchableOpacity>
                        </View>
                    ))}
                </View>
              </View>

              {/* prompt */}
              <View style={{marginVertical:15}}>
                  <View>
                      {currentProfile?.prompts.slice(0,1).map((prompt,index) => (
                        <>
                          <View style={styles.promptStyle} key={uniqueKey++}>
                            <Text style={{fontFamily:'font-med', fontSize:15}}>
                              {prompt.question}
                            </Text>

                            <Text style={{fontFamily:'font-bold', fontSize:30}}>
                              {prompt.answer}
                            </Text>

                            <TouchableOpacity style={styles.likeButton}>
                              <Ionicons name='heart-outline' size={40} color={Colors.gold} />
                            </TouchableOpacity>
                          </View>
                        </>
                      ))}
                  </View>
                  
                  <View 
                    style={{
                      marginTop: 30, 
                      backgroundColor: 'white', 
                      padding: 10, 
                      borderRadius: 20, 
                      boxShadow: '0 0 2px black'
                    }}
                  >
                    <ScrollView  
                      horizontal={true} 
                      showsHorizontalScrollIndicator={false}
                      style={{
                        backgroundColor: 'white', 
                        padding: 5, 
                        borderRadius: 10, 
                        //boxShadow: '0 0 2px black'
                      }}
                    >
                          <View style={{flexDirection:'row', alignItems:'center', gap:15, paddingBottom:5, marginRight:20}}>
                              <View style={styles.detailsHead}>
                                  <MaterialCommunityIcons name="cake-variant-outline" size={25} color="black" />
                                  <Text style={{ fontFamily: 'font-reg', fontSize: 16, marginTop: 5 }}>
                                    {currentProfile?.age}
                                  </Text>
                              </View>

                              <View style={styles.detailsHead}>
                                <Ionicons name="person-outline" size={25} color="black" />
                                <Text style={{ fontFamily: 'font-reg', fontSize: 16, marginTop: 5 }}>
                                  {currentProfile?.gender}
                                </Text>
                              </View>

                              <View style={styles.detailsHead}>
                                <Ionicons name="magnet-outline" size={25} color="black" />
                                <Text style={{ fontFamily: 'font-reg', fontSize: 16, marginTop: 5 }}>
                                  {currentProfile?.type}
                                </Text>
                              </View>

                              <View style={styles.detailsHead}>
                                <Octicons name="home" size={25} color="black" />
                                <Text style={{ fontFamily: 'font-reg', fontSize: 16, marginTop: 5 }}>
                                  {currentProfile?.location}
                                </Text>
                              </View>
                          </View>
        
                    </ScrollView>

                    <View style={styles.detailsBody}>
                      <MaterialIcons name="work" size={30} color="black" />
                      <Text style={{ fontFamily: 'font-reg', fontSize: 16, marginTop: 5 }}>
                        Research Analyst
                      </Text>
                    </View>

                    <View style={styles.detailsBody}>
                      <SimpleLineIcons name="graduation" size={30} color="black" />
                      <Text style={{ fontFamily: 'font-reg', fontSize: 16, marginTop: 5 }}>
                        University of Delhi
                      </Text>
                    </View>

                    <View style={styles.detailsBody}>
                      <Ionicons name="book-outline" size={30} color="black" />
                      <Text style={{ fontFamily: 'font-reg', fontSize: 16, marginTop: 5 }}>
                        Hindu
                      </Text>
                    </View>

                    <View style={styles.detailsBody}>
                      <Feather name="search" size={30} color="black" />
                      {currentProfile?.datingPreferences?.map((looking, index) => (
                        <Text style={{ fontFamily: 'font-reg', fontSize: 16, marginTop: 5 }}>
                          {looking},
                        </Text>
                      ))}
                    </View>

                    <View style={styles.detailsBody}>
                      <MaterialIcons name="people-outline" size={30} color="black" />
                      <Text style={{ fontFamily: 'font-reg', fontSize: 16, marginTop: 5 }}>
                        Monogamy
                      </Text>
                    </View>
                  </View>
               </View>

               <View>
                  {currentProfile?.imageUrls?.slice(1,3).map((img, index) => (
                      <View style={{marginTop:30}} key={uniqueKey++}>
                        <Image source={{uri: img}} style={styles.profileImg} />
                      
                        <TouchableOpacity 
                          onPress={() => sendLikeImage(img)}
                          style={styles.likeButton}
                        >
                          <Ionicons name='heart-outline' size={40} color={Colors.gold} />
                        </TouchableOpacity>
                      </View>
                  ))}
               </View>
              
               
               <View>
                  {currentProfile?.prompts.slice(1,2).map((prompt,index) => (
                        <>
                          <View style={[styles.promptStyle, { marginTop: 30 }]} key={uniqueKey++}>
                            <Text style={{fontFamily:'font-med', fontSize:15}}>
                              {prompt.question}
                            </Text>

                            <Text style={{fontFamily:'font-bold', fontSize:30}}>
                              {prompt.answer}
                            </Text>

                            <TouchableOpacity style={styles.likeButton}>
                              <Ionicons name='heart-outline' size={40} color={Colors.gold} />
                            </TouchableOpacity>
                          </View>
                        </>
                    ))}
                </View>


                <View>
                  {currentProfile?.imageUrls?.slice(3,5).map((img, index) => (
                      <View style={{marginTop:30}} key={uniqueKey++}>
                        <Image source={{uri: img}} style={styles.profileImg} />
                      
                        <TouchableOpacity 
                          onPress={() => sendLikeImage(img)}
                          style={styles.likeButton}
                        >
                          <Ionicons name='heart-outline' size={40} color={Colors.gold} />
                        </TouchableOpacity>
                      </View>
                  ))}
               </View>
               
               <View>
                  {currentProfile?.prompts.slice(2,3).map((prompt,index) => (
                        <>
                          <View style={[styles.promptStyle, { marginTop: 30 }]} key={uniqueKey++}>
                            <Text style={{fontFamily:'font-med', fontSize:15}}>
                              {prompt.question}
                            </Text>

                            <Text style={{fontFamily:'font-bold', fontSize:30}}>
                              {prompt.answer}
                            </Text>

                            <TouchableOpacity style={styles.likeButton}>
                              <Ionicons name='heart-outline' size={40} color={Colors.gold} />
                            </TouchableOpacity>
                          </View>
                        </>
                    ))}
                </View>


                <View>
                  {currentProfile?.imageUrls?.slice(5,6).map((img, index) => (
                      <View style={{marginTop:30}} key={uniqueKey++}>
                        <Image source={{uri: img}} style={styles.profileImg} />
                      
                        <TouchableOpacity 
                          onPress={() => sendLikeImage(img)}
                          style={styles.likeButton}
                        >
                          <Ionicons name='heart-outline' size={40} color={Colors.gold} />
                        </TouchableOpacity>
                      </View>
                  ))}
               </View>

               <View style={{marginBottom:80}}></View>
            </View>
          </>
      </View>
    </ScrollView>

    <TouchableOpacity style={styles.dislikeButton}>
       <Entypo name='cross' size={45} color={Colors.gold} />
    </TouchableOpacity>
  </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  likeButton:{
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
  dislikeButton:{
    backgroundColor:'white', 
    position:'absolute', 
    bottom:30, 
    left:10, 
    width:60, 
    height:60, 
    borderRadius:50, 
    justifyContent:'center', 
    alignItems:'center', 
    borderColor:'black', 
    borderWidth:3,
  },
  profileImg:{
    width:'100%', 
    height:350, 
    resizeMode:'cover', 
    borderRadius:20,
    boxShadow:'0 0 10px black'
  },
  promptStyle:{
    backgroundColor:'white',
    padding:20,
    borderRadius:20,
    height:150,
    justifyContent:'center',
    boxShadow:'0 0 5px black'
  },
  detailsHead:{
    flexDirection:'row', 
    alignItems:'center', 
    gap:10, 
    padding:8,
    borderRadius:5,
    boxShadow:'2px 2px 5px rgba(0, 0, 0, 0.46)'
  },
  detailsBody:{
    flexDirection:'row',
    alignItems:'center',
    gap:12,
    marginTop:12,
    borderTopWidth:1,
    paddingHorizontal:12,
    paddingVertical:8,
  }
})
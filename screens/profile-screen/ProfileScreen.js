import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, {useState, useEffect, useContext, useCallback} from 'react'
import Colors from '../../Colors'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { AuthContext } from '../../AuthContext';
import GetMore from '../../components/GetMore';
import Safety from '../../components/Safety';
import MyAmour from '../../components/MyAmour';


const ProfileScreen = () => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [option, setOption] = useState('Get more');
  const {setToken} = useContext(AuthContext);
  
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error("Token not found");
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUser();
  }, []);

  
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://192.168.1.5:6000/users/${userId}`);
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); 
      setToken(null); 
      // navigation.reset({
      //   routes: [{ name: "Login" }], 
      // });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };


  const profileDetailsScreen = () => {
    navigation.navigate('ProfileDetails', {
      userId: userId,
      userData: userData
    })
  }


  useFocusEffect(
    useCallback(() => {
      if(userId){
        fetchUserDetails();
      }
    }, [])
  )



  return (
    <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={{paddingVertical:40, backgroundColor:Colors.background}}> 
      
      <View style={{padding:15, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <Text style={{fontFamily:'font-bold', color:Colors.primary, fontSize:30}}>AMOUR</Text>
        <View style={{flexDirection:'row', gap:10}}>
          <TouchableOpacity>
            <Ionicons name='options' size={22} color='black' />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name='setting' size={22} color='black' />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Entypo name='log-out' size={22} color='black' />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex:1, width:'100%'}}>
        <TouchableOpacity onPress={profileDetailsScreen} style={{justifyContent:'center', alignItems:'center'}}>
          <Image style={{height:120, width:120, borderRadius:100, borderWidth:5, borderColor:Colors.primary}} source={{uri:userData?.imageUrls[0]}} />
          <Pressable style={{padding:5, backgroundColor:'white', position:'absolute', top:18, right:'36%', borderRadius:100, borderWidth:0.3}}>
            <Octicons name='pencil' size={12} color='black'/>
          </Pressable>
        </TouchableOpacity>

        <View style={{marginTop:2, flexDirection:'row', gap:5, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontFamily:'font-med', fontSize:20, marginTop:2}}>
            {userData?.firstName}
          </Text>
          <MaterialIcons name='verified' size={25} color={Colors.primary} />
        </View>
      </View>


      <View style={{marginTop:30}}>

          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:30, borderBottomWidth:0.2}}>
            <TouchableOpacity onPress={() => setOption("Get more")} style={{borderBottomWidth:option==="Get more" ? 2 : 0, padding:10}}>
              <Text style={{fontFamily:'font-reg', fontSize:12, color:option === "Get more" ? 'black' : Colors.text}}>Get more</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setOption("Safety")} style={{borderBottomWidth:option==="Safety" ? 2 : 0, padding:10}}>
              <Text style={{fontFamily:'font-reg', fontSize:12, color:option === "Safety" ? 'black' : Colors.text}}>Safety</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setOption("My Amour")} style={{borderBottomWidth:option==="My Amour" ? 2 : 0, padding:10}}>
              <Text style={{fontFamily:'font-reg', fontSize:12, color:option === "My Amour" ? 'black' : Colors.text}}>My Amour</Text>
            </TouchableOpacity>
          </View>

          <View style={{padding:30, gap:15}}>
            {
              option === "Get more" &&
              <GetMore />
            }
            {
              option === "Safety" &&
              <Safety/>
            }
            {
              option === "My Amour" && 
              <MyAmour/>
            }
          </View>

      </View>

    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})
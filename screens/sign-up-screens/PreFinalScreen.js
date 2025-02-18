import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import Colors from '../../Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import { AuthContext } from '../../AuthContext'
import { getAllRegistrationProgress, getRegistrationProgress, clearAllScreenData } from '../../registrationUtils'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const PreFinalScreen = () => {
  const [userData, setUserData] = useState();
  const {token, setToken} = useContext(AuthContext);
  const [invalid, setInvalid] = useState(false);

  const navigation = useNavigation();

  
  useEffect(() => {
    const getAllData = async() => {
      const allData = await getAllRegistrationProgress();
      setUserData(allData);
      //console.log('ALL USER DATA :', allData);
    }
    getAllData();
  }, []);

  // useEffect(() => {
  //   if(userData){
  //     console.log("USER Data : ", userData);
  //     console.log("EMAIL :", userData.Email.email);
  //     console.log("DOB :", userData.DOB.dob);
  //     console.log("AGE :", userData.DOB.age);
  //     console.log("DATING PREFERENCES :", userData.DatingPreferences.datingPreferences);
  //     console.log("GENDER :", userData.Gender.gender);
  //     console.log("COORDINATES :", userData.Location.coordinates);
  //     console.log("LOCATION :", userData.Location.location);
  //     console.log("NAME :", userData.Name.firstName, "", userData.Name.lastName);
  //     console.log("PASSWORD :", userData.Password.password);
  //     console.log("PROMPTS :", userData.Prompts.prompts);
  //     console.log("TYPE :", userData.Type.type);
  //     console.log("LOOKING FOR :", userData.LookingFor.lookingFor);
  //     console.log("IMAGE URLs :", userData.Photos.imageUrls);
  //   }
  // }, [userData]);


  const registerUser = async () => {
    if (userData) {
      try {
        // Step 1: Sending basic-info
        const basicInfo = {
          firstName: userData.Name.firstName,
          lastName: userData.Name.lastName,
          email: userData.Email.email,
          password: userData.Password.password,
          dateOfBirth: userData.DOB.dob,
          gender: userData.Gender.gender,
          age: userData.DOB.age,
          step: 'basic-info'
        };
        const basicInfoResponse = await axios.post('http://192.168.1.5:6000/register', basicInfo);
        console.log("Basic Info Sent:", basicInfoResponse.data);
    
        // Get the userId from the response to use in subsequent requests
        const userId = basicInfoResponse.data.userId;
    
        // Step 2: Sending preferences
        const preferences = {
          userId, // Using the userId returned from previous step
          datingPreferences: userData.DatingPreferences.datingPreferences,
          type: userData.Type.type,
          lookingFor: userData.LookingFor.lookingFor,
          step: 'preferences'
        };
        const preferencesResponse = await axios.post('http://192.168.1.5:6000/register', preferences);
        console.log("Preferences Sent:", preferencesResponse.data);
    
        // Step 3: Sending location details
        const locationDetails = {
          userId, // Passing the userId
          location: userData.Location.location,
          coordinates: userData.Location.coordinates,
          step: 'location'
        };
        const locationResponse = await axios.post('http://192.168.1.5:6000/register', locationDetails);
        console.log("Location Details Sent:", locationResponse.data);
    
        // Step 4: Sending additional details
        const additionalDetails = {
          userId, // Passing the userId
          prompts: userData.Prompts.prompts,
          imageUrls: userData.Photos.imageUrls,
          step: 'details'
        };
        const additionalDetailsResponse = await axios.post('http://192.168.1.5:6000/register', additionalDetails);
        console.log("Additional Details Sent:", additionalDetailsResponse.data);
    
        // Extract the token from the response
        const token = additionalDetailsResponse.data.token;
        if (token) {
          // Store the token in AsyncStorage
          await AsyncStorage.setItem('token', token);
          setToken(token);  // Update state with the token
          console.log("Token saved successfully.");
        } else {
          console.error("No token received from the server.");
        }
    
        console.log("User registered successfully");
      } catch (error) {
        if (error.response) {
          console.error("Server Error:", error.response.data);
        } else if (error.request) {
          console.error("Request Error:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      }
    }
  };
  

  useEffect(() => {
    if(token){
      navigation.replace("MainStack", {screen:"Main"});
    }
  }, [token]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{marginTop:100, padding:10}}>
        <Text style={{fontFamily:'font-bold', fontSize:35, color:Colors.primary}}>Your profile is all set</Text>
        <Text style={{marginTop:10, fontFamily:'font-bold', fontSize:20, color:Colors.text}}>Happy Dating! 😊</Text>
      </View>

      <View>
        <LottieView 
          autoPlay 
          loop 
          style={{width:600, height:500, alignSelf:'center'}}
          speed={0.7}
          source={require("../../assets/data/login.json")} 
        />
      </View>

      {
        invalid && 
        <Text style={{ marginTop: 15, fontFamily: "font-med", color: "red", textAlign:'center'}}>
          OOPS! NOT ABLE TO REGISTER. PLEASE TRY AGAIN!
        </Text>
      }

      <Pressable 
        style={{backgroundColor:Colors.primary, padding:15, margiTop:'auto', alignItems:'center', position:'absolute', bottom:0, width:'100%', height:80}}
        onPress={registerUser}  
      >
        <Text style={{color:Colors.white, fontFamily:'font-med', fontSize:20}}>Let's start</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default PreFinalScreen

const styles = StyleSheet.create({})
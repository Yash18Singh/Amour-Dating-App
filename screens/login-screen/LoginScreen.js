import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, Pressable, TouchableOpacity, TextInput } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import Colors from '../../Colors'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../AuthContext'

const LoginScreen = () => {
  const [option, setOption] = useState("Create Account");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {token, setToken} = useContext(AuthContext);

  useEffect(() => {
    if(token){
      navigation.replace('MainStack', {screen:"Main"});
    }
  }, [token, navigation])

  const navigation = useNavigation();

  const signInUser = async () => {
    if(option !== "Sign In"){
      setOption("Sign In");
    }
    else{
      try {
        const user = {
          email: email,
          password: password,
        }

        const response = await axios.post('http://192.168.1.5:6000/login', user);
        console.log(response);

        const token = response.data.token;

        await AsyncStorage.setItem('token', token);

        setToken(token);

      } catch (error) {
        console.log("ERROR LOGGING IN : ", error);
      }
    }
  }

  const signUpUser = async () => {
    if(option !== "Create Account"){
      setOption("Create Account");

      setTimeout(()=>{
        navigation.navigate('Basic');
      },1000)
    }
    else{
      navigation.navigate('Basic');
    }
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:Colors.background}}>
      <View style={{padding:20, backgroundColor:Colors.pink, width:'100%', borderBottomLeftRadius:100, borderBottomRightRadius:100, boxShadow:`0px 30px 80px ${Colors.pink}`}}>
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <Image 
            style={{width:200, height:150, resizeMode:'contain'}}
            source={require('../../assets/images/login-hearts.png')}
          />
        </View>
      </View>


      <KeyboardAvoidingView>
        <View style={{alignItems:'center'}}>
          <Text style={{marginTop:30, textAlign:'center', fontFamily:'font-bold', fontSize:50, color:Colors.primary}}>
            AMOUR
          </Text>
          <Text style={{fontFamily:'font-med', fontSize:20, color:Colors.black}}>
              Where love finds you.
          </Text>
        </View>

        <View style={{marginTop:20}}>
            {option == 'Sign In' ? 
              (
                <View style={{paddingVertical:10, paddingHorizontal:20}}>

                  <View style={styles.mainInput}>
                    <MaterialIcons style={{marginTop:5}} name='email' size={30} color='black' />
                    <TextInput 
                      value={email} 
                      onChangeText={(text)=>setEmail(text)} 
                      placeholder='Enter your Email...'
                      placeholderTextColor={'black'}
                      style={{width:'90%', fontSize:16, fontFamily:'font-reg', marginTop:10, paddingBottom:10, color:'black'}}
                    />
                  </View>

                  <View style={styles.mainInput}>
                    <AntDesign name='lock' size={30} color='black' />
                    <TextInput 
                      secureTextEntry={true}
                      value={password} 
                      onChangeText={(text)=>setPassword(text)} 
                      placeholder='Enter your Password...'
                      placeholderTextColor={'black'}
                      style={{width:'90%', fontSize:16, fontFamily:'font-reg', marginTop:10, paddingBottom:10, color:'black'}}
                    />
                  </View>

                  <View style={{marginTop:20, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                      <Text>Keep me logged in</Text>
                      <Text>Forgot Password</Text>
                  </View>

                </View>
              )
              :
              (
                <>
                  <LottieView 
                    autoPlay 
                    loop 
                    style={{width:600, height:300, alignSelf:'center'}}
                    speed={0.7}
                    source={require("../../assets/data/login.json")} 
                  />
                </>
              )
            }
        </View>


        <TouchableOpacity onPress={signUpUser} style={{marginTop:20, width:300, backgroundColor:option=="Create Account" ? Colors.primary : "transparent", borderRadius:6, marginLeft:'auto', marginRight:'auto', padding:15, borderRadius:30}}>
          <Text style={{textAlign:'center', color:option==="Create Account" ? 'white' : 'black', fontFamily:'font-med', fontSize:16}}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={signInUser} style={{marginTop:10, width:300, backgroundColor:option=="Sign In" ? Colors.primary : "transparent", borderRadius:6, marginLeft:'auto', marginRight:'auto', padding:15, borderRadius:30}}>
          <Text style={{textAlign:'center', color:option==="Sign In" ? 'white' : 'black', fontFamily:'font-med', fontSize:16}}>Sign In</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  mainInput:{
    paddingHorizontal:20,
    paddingVertical:2,
    flexDirection:'row', 
    width:'100%', 
    alignItems:'center', 
    gap:5, 
    borderRadius:5, 
    marginTop:30, 
    justifyContent:'space-between',
    borderRightWidth:0.6,
    borderBottomWidth:0.4,
    borderLeftWidth:0.2,
    borderRadius:30,
    color:'black'
  }
})
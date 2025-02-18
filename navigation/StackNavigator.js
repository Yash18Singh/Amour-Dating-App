import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../Colors'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';

import HomeScreen from '../screens/home-screen/HomeScreen';
import LikesScreen from '../screens/likes-screen/LikesScreen';
import ChatScreen from '../screens/chat-screen/ChatScreen';
import ProfileScreen from '../screens/profile-screen/ProfileScreen';

import BasicInfo from '../screens/sign-up-screens/BasicInfo';
import NameScreen from '../screens/sign-up-screens/NameScreen';
import EmailScreen from '../screens/sign-up-screens/EmailScreen';
import PasswordScreen from '../screens/sign-up-screens/PasswordScreen';
import BirthScreen from '../screens/sign-up-screens/BirthScreen';
import LocationScreen from '../screens/sign-up-screens/LocationScreen';
import GenderScreen from '../screens/sign-up-screens/GenderScreen';
import TypeScreen from '../screens/sign-up-screens/TypeScreen';
import DatingType from '../screens/sign-up-screens/DatingType';
import LookingFor from '../screens/sign-up-screens/LookingFor';
import HomeTownScreen from '../screens/sign-up-screens/HomeTownScreen';
import PhotoScreen from '../screens/sign-up-screens/PhotoScreen';
import PromptsScreen from '../screens/sign-up-screens/PromptsScreen';
import ShowPromptsScreen from '../screens/sign-up-screens/ShowPromptsScreen';
import PreFinalScreen from '../screens/sign-up-screens/PreFinalScreen';
import SendLikeScreen from '../screens/home-screen/SendLikeScreen';

import LoginScreen from '../screens/login-screen/LoginScreen';
import HandleLikeScreen from '../screens/likes-screen/HandleLikeScreen';
import ChatRoomScreen from '../screens/chat-screen/ChatRoomScreen';
import ProfileDetailsScreen from '../screens/profile-screen/ProfileDetailsScreen';


const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    const {token, setToken, isLoading} = useContext(AuthContext);

    const AuthStack = () => {
        return(
            <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Basic' component={BasicInfo} options={{headerShown:false}}/>
                <Stack.Screen name='Name' component={NameScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Email' component={EmailScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Password' component={PasswordScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Birth' component={BirthScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Location' component={LocationScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Gender' component={GenderScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Type' component={TypeScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Dating' component={DatingType} options={{headerShown:false}}/>
                <Stack.Screen name='LookingFor' component={LookingFor} options={{headerShown:false}}/>
                <Stack.Screen name='Photos' component={PhotoScreen} options={{headerShown:false}}/>
                <Stack.Screen name='Prompts' component={PromptsScreen} options={{headerShown:false}}/>
                <Stack.Screen name='ShowPrompts' component={ShowPromptsScreen} options={{headerShown:false}}/>
                <Stack.Screen name='PreFinal' component={PreFinalScreen} options={{headerShown:false}}/>
            </Stack.Navigator>
        )
    }

    function BottomTabs() {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: { backgroundColor: Colors.black, height:'6%'},
                    headerShown: false,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <MaterialCommunityIcons
                                name={focused ? "account-search" : "account-search-outline"}
                                size={30}
                                color={Colors.primary}
                            />
                        ),
                        tabBarLabel: () => null, // Hides the label
                    }}
                />
    
                <Tab.Screen
                    name="Likes"
                    component={LikesScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <AntDesign
                                name={focused ? "heart" : "hearto"}
                                size={30}
                                color={Colors.primary}
                            />
                        ),
                        tabBarLabel: () => null, // Hides the label
                    }}
                />
    
                <Tab.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <MaterialCommunityIcons
                                name={focused ? "message" : "message-outline"}
                                size={30}
                                color={Colors.primary}
                            />
                        ),
                        tabBarLabel: () => null, // Hides the label
                    }}
                />
    
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name={focused ? "person-circle" : "person-circle-outline"}
                                size={30}
                                color={Colors.primary}
                            />
                        ),
                        tabBarLabel: () => null, // Hides the label
                    }}
                />
            </Tab.Navigator>
        );
    }


    function MainStack(){
        return(
            <Stack.Navigator>
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}}/>
                <Stack.Screen name="SendLike" component={SendLikeScreen} options={{headerShown:false}}/>
                <Stack.Screen name="HandleLike" component={HandleLikeScreen} options={{headerShown:false}}/>
                <Stack.Screen name="ChatRoom" component={ChatRoomScreen} options={{headerShown:false}}/>
                <Stack.Screen name='ProfileDetails' component={ProfileDetailsScreen} options={{headerShown:false}} />
            </Stack.Navigator>
        )
    }

  return (
    <NavigationContainer>
        {
            token === null || token === '' ? <AuthStack />
            : <MainStack />
        }
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})
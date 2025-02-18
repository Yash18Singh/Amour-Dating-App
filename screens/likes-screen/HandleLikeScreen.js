import { StyleSheet, Text, View, ScrollView, Image, Pressable, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Colors from '../../Colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import axios from 'axios'

const HandleLikeScreen = () => {
    const route = useRoute();

    const navigation = useNavigation();

    const createMatch = async() => {
        try {
            const currentUserId = route?.params?.userId
            const selectedUserId = route?.params?.selectedUserId

            const response = await axios.post('http://192.168.1.5:6000/create-match', {
                currentUserId, selectedUserId
            });

            if(response.status == 200){
                navigation.goBack();
            } else{
                console.log("Error Creating Match");
            }

        } catch (error) {
            console.log("ERROR CREATING MATCH :", error);
        }
    }

    const matchWithUser = () => {
        Alert.alert("Accept Request?", `Match with ${route?.params?.name}`, [
            {
                text:"Cancel",
                onPress: () => console.log('Cancel Pressed'),
                style:'cancel',
            },
            {
                text: 'OK',
                onPress: createMatch
            }
        ]);
    }

  return (
    <>
        <ScrollView style={{flex:1, backgroundColor:Colors.background, padding:20}}>
            <View style={{marginTop:50, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{fontSize:15, fontFamily:'font-reg'}}>
                        All {route?.params?.likes}
                    </Text>
                </Pressable>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{fontSize:15, fontFamily:'font-reg'}}>
                        Back
                    </Text>
                </Pressable>
            </View>

            <View style={{marginVertical:12}}>
                <Image style={{width:'100%', height:200, borderRadius:10, resizeMode:'cover'}} source={{uri:route?.params?.image}} />
                
                <View style={{position:'absolute', bottom:-20, alignItems:'flex-start', paddingHorizontal:10, paddingVertical:8, backgroundColor:Colors.highlight, borderRadius:5, marginBottom:8, width:200}}>
                    <Text style={{fontSize:16, fontFamily:'font-bold'}}>Liked your photo!</Text>
                </View>
            </View>

            <View style={{marginVertical: 25}}>
                <View
                    style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    }}>
                    <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                    }}>
                    <Text style={{fontSize: 22, fontFamily:'font-bold'}}>
                        {route?.params?.name}
                    </Text>
                    <View
                        style={{
                        backgroundColor:Colors.gold,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 20,
                        }}>
                        <Text style={{textAlign: 'center', color: 'black'}}>
                            New Here
                        </Text>
                    </View>
                    </View>
                    <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 15,
                    }}>
                    <Entypo name="dots-three-horizontal" size={22} color="black" />
                    </View>
                </View>

                <View style={{marginVertical: 15}}>
                    <View>
                    {route?.params?.imageUrls?.length > 0 && (
                        <View>
                        <Image
                            style={{
                            width: '100%',
                            height: 350,
                            resizeMode: 'cover',
                            borderRadius: 10,
                            }}
                            source={{
                            uri: route?.params?.imageUrls[0],
                            }}
                        />
                        <Pressable
                            style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            backgroundColor: 'white',
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}>
                            <AntDesign name="hearto" size={25} color="#C5B358" />
                        </Pressable>
                        </View>
                    )}
                    </View>

                    <View style={{marginVertical: 15}}>
                    {route?.params?.prompts.slice(0, 1).map(prompt => (
                        <>
                        <View
                            key={prompt.id}
                            style={{
                            backgroundColor: 'white',
                            padding: 12,
                            borderRadius: 10,
                            height: 150,
                            justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: 15, fontWeight: '500'}}>
                            {prompt.question}
                            </Text>
                            <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '600',
                                marginTop: 20,
                            }}>
                            {prompt.answer}
                            </Text>
                        </View>
                        <View
                            style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            backgroundColor: 'white',
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            // Shadow properties for Android
                            elevation: 5,
                            }}>
                            <AntDesign name="hearto" size={25} color="#C5B358" />
                        </View>
                        </>
                    ))}
                    </View>

                    {/* profile details to come here */}

                    <View>
                    {route?.params?.imageUrls?.slice(1, 3).map((item, index) => (
                        <View key={index} style={{marginVertical: 10}}>
                        <Image
                            style={{
                            width: '100%',
                            height: 350,
                            resizeMode: 'cover',
                            borderRadius: 10,
                            }}
                            source={{
                            uri: item,
                            }}
                        />

                        <View
                            style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            backgroundColor: 'white',
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}>
                            <AntDesign name="hearto" size={25} color="#C5B358" />
                        </View>
                        </View>
                    ))}
                    </View>

                    <View style={{marginVertical: 15}}>
                    {route?.params?.prompts.slice(1, 2).map(prompt => (
                        <>
                        <View
                            key={prompt.id}
                            style={{
                            backgroundColor: 'white',
                            padding: 12,
                            borderRadius: 10,
                            height: 150,
                            justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: 15, fontWeight: '500'}}>
                            {prompt.question}
                            </Text>
                            <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '600',
                                marginTop: 20,
                            }}>
                            {prompt.answer}
                            </Text>
                        </View>
                        <View
                            style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            backgroundColor: 'white',
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            // Shadow properties for Android
                            elevation: 5,
                            }}>
                            <AntDesign name="hearto" size={25} color="#C5B358" />
                        </View>
                        </>
                    ))}
                    </View>

                    <View>
                    {route?.params?.imageUrls?.slice(3, 4).map((item, index) => (
                        <View key={index} style={{marginVertical: 10}}>
                        <Image
                            style={{
                            width: '100%',
                            height: 350,
                            resizeMode: 'cover',
                            borderRadius: 10,
                            }}
                            source={{
                            uri: item,
                            }}
                        />
                        <View
                            style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            backgroundColor: 'white',
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}>
                            <AntDesign name="hearto" size={25} color="#C5B358" />
                        </View>
                        </View>
                    ))}
                    </View>
                    <View style={{marginVertical: 15}}>
                    {route?.params?.prompts.slice(2, 3).map(prompt => (
                        <>
                        <View
                            key={prompt.id}
                            style={{
                            backgroundColor: 'white',
                            padding: 12,
                            borderRadius: 10,
                            height: 150,
                            justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: 15, fontWeight: '500'}}>
                            {prompt.question}
                            </Text>
                            <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '600',
                                marginTop: 20,
                            }}>
                            {prompt.answer}
                            </Text>
                        </View>
                        <View
                            style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            backgroundColor: 'white',
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            // Shadow properties for Android
                            elevation: 5,
                            }}>
                            <AntDesign name="hearto" size={25} color="#C5B358" />
                        </View>
                        </>
                    ))}
                    </View>

                    <View>
                    {route?.params?.imageUrls?.slice(4, 7).map((item, index) => (
                        <View key={index} style={{marginVertical: 10}}>
                        <Image
                            style={{
                            width: '100%',
                            height: 350,
                            resizeMode: 'cover',
                            borderRadius: 10,
                            }}
                            source={{
                            uri: item,
                            }}
                        />
                        <View
                            style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            backgroundColor: 'white',
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            justifyContent: 'center',
                            alignItems: 'center',
                            }}>
                            <AntDesign name="hearto" size={25} color="#C5B358" />
                        </View>
                        </View>
                    ))}
                    </View>
                </View>

                {/* <View
                    style={{
                        position:"absolute",
                        bottom: 10,
                        left: 10,
                        backgroundColor: 'white',
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Entypo name="cross" size={25} color="#C5B358" />
                    </View> */}
            </View>
        </ScrollView>

        <TouchableOpacity onPress={matchWithUser} style={{position:'absolute', bottom:45, right:12, backgroundColor:'white', width:50, height:50, borderRadius:25, justifyContent:'center', alignItems:'center', borderWidth:0.3}}>
            <MaterialCommunityIcons name='message-outline' size={35} color={Colors.gold} />
        </TouchableOpacity>
    </>

  )
}

export default HandleLikeScreen

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity, Image, TextInput, Modal, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo, Feather, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons'
import Colors from '../../Colors';
import axios from 'axios'


const ProfileDetailsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    
    const [userData, setUserData] = useState({
        userId: route?.params?.userId,
        firstName: route?.params?.userData?.firstName || '', // Provide default empty values if undefined
        email: route?.params?.userData?.email || '',
        dateOfBirth: route?.params?.userData?.dateOfBirth || '',
        location: route?.params?.userData?.location || '',
        lookingFor: route?.params?.userData?.lookingFor || '',
        type: route?.params?.userData?.type || '',
        imageUrls: route?.params?.userData?.imageUrls || [], // Default to empty array if undefined
        prompts: route?.params?.userData?.prompts || [], // Default to empty array if undefined
    });

    const [isEditing, setIsEditing] = useState({
        firstName: false,
        email: false,
        dateOfBirth: false,
        location: false,
        lookingFor: false,
        type: false,
        imageUrls: Array.isArray(userData?.imageUrls) ? Array(userData?.imageUrls.length).fill(false) : [],
        prompts: Array.isArray(userData?.prompts) ? Array(userData?.prompts.length).fill(false) : [],
    });

    const [editedUrls, setEditedUrls] = useState([...userData.imageUrls]);

    const lookingForOptions = [
        "Short-term relationship",
        "Long-term relationship",
        "Life partner",
        "Just to chat"
    ];

    const typeOptions = [
        "Straight",
        "Gay",
        "Lesbian",
        "Non-Binary"
    ];

    useEffect(() => {
        console.log("USER DATA :", userData);
    }, [userData]);


    // Function to toggle editing mode
    const handleEditToggle = (index) => {
        setIsEditing((prevState) => ({
            ...prevState,
            imageUrls: prevState.imageUrls.map((val, i) =>
                i === index ? !val : val // Toggle the specific index's editing state
            ),
        }));
    };

    // Function to handle changes in the image URL
    const handleImageUrlChange = (text, index) => {
        const updatedUrls = [...editedUrls];
        updatedUrls[index] = text;
        setEditedUrls(updatedUrls); // Update editedUrls state
    };

    // Function to handle saving the image URL
    const handleSaveUrl = (index) => {
        const updatedImageUrls = [...userData.imageUrls];
        updatedImageUrls[index] = editedUrls[index]; // Update the main userData state
        setUserData((prevState) => ({
            ...prevState,
            imageUrls: updatedImageUrls,
        }));

        handleEditToggle(index); // Toggle the edit mode off after saving
    };



    const [editedAnswer, setEditedAnswer] = useState(''); // For prompt editing

    const handlePromptEditToggle = (index, currentAnswer) => {
        setIsEditing(prevState => {
            const newState = { ...prevState };
            newState.prompts[index] = !newState.prompts[index]; // Toggle edit mode for the prompt
            return newState;
        });
        setEditedAnswer(currentAnswer); // Set the current answer as the initial value for editing
    };

    const handlePromptAnswerChange = (text) => {
        setEditedAnswer(text);
    };

    const handleSavePromptAnswer = (index) => {
        // Create a new copy of the prompts array
        const updatedPrompts = [...userData.prompts];
    
        // Create a new object for the prompt at the specified index
        updatedPrompts[index] = {
            ...updatedPrompts[index], // Copy the existing properties
            answer: editedAnswer, // Update only the 'answer' field
        };
    
        // Set the new state with the updated prompts array
        setUserData({
            ...userData,
            prompts: updatedPrompts,
        });
    
        // Exit edit mode
        setIsEditing((prevState) => {
            const newState = { ...prevState };
            newState.prompts[index] = false; // Set this prompt to non-edit mode
            return newState;
        });
    };
    
    
    const updateUserData = async () => {
        const updatedData = {
          firstName: userData.firstName,
          email: userData.email,
          dateOfBirth: userData.dateOfBirth,
          location: userData.location,
          lookingFor: userData.lookingFor,
          type: userData.type,
          imageUrls: userData.imageUrls,
          prompts: userData.prompts,
        };
      
        try {
          const response = await axios.put(`http://192.168.1.5:6000/update-user/${userData.userId}`, updatedData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            // Handle the successful update, e.g., update UI or show a message
            console.log('User updated successfully', response.data);
            navigation.navigate('Main', {
                screen: 'Profile',  // Navigate to the 'Profile' screen in the 'Main' stack
                params: {
                  updatedData: updatedData,  // Pass the updated data to Profile screen
                },
            });
          } else {
            console.error('Error updating user', response);
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };

  return (
    <>
        <View style={{paddingVertical:20, backgroundColor:Colors.background}}></View>
        
        <View style={{paddingVertical:10, backgroundColor:Colors.background, paddingHorizontal:20, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', alignItems:'center', gap:20}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back-circle' size={30} color='black' />
                </TouchableOpacity>
                <Text style={{fontFamily:'font-bold', fontSize:30, marginBottom:8}}>Your Profile</Text>
            </View>
            <TouchableOpacity onPress={updateUserData}>
                <Text style={{fontFamily:'font-med', fontSize:16, color:Colors.primary}}>DONE</Text>
            </TouchableOpacity>
        </View>

        <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={{backgroundColor:Colors.background, paddingHorizontal:20}}>
            <View style={{gap:10, justifyContent:'center'}}>

                <View style={styles.basicData}>
                    <View>
                        <Text style={{ fontFamily: "font-reg" }}>Name:</Text>
                        {isEditing.firstName ? (
                            <TextInput
                                style={{
                                    fontFamily: "font-med",
                                    fontSize: 20,
                                    borderBottomWidth: 1,
                                    borderColor: "gray",
                                    paddingVertical: 5,
                                }}
                                value={userData.firstName}
                                onChangeText={(text) => setUserData({ ...userData, firstName: text })}
                                editable={true}
                                autoFocus={true} // Automatically focuses when editing starts
                                onBlur={() => setIsEditing({ ...isEditing, firstName: false })} // Saves & exits edit mode
                            />
                        ) : (
                            <Text style={{ fontFamily: "font-med", fontSize: 20 }}>
                                {userData.firstName}
                            </Text>
                        )}
                    </View>
                    <TouchableOpacity
                        style={{ borderWidth: 0.5, padding: 5, borderRadius: 30 }}
                        onPress={() =>
                            setIsEditing({ ...isEditing, firstName: !isEditing.firstName })
                        }
                    >
                        {isEditing.firstName ? (
                            <MaterialIcons name="done" size={25} color="black" />
                        ) : (
                            <MaterialCommunityIcons name="pencil-outline" size={25} color="black" />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.basicData}>
                    <View>
                        <Text style={{ fontFamily: "font-reg" }}>Email:</Text>
                        {isEditing.email ? (
                            <TextInput
                                style={{
                                    fontFamily: "font-med",
                                    fontSize: 16,
                                    borderBottomWidth: 1,
                                    borderColor: "gray",
                                    paddingVertical: 5,
                                }}
                                value={userData.email}
                                onChangeText={(text) => setUserData({ ...userData, email: text })}
                                editable={true}
                                autoFocus={true} // Automatically focuses when editing starts
                                onBlur={() => setIsEditing({ ...isEditing, email: false })} // Saves & exits edit mode
                            />
                        ) : (
                            <Text style={{ fontFamily: "font-med", fontSize: 16 }}>
                                {userData.email}
                            </Text>
                        )}
                    </View>
                    <TouchableOpacity
                        style={{ borderWidth: 0.5, padding: 5, borderRadius: 30 }}
                        onPress={() =>
                            setIsEditing({ ...isEditing, email: !isEditing.email })
                        }
                    >
                        {isEditing.email ? (
                            <MaterialIcons name="done" size={25} color="black" />
                        ) : (
                            <MaterialCommunityIcons name="pencil-outline" size={25} color="black" />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.basicData}>
                    <View>
                        <Text style={{fontFamily:'font-reg'}}>
                            Date of Birth:
                        </Text>
                        <Text style={{fontFamily:'font-med', fontSize:20}}>
                            {userData?.dateOfBirth}
                        </Text>
                    </View>
                    <TouchableOpacity style={{borderWidth:0.5, padding:5, borderRadius:30}}>
                        <MaterialCommunityIcons name='pencil-outline' size={25} color='black' />
                    </TouchableOpacity>
                </View>

                <View style={styles.basicData}>
                    <View>
                        <Text style={{ fontFamily: "font-reg" }}>Location:</Text>
                        {isEditing.location ? (
                            <TextInput
                                style={{
                                    fontFamily: "font-med",
                                    fontSize: 20,
                                    borderBottomWidth: 1,
                                    borderColor: "gray",
                                    paddingVertical: 5,
                                }}
                                value={userData.location}
                                onChangeText={(text) => setUserData({ ...userData, location: text })}
                                editable={true}
                                autoFocus={true} // Automatically focuses when editing starts
                                onBlur={() => setIsEditing({ ...isEditing, location: false })} // Saves & exits edit mode
                            />
                        ) : (
                            <Text style={{ fontFamily: "font-med", fontSize: 20 }}>
                                {userData.location}
                            </Text>
                        )}
                    </View>
                    <TouchableOpacity
                        style={{ borderWidth: 0.5, padding: 5, borderRadius: 30 }}
                        onPress={() =>
                            setIsEditing({ ...isEditing, location: !isEditing.location })
                        }
                    >
                        {isEditing.location ? (
                            <MaterialIcons name="done" size={25} color="black" />
                        ) : (
                            <MaterialCommunityIcons name="pencil-outline" size={25} color="black" />
                        )}
                    </TouchableOpacity>
                </View>

                {/* Looking For Section */}
                <View style={styles.basicData}>
                    <View>
                        <Text style={{ fontFamily: 'font-reg' }}>Looking For:</Text>
                        <Text style={{ fontFamily: 'font-med', fontSize: 20 }}>
                            {userData.lookingFor}
                        </Text>
                    </View>
                    <TouchableOpacity 
                        style={{ borderWidth: 0.5, padding: 5, borderRadius: 30 }}
                        onPress={() => setIsEditing({ ...isEditing, lookingFor: true })}
                    >
                        <MaterialCommunityIcons name='pencil-outline' size={25} color='black' />
                    </TouchableOpacity>
                </View>

                {/* Looking For Modal */}
                <Modal
                    visible={isEditing.lookingFor}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setIsEditing({ ...isEditing, lookingFor: false })}
                >
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={lookingForOptions}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.optionItem}
                                    onPress={() => {
                                        setUserData({ ...userData, lookingFor: item });
                                        setIsEditing({ ...isEditing, lookingFor: false });
                                    }}
                                >
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Modal>

                {/* Type Section */}
                <View style={styles.basicData}>
                    <View>
                        <Text style={{ fontFamily: 'font-reg' }}>Type:</Text>
                        <Text style={{ fontFamily: 'font-med', fontSize: 20 }}>
                            {userData.type}
                        </Text>
                    </View>
                    <TouchableOpacity 
                        style={{ borderWidth: 0.5, padding: 5, borderRadius: 30 }}
                        onPress={() => setIsEditing({ ...isEditing, type: true })}
                    >
                        <MaterialCommunityIcons name='pencil-outline' size={25} color='black' />
                    </TouchableOpacity>
                </View>

                {/* Type Modal */}
                <Modal
                    visible={isEditing.type}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setIsEditing({ ...isEditing, type: false })}
                >
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={typeOptions}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.optionItem}
                                    onPress={() => {
                                        setUserData({ ...userData, type: item });
                                        setIsEditing({ ...isEditing, type: false });
                                    }}
                                >
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Modal>




               {/* IMAGES */}
                <View style={{ gap: 40, marginTop: 30, justifyContent: 'center' }}>
                    {Array.isArray(userData?.imageUrls) && userData?.imageUrls?.map((img, index) => (
                        <View key={index} style={{ alignItems: 'center' }}>
                            <Image style={styles.img} source={{ uri: img }} />
                            
                            {/* Toggle between pencil and check icons */}
                            <TouchableOpacity
                                style={styles.imageEditor}
                                onPress={() => handleEditToggle(index)}
                            >
                                {isEditing?.imageUrls[index] ? (
                                    <TouchableOpacity
                                        onPress={() => handleSaveUrl(index)} // Handle save
                                    >
                                        <MaterialCommunityIcons name='check' size={25} color='black' />
                                    </TouchableOpacity>
                                ) : (
                                    <MaterialCommunityIcons name='pencil-outline' size={30} color='black' />
                                )}
                            </TouchableOpacity>

                            {/* Render TextInput when in editing mode */}
                            {isEditing?.imageUrls[index] && (
                                <View style={{ position: 'absolute', bottom: 0, left:0, width: '90%' }}>
                                    <TextInput
                                        style={{ width: '100%', height: 40, backgroundColor: 'white', padding: 10, borderWidth:0.2, borderRadius:20 }}
                                        value={editedUrls[index]}
                                        onChangeText={(text) => handleImageUrlChange(text, index)} // Handle text change
                                        placeholder="Enter new image URL"
                                    />

                                </View>
                            )}
                        </View>
                    ))}
                </View>



                {/* prompts */}
                <View style={{ marginTop: 20, gap: 20 }}>
                    {userData?.prompts?.map((prompt, index) => (
                        <View style={styles.promptBody} key={index}>
                            <Text style={{ fontFamily: 'font-med', fontSize: 15 }}>
                                {prompt.question}
                            </Text>

                            {/* Display either TextInput or the current answer */}
                            {isEditing.prompts[index] ? (
                                <TextInput
                                    style={{ fontFamily: 'font-bold', fontSize: 30 }}
                                    value={editedAnswer}
                                    onChangeText={handlePromptAnswerChange}
                                    placeholder="Enter your answer"
                                />
                            ) : (
                                <Text style={{ fontFamily: 'font-bold', fontSize: 30 }}>
                                    {prompt.answer}
                                </Text>
                            )}

                            {/* Toggle the pencil/check icon based on editing state */}
                            <TouchableOpacity
                                style={styles.imageEditor}
                                onPress={() =>
                                    isEditing.prompts[index]
                                        ? handleSavePromptAnswer(index)
                                        : handlePromptEditToggle(index, prompt.answer)
                                }
                            >
                                {isEditing.prompts[index] ? (
                                    <MaterialCommunityIcons name="check" size={30} color="black" />
                                ) : (
                                    <MaterialCommunityIcons name="pencil-outline" size={30} color="black" />
                                )}
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

            </View>


            <View style={{marginBottom:80}}></View>
        </ScrollView>
    </>

  )
}

export default ProfileDetailsScreen

const styles = StyleSheet.create({
    basicData:{
        flexDirection:'row',
        backgroundColor:'white',
        padding:16,
        borderRadius:10,
        borderWidth:0.3,
        justifyContent:'space-between',
        alignItems:'center'
    },
    img: {
        width: '100%',  // Define a proper width
        height:350,
        resizeMode: "cover", // Ensures the image fits well,
        borderRadius:20,
        boxShadow:'0px 0px 5px black'
    },
    imageView: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center", // Center align images
    },
    imageEditor:{
        borderWidth:0.5, 
        padding:10, 
        borderRadius:30, 
        position:'absolute', 
        backgroundColor:'white', 
        bottom:'-10', 
        right:'-10'   
    },
    promptBody:{
        backgroundColor:'white',
        paddingHorizontal:20,
        paddingVertical:30,
        borderRadius:20,
        borderWidth:0.5
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.59)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:100
    },
    optionItem: {
        padding: 15,
        backgroundColor: 'white',
        marginVertical: 5,
        width: 200,
        alignItems: 'center',
        borderRadius: 5,
        marginTop:10
    },
    optionText: {
        fontSize: 18
    }
})
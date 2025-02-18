import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../Colors";
import {
  EvilIcons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { launchImageLibrary } from "react-native-image-picker";
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils'

const PhotoScreen = () => {
  const navigation = useNavigation();
  const [imageUrls, setImageUrls] = useState(["", "", "", "", "", ""]);
  const [imageUrl, setImageUrl] = useState("");
  const [invalid, setInvalid] = useState(false);

  const handleAddImage = () => {
    const index = imageUrls?.findIndex((url) => url === "");
    if (index !== -1) {
      const updatedUrls = [...imageUrls];
      updatedUrls[index] = imageUrl;
      setImageUrls(updatedUrls);
      setImageUrl("");
    }
  };

  const handleSelectImageFromGallery = async () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        Alert.alert("Error", response.errorMessage || "Something went wrong!");
      } else if (response.assets && response.assets.length > 0) {
        const selectedImageUri = response.assets[0]?.uri || "";
        if (selectedImageUri) {
          const index = imageUrls.findIndex((url) => url === "");
          if (index !== -1) {
            const updatedUrls = [...imageUrls];
            updatedUrls[index] = selectedImageUri;
            setImageUrls(updatedUrls);
          }
        } else {
          console.error("Selected image URI is undefined");
        }
      }
    });
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const progressData = await getRegistrationProgress("Photos");
        console.log("Photos:", progressData?.imageUrls);

        if (progressData?.imageUrls) {
          setImageUrls(progressData.imageUrls);
        } else {
          console.warn("Invalid or missing imageUrls in progressData");
        }
      } catch (error) {
        console.error("Error fetching registration progress:", error);
      }
    };

    fetchProgress();
  }, []);

  const handleNext = () => {
    const validUrlsCount = imageUrls.filter((url) => url.trim() !== "").length;

    if (validUrlsCount < 4) {
      setInvalid(true);
    } else {
      setInvalid(false);
      saveRegistrationProgress("Photos", { imageUrls });
      navigation.navigate("Prompts");
    }
  };



  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <View style={{ marginTop: 80 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      borderWidth: 2,
                      borderRadius: 30,
                      borderColor: Colors.black,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Foundation name="photo" size={32} color={Colors.black} />
                  </View>
                  <Image
                    style={{ width: 100, height: 40 }}
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/128/10613/10613685.png",
                    }}
                  />
                </View>
  
                <View style={{ marginTop: 40 }}>
                  <Text style={{ fontSize: 30, fontFamily: "font-med" }}>
                    Grab the attention by providing your photos!
                  </Text>
  
                  <View style={{ marginTop: 30 }}>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                      {imageUrls.slice(0, 3).map((url, index) => (
                        <Pressable
                          key={index}
                          style={{
                            flex: 1,
                            height: 100,
                            borderColor: "black",
                            borderWidth: url ? 0 : 2,
                            borderStyle: "dotted",
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onPress={handleSelectImageFromGallery} // Add this here
                        >
                          {url ? (
                            <Image
                              source={{ uri: url }}
                              style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover",
                                borderRadius: 10,
                              }}
                            />
                          ) : (
                            <MaterialIcons name="add-a-photo" size={30} color="black" />
                          )}
                        </Pressable>
                      ))}
                    </View>
  
                    <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                      {imageUrls.slice(3).map((url, index) => (
                        <Pressable
                          key={index}
                          style={{
                            flex: 1,
                            height: 100,
                            borderColor: "black",
                            borderWidth: url ? 0 : 2,
                            borderStyle: "dotted",
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {url ? (
                            <Image
                              source={{ uri: url }}
                              style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover",
                                borderRadius: 10,
                              }}
                            />
                          ) : (
                            <MaterialIcons name="add-a-photo" size={30} color="black" />
                          )}
                        </Pressable>
                      ))}
                    </View>
                  </View>
                </View>
  
                <View style={{ marginTop: 25 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      paddingVertical: 5,
                      borderRadius: 5,
                      marginTop: 10,
                      backgroundColor: Colors.pink,
                    }}
                  >
                    <Entypo style={{ marginLeft: 8 }} name="link" size={25} color="black" />
                    <TextInput
                      value={imageUrl}
                      onChangeText={(text) => setImageUrl(text)}
                      style={{ color: "gray", marginVertical: 10, width: "75%" }}
                      placeholder="Enter your image URL"
                    />
                    <Pressable
                      onPress={handleAddImage}
                      style={{ marginRight: 10, borderWidth: 2, borderRadius: 100, padding: 3 }}
                    >
                      <AntDesign name="enter" size={18} color="black" />
                    </Pressable>
                  </View>
                </View>
  
                {invalid && (
                  <Text style={{ marginTop: 15, fontFamily: "font-med", color: "red" }}>
                    UPLOAD AT LEAST 4 PHOTOS
                  </Text>
                )}
  
                <TouchableOpacity onPress={handleNext} style={{ marginTop: 40, marginLeft: "auto" }}>
                  <MaterialCommunityIcons
                    name="arrow-right-circle"
                    size={50}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
};

export default PhotoScreen;

const styles = StyleSheet.create({});

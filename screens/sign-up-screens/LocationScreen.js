import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps'; // Import MapView and Marker
import Colors from '../../Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { FontAwesome6 } from '@expo/vector-icons';
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils'

const LocationScreen = () => {
  const [location, setLocation] = useState(''); // Place name
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null }); // Coordinates
  const [loading, setLoading] = useState(false); // Loading indicator
  const [invalid, setInvalid] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      setLoading(true);

      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setLocation('Permission Denied');
        setCoordinates({ latitude: null, longitude: null });
        setLoading(false);
        return;
      }

      // Get the current location
      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = currentLocation.coords;

        // Store the coordinates in the state
        setCoordinates({ latitude, longitude });

        // Reverse geocode to get the place name
        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (reverseGeocode.length > 0) {
          const place = reverseGeocode[0];
          setLocation(`${place.city}, ${place.region}`); // Example: New Delhi, Delhi
        } else {
          setLocation('Unknown location');
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        setLocation('Error fetching location');
        setCoordinates({ latitude: null, longitude: null });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchProgress = async () => {
      const progressData = await getRegistrationProgress('Location');
        
          if (progressData) {
            setLocation(progressData.location || '');
            setCoordinates(progressData.coordinates || '');
          }
          console.log('Location :', progressData.location)
          console.log('Coordinates :', progressData.coordinates)
        };
      
        fetchProgress();
   }, []);
    
  const handleNext = () => {
      if(location === 'Unknown location' || location === "Permission Denied"){
        setInvalid(true);
      } else{
        setInvalid(false);
        saveRegistrationProgress('Location', {location, coordinates})
        navigation.navigate('Gender');
      }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{ marginTop: 80, padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderWidth: 2,
              borderRadius: 30,
              borderColor: Colors.black,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesome6 name="map-location-dot" size={32} color={Colors.black} />
          </View>
          <Image
            style={{ width: 100, height: 40 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>

        <View style={{ marginTop: 40, flexDirection: 'column', gap: 10 }}>
          <Text style={{ fontSize: 30, fontFamily: 'font-med' }}>Where do you live?</Text>

          <View style={{ marginTop: 30 }}>
            {loading ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <TextInput
                value={location} // Show the location as the default value
                editable={false} // Make the text input non-editable
                placeholder="Fetching your location..."
                placeholderTextColor={Colors.text}
                style={{
                  fontSize: 20,
                  fontFamily: 'font-med',
                  marginTop: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.black,
                  paddingBottom: 10,
                  color: Colors.text,
                }}
              />
            )}
          </View>
        </View>

        {/* Display MapView */}
        {coordinates.latitude && coordinates.longitude && (
          <MapView
            style={{ height: 300, marginTop: 20 }}
            initialRegion={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              latitudeDelta: 0.01, // Zoom level
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              }}
              title="Your Location"
              description={location}
            />
          </MapView>
        )}

        {
          invalid && 
          <Text style={{marginTop:15, fontFamily:'font-med', color:'red'}}>PROBLEM IN DETECTING LOCATION!</Text>
        }

        <TouchableOpacity
          onPress={handleNext}
          style={{ marginTop: 40, marginLeft: 'auto' }}
          disabled={!location || loading} // Disable button if location is empty or still loading
        >
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={50}
            color={location && !loading ? Colors.primary : Colors.pink}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({});

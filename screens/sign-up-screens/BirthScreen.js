import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, {useRef, useState, useEffect} from 'react'
import Colors from '../../Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils'

const BirthScreen = () => {
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [age, setAge] = useState('');
  const [invalid, setInvalid] = useState(false);

  const navigation = useNavigation();

  const handleDayChange = (text) => {
    setDay(text);
    if (text.length === 2) {
      monthRef.current.focus();
    }
  };

  const handleMonthChange = (text) => {
    setMonth(text);
    if (text.length === 2) {
      yearRef.current.focus();
    }
  };

  const handleYearChange = (text) => {
    setYear(text);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }

    return calculatedAge;
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const progressData = await getRegistrationProgress('DOB'); // Fetch 'DOB' progress
  
        if (progressData) {
          setDay(progressData.dob?.split('-')[2] || ''); // Extract and set the day
          setMonth(progressData.dob?.split('-')[1] || ''); // Extract and set the month
          setYear(progressData.dob?.split('-')[0] || ''); // Extract and set the year
          setAge(progressData.age || ''); // Set the age if available
        }
  
        console.log('DOB:', progressData?.dob);
        console.log('Age:', progressData?.age);
      } catch (error) {
        console.error('Error fetching registration progress:', error);
      }
    };
  
    fetchProgress();
  }, []);

  const handleNext = () => {
    // Validate the date input
    if (
      day.trim() === '' ||
      month.trim() === '' ||
      year.trim() === '' ||
      isNaN(day) ||
      isNaN(month) ||
      isNaN(year) ||
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year.length !== 4
    ) {
      setInvalid(true);
      return;
    }

    // Form the DOB string
    const dob = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    // Calculate the age
    const calculatedAge = calculateAge(dob);

    if (calculatedAge < 18) {
      setInvalid(true); // Set error if age is below 18
    } else {
      setInvalid(false);
      setAge(calculatedAge);

      // Save DOB and Age
      saveRegistrationProgress('DOB', { dob, age: calculatedAge });

      // Navigate to the next screen
      navigation.navigate('Location');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>

      <View style={{marginTop:80, padding:20}}>

        <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{height:50, width:50, borderWidth:2, borderRadius:30, borderColor:Colors.black, justifyContent:'center', alignItems:'center'}}>
              <MaterialCommunityIcons name='cake-variant-outline' size={32} color={Colors.black} />
            </View>
            <Image style={{width:100, height:40}} source={{uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png'}}/>
        </View>

        <View style={{marginTop:40, flexDirection:'column', gap:30}}>
          <Text style={{fontSize:30, fontFamily:'font-med'}}>What's your Date of Birth?</Text>

          <View style={{flexDirection:'row', gap:'10%', padding:20, justifyContent:'center'}}>
            <TextInput 
                autoFocus={true}
                placeholder="DD"
                placeholderTextColor={Colors.text}
                maxLength={2}
                keyboardType="numeric"
                value={day}
                onChangeText={handleDayChange}
                style={{borderBottomWidth:1, borderColor:'black', padding:10, width:60, fontSize:20, fontFamily:'font-reg'}}
            />

            <TextInput 
                ref={monthRef}
                placeholder="MM"
                placeholderTextColor={Colors.text}
                maxLength={2}
                keyboardType="numeric"
                value={month}
                onChangeText={handleMonthChange}
                style={{borderBottomWidth:1, borderColor:'black', padding:10, width:70, fontSize:20, fontFamily:'font-reg'}}
            />      

            <TextInput 
                ref={yearRef}
                placeholder="YYYY"
                placeholderTextColor={Colors.text}
                maxLength={4}
                keyboardType="numeric"
                value={year}
                onChangeText={handleYearChange}
                style={{borderBottomWidth:1, borderColor:'black', padding:10, width:90, fontSize:20, fontFamily:'font-reg'}}
            />      
          </View>

        </View>

        <Text style={{marginTop:5, color:Colors.text, fontFamily:'font-reg', fontSize:10}}>Note: Must be above 18 years.</Text>

        {
          invalid && 
          <Text style={{marginTop:15, fontFamily:'font-med', color:'red'}}>AGE SHOULD BE ABOVE 18!!</Text>
        }
        
        <TouchableOpacity onPress={handleNext} style={{marginTop:40, marginLeft:'auto'}}>
          <MaterialCommunityIcons name='arrow-right-circle' size={50} color={(day && month && year) ? Colors.primary : Colors.pink} />
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

export default BirthScreen

const styles = StyleSheet.create({})
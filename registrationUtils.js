import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveRegistrationProgress = async (screenName, data) => {
    try {
        const key = `registration_progress_${screenName}`;
        await AsyncStorage.setItem(key, JSON.stringify(data));
        console.log(`Progress saved for the screen: ${screenName}`);
    } catch (error) {
        console.log("Error saving the progress", error.message);
        // Optionally, you could throw an error or handle retries if necessary
    }
};

export const getRegistrationProgress = async (screenName) => {
    try {
        const key = `registration_progress_${screenName}`;
        const data = await AsyncStorage.getItem(key);
        
        if (data === null) {
            return {};  // Return an empty object instead of 'DATA NOT FOUND'
        }

        return JSON.parse(data);  // Parse and return the data
    } catch (error) {
        console.log("Error retrieving the progress", error.message);
        return {};  // Return an empty object in case of an error
    }
};

export const getAllRegistrationProgress = async () => {
    try {
        let allData = {};
        const screens = ["Name", "Email", "Password", "DOB", "Location", "Gender", "Type", "Dating", "LookingFor", "Photos", "Prompts", "DatingPreferences"];
        
        for (const screenName of screens) {
            const key = `registration_progress_${screenName}`;
            const data = await AsyncStorage.getItem(key);

            // if (data !== null) {
                allData[screenName] = JSON.parse(data);
            // }
        }

        return allData;
    } catch (error) {
        console.log("Error retrieving the progress", error.message);
        return {};  // Return an empty object in case of error
    }
};

export const clearAllScreenData = async () => {
    try {
        const screens = [
            "Name", "Email", "Password", "DOB", "Location", 
            "Gender", "Type", "Dating", "LookingFor", 
            "Photos", "Prompts", "DatingPreferences"
        ];

        for (const screenName of screens) {
            const key = `registration_progress_${screenName}`;
            await AsyncStorage.removeItem(key);
        }

        console.log("All registration progress cleared.");
    } catch (error) {
        console.log("Error clearing registration progress:", error.message);
    }
};
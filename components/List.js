import {React, useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useSelector, useDispatch } from "react-redux";
import { addRecording, deleteRecording, loadRecordings } from "../recordingsReducer/recordings";
import Loading from "./Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const List = () => {

    //Navigation
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const recordings = useSelector(state => state.recordings.recordings);

    //Define isPlaying, recording, and sound variables
    const [isPlaying, setIsPlaying] = useState(false);
    const [recording, setRecording] = useState(null);
    const [sound, setSound] = useState(null);

    //______________________________________________________________________________________________________________________

    useEffect(() => {
        //Load recordings from AsyncStorage when the component mounts
        loadRecordingsFromStorage();
    }, []);

    //________________________________________________________________________________________________________________________

    const loadRecordingsFromStorage = async() => {
        try {
            const storedRecordings = await AsyncStorage.getItem("recordings");
            if(storedRecordings) {
                const parsedRecordings = JSON.parse(storedRecordings);
               // dispatch(addRecording(parsedRecordings)); //update redux store with the loaded recordings
               dispatch(loadRecordings(parsedRecordings));
            }
        } catch (error) {
            console.error("Error loading recordings from storage: ", error);
        }
    }

    //___________________________________________________________________________________________________________________________

    //Sort the Recording List in Ascending Order

    recordings.sort((a, b) => {
        const MonthA = getMonthFromDate(a.creationDate);
        const MonthB = getMonthFromDate(b.creationDate);
        return MonthA.localeCompare(MonthB);
    })

    //__________________________________________________________________________________________________________________________________________

    //Todays Date Function
    function dateToday () {
        const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const currentDate = new Date();
        const dayOfWeek = weekdays[currentDate.getDay()];
        const month = months[currentDate.getMonth()];
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();

        const formattedDate = `${month}, ${day}, ${year}  ${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }

    //Function for Extracting the Month from the Date

    function getMonthFromDate (creationDate) {
        const date = new Date(creationDate);
        const month = date.toLocaleString("default", {month : "long"});
        return month;
    }

    //Start Playback Function
   const playRecording = async(selectedRecording) => {
    console.log("playRecording is called");
    console.log("isPlaying:", isPlaying);
    console.log("recording:", recording);

    if(!isPlaying && selectedRecording) {
            try {
                if(sound) {
                    //If the sound object already exists, just play it
                    console.log("Resuming playback...");
                    await sound.playAsync();
                } else {
                    //If the sound object does not exist, create and play it
                    if(selectedRecording.recording && selectedRecording.recording.getURI) {
                        const {sound: newSound} = await Audio.Sound.createAsync({
                            uri: selectedRecording.recording.getURI()
                        });
                    }

                    setSound(newSound);
                    console.log("Playing...");
                    await newSound.playAsync();
                }

                //update the isPlaying state
                setIsPlaying(true);

                //Set the selected recording
                setRecording(selectedRecording);
            } catch (err) {
                console.error("Failed to play recording", err);
            }
    } else {
        console.log("Playback is already in progress or recording is not available")
    }
};

//Stop Playback Function
const stopPlayback = async() => {
    console.log("stopPlayback is called");
    console.log("isPlaying:", isPlaying);
    console.log("sound:", sound);

    if(isPlaying && sound) {
        try {
            await sound.stopAsync();
            await sound.unloadAsync();
            setIsPlaying(false);
        } catch (err) {
            console.error("Failed to stop playback", err);
        }
    }
   
}

    //Delete Recording Function
    
    const deleteRecordingItem = (idToDelete) => {
        //Dispatch the action to remove the recording from Redux store
        dispatch(deleteRecording(idToDelete));

        //Remove the deleted recording from AsyncStorage
        removeRecordingFromStorage(idToDelete);
    }

    const removeRecordingFromStorage = async(idToDelete) => {
        try {
            const storedRecordings = await AsyncStorage.getItem("recordings");
            if(storedRecordings) {
                const existingRecordings = JSON.parse(storedRecordings);

                //Remove the recording with the specified ID
                const updatedRecordings = existingRecordings.filter((recording) => recording.id !== idToDelete);

                //Store the updated recordings back in AsyncStorage
                await AsyncStorage.setItem("recordings",JSON.stringify(updatedRecordings));
            }
        } catch (error) {
            console.error("Error removing recording from storage: ", error);
        }
    }

    //____________________________________________________________________________________________________________________________________

    //Map through the sorted recordings and display them

    function recordingLines () {
        console.log("Recording Lines - Recordings: ", recordings);

        try{
        return recordings.map((recordingLine) => {
            return(
                <View key={recordingLine.id} style={styles.item_box}>
    
                    <TouchableOpacity
                        key={recordingLine.id}
                        style={styles.play_pause_btn}
                        onPress = {() => playRecording(recordingLine)} //Toggle between play and pause function
                        title={isPlaying ? "Stop Playback" : "Start Playback"} //Toggle the button titles
                    >
                        <Image
                            style={styles.play_pause_btn}
                            source={isPlaying ? require("../assets/play_purple.png") : require("../assets/play_purple.png")}
                        />
                    </TouchableOpacity>
    
                    <View style={styles.titlediv}>
                        <Text style={styles.recording_title}>{recordingLine.title || "User Interview"}</Text>
                        <Text>{recordingLine.creationDate || "Full Date | Time"}</Text>
                        <Text>{recordingLine.duration || "hh:mm:ss"} Seconds</Text>
                    </View>
    
                    <View style={styles.btns}>
                        <TouchableOpacity 
                            key={recordingLine.id}
                            onPress={() => deleteRecordingItem(recordingLine.id)}
                        >
                            <Image
                                style={styles.delete_btn_img}
                                source={require("../assets/trash_red.png")}
                            />
                        </TouchableOpacity>
    
                        <TouchableOpacity
                            key={recordingLine.id}
                            onPress={() => navigation.navigate("Share")}
                        >
                            <Image
                                style={styles.share_btn_img}
                                source={require("../assets/share_blue.png")}
                            />
                        </TouchableOpacity>
                    </View>
        
                </View>
                )
            })
        } catch (error) {
            console.error("Error in recordingLines: ", error);
            return "The List is either empty or cannot be located"; //Return a default value or handle the error gracefully
        }
    }
    
        

    //____________________________________________________________________________________________________________________________________

    return(
        <View style={styles.main}>
            <View style={styles.header}>

                <View style={styles.overlay}></View>

                    <View style={styles.heading_band}>
                        <View style={styles.menu_div}>
                            <TouchableOpacity
                                onPress = {() => navigation.navigate("Home")}
                            >
                                <Image
                                    source={require("../assets/left-chevron.png")}
                                    style={styles.menu}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.app_name_container}>
                            <TextInput 
                                style={styles.search}
                                placeholder="Search your recordings..."
                            ></TextInput>
                            <TouchableOpacity>
                                <Image
                                style={styles.search_button}
                                source={require("../assets/search.png")}
                            /></TouchableOpacity>
                            
                        </View>
                    </View>

                    <ScrollView>
                    <View style={styles.content}>
                        <Text style={styles.date_category}>August 2023</Text>
                            {recordingLines()}
                    </View>
                    </ScrollView>
                <View>

            </View>

        </View>
    </View>
    )
};

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: "rgba(209, 161, 165, 0.5)",
        ...StyleSheet.absoluteFillObject, 
    },
    header: {
        flex: 1,
    },
    avatar_div: {
        width: 50,
        height: 50,
        zIndex: 1,
        position: "absolute",
        
    },
    avatar: {
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 25,
        top: 8,
        left: 270,
    },
    content: {
        marginTop: 120,
        marginBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        width: 410,
    },
    search: {
        color: "#83433d",
        fontSize: 18,
        fontWeight: "bold",
        padding: 15,
        marginLeft: 20,
    },
    search_button: {
        width: 20,
        height: 20,
        top: 18,
    },
    app_name_container: {
        zIndex:1,
        top: 30,
        left: 65,
        position: "absolute",
        flexDirection: "row",
    },
    menu_div: {
        zIndex: 1,
        position: "absolute",
        top: 30,
        left: 20,
        padding: 5,
    },
    menu: {
        width: 50,
        height: 50,
    },
    heading_band: {
        backgroundColor: "white",
        position: "absolute",
        zIndex: 1,
        height: 100,
        width: "100%",
        borderRadius: 0,
    },
    item_box: {
        height: 110,
        width: 360,
        flexDirection: "row",
        backgroundColor: "white",
        marginTop: 20,
        padding: 20,
        borderRadius: 25,
        marginBottom: 20,
    },
    play_pause_btn: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    delete_btn_img: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    share_btn_img: {
        width: 30,
        height: 30,
    },
    btns: {
        flexDirection: "row",
        padding: 15,
        width: 75
    },
    recording_title: {
        fontWeight: "bold",
        fontSize: 15
    },
    main: {
        flex: 1,
    }, date_category: {
        textAlign: "left",
        fontSize: 17,
        fontWeight: "600",
    },
    titlediv: {
        flex: 1,
        width: 250,
    }
})

export default List;
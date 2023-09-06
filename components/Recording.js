import {react, useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Button, TextInput} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Audio } from "expo-av";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useRecording } from "./ReduxContext";

const Recording = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const { 
            recordings, 
            setRecordings, 
            recording, 
            setRecording,
            message,
            setMessage,
            recordingName,
            setRecordingName,
            isPlaying,
            setIsPlaying,
            isRecording,
            setIsRecording,
            recordingDuration,
            setRecordingDuration,
            recordingInstance,
            setRecordingInstance,
            sound,
            setSound,
            } = useRecording();

    //_____________________________________________________________________________________________________________________________________

    //Duration Function
    useEffect(() => {
        //creating the empty interval variable
        let interval;

        if (isRecording) {
            interval = setInterval(() => {
                setRecordingDuration((prevDuration) => prevDuration + 1);
            }, 1000) //update every second
        } else {
            clearInterval(interval);
        };

        return () => {
            clearInterval(interval);
        };
    }, [isRecording, recordingDuration]); 

//________________________________________________________________________________________________________________

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

    const formattedDate = `${dayOfWeek}, ${month}, ${day}, ${year}  ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

//Start Recording Function
async function startRecording () {
    setIsRecording(true);

    try {
        const permission = await Audio.requestPermissionsAsync();

        if (permission.status === "granted") {
            await Audio.setAudioModeAsync({
                allowRecordingIOS: true,
                playInSilentModeIOS: true
            });

            const recordingObject = new Audio.Recording();

            await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recordingObject.startAsync();

            setRecordingInstance(recordingObject);

            const creationDate = dateToday();

            setRecording({
                recording: recordingObject,
                creationDate: dateToday(),
                sound: sound,
            });

           
        } else {
            setMessage("Please grant permission to app to access microphone");
        }
    } catch (err) {
        console.error("Failed to start recording", err);
        setMessage("Failed to start recording. Please check yout microphone permission.")
    };
};

//Stop Recording Function
async function stopRecording () {
    setIsRecording(false);

    if (recordingInstance){

    try {
        await recordingInstance.stopAndUnloadAsync(); //Stop recording
        const {sound} = await recordingInstance.createNewLoadedSoundAsync();

       console.log("Recorded sound: ", sound);

       //Reset the recording instance
       setRecordingInstance(null);
    } catch (err) {
        console.log("Failed to stop recording", err);
        setMessage("Failed to stop recording.");
    }
    }

}

//Start Playback Function
const playRecording = async() => {
    console.log("playRecording is called");
    console.log("isPlaying:", isPlaying);
    console.log("recording:", recording);

    if(!isPlaying && recording) {
            try {
                if(sound) {
                    //If the sound object already exists, just play it
                    console.log("Resuming playback...");
                    await sound.playAsync();
                } else {
                    //If the sound object does not exist, create and play it
                    const {sound: newSound} = await Audio.Sound.createAsync({
                       uri: recording.recording.getURI()
                    });

                    setSound(newSound);
                    console.log("Playing...");
                    await newSound.playAsync();
                }

                //update the isPlaying state
                setIsPlaying(true);
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

//Cancel Recording Save Function
const cancelRecording = () => {
    if (recording) {
        console.log("Recording was not saved to the recordings array due to cancelation.");

        //Reset recording state after canceling
        setRecording(null);
        setRecordingDuration(0);
        setRecordingName("");
    }
}

//Save Recording Function
const SaveRecording = () => {
    if (recording) {

        if(!recordingName) {
            console.error("Please enter a title for the recording.");
            return;
        }

        //Create an object to store your recording data
        const recordingData = {
            recording: recording.recording,
            creationDate: recording.creationDate,
            sound: recording.sound,
            title: recordingName,
            duration: recordingDuration,
        }

        // Retrieve existing recordings from local storage (if any)
        AsyncStorage.getItem("recordings")
            .then((storedRecordings) => {
                const existingRecordings = JSON.parse(storedRecordings) || [];

                // Add the new recording data to the existing recordings
                const updatedRecordings = [...existingRecordings, recordingData];

                // Store the updated recordings back in local storage
                AsyncStorage.setItem("recordings", JSON.stringify(updatedRecordings));

                // Update the state with the new recordings
                setRecordings(updatedRecordings);

                // Reset recording-related state variables
                setRecording(null);
                setSound(null);
                setRecordingName("");
                setRecordingDuration(0);

                // Console log that the recording was successfully saved
                console.log(`Recording "${recordingName}" successfully saved`);
            })
            .catch((error) => {
                console.error("Error retrieving or storing recordings: ", error);
            });
        }
}

//______________________________________________________________________________________________________

    
    function getDurationFormatted(milliseconds) {
        const minutes = milliseconds / 1000 / 60;
        const seconds = Math.round((minutes - Math.floor(minutes))  * 60);
        return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}`: `${Math.floor(minutes)}: 0${seconds}`;
    }

    //_________________________________________________________________________________________________________________________

    function getRecordingLines() {
        return recordings.map((recordingLine, index) => {
            return(
                <View key={index} style={styles.row}>
                    <Text style={styles.fill}>Recording #{index + 1} | {recordingLine.duration} | {recordingLine.creationDate}</Text>
                    {recordingLine.sound && (
                    <Button style={styles.funcbutton} onPress = {() => recordingLine.sound.replayAsync()} title="Play"></Button>
                    )}
                </View>
            )
        })
    }

    //_________________________________________________________________________________________________________________________________

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
                                style={styles.app_name}
                                placeholder="Add Title..."
                                value ={recordingName}
                                onChangeText={(text) => setRecordingName(text)}
                                require>
                                
                            </TextInput>

                            <View style={styles.avatar_div}>
                                <TouchableOpacity>
                                    <Image
                                        style={styles.avatar}
                                        source={require("../assets/avatar1.jpg")}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.content}>

                        <Text>
                            {message}
                        </Text>

                        <View style={styles.record_btn_fill}>
                        
                            {recording ? (
                                //Display the "Stop Recording" image as a button when recording is true
                                <>
                                    <TouchableOpacity onPress={stopRecording} title="Stop Recording">
                               
                                        <Image
                                            style={styles.record_btn_active}
                                            source={require("../assets/neon_pink_mic.jpg")}
                                        />
                                    </TouchableOpacity>
                                </>  
                            ) : ( 
                                //Display the "Start Recording" image as a button when recording is false  
                                <>
                                    <TouchableOpacity onPress={startRecording} title="Start Recording">
                               
                                        <Image
                                            style={styles.record_btn}
                                            source={require("../assets/neon_pink_mic.jpg")}
                                        />
                                    </TouchableOpacity>
                                </>                          
                            )}
                        </View>
                        
                    </View>

                        <Text style={styles.time}>{recordingDuration}  seconds</Text>
                    <View>

                        <Image
                            source={require("../assets/sound_wave.jpg")}
                            style={styles.wave}
                        />

                <View style={styles.btns_div}>
                    <View style={styles.btns}>
                        <TouchableOpacity style={styles.cancel_btn}
                        onPress={cancelRecording}
                        >
                            <Image
                                style={styles.cancel_btn_img}
                                source={require("../assets/cross.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.save_btn}
                                onPress={SaveRecording}
                        >
                            <Image
                                style={styles.save_btn_image}
                                source={require("../assets/check.png")}
                            />
                        </TouchableOpacity>
                    </View>

                            <TouchableOpacity
                                                style={styles.pause_play_btn}
                                                onPress = {isPlaying ? stopPlayback : playRecording} //Toggle between play and pause function
                                                title={isPlaying ? "Stop Playback" : "Start Playback"} //Toggle the button titles
                            >
                                <Image
                                    style={styles.pause_play_btn_img}
                                    source={isPlaying ? require("../assets/pause_pink_red.png") : require("../assets/play_red_pink.png")} //Toggle between the play and pause icons
                                />
                            </TouchableOpacity>
                        
                    </View>

                </View>

            </View>
        </View>
        
    )
};

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: "rgba(209, 161, 165, 0.2)",
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
        left: 230,
    },
    content: {
        marginTop: 20,
        marginBottom: 10,
        width: 410,
    },
    footer: {
        width: 405,
        height: 180,
        marginTop: 20,
        marginBottom: 20,
    },
    app_name: {
        color: "#83433d",
        fontSize: 20,
        fontWeight: "bold",
        padding: 15,
        textAlign: "left",
        paddingLeft: 40,
    },
    app_name_container: {
        zIndex:1,
        top: 30,
        left: 95,
        position: "absolute",
        width: "100%"
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
    record_btn_fill: {
        height: 380,
        bottom: 100,
        top: 130,
        left: 120,
    },
    record_btn_active: {
        width: 180,
        height: 180,
        borderRadius: 100,
        borderWidth: 15,
        borderStyle: "solid",
        borderColor: "#3f2a2d",
    },
    record_btn: {
        width: 180,
        height: 180,
        borderRadius: 100,
        borderWidth: 15,
        borderStyle: "solid",
        borderColor: "#fcacbc",
    },
    time: {
        fontSize: 30,
        color: "black",
        marginLeft: 145,
        fontWeight: "400",
    },
    btns_div: {
        flex: 1,
        flexDirection: "row",
    },
    btns: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 60,
        marginTop: 45,
        backgroundColor: "#fcacbc",
        ...StyleSheet.absoluteFillObject,
        width: 300,
        height: 80, 
        borderRadius: 25,
    },
    cancel_btn: {
        width: 90,
        height: 70,
        paddingTop: 10,
        paddingLeft: 10,
    },
    cancel_btn_img: {
        width: 60,
        height: 60,
        backgroundColor: "white",
        borderRadius: 25,
    },
    save_btn: {
        width: 90,
        height: 70,
        padding: 10,
        paddingLeft: 140,
        paddingTop: 10,
        paddingRight: 10,
    },
    save_btn_image: {
        width: 60,
        height: 60,
        backgroundColor: "white",
        borderRadius: 25,
    },
    pause_play_btn: {
        backgroundColor: "#fcacbc",
        width: 120,
        height: 120,
        padding: 15,
        borderRadius: 55,
        zIndex: 1,
        position: "absolute",
        left: 150,
        top: 30,
        borderStyle: "solid",
        borderWeight: 1,
        borderColor: "white",
    },
    pause_play_btn_img: {
        width: 90,
        height: 90,
        borderStyle: "solid",
        borderWidth: 5,
        borderColor: "white",
        borderRadius: 75,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    fill: {
        flex: 1,
        margin:16
    },
    funcbutton: {
        margin: 16,
        backgroundColor: "black",
        color: "white",
    },
    newsec: {
        marginTop: 150,
        marginBottom: 100,
        width: 430,
    },
    clearbtn: {
        backgroundColor: "black",
        color: "white",
    },
    main: {
        flex: 1,
    },
    wave: {
        height: 150,
        width: 410,
        marginTop: 20,
    }
})

export default Recording;
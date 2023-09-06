import {react, useState} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useRecording } from "./ReduxContext";

const List = () => {

    //Navigation
    const navigation = useNavigation();

    //Route
    const route = useRoute();

    const { 
        recordings, 
        setRecordings, 
        recording, 
        setRecording,
        isPlaying,
        setIsPlaying,
        isRecording,
        setIsRecording,
        sound,
        setSound,
        } = useRecording();

    //___________________________________________________________________________________________________________________________

    //Sort the Recording List in Ascending Order

    /*recordings.sort((a, b) => {
        const MonthA = getMonthFromDate(a.creationDate);
        const MonthB = getMonthFromDate(b.creationDate);
        return MonthA.locationCompare(MonthB);
    })*/

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

        const formattedDate = `${dayOfWeek}, ${month}, ${day}, ${year}  ${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }

    //Function for Extracting the Month from the Date

    function getMonthFromDate (creationDate) {
        const date = new Date(creationDate);
        const month = date.toLocaleString("default", {month : "long"});
        return month;
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

    //Delete Recording Function
    
    const deleteRecording = ({id}) => {
        setRecordings(recordings.filter((recording) => recording.id !== id));
    }

    //____________________________________________________________________________________________________________________________________

    //Map through the sorted recordings and display them

    function recordingLines () {
        return recordings.map((recordingLine, index) => {
            return(
                <View key={index} style={styles.item_box}>
    
                    <TouchableOpacity
                        key={index}
                        style={styles.play_pause_btn}
                        onPress = {isPlaying ? stopPlayback : playRecording} //Toggle between play and pause function
                        title={isPlaying ? "Stop Playback" : "Start Playback"} //Toggle the button titles
                    >
                        <Image
                            style={styles.play_pause_btn}
                            source={isPlaying ? require("../assets/play_purple.png") : require("../assets/play_purple.png")}
                        />
                    </TouchableOpacity>
    
                    <View>
                        <Text style={styles.recording_title}>{recordingLine.title || "User Interview"}</Text>
                        <Text>{recordingLine.creationDate || "Full Date | Time"}</Text>
                        <Text>{recordingLine.duration || "hh:mm:ss"}</Text>
                    </View>
    
                    <View style={styles.btns}>
                        <TouchableOpacity 
                            key={index}
                            onPress={deleteRecording}
                        >
                            <Image
                                style={styles.delete_btn_img}
                                source={require("../assets/trash_red.png")}
                            />
                        </TouchableOpacity>
    
                        <TouchableOpacity
                            key={index}
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

                    <View style={styles.content}>
                        <Text style={styles.date_category}>August 2023</Text>

                        {recordingLines}

                        <View style={styles.item_box}>
    
                    <TouchableOpacity
                        style={styles.play_pause_btn}
                        onPress = {isPlaying ? stopPlayback : playRecording} //Toggle between play and pause function
                        title={isPlaying ? "Stop Playback" : "Start Playback"} //Toggle the button titles
                    >
                        <Image
                            style={styles.play_pause_btn}
                            source={isPlaying ? require("../assets/play_purple.png") : require("../assets/play_purple.png")}
                        />
                    </TouchableOpacity>
    
                    <View>
                        <Text style={styles.recording_title}>{"recordingLine.title" || "User Interview"}</Text>
                        <Text>{"recordingLine.creationDate" || "Full Date | Time"}</Text>
                        <Text>{"recordingLine.duration" || "hh:mm:ss"}</Text>
                    </View>
    
                    <View style={styles.btns}>
                        <TouchableOpacity 
                            
                            onPress={deleteRecording}
                        >
                            <Image
                                style={styles.delete_btn_img}
                                source={require("../assets/trash_red.png")}
                            />
                        </TouchableOpacity>
    
                        <TouchableOpacity
                           
                            onPress={() => navigation.navigate("Share")}
                        >
                            <Image
                                style={styles.share_btn_img}
                                source={require("../assets/share_blue.png")}
                            />
                        </TouchableOpacity>
                    </View>
        
                </View>

                    <View>

                </View>

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
        height: 100,
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
    }
})

export default List;
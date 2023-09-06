import React, { createContext, useContext, useState } from "react";

const RecordingContext = createContext();

export const RecordingProvider = ({ children }) => {

//State Variables
    
    //Recording Information
   const [recordings, setRecordings] = useState([]);
   const [recording, setRecording] = useState(null);
   const [message, setMessage] = useState("");
   const [recordingName, setRecordingName] = useState("");

    //Recording or not
    const [isRecording, setIsRecording] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);

    //IsPlaying or not
    const [isPlaying, setIsPlaying] = useState(false);

    //Sound or not
    const [sound, setSound] = useState(null);

    //recording instance
    const [recordingInstance, setRecordingInstance] = useState(null);

//Functions

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

    function getDurationFormatted(milliseconds) {
        const minutes = milliseconds / 1000 / 60;
        const seconds = Math.round((minutes - Math.floor(minutes))  * 60);
        return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}`: `${Math.floor(minutes)}: 0${seconds}`;
    }

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
    
            //Use a modal or some UI component to get the title from the user
            const userEnteredTitle = recordingName; //Assuming you have already collected the input text
            
            if (userEnteredTitle) {
                try {
                    //Recording Logic here
    
                    //Save the recording with its title to the recordings array
                    setRecordings(prevRecordings => [
                        ...prevRecordings,
                        {
                            recording: recording.recording,
                            creationDate: recording.creationDate,
                            sound: recording.sound,
                            title: userEnteredTitle,
                            duration: recordingDuration
                        },
                    ]);
    
                    //Reset recording state after saving
                    setRecording(null);
                    setRecordingDuration(0);
                    setRecordingName("");
    
                    //Console log that the recording was successfully saved
                    console.log(`Recording "${userEnteredTitle}" successfully saved`);
                } catch (err) {
                    console.log("Failed to save recording", err);
                }
            } else {
                console.log("Recording title cannot be empty");
            }
        }
        
    }

    //Function for Extracting the Month from the Date

    function getMonthFromDate (creationDate) {
        const date = new Date(creationDate);
        const month = date.toLocaleString("default", {month : "long"});
        return month;
    }
//_____________________________________________________________________________________________________________________________________
    return (
        <RecordingContext.Provider value = 
        {{  recordings, 
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
            dateToday,//function
            startRecording,//function
            stopRecording,//function
            playRecording,//function
            stopPlayback,//function
            SaveRecording,//function
            cancelRecording,//function
            getMonthFromDate//function
            }}>
            {children}
        </RecordingContext.Provider>
    );
};

export const useRecording = () => {
    return useContext(RecordingContext);
};
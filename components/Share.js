import react from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput} from "react-native";

const Share = () => {
    return(
        <View style={styles.screen}>
            <View style={styles.greyed_out}>


            
            <View style={styles.header}>

                <View style={styles.overlay}></View>

                    <View style={styles.heading_band}>
                        <View style={styles.menu_div}>
                            <TouchableOpacity>
                                <Image
                                    source={require("../assets/left-chevron.png")}
                                    style={styles.menu}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.app_name_container}>
                            <TextInput 
                                style={styles.search}
                                placeholder="Search your recordings"
                            ></TextInput>
                            <TouchableOpacity>
                                <Image
                                style={styles.search_button}
                                source={require("../assets/search.png")}
                            /></TouchableOpacity>
                            

                            <View style={styles.avatar_div}>
                                <TouchableOpacity>
                                    <Image
                                        style={styles.avatar}
                                        source={require("../assets/neon_pink_mic.jpg")}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.content}>
                        <Text>August 2023</Text>


                        <View style={styles.item_box}>
                            <TouchableOpacity>
                                <Image
                                    style={styles.play_pause_btn}
                                    source={require("../assets/play_purple.png")}
                                />
                            </TouchableOpacity>

                            <View>
                                <Text style={styles.recording_title}>User Interview</Text>
                                <Text>23 August 2023 | 04.22pm</Text>
                                <Text>00.30.40</Text>
                            </View>
                            <View style={styles.btns}>
                                <TouchableOpacity>
                                    <Image
                                        style={styles.delete_btn_img}
                                        source={require("../assets/trash_red.png")}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Image
                                        style={styles.share_btn_img}
                                        source={require("../assets/share_blue.png")}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                 </View>

                    <View style={styles.share_box}>
                        <Text style={styles.line}>_____________</Text>

                        <Text style={styles.friends}>Share with your friends</Text>

                        <View style={styles.social_btns_div}>
                            <TouchableOpacity style={styles.social_btn}>
                                <Image
                                    style={styles.social_buttons}
                                    source={require("../assets/whatsapp.png")}
                                />
                                <Text style={styles.social_text2}>Whatsapp</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.social_btn}>
                                <Image
                                    style={styles.social_buttons}
                                    source={require("../assets/messenger.png")}
                                />
                                <Text style={styles.social_text2}>Messenger</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.social_btn}>
                                <Image
                                    style={styles.social_buttons}
                                    source={require("../assets/instagram.png")}
                                />
                                <Text style={styles.social_text2}>Instagram</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.social_btn}>
                                <Image
                                    style={styles.social_buttons}
                                    source={require("../assets/skype.png")}
                                />
                                <Text style={styles.social_text2}>Skype</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.social_btns_div}>
                            <TouchableOpacity style={styles.social_btn}>
                                <Image
                                    style={styles.social_buttons}
                                    source={require("../assets/avatar5.jpg")}
                                />
                                <Text style={styles.social_text}>Preston Magakwe</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.social_btn}>
                                <Image
                                    style={styles.social_buttons}
                                    source={require("../assets/avatar4.jpg")}
                                />
                                <Text  style={styles.social_text}>Shani Ludick</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.social_btn}>
                                <Image
                                    style={styles.social_buttons}
                                    source={require("../assets/avatar3.jpg")}
                                />
                                <Text  style={styles.social_text}>Josh Atwell</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.social_btn}>
                                <Image
                                    style={styles.social_buttons}
                                    source={require("../assets/avatar2.jpg")}
                                />
                                <Text style={styles.social_text}>Maxine Geard</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.copy_box}>
                            <Text>Copy Link:</Text>
                            <View style={styles.copy}>
                            <Text>https://www.recording.in/team_meeting/</Text>
                            <TouchableOpacity style={styles.copy_image_div}>
                            <Image
                                style={styles.copy_image}
                                source={require("../assets/copy.png")}
                            />
                            </TouchableOpacity>
                            </View>

                        </View>

                        <TouchableOpacity style={styles.cancel_btn}>
                                <Text style={styles.cancel_btn_text}>Cancel</Text>
                        </TouchableOpacity>
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
    screen: {
        flex: 1,
        position: "relative"
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
        paddingLeft: 30,
        paddingRight: 30,
        width: 410,
    },
    search: {
        color: "#83433d",
        fontSize: 18,
        fontWeight: "bold",
        padding: 15,
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
        borderRadius: 15,
        zIndex: -1,
    },
    item_box: {
        height: 100,
        width: 360,
        flexDirection: "row",
        backgroundColor: "white",
        marginTop: 20,
        padding: 20,
        borderRadius: 25,
        zIndex: -1,
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
    greyed_out: {
        backgroundColor: "rgba(63, 42, 45,0.7)",
        zIndex: 1,
        position: "relative"
    },
    share_box: {
        zIndex: 1,
        backgroundColor: "white",
        width: 410,
        height: 700,
        marginTop: "20%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        paddingLeft: 20,
    },
    line: {
        textAlign: "center",
    },
    social_buttons: {
        width: 50,
        height: 50,
        borderRadius: 15,
        marginLeft: 5,
    },
    social_btn: {
        marginLeft: 10,
        marginRight: 10,
    },
    social_btns_div: {
        flexDirection: "row",
        marginTop: 30,
        marginLeft: 10,
    },
    social_text: {
        height: 50,
        width: 68,
        textAlign: "center",
        marginTop: 5,
    },
    social_text2: {
        textAlign: "center",
        marginTop: 5,
    },
    friends: {
        marginLeft: 100,
        marginTop: 20,
        fontSize: 16,
        fontWeight: "500",
    },
    cancel_btn: {
        backgroundColor: "#a86683",
        borderRadius: 20,
        height: 50,
        padding: 10,
        width: "100%",
        marginTop: 25,
    },
    cancel_btn_text: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
    },
    copy: {
        flexDirection: "row",
    },
    copy_image_div: {
        width: 30,
        height: 30,
    },
    copy_image: {
        width: "100%",
        height: "100%",
        marginLeft: 20,
        borderRadius: 25,
    },
    copy_box: {
        backgroundColor: "#d5c1cd",
        borderRadius: 25,
        padding: 20,
    }
})

export default Share;
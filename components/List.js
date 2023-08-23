import react from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput} from "react-native";

const List = () => {
    return(
        <View>
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
    }
})

export default List;
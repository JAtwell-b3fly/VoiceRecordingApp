import react from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";

const Recording = () => {
    return(
        <View>
            <View style={styles.header}>

                <View style={styles.overlay}></View>

                    <View style={styles.heading_band}>
                        <View style={styles.menu_div}>
                            <TouchableOpacity>
                                <Image
                                    source={require("../assets/menu.png")}
                                    style={styles.menu}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.app_name_container}>
                            <Text style={styles.app_name}>Add Audio Title</Text>

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
                        <TouchableOpacity>
                            <View style={styles.record_btn_fill}>
                                <Image
                                    style={styles.record_btn}
                                    source={require("../assets/neon_pink_mic.jpg")}
                                />
                            </View>

                        </TouchableOpacity>

                        <Text style={styles.time}>00.02.36</Text>
                    <View>

                    <Image
                        style={styles.footer}
                        resizeMode="cover"
                        source={require("../assets/sound_wave.jpg")}
                    />

                <View style={styles.btns_div}>
                    <View style={styles.btns}>
                        <TouchableOpacity style={styles.cancel_btn}>
                            <Image
                                style={styles.cancel_btn_img}
                                source={require("../assets/cross.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.save_btn}>
                            <Image
                                style={styles.save_btn_image}
                                source={require("../assets/check.png")}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.pause_play_btn}>
                            <Image
                                style={styles.pause_play_btn_img}
                                source={require("../assets/pause_pink_red.png")}
                            />
                        </TouchableOpacity>
                </View>

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
        left: 230,
    },
    content: {
        marginTop: 20,
        marginBottom: 10,
    },
    footer: {
        width: 405,
        height: 180,
        marginTop: 20,
        marginBottom: 20,
    },
    app_name: {
        color: "#83433d",
        fontSize: 26,
        fontWeight: "bold",
        padding: 10,
    },
    app_name_container: {
        zIndex:1,
        top: 30,
        left: 95,
        position: "absolute",
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
    record_btn_fill: {
        height: 380,
        bottom: 100,
        top: 130,
        left: 120,
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
        color: "white",
        marginLeft: 145,
        fontWeight: "bold",
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
    }
})

export default Recording;
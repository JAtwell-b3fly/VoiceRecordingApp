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
                    <Text style={styles.time}>00.02.36</Text>
                </TouchableOpacity>
            <View>
                <Image
                    style={styles.footer}
                    resizeMode="cover"
                    source={require("../assets/pink_scribble2.jpg")}
                />
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
        backgroundColor: "rgba(165, 132, 130,0.2)",
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
        height: 160,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#e0c4a1",
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
        color: "#83433d",
        marginLeft: 145,
    }
})

export default Recording;
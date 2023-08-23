import react from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";

const Home = () => {
    return(
        <View>
        <View style={styles.header}>
            <View style={styles.logo_container}>
                <Image
                    source={require("../assets/scream.jpg")}
                    resizeMode="cover"
                    style={styles.logo}
                />

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
                    <Text style={styles.app_name}>GHOST BREATH</Text>
                    </View>
            </View>
            </View>

            <View style={styles.content}>
                <TouchableOpacity style={styles.btn}>
                    <Image
                        style={styles.btn_image}
                        resizeMode="cover"
                        source={require("../assets/anime_mic.jpg")}
                    />
                    <Text style={styles.btn_text}>
                        New Recording
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}>
                    <Image
                        style={styles.btn_image}
                        resizeMode="cover"
                        source={require("../assets/casette.jpg")}
                    />
                    <Text style={styles.btn_text}>
                        Recording List
                    </Text>
                </TouchableOpacity>
            </View>

            <View>
                <Image
                    style={styles.footer}
                    resizeMode="cover"
                    source={require("../assets/pink_scribble2.jpg")}
                />
            </View>
        </View>
        </View>
    )
};

const styles = StyleSheet.create({
    logo: {
        width: 400,
        height: 400,
    },
    overlay: {
        backgroundColor: "rgba(165, 132, 130,0.2)",
        ...StyleSheet.absoluteFillObject, 
    },
    logo_container: {
        position: "relative",
    },
    header: {
        flex: 1,
    },
    btn_image: {
        width: 100,
        height: 80,
        borderRadius: 15,
    },
    btn: {
        flexDirection: "row",
        textAlign: "center",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 15,
        borderColor: "#cc6c7c",
        padding: 15,
        margin: 20,
    },
    btn_text: {
        textAlign: "center",
        marginLeft: 30,
        padding: 25,
        color: "#cc6c7c",
        fontSize: 20,
        fontWeight: "bold",
    },
    content: {
        marginTop: 20,
        marginBottom: 10,
    },
    footer: {
        width: 405,
        height: 160,
        borderWidth: 1,
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
        left: 130,
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
    }
})

export default Home;
import {React, useState} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../authReducer/auth";

import Loading from "./Loader";

const Login = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        //Dispatch the logIn action with email and password
        dispatch(logIn({email, password}));

        if (isAuthenticated) {
            //User is authenticated, navigate to the home screen or show a success message
            Alert.alert("Success", "Login Successful");
            navigation.navigate("Home");
        } else {
            //User is not authenticated, show an error message
            Alert.alert("Error", "Invalid email or password");
        }
    }

//________________________________________________________________________________________________________________________
    return(
        <View style={styles.main}>
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
                <TextInput style={styles.input} value={email} placeholder="Email Address" onChangeText={(text) => setEmail(text)} />
                <TextInput style={styles.input} value={password} placeholder="Password" onChangeText={(text) => setPassword(text)} />

                <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                    <Image
                        style={styles.btn_image}
                        resizeMode="cover"
                        source={require("../assets/casette.jpg")}
                    />
                    <Text style={styles.btn_text}>
                        Login
                    </Text>
                </TouchableOpacity>

               <TouchableOpacity style={{flexDirection: "row", marginBottom: 15}} onPress={() => navigation.navigate("SignUp")}><Text style={styles.link}>Don't Have An Account?</Text><Text style={styles.link2}> Sign Up</Text></TouchableOpacity>
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
        borderRadius: 0,
    },
    link: {
        marginLeft: 20,
        marginTop: 20,
    },
    main: {
        flex: 1,
    },
    input: {
        borderColor: "#cc6c7c",
        width: "90%",
        height: 50,
        padding: 15,
        margin: 20,
        borderWidth: 2,
        borderRadius: 15,
        textAlign: "center",
        borderStyle: "solid",
        fontSize: 18,
        color: "#83433d",
        marginBottom: 10,
        marginTop: 10,
    },
    link: {
        fontSize: 18,
        marginLeft: 50, 
    },
    link2: {
        fontSize: 18,
        marginLeft: 10, 
        fontWeight: "600"
    }
})

export default Login;
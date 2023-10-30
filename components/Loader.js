import React from "react";
import {View, Image, StyleSheet, Text} from "react-native";

const Loading = ()  => {
    return(
        <View style={styles.main}>
            <Text style={{color: "#83433d", fontSize: 30, fontWeight: "500"}}>...Loading...</Text>
            <Image source={require("../assets/Loader.gif")} />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        elevation: 1,
    },

});

export default Loading;
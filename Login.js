import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";

import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
const appIcon = require("../assets/logo.png");

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fontsLoaded: false,
      userSignedIn: false
    };
  }

  signIn = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.replace("Dashboard");
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };


  render() {
    if (this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return(
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#15193c",
        }}>

          <View style={styles.container}>
            <SafeAreaView style={styles.droidSafeArea}/>
            <View style={styles.appTitle}></View>
            <Image
              source={require("../assets/logo.png")}
              style={styles.appIcon}>
            </Image>
            <Text style={styles.appTitleText}>{'Spectragram App'}</Text>
            </View>

            <View>

          <TextInput
            style={styles.textinput}
            onChangeText={text => this.setState({ email: text })}
            placeholder={"Enter Email"}
            placeholderTextColor={"#FFFFFF"}
            autoFocus
          />
          <TextInput
            style={[styles.textinput, { marginTop: 20 }]}
            onChangeText={text => this.setState({ password: text })}
            placeholder={"Enter Password"}
            placeholderTextColor={"#FFFFFF"}
            secureTextEntry
          />
          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={() => this.signIn(email, password)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

            <View style={styles.button}>
              <TouchableOpacity
              style={[styles.button, { marginTop: 20 }]}
              onPress={() => this.signInWithGoogleAsync()}>
              <Text style={styles.buttonText}>Sign in with Google</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.newUserContainer}
              onPress={() => this.props.navigation.navigate("RegisterScreen")}>
              <Text style={styles.buttonTextNewUser}>New User ?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cloudContainer}>
              <Image 
              source={require('../assets/favicon.png')}
              style={styles.cloudImage}>
              </Image>
            </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
    alignItems:"center",
    justifyContent:"center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 35
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom:20
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: 40,
    fontFamily: "Bubblegum-Sans",
    marginBottom:20
  },
  textinput: {
    width:  250,
    height: 40,
    padding: 10,
    marginTop: 10,
    borderColor: "#FFFFFF",
    borderWidth: 4,
    borderRadius: 10,
    fontSize: 15,
    color: "#FFFFFF",
    backgroundColor: "#15193c",
    fontFamily: "Bubblegum-Sans"
  },
  button: {
    width: 250,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    marginBottom:20
  },
  buttonText: {
    fontSize: 24,
    color: "#15193c",
    fontFamily: "Bubblegum-Sans"
  },
  buttonTextNewUser: {
    fontSize: 12,
    color: "#FFFFFF",
    fontFamily: "Bubblegum-Sans",
    textDecorationLine: 'underline'
  }
});


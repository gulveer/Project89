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

const appIcon = require("../assets/logo.png");

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name:"",
      last_name:"",
      email: "",
      password: "",
      confirmPassword: "",
      fontsLoaded: false
    };
  }

 
 registerUser = (email, password,confirmPassword, first_name, last_name) => {
  if(password==confirmPassword){
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
      alert("User registered!!");
        console.log(userCredential.user.uid)
        this.props.navigation.replace("Login");
        firebase.database().ref("/users/" + userCredential.user.uid)
                .set({
                  email: userCredential.user.email,
                  first_name: first_name,
                  last_name: last_name,
                  current_theme: "dark"
                })
      })
      .catch(error => {
        alert(error.message);
      });
    }else{
      alert("Passwords don't match!");
    }
  };
  

  render() {
      const { email, password, confirmPassword, first_name, last_name } = this.state;
      
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

            <Text style={styles.appTitleText}>Register</Text>
           
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ first_name: text })}
              placeholder={"First name"}
              placeholderTextColor={"#FFFFFF"}
    
            />
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ last_name: text })}
              placeholder={"Last name"}
              placeholderTextColor={"#FFFFFF"}
        
            />
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ email: text })}
              placeholder={"Enter Email"}
              placeholderTextColor={"#FFFFFF"}
  
            />
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ password: text })}
              placeholder={"Enter Password"}
              placeholderTextColor={"#FFFFFF"}
              secureTextEntry
            />
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({ confirmPassword: text })}
              placeholder={"Re-enter Password"}
              placeholderTextColor={"#FFFFFF"}
              secureTextEntry
            />
            <TouchableOpacity
              style={[styles.button, { marginTop: 20 }]}
              onPress={() => this.registerUser(email, password, confirmPassword,first_name, last_name)}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>    
            <TouchableOpacity
              onPress={()=>this.props.navigation.replace("Login")}
            >
              <Text style={styles.buttonTextNewUser}>Login ?</Text>
            </TouchableOpacity>         
        </View>
      );
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
import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image
} from 'react-native';
import PostCard from "./PostCard";
import { FlatList } from "react-native-gesture-handler";

let post = require("./temp_posts.json");

export default class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: ""
        };
      }

    fetchPosts =()=>{
    firebase
        .database()
        .ref("/posts/")
        .on("value", (snapshot) => {
        let posts = []

        if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
            posts.push({
            key: key,
            value: snapshot.val() [key]
            })
          });
        }
            
         this.setState({ posts: posts })}, 
         function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        })
    }
            

      renderItem = ({ item: post }) => {
        return <PostCard post={post} navigation={this.props.navigation} />;
      };

      keyExtractor = (item, index) => index.toString();

    render() {
        return (

    <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
        <View style={styles.appIcon}>
            <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
            ></Image>
        </View>
        <View style={styles.appTitleTextContainer}>
            <Text style={styles.appTitleText}>Spectagram</Text>
        </View>
        </View>
<       View style={styles.cardContainer}>
            <FlatList
                keyExtractor={this.keyExtractor}
                data={post}
                renderItem={this.renderItem}
            />
        </View>
    </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "black"
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.8,
        justifyContent: "center",
        textSize: 10
    },
    appTitleText: {
        color: "white",
        fontSize: 28,
    },
    cardContainer: {
        flex: 0.85
    },

    });

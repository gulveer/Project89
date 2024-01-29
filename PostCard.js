import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
      post_id: this.props.post.key,
      post_data: this.props.post.value
    };
  }

  render() {
      return (
        
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            
            <View style={styles.autorContainer}>
            <TouchableOpacity
  style={styles.container}
  onPress={() => this.props.navigation.navigate("Postscreen", {post: this.props.post})}>
</TouchableOpacity>
                <View style={styles.autorImageContainer}>


            <Image
             source={require("../assets/profile_img.png")}
             style={styles.profileImage}
            ></Image>
            </View>
            
            <View style={styles.autorNameContainer}>
              <Text style={styles.autorNameText}> 
              {this.props.post.author}
              </Text>
            </View>

          </View>
         <Image source={require("../assets/post.jpeg")} style={styles.postImage} />
         <View style={styles.captionContainer}>
           <Text style={styles.captionText}>
               {this.props.post.caption}
            </Text>

          </View>
           <View style={styles.actionContainer}>
             <View style={styles.likeButton}>
               <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
               <Text style={styles.likeText}>12k</Text>
             </View>
           </View>

         </View>
       </View>
     );
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  autorContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  autorImageContainer: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  autorNameContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  authorNameText: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  captionContainer: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10)
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});

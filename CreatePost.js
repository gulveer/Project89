import React, { Component } from 'react';
import { Text, View } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";

export default class CreatePost extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          previewImage: "image_1",
          dropdownHeight: 40,
        };
      }

      async addPost() {

        if (this.state.caption) {
        
        let postData = {
        preview_image: this.state.previewImage,
        caption: this.state.caption,
        author: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        author_uid: firebase.auth().currentUser.uid,
        profile_image: this.state.profile_image,
        likes: 0
        };
        
        await firebase
        .database()
        .ref ("/posts/" + Math.random().toString(36).slice(2))
        .set(postData)
        .then(function (snapshot) { });
        
        this.props.setUpdateToTrue();
        this.props.navigation.navigate("Feed");
        
      } else {
        
      Alert.alert(
        "Еггог",
        "All fields are required!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
        );  
      }
    }

    render() {
    let preview_images = {
      image_1: require("../assets/image_1.jpg"),
      image_2: require("../assets/image_2.jpg"),
      image_3: require("../assets/image_3.jpg"),
      image_4: require("../assets/image_4.jpg"),
      image_5: require("../assets/image_5.jpg"),
    };
    console.log(this.state.previewImage);
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
            <Text style={styles.appTitleText}>New Post</Text>
          </View>
        </View>
        <View style={styles.fieldsContainer}>
            <ScrollView>
          <Image
            source={preview_images[this.state.previewImage]}
            style={styles.previewImage}
          ></Image>
          <View style={{ height: this.state.dropdownHeight }}>
            <DropDownPicker
              items={[
                { label: "Image 1", value: "image_1" },
                { label: "Image 2", value: "image_2" },
                { label: "Image 3", value: "image_3" },
                { label: "Image 4", value: "image_4" },
                { label: "Image 5", value: "image_5" },
              ]}
              defaultValue={this.state.previewImage}
              
              containerStyle={{
                height: 40,
                borderRadius: 20,
                marginBottom: 10
              }}

              onOpen={() => {
                this.setState({ dropdownHeight: 170 });
              }}
              onClose={() => {
                this.setState({ dropdownHeight: 40 });
              }}
              style={{ backgroundColor: "transparent", }}
              itemStyle={{
                justifyContent: "flex-start"
              }}
              dropDownStyle={() =>{
                backgroundColor: "#2a2a2a"
              }}
              labelStyle={() =>{
                color: "white"
              }}
              arrowStyle={() =>{
                color: "white"
              }}
              onChangeItem={(item) =>
                this.setState({
                  previewImage: item.value,
                })
              }
            />
          </View>
          <ScrollView>
            <TextInput
              onChangeText={(post) => this.setState({ post })}
              placeholder={"Post"}
              multiline={true}
              numberOfLines={20}
              placeholderTextColor="white"
            />
            <TextInput
              style={styles.inputFont}
              onChangeText={caption => this.setState({ caption })}
              placeholder={"caption"}
              placeholderTextColor="white"
            />
            </ScrollView>
              
            <View style={styles.submitButton}>
              <Button
                onPress={() => this.addPost()}
                title="Submit"
                color="#841584"
              />
            </View>

          </ScrollView>
        </View>
        <View style={{ flex: 0.08 }} />
      </View>
    );
  }
}

    

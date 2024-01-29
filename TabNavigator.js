import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from "../projects/Feed"
import CreatePost from "../projects/CreatePost";
const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
    return (
        <Tab.Navigator 
            barStyle={styles.bottomTabStyle}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Feed') {
                        iconName = focused
                            ? 'book'
                            : 'book-outline';
                    } else if (route.name === 'CreatePost') {
                        iconName = focused ? 'create' : 'create-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
           
           
           
            tabBarOptions={{
                activeTintColor: 'darkblue',
                inactiveTintColor: 'cyan',

            }}>
                <Tab.Screen name="Feed" component={Feed} />
                <Tab.Screen name="CreatePost" component={CreatePost} />
            
            

        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    bottomTabStyle: {
      backgroundColor: "#000000"
    },
  });
  

export default BottomTabNavigator
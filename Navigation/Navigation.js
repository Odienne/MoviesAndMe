import * as React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Search from "../Components/Search";
import FilmDetail from "../Components/FilmDetail";
import FilmsVus from "../Components/FilmsVus";
import Favorites from "../Components/Favorites";
import createBottomTabNavigator from "@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator";
import News from "../Components/News";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={Search}/>
            <Stack.Screen name="FilmDetail" component={FilmDetail}/>
        </Stack.Navigator>
    );
}

const StackFav = createStackNavigator();

function StackNavigatorFavorites() {
    return (
        <StackFav.Navigator>
            <StackFav.Screen name="Favorites" component={Favorites}/>
            <StackFav.Screen name="FilmDetail" component={FilmDetail}/>
        </StackFav.Navigator>
    );
}

const StackNews = createStackNavigator();

function StackNavigatorNews() {
    return (
        <StackNews.Navigator>
            <StackNews.Screen name="News" component={News}/>
            <StackNews.Screen name="FilmDetail" component={FilmDetail}/>
        </StackNews.Navigator>
    );
}

const StackFilmsVus = createStackNavigator();

function StackNavigatorFilmsVus() {
    return (
        <StackFilmsVus.Navigator>
            <StackFilmsVus.Screen name="FilmsVus" component={FilmsVus}/>
            <StackFilmsVus.Screen name="FilmDetail" component={FilmDetail}/>
        </StackFilmsVus.Navigator>
    );
}

function Home() {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBarOptions={{showLabel: false, showIcon: true}}>
                <Tab.Screen name="Search" component={StackNavigator} options={
                    {
                        tabBarIcon: () => {
                            return <Image source={require('../Images/search.png')} style={styles.icon}/>
                        }
                    }
                }/>
                <Tab.Screen name="Favorites" component={StackNavigatorFavorites} options={
                    {
                        tabBarIcon: () => {
                            return <Image source={require('../Images/fav.png')} style={styles.icon}/>
                        }
                    }
                }/>

                <Tab.Screen name="News" component={StackNavigatorNews} options={
                    {
                        tabBarIcon: () => {
                            return <Image source={require('../Images/new.png')} style={styles.icon}/>
                        }
                    }
                }/>

                <Tab.Screen name="FilmsVus" component={StackNavigatorFilmsVus} options={
                    {
                        tabBarIcon: () => {
                            return <Image source={require('../Images/check.png')} style={styles.icon}/>
                        }
                    }
                }/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    icon: {
        height: 30,
        width: 30
    }
});
export default Home
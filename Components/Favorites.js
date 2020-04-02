import React from 'react';
import {View, TextInput, Button, StyleSheet, FlatList, Text, ActivityIndicator, Image} from "react-native";
import films from '../Helpers/filmsData';
import FilmItem from "./FilmItem";
import {getFilmsFromAPI, getFilmsFromApiWithSearchedText, getImageFromApi} from "../API/TMDBApi";
import {connect} from "react-redux";
import FilmListe from "./FilmListe";
import Avatar from "./Avatar";


class Favorites extends React.Component {

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.avatar_container}>
                    <Avatar/>
                </View>
                <FilmListe
                    films={this.props.favoritesFilm} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
                    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    avatar_container: {
        alignItems: 'center'
    }
})


const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}
export default connect(mapStateToProps)(Favorites)
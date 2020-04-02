import React from 'react';
import {View, StyleSheet} from "react-native";
import {connect} from "react-redux";
import FilmListe from "./FilmListe";


class FilmsVus extends React.Component {

    render() {
        return (
            <View style={styles.mainContainer}>
                <FilmListe
                    films={this.props.filmsVus}
                    navigation={this.props.navigation}
                    loadFilms={() => {
                    }}
                    page='1'
                    totalPages='1'
                    favoriteList={false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
})


const mapStateToProps = (state) => {
    return {
        filmsVus: state.toggleFilmsVus.filmsVus,
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}
export default connect(mapStateToProps)(FilmsVus)
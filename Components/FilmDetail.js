import React from 'react';
import {
    ScrollView,
    View,
    Share,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    Platform,
    Button,
    TouchableOpacity
} from "react-native";
import {getFilmDetail, getImageFromApi} from "../API/TMDBApi"
import moment from "moment";
import numeral from "numeral";

import {connect} from 'react-redux';
import EnlargeShrink from "../Animations/EnlargeShrink";


class FilmDetail extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state
        // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
        if (params.film !== undefined && Platform.OS === 'ios') {
            return {
                // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
                headerRight: <TouchableOpacity
                    style={styles.share_touchable_headerrightbutton}
                    onPress={() => params.shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../Images/share.ios.png')}/>
                </TouchableOpacity>
            }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true,
            shouldEnlarge: false
        }

        // Ne pas oublier de binder la fonction _shareFilm sinon, lorsqu'on va l'appeler depuis le headerRight de la navigation, this.state.film sera undefined et fera planter l'application
        this._toggleFavorite = this._toggleFavorite.bind(this)
        this._displayVusButton = this._displayVusButton.bind(this)
        this._shareFilm = this._shareFilm.bind(this)
    }

    // Fonction pour faire passer la fonction _shareFilm et le film aux paramètres de la navigation. Ainsi on aura accès à ces données au moment de définir le headerRight
    _updateNavigationParams() {
        this.props.navigation.setParams({
            shareFilm: this._shareFilm,
            film: this.state.film
        })
    }

    componentDidMount() {
        const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.route.params.idFilm)
        const vuFilmIndex = this.props.filmsVus.findIndex(item => item.id === this.props.route.params.idFilm)

        if (favoriteFilmIndex !== -1 || vuFilmIndex !== -1) {
            this.setState({
                film: this.props.favoritesFilm[favoriteFilmIndex]
            }, () => {
                this._updateNavigationParams()
            })
            return
        }

        this.setState({isLoading: true})
        getFilmDetail(this.props.route.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            }, () => {
                this._updateNavigationParams()
            })
        })
    }


    _displayFilm() {
        const film = this.state.film;
        if (film !== undefined) {
            return (
                <ScrollView style={styles.scrollViewContainer}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.poster_path, 500)}}
                    />
                    <Text style={styles.title_text}>{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        title="Favoris"
                        onPress={() => {
                            this._toggleFavorite()
                        }}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>


                    <Text style={styles.description_text}>{film.overview}</Text>

                    <View>
                        <Text>Sorti le {moment(film.release_date).format('DD/MM/YYYY')}</Text>
                        <Text>Note {film.vote_average}/10</Text>
                        <Text>Nombre de votes : {film.vote_count}</Text>
                        <Text>Budget : {numeral(film.budget).format('0,0')} $</Text>
                        <Text>Genre(s) : {film.genres.map(genre => {
                            return genre.name
                        }).join(' / ')}</Text>
                        <Text>Companie(s) : {film.production_companies.map(companie => {
                            return companie.name
                        }).join(' / ')}</Text>
                    </View>
                </ScrollView>
            )
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _toggleFavorite() {
        const action = {type: "TOGGLE_FAVORITE", value: this.state.film};
        this.props.dispatch(action);
        this.setState({shouldEnlarge: !this.state.shouldEnlarge})
    }

    _displayFavoriteImage() {
        let sourceImage = require('../Images/non_fav.png');
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            sourceImage = require('../Images/fav.png');
        }
        return (
            <EnlargeShrink shouldEnlarge={this.state.shouldEnlarge}>
                <Image source={sourceImage} style={styles.favorite_image}/>
            </EnlargeShrink>

        )
    }

    /*componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props.favoritesFilm);
    }*/

    _toggleFilmVu() {
        const action = {type: "TOGGLE_FILM_VU", value: this.state.film};
        this.props.dispatch(action);
    }

    _displayVusButton() {
        console.log(this.state.film)
        let text = (this.props.filmsVus.findIndex(item => item.id === this.props.route.params.idFilm) !== -1) ? "Non vu" : "Marquer comme vu";
        return (
            <Button onPress={() => {this._toggleFilmVu()}} title={text}></Button>
        )
    }


    _shareFilm() {
        const {film} = this.state
        Share.share({title: film.title, message: film.overview})
    }


    _displayFloatingActionButton() {
        const {film} = this.state
        if (film !== undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
            return (
                <TouchableOpacity
                    style={styles.share_touchable_floatingactionbutton}
                    onPress={() => this._shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../Images/share.android.png')}/>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {this._displayFilm()}
                {this._displayLoading()}
                {this._displayFloatingActionButton()}
                {this._displayVusButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    scrollViewContainer: {
        flex: 1
    },
    title_text: {
        fontWeight: 'bold',
        textAlign: "center",
        fontSize: 26,
    },
    description_text: {
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },

    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 169
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        flex: 1,
        width: null,
        height: null
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        height: 30,
        width: 30
    },
    share_touchable_headerrightbutton: {
        marginRight: 8
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm,
        filmsVus: state.toggleFilmsVus.filmsVus
    }
}
export default connect(mapStateToProps)(FilmDetail)
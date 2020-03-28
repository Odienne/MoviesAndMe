import React from 'react';
import {View, TextInput, Button, StyleSheet, FlatList, Text, ActivityIndicator} from "react-native";
import films from '../Helpers/filmsData';
import FilmItem from "./FilmItem";
import {getFilmsFromAPI, getImageFromApi} from "../API/TMDBApi";

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
            isLoading: false
        }
        this.searchedText = ""
        this.page = 0
        this.totalPages = 0
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({isLoading: true});
            getFilmsFromAPI(this.searchedText, this.page + 1).then(data => {
                this.page = data.page;
                this.totalPages = data.total_pages;
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                })
            })
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

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({films: []}, () => {
            console.log(`page ${this.page} / total ${this.totalPages} ... nombre de films : ${this.state.films.length}`)
            this._loadFilms()
        })
    }

    _searchTextInputChange(text) {
        this.searchedText = text
    }

    render() {
        console.log('RENDER')
        console.log(this.state.isLoading)
        return (
            <View style={styles.mainContainer}>
                <TextInput placeholder="Titre du film"
                           style={styles.textinput}
                           onChangeText={(text) => this._searchTextInputChange(text)}
                           onSubmitEditing={() => this._searchFilms()}
                />
                <Button style={styles.button} title='Rechercher' onPress={() => this._searchFilms()}/>

                <FlatList style = {{height: 100}}
                    data={this.state.films}
                    keyExtractor={item => item.id.toString()}
                    onEndReachedThreshold={0.9}
                    onEndReached={() => {
                        console.log('end reached')
                        console.log(this.page)
                        console.log(this.totalPages)
                        if (this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}

                    renderItem={({item}) => <FilmItem film={item}/>}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 20,
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search
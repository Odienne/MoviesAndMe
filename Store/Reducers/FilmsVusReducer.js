const initialState = {filmsVus: []}

function toggleFilmsVus(state = initialState, action) {
    let nextState;

    switch(action.type) {
        case 'TOGGLE_FILM_VU':
            const favoriteFilmIndex = state.filmsVus.findIndex(item => item.id === action.value.id)

            if (favoriteFilmIndex !== -1) {
                //suppression
                nextState = {
                    ...state,
                    filmsVus: state.filmsVus.filter((item, index) => index !== favoriteFilmIndex)
                }
            }
            else {
                //ajout
                nextState = {
                    ...state,
                    filmsVus: [...state.filmsVus, action.value]
                }
            }

            return nextState || state;
        default :
            return state;
    }
}

export default toggleFilmsVus
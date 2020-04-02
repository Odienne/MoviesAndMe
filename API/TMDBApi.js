const API_TOKEN = "34b3030cff6e73bcf8113fa00547aeb7";

export function getFilmsFromApiWithSearchedText(text, page) {
    const url = "https://api.themoviedb.org/3/search/movie?api_key=" + API_TOKEN + "&language=fr&query=" + text + '&page=' + page;

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export function getImageFromApi(name, w = 300) {
    return "https://image.tmdb.org/t/p/w" + w + name;
}

export function getFilmDetail(id) {
    const url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + API_TOKEN + "&language=fr";

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export function getNews(page) {
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_TOKEN + "&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=" + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}
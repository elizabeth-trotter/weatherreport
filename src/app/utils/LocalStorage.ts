const saveFavoriteToLocalStorage = (location: string) => {

    let favorites = getFavoriteLocalStorage();

    if(!favorites.includes(location)){
        favorites.push(location);
    }

    localStorage.setItem("Favorites", JSON.stringify(favorites));
};

const getFavoriteLocalStorage = () => {

    let localStorageData = localStorage.getItem("Favorites");

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
};

const removeFavoriteFromLocalStorage = (location: string) => {

    let favorites = getFavoriteLocalStorage();
    let namedIndex = favorites.indexOf(location);

    favorites.splice(namedIndex, 1);
    localStorage.setItem("Favorites", JSON.stringify(favorites));
};

const saveRecentToLocalStorage = (location: string) => {

    let recents = getRecentLocalStorage();

    if(!recents.includes(location)){
        recents.push(location);
    }

    localStorage.setItem("Recents", JSON.stringify(recents));
};

const getRecentLocalStorage = () => {

    let localStorageData = localStorage.getItem("Recents");

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
};

const removeRecentFromLocalStorage = (location: string) => {

    let recents = getRecentLocalStorage();
    let namedIndex = recents.indexOf(location);

    recents.splice(namedIndex, 1);
    localStorage.setItem("Recents", JSON.stringify(recents));
};

export { saveFavoriteToLocalStorage, getFavoriteLocalStorage, removeFavoriteFromLocalStorage, saveRecentToLocalStorage, getRecentLocalStorage, removeRecentFromLocalStorage };
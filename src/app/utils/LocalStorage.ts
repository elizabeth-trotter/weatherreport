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

    if (recents.includes(location)) {
        let indexDuplicate = recents.indexOf(location);
        if (indexDuplicate !== 2) {
            recents.splice(indexDuplicate, 1);
            recents.push(location);
            localStorage.setItem("Recents", JSON.stringify(recents));
        }
    } else {
        if (recents.length > 2) {
            recents.shift();
            recents.push(location);
            localStorage.setItem("Recents", JSON.stringify(recents));
        } else {
            recents.push(location);
            localStorage.setItem("Recents", JSON.stringify(recents));
        }
    }
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
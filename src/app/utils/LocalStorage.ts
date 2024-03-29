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

    // Check if location already exists in recents array
    const index = recents.indexOf(location);

    // If location exists and it's not already at index 0
    if (index !== -1 && index !== 0) {
        // Remove existing entry and add it to the beginning of the array
        recents.splice(index, 1);
        recents.unshift(location);
    } else if (index === 0) {
        // If location is already at index 0, no need to change anything
        return;
    } else {
        // If location is not in the array or is already at index 0

        // Remove the last element if the array length exceeds 3
        if (recents.length >= 3) {
            recents.pop();
        }
        // Add location to the beginning of the array
        recents.unshift(location);
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
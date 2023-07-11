
import { createContext, useState, useEffect } from "react";

const FavoriteContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (favoriteEvents) => {},
    removeFavorite: (eventId) => {},
    itemIsFavorite: (eventId) => {}
})

export const FavoriteContextProvider = ({ children }) => {
    const [userFavorites, setUserFavorites] = useState(
        // if localStorage is empty then set it to an empty arr else fetch the favs from localStorage
		localStorage.getItem("favorites") === null
			? []
			: JSON.parse(localStorage.getItem("favorites"))
	);

    // everytime the userFavorites state stringify the array and store it in localStorage
	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(userFavorites));
	}, [userFavorites]);

    const handleAddFavorite = (favoriteEvents) => {
		// how to update state based on previous state
		setUserFavorites((previousUserFavorites) => {
			return previousUserFavorites.concat(favoriteEvents);
		});
	};
	const handleRemoveFavorite = (eventId) => {
		setUserFavorites((previousUserFavorites) => {
			return previousUserFavorites.filter((event) => event.id !== eventId);
		});
	};

	const itemIsFavoriteHanlder = (eventId) => {
		// allows us to check if a given item is a favorite
		// .some() returns true/false is the condition returns true/false
		return userFavorites.some((event) => event.id === eventId);
	};

    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: handleAddFavorite,
        removeFavorite: handleRemoveFavorite,
        itemIsFavorite: itemIsFavoriteHanlder
    }

    return (
        <FavoriteContext.Provider value={context}>
            {children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteContext
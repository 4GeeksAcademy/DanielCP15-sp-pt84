const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [],
			planets: [],
			starships: [],
			info: [],
			favorites: [],
			dataLink: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			getCharacters: async () => {
				const response = await fetch("https://www.swapi.tech/api/people")
				if (response.ok) {
					const data = await response.json()
					setStore({ characters: data.results })
				} else {
					throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
				}
			},

			getPlanets: async () => {
				const response = await fetch("https://www.swapi.tech/api/planets")
				if (response.ok) {
					const data = await response.json()
					setStore({ planets: data.results })
				} else {
					throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
				}
			},

			getStarships: async () => {
				const response = await fetch("https://www.swapi.tech/api/starships")
				if (response.ok) {
					const data = await response.json()
					setStore({ starships: data.results })
				} else {
					throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
				}
			},

			getInfo: (category, uid) => {
				setStore({ loading: true })

				fetch(`https://www.swapi.tech/api/${category}/${uid}`, {
					cache: "no-store"
				})
					.then(response => {
						if (response.ok) {
							return response.json()
						} else {
							throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`)
						}
					})
					.then(data => {
						if (data.result) {
							setStore({
								info: data.result.properties,
								loading: false
							})
						} else {
							console.error("Estructura inesperada en la respuesta:", data)
							setStore({ loading: false })
						}
					})
					.catch(error => {
						console.error("Error inesperado:", error)
						setStore({ loading: false })
					})
			},

			newFavorite: (favorite, category, uid) => {
				const store = getStore();
				if (!store.favorites.some(item => item.name === favorite.name)) {
					setStore({ favorites: [...store.favorites, favorite] });
					setStore({ dataLink: [...store.dataLink, favorite] })
				}
			},

			removeFavorite: (name) => {
				const store = getStore();
				const updatedFavorites = store.favorites.filter(favorite => favorite.name !== name.name);
				setStore({ favorites: updatedFavorites });
			}
		}
	};
};

export default getState;

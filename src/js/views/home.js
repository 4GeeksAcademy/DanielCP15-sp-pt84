import React, { useContext } from "react"
import { Context } from "../store/appContext"
import Header from "../component/Header"
import Card from "../component/Card"
import fondo from "../../img/fondo.jpg"

import "../../styles/home.css"

const Home = () => {
	const { store, actions } = useContext(Context)
	const characters = store.characters
	const planets = store.planets
	const starships = store.starships

	return (

		<>
			<div className="fondo"
				style={{
					backgroundImage: `url(${fondo})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					minHeight: "100vh"
				}} >

				<Header />
				<div className="container pt-3 px-5">
					<h1 className="text-warning mb-4">Characters</h1>
					<div className="horizontal-scroll">
						{characters.map((character, index) => {
							return (
								<Card key={index} name={character.name} uid={character.uid} category="characters" img={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`} />
							)
						})}
					</div>
				</div>

				<div className="container pt-3 px-5">
					<h1 className="text-warning mb-4">Planets</h1>
					<div className="horizontal-scroll">
						{planets.map((planet, index) => {
							return (
								<Card key={index} name={planet.name} uid={planet.uid} category="planets" img={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`} />
							)
						})}
					</div>
				</div>

				<div className="container pt-3 px-5 pb-4">
					<h1 className="text-warning mb-4">Starships</h1>
					<div className="horizontal-scroll">
						{starships.map((starship, index) => {
							return (
								<Card key={starship.uid} name={starship.name} uid={starship.uid} category="starships" img={`https://starwars-visualguide.com/assets/img/starships/${starship.uid}.jpg`} />
							)
						})}
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
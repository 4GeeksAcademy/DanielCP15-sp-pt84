import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import logoStarWars from "../../img/starwars.jpg"
import { Link } from 'react-router-dom'

const Header = () => {
    const { store, actions } = useContext(Context)

    return (
        <>
            <header className="bg-black w-100">
                <div className="container d-flex justify-content-between p-2 px-5">
                    <Link to={"/"}>
                        <img src={logoStarWars} />
                    </Link>

                    <div className="dropdown my-auto">
                        <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Favorites
                        </button>
                        <ul className="dropdown-menu">
                            {store.favorites.map((favorite, index) => (
                                <li key={index} className="d-flex">
                                    <Link to={`/LearnMore/${favorite.category}/${favorite.uid}/${favorite.name}`}>
                                        <span className="dropdown-item">{favorite.name}</span>
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm me-1"
                                        onClick={() => actions.removeFavorite(favorite)}
                                    >
                                        <i className="fa-solid fa-trash fs-6" />
                                    </button>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
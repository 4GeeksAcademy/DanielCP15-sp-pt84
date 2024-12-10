import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import { Link } from "react-router-dom"
import "../../styles/home.css"

const Card = ({ name, uid, category, img }) => {
    const { store, actions } = useContext(Context)
    return (
        <div className="card me-2" style={{ width: "300px" }}>
            <img src={img} className="card-img-top"
                style={{ height: "300px" }}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // Evita el bucle infinito de errores
                    currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; // Imagen de perfil predeterminada
                }} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <div className="d-flex justify-content-between">
                    <Link to={`/LearnMore/${category}/${uid}/${name}`}>
                        <button className="btn btn-dark text-warning">Learn more!</button>
                    </Link>
                    <button className="btn btn-dark ms-auto"
                        onClick={() => {
                            store.favorites.some(fav => fav.name === name)
                                ? actions.removeFavorite({ name })
                                : actions.newFavorite({ name, category, uid })
                        }}>

                        <i className={`fa-solid fa-heart ${store.favorites.some(fav => fav.name === name) ? "text-warning" : "text-white"}`} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card
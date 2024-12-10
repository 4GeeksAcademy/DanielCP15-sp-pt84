import React, { useState, useContext, useEffect } from "react"
import { Context } from "../store/appContext"
import { useParams } from 'react-router-dom'

import Header from "../component/Header"
import fondo from "../../img/fondo.jpg"

const LearnMore = () => {
    const [category, setCategory] = useState("")
    const params = useParams()
    const { store, actions } = useContext(Context)

    useEffect(() => {
        const selectCategory = params.category === "characters" ? "people" : params.category
        setCategory(selectCategory)
    }, [params.category])

    useEffect(() => {
        if (category) {
            actions.getInfo(category, params.uid)
            //console.log(store.info)
        }
    }, [category])

    return (
        <div>
            <div className="fondo"
                style={{
                    backgroundImage: `url(${fondo})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    minHeight: "100vh"

                }}>
                <Header />
                <div className="card mx-auto" style={{ maxWidth: "80%" }}>
                    <div className="row g-0">
                        <div className="col-4">
                            <img src={`https://starwars-visualguide.com/assets/img/${params.category}/${params.uid}.jpg`}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // Evita el bucle infinito de errores
                                    currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; // Imagen de perfil predeterminada
                                }} className="img-fluid rounded-start" />
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">{`${params.name}`}</h5>
                                {
                                    Object.entries(store.info).map(([key, value], index) => {
                                        return (
                                            <p className="card-text">{key}: {value}</p>
                                        )
                                    })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LearnMore
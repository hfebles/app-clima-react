import { useState } from "react"

export const WheatherApp = () => {

    
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'cecfd5af3fbaec735d646fa52edd57f9'
    const diffKelvin = 273.15


    const [ciudad, setCiudad] = useState('')
    const [dataClima, setdataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fetchClima()

    }

    const fetchClima = async() => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()

            console.log(data)

            setdataClima(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container">
            <h1>Aplicacion del clima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name=""
                    value={ciudad}
                    onChange={handleCambioCiudad}
                />
                <button type="submit">Buscar</button>
            </form>

            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima.main.temp - diffKelvin) }°C</p>
                        <p>Condicion: {dataClima.weather[0].main}</p>
                        <p>Detalle: {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />

                    </div>
                )
            }
        </div>
    )
}

import apiService from '../../services/api.service'
import { useState, useEffect } from 'react'

const IndexPage = () => {
    const [input, setInput] = useState([])

    useEffect(() => {
        oneCall()
    }, [])

    const oneCall = () => {
        apiService
            .getInput()
            .then(({ data }) => {
                console.log(data.providers)
                setInput(data.providers)
            })
            .catch(err => console.log(err))
    }



    return (
        <>
            <h1>Indexpage funcional</h1>
            <p>Prueba enviando 1000 euros a méxico</p>
            {
                input.map(provider => {
                    return <>
                        <p>{provider.type}: {provider.name}</p>
                        <p>tasa: {provider.quotes[0].rate}</p>
                        <p>impuesto: {provider.quotes[0].fee}</p>
                        <p>cantidad recibida: {provider.quotes[0].receivedAmount}</p>
                        <hr />
                    </>
                })
            }
        </>
    )

}
export default IndexPage
import apiService from '../../services/api.service'
import { useState, useEffect } from 'react'
import { Container, Form, FormControl } from 'react-bootstrap'

const IndexPage = () => {
    const [input, setInput] = useState([])
    const [sourceCurrency, setSourceCurrency] = useState('')


    useEffect(() => {
        oneCall()
    }, [])

    const oneCall = () => {
        apiService
            .getInput()
            .then(({ data }) => {
                setInput(data.providers)
                console.log(data.providers)
            })
            .catch(err => console.log(err))
    }
    const handleInput = e => {
        setSourceCurrency(e.target.value)
        apiService
            .getSourceCurrency()
            .then(({ data }) => {
                setSourceCurrency(data)
                console.log(data)
            })
            .catch(err => console.log(err))
    }

    const handleClick = e => {
        e.preventDefault()
    }


    return (

        <>
            <Container className="input">
                <Form className="d-flex mb-3 mt-5" onSubmit={handleClick}>
                    <FormControl
                        id="sourceCurrency"
                        type="search"
                        placeholder="Desde"
                        aria-label="Search"
                        onChange={handleInput}
                    />
                </Form >
            </Container >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <h1>Indexpage funcional</h1>
            <p>Prueba enviando 1000 euros a méxico</p>
            {
                input.map(provider => {
                    const { name, type, quotes } = provider
                    return <>
                        <p>{type}: {name}</p>
                        <p>tipo de cambio: {quotes[0].rate} mxn</p>
                        <p>comisión: {quotes[0].fee} euros</p>
                        <p>cantidad recibida: {quotes[0].receivedAmount} mxn</p>
                        <hr />
                    </>
                })
            }
        </>
    )

}
export default IndexPage
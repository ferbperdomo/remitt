import apiService from '../../services/api.service'
import { useState, useEffect } from 'react'
import { Container, Form, FormControl, Button } from 'react-bootstrap'

const IndexPage = () => {
    const [input, setInput] = useState({
        sourceCurrency: "",
        targetCurrency: "",
        sendAmount: 0
    })

    const [source, setSource] = useState(false)

    const { sourceCurrency, targetCurrency, sendAmount } = input

    useEffect(() => {
        checkInput()
    }, [])

    const checkInput = () => {
        if (input) {
            setSource(true)
        }
    }

    const handleInput = e => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })

    }
    const handleSubmit = e => {
        e.preventDefault()
        oneCall()
    }
    const oneCall = () => {
        // setSource(e.target.value)
        apiService
            .getInput(sourceCurrency, targetCurrency, sendAmount)
            .then(({ data }) => {
                setSource(data.providers)
                console.log(data)
            })
            .catch(err => console.log(err))

    }


    return (

        <>
            <Container className="input">
                <Form className="d-flex mb-3 mt-5" onSubmit={handleSubmit}>
                    <FormControl
                        id="sourceCurrency"
                        type="text"
                        placeholder="País de origen"
                        name='sourceCurrency'
                        value={sourceCurrency}
                        onChange={handleInput}
                    />
                    <FormControl
                        id="targetCurrency"
                        type="text"
                        placeholder="País de destino"
                        name='targetCurrency'
                        value={targetCurrency}
                        onChange={handleInput}
                    />
                    <FormControl
                        id="sendAmount"
                        type="number"
                        placeholder="Cantidad a enviar"
                        name='sendAmount'
                        value={sendAmount}
                        onChange={handleInput}
                    />
                    <Button className="form-button" type="submit">Buscar</Button>
                </Form >

            </Container >
            <Container>
                <h1>Envío de dinero al exterior</h1>
                <p>Moneda enviada: {sourceCurrency}</p>
                <p>Moneda recibida: {targetCurrency}</p>
                <p>Cantidad a enviar: {sendAmount}</p>
                <h2>Entre las distintas opciones que encontramos, te ofrecemos estas:</h2>

                {/* {
                    source?.map(provider => {
                        const { name, type, quotes } = provider
                        return <>
                            <p>{type}: {name}</p>
                            <p>tipo de cambio: {quotes[0].rate} mxn</p>
                            <p>comisión: {quotes[0].fee} euros</p>
                            <p>cantidad recibida: {quotes[0].receivedAmount} mxn</p>
                            <hr />
                        </>
                    })
                } */}

            </Container>

        </>
    )

}
export default IndexPage
import apiService from '../../services/api.service'
import countriesService from '../../services/countries.service'
import { useState } from 'react'
import { Container, Form, FormControl, Button, Col, Row } from 'react-bootstrap'
import '../IndexPage/indexPage.css'

const IndexPage = () => {
    const [input, setInput] = useState({
        sourceCurrency: "",
        targetCurrency: "",
        sendAmount: ''
    })

    const [source, setSource] = useState()
    const [sourceCountry, setSourceCountry] = useState()
    const [targetCountry, setTargetCountry] = useState()

    const { sourceCurrency, targetCurrency, sendAmount } = input

    const handleInput = e => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    const handleSourceInput = e => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
        sourceCall(sourceCurrency)
    }

    const handleTargetInput = e => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
        targetCall(targetCurrency)
    }


    const handleSubmit = e => {
        e.preventDefault()
        oneCall()
    }


    const sourceCall = () => {
        countriesService
            .getCountry(sourceCurrency)
            .then(({ data }) => {
                setSourceCountry(data)
                console.log('pais que envía', data)
            })
            .catch(err => console.log(err))
    }

    const targetCall = () => {
        countriesService
            .getCountry(targetCurrency)
            .then(({ data }) => {
                setTargetCountry(data)
                console.log('pais que recibe', data)
            })
            .catch(err => console.log(err))
    }

    const oneCall = () => {
        apiService
            .getInput(sourceCurrency, targetCurrency, sendAmount)
            .then(({ data }) => {
                setSource(data.providers)
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
                        placeholder="Moneda de origen"
                        name='sourceCurrency'
                        value={sourceCurrency}
                        onChange={handleSourceInput}
                    />
                    <FormControl
                        id="targetCurrency"
                        type="text"
                        placeholder="Moneda de destino"
                        name='targetCurrency'
                        value={targetCurrency}
                        onChange={handleTargetInput}
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
                <hr />
                <h2>Entre las distintas opciones que encontramos, te ofrecemos estas:</h2>

                {
                    source?.map(provider => {
                        const { name, type, logos, quotes } = provider

                        return <>
                            <Row className="justify-content-center text-center">

                                <Col >
                                    <img className='logos' src={logos.normal.pngUrl} />
                                    <p>{type}: {name}</p>
                                </Col>
                                <Col className='mt-3' >
                                    <p>tipo de cambio: {quotes[0].rate} {targetCurrency}</p>
                                    <p>comisión: {quotes[0].fee} {sourceCurrency}</p>
                                    <p>cantidad recibida: {quotes[0].receivedAmount} {targetCurrency}</p>
                                </Col>
                            </Row>

                            <hr />
                        </>
                    })
                }

            </Container>

        </>
    )

}
export default IndexPage
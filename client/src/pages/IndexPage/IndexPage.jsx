import apiService from '../../services/api.service'
import { useState, useEffect } from 'react'
import { Container, Form, FormControl, Button, Col, Row } from 'react-bootstrap'
import '../IndexPage/indexPage.css'
import countries from "../../countries.json"

const IndexPage = () => {
    const [input, setInput] = useState({
        sourceCurrency: "",
        targetCurrency: "",
        sendAmount: ''
    })

    const [sourceCountry, setSourceCountry] = useState(countries)
    // const [sourceCountrySearch, setSourceCountrySearch] = useState(countries)
    const [source, setSource] = useState()

    const { sourceCurrency, targetCurrency, sendAmount } = input

    useEffect(() => {
        countrySearch()
    }, [])

    useEffect(() => {
        sourceCountry && countrySearch()
    }, [])

    const handleInput = e => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
        // setSourceCountry(e.target.value)
        // console.log('source country', sourceCurrency)
    }

    const handleSubmit = e => {
        e.preventDefault()
        oneCall()
    }

    const countrySearch = sourceCurrency => {
        const filteredCountries = sourceCountry?.filter(elm => elm.name === sourceCurrency)
        setSourceCountry(filteredCountries)
        console.log('país filtrado', filteredCountries)
        // console.log('hello', sourceCountry[2].name) funciona
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
                        type="search"
                        placeholder="Moneda de origen"
                        name='sourceCurrency'
                        aria-label="Search"
                        value={sourceCurrency}
                        onChange={handleInput}
                    />
                    <FormControl
                        id="targetCurrency"
                        type="search"
                        placeholder="Moneda de destino"
                        name='targetCurrency'
                        aria-label="Search"
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
import apiService from '../../services/api.service'
import { useState, useContext } from 'react'
import { Container, Form, FormControl, Button, Col, Row } from 'react-bootstrap'
import '../IndexPage/indexPage.css'
import greenflow from '../../img/greenflow.png'
import pinkflow from '../../img/pinkflow.png'
import beigeflow from '../../img/beigeflow.png'
import countries from '../../countries.json'
import { ThemeContext } from '../../context/theme.context'

const IndexPage = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    const [input, setInput] = useState({
        sourceCurrency: "",
        targetCurrency: "",
        sendAmount: ''
    })

    const [source, setSource] = useState()
    const [currencies, setCurrencies] = useState()
    const [sourceCountry, setSourceCountry] = useState()
    const [targetCountry, setTargetCountry] = useState()
    const { sourceCurrency, targetCurrency, sendAmount } = input
    console.log('currencies ', currencies)

    const handleInput = e => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        oneCall()
    }

    const oneCall = () => {

        const sendCountry = countries.find(country => country.name === sourceCurrency)
        setSourceCountry(sendCountry.currency.code)

        const receiveCountry = countries.find(country => country.name === targetCurrency)
        setTargetCountry(receiveCountry.currency.code)

        apiService
            .getInput(sendCountry.currency.code, receiveCountry.currency.code, sendAmount)
            .then(({ data }) => {
                setSource(data.providers)
                setCurrencies(data)
                console.log('data', data)
            })
            .catch(err => console.log(err))
    }



    return (

        <div className={theme}>
            <Container className='main'>
                <article className='title' >
                    <h1>Envío de dinero al exterior</h1>
                    <img className='greenflow' src={greenflow} alt="testing color" />
                    <img className='pinkflow' src={pinkflow} alt="testing color" />
                    <img className='beigeflow' src={beigeflow} alt="testing color" />
                </article>
                <hr />
                <Container className="input mb-5">
                    <div className="d-flex justify-content-end">
                        <Button className="theme-btn pull-right" size='sm' variant='outline-light' onClick={toggleTheme}>
                            {theme === 'light' ? '🌜' : '🌞'}
                        </Button>

                    </div>
                    <Form className="mb-3 mt-3" onSubmit={handleSubmit}>
                        <FormControl
                            id="sourcecountry"
                            type="search"
                            placeholder="País remitente"
                            name='sourceCurrency'
                            aria-label="Search"
                            value={sourceCountry}
                            onChange={handleInput}
                        />
                        <br />
                        <FormControl
                            id="targetCurrency"
                            type="search"
                            placeholder="País destinatario"
                            name='targetCurrency'
                            aria-label="Search"
                            value={targetCountry}
                            onChange={handleInput}
                        />
                        <br />
                        <FormControl
                            id="sendAmount"
                            type="number"
                            placeholder="Cantidad a enviar"
                            name='sendAmount'
                            value={sendAmount}
                            onChange={handleInput}
                        />
                        <br />
                        <Button variant="light" type="submit">
                            Submit
                        </Button>
                    </Form>


                </Container >
                {

                    !source ?

                        <p>Por favor introduce lo datos</p>

                        :
                        <>
                            <h2>Entre las distintas opciones que encontramos, te ofrecemos estas:</h2>
                            {
                                source?.map(provider => {
                                    const { logos, quotes } = provider

                                    return <>
                                        <Row className="justify-content-center text-center">

                                            <Col >
                                                {
                                                    theme === 'light' ?
                                                        <img className='logos' src={logos.normal.pngUrl} />
                                                        :
                                                        <img className='logos' src={logos.white.pngUrl} />
                                                }
                                                <p>comisión: {quotes[0].fee} {currencies?.sourceCurrency}</p>
                                            </Col>
                                            <Col className='mt-3' >
                                                <p>tipo de cambio: {quotes[0].rate} {currencies?.sourceCurrency} </p>
                                                <p>cantidad recibida: {quotes[0].receivedAmount} {currencies?.targetCurrency}</p>
                                            </Col>
                                        </Row>

                                        <hr />
                                    </>
                                })
                            }
                            <p>De momento solo tenemos estas opciones</p>
                        </>
                }
            </Container>

        </div>

    )

}
export default IndexPage
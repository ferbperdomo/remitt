import apiService from '../../services/api.service'
import { useState } from 'react'
import { Container, Form, FormControl, Button, Col, Row } from 'react-bootstrap'
import '../IndexPage/indexPage.css'
import greenflow from '../../img/greenflow.png'
import pinkflow from '../../img/pinkflow.png'
import beigeflow from '../../img/beigeflow.png'

const IndexPage = () => {
    const [input, setInput] = useState({
        sourceCurrency: "",
        targetCurrency: "",
        sendAmount: ''
    })

    const [source, setSource] = useState()
    const { sourceCurrency, targetCurrency, sendAmount } = input


    const handleInput = e => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        oneCall()
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

        <Container className='main'>
            <article className='title' >
                <h1>Envío de dinero al exterior</h1>
                <img className='greenflow' src={greenflow} alt="testing color" />
                <img className='pinkflow' src={pinkflow} alt="testing color" />
                <img className='beigeflow' src={beigeflow} alt="testing color" />
            </article>
            <hr />
            <Container className="input mb-5">
                <Form className="mb-3 mt-5" onSubmit={handleSubmit}>
                    <FormControl
                        id="sourceCurrency"
                        type="search"
                        placeholder="Moneda de origen"
                        name='sourceCurrency'
                        aria-label="Search"
                        value={sourceCurrency}
                        onChange={handleInput}
                    />
                    <br />
                    <FormControl
                        id="targetCurrency"
                        type="search"
                        placeholder="Moneda de destino"
                        name='targetCurrency'
                        aria-label="Search"
                        value={targetCurrency}
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
                    <Button className="form-button" type="submit">Buscar</Button>
                </Form >

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
                                            <img className='logos' src={logos.normal.pngUrl} />
                                            <p>comisión: {quotes[0].fee} {sourceCurrency}</p>
                                        </Col>
                                        <Col className='mt-3' >
                                            <p>tipo de cambio: {quotes[0].rate} {targetCurrency}</p>
                                            <p>cantidad recibida: {quotes[0].receivedAmount} {targetCurrency}</p>
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

    )

}
export default IndexPage
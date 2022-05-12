import apiService from '../../services/api.service'
import { useState, useContext } from 'react'
import '../IndexPage/indexPage.css'
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

    const handleInput = e => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        oneCall()
    }

    const oneCall = () => {

        const sendCountry = countries.find(country => country.name.eng === sourceCurrency || country.name.esp === sourceCurrency)
        setSourceCountry(sendCountry)

        const receiveCountry = countries.find(country => country.name.eng === targetCurrency || country.name.esp === targetCurrency)
        setTargetCountry(receiveCountry)

        apiService
            .getInput(sendCountry.currency.code, receiveCountry.currency.code, sendAmount)
            .then(({ data }) => {
                setSource(data.providers)
                setCurrencies(data)
            })
            .catch(err => console.log(err))

    }


    return (

        <div className={theme}>
            <div className='main'>
                <article className='title text-5xl' >
                    <h1>Envío de dinero al exterior</h1>
                </article>
                <hr />
                <div className="input mb-5">
                    <div >
                        <button className="theme-btn pull-right" size='sm' variant='outline-light' onClick={toggleTheme}>
                            {theme === 'light' ? '🌜' : '🌞'}
                        </button>

                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            className='form-control'
                            id="sourcecountry"
                            type="search"
                            placeholder="País remitente"
                            name='sourceCurrency'
                            aria-label="Search"
                            value={sourceCountry?.currency.code}
                            onChange={handleInput}
                        />
                        <br />
                        <input
                            className='form-control'

                            id="targetCurrency"
                            type="search"
                            placeholder="País destinatario"
                            name='targetCurrency'
                            aria-label="Search"
                            value={targetCountry?.currency.code}
                            onChange={handleInput}
                        />
                        <br />
                        <input
                            className='form-control'

                            id="sendAmount"
                            type="number"
                            placeholder="Cantidad a enviar"
                            name='sendAmount'
                            value={sendAmount}
                            onChange={handleInput}
                        />
                        <br />
                        <button className='submit-btn' type="submit">
                            Submit
                        </button>
                        <button className='submit-btn' type="submit">
                            <a href="/">
                                Reset
                            </a>
                        </button>
                    </form>


                </div >
                {

                    !source ?

                        <p>Por favor introduce lo datos</p>

                        :
                        <>
                            <h2>Entre las distintas opciones que encontramos, te ofrecemos estas:</h2>
                            {
                                source?.map(provider => {

                                    const { logos, quotes } = provider

                                    return (
                                        <>
                                            <div className="justify-content-center text-center" >

                                                <div key={provider.id} >
                                                    {
                                                        theme === 'light' ?
                                                            <img className='logos' alt='bank logo' src={logos.normal.pngUrl} />
                                                            :
                                                            <img className='logos' alt='bank logo' src={logos.white.pngUrl} />
                                                    }
                                                    <p>comisión: {quotes[0].fee} {currencies?.sourceCurrency}</p>
                                                </div>
                                                <div className='mt-3' >
                                                    <p>tipo de cambio: {quotes[0].rate} {currencies?.sourceCurrency} </p>
                                                    <p>cantidad recibida: {quotes[0].receivedAmount} {currencies?.targetCurrency}</p>
                                                </div>
                                            </div>

                                            <hr />
                                        </>
                                    )
                                })
                            }
                            <p>De momento solo tenemos estas opciones</p>
                        </>
                }
            </div>

        </div>

    )

}
export default IndexPage
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
                <div className="input mb-5">
                    {/* <div >
                        <button className="theme-btn pull-right" size='sm' onClick={toggleTheme}>
                            {theme === 'light' ? '🌜' : '🌞'}
                        </button>

                    </div> */}

                    <div className="container px-5 py-15 mx-auto flex">
                        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0 relative z-10 shadow-lg">
                            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                                {/* <div className="md:flex md:items-center mb-6"> */}

                                {/* <div className="md:flex md:items-center">
                                    <div className="md:w-1/3"></div>
                                    <div className="md:w-2/3">
                                        <button className="shadow mr-7 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                            type="submit">
                                            Buscar
                                        </button>
                                        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                            <a href="/">

                                                Reiniciar
                                            </a>
                                        </button>
                                    </div>
                                </div> */}

                                <div className="relative mb-4">
                                    <label className="leading-7 text-sm text-gray-600">País origen</label>
                                    <input
                                        id="sourcecountry"
                                        type="search"
                                        name='sourceCurrency'
                                        aria-label="Search"
                                        value={sourceCountry?.currency.code}
                                        onChange={handleInput}
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <div className="relative mb-4">
                                    <label className="leading-7 text-sm text-gray-600">País destino</label>
                                    <input
                                        id="targetCurrency"
                                        type="search"
                                        name='targetCurrency'
                                        aria-label="Search"
                                        value={targetCountry?.currency.code}
                                        onChange={handleInput}
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <div className="relative mb-4">
                                    <label className="leading-7 text-sm text-gray-600">Cantidad a enviar</label>
                                    <input
                                        id="sendAmount"
                                        type="number"
                                        name='sendAmount'
                                        value={sendAmount}
                                        onChange={handleInput}
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>

                                <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Compara</button>
                                <p className="text-xs text-gray-500 mt-3">Buscaremos las mejores opciones para ti.</p>
                            </form>
                        </div>

                    </div>
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

        </div >

    )

}
export default IndexPage
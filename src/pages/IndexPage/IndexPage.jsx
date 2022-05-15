import apiService from '../../services/api.service'
import { useState, useContext } from 'react'
import '../IndexPage/indexPage.css'
import countries from '../../countries.json'
import { ThemeContext } from '../../context/theme.context'

const IndexPage = () => {
    const { theme } = useContext(ThemeContext)

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

        // <div className={theme}>
        <div className='main'>
            <section className="text-gray-400 body-font">
                <div className="container mx-auto flex py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Hemos hecho lo mejor para ti.</h1>
                        <p className="inline-block title-font sm:text-xl text-2xl mb-4 font-medium text-white" >Atrévete y compara. </p>
                        <p className="mb-8 leading-relaxed">Aquí podrás comparar entre las distintas opciones para el envío de remesas y elegir la opción que más te convenga.</p>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 ">
                        <div className="container px-5 py-15 mx-auto flex">
                            <div className="md:w-full bg-white rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0 relative z-10 shadow-lg">
                                <form className="w-full max-w-sm" onSubmit={handleSubmit}>

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
                    </div>

                </div>
            </section>
            {/* <div className="mb-5">
                <div >
                        <button className="theme-btn pull-right" size='sm' onClick={toggleTheme}>
                            {theme === 'light' ? '🌜' : '🌞'}
                        </button>

                    </div>


            </div > */}
            <section className="text-gray-400 body-font">
                <div className="container">
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
                                                <section className="text-gray-600 body-font relative">


                                                    <div className="container px-5 py-5 lg:py-10 mx-auto flex">

                                                        <div className=" bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                                                            <div className="xl:w-1/3 md:w-1/2 p-4" key={provider.id}>
                                                                <div className="w-40 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-2">
                                                                    {
                                                                        theme === 'light' ?
                                                                            <img className="w-20 h-6" viewBox="0 0 24 24" alt='bank logo' src={logos.normal.pngUrl} />
                                                                            :
                                                                            <img className="w-20 h-6" viewBox="0 0 24 24" alt='bank logo' src={logos.white.pngUrl} />
                                                                    }
                                                                </div>
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-3">comisión: {quotes[0].fee} {currencies?.sourceCurrency}</p>
                                                            <p className="text-xs text-gray-500 mt-3">tipo de cambio: {quotes[0]?.rate.toFixed(2)} {currencies?.sourceCurrency} </p>
                                                            <p className="text-xs text-gray-500 mt-3">cantidad recibida: {quotes[0]?.receivedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {currencies?.targetCurrency} </p>
                                                        </div>
                                                    </div>
                                                </section>
                                            </>
                                        )
                                    })
                                }
                                <p>De momento solo tenemos estas opciones</p>
                            </>
                    }
                </div>
            </section>

        </div>

        // </div >

    )

}
export default IndexPage
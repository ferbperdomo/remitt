import apiService from '../../services/api.service'
import { useState } from 'react'
import '../IndexPage/indexPage.css'
import countries from '../../countries.json'
import Select from 'react-select'

const IndexPage = () => {

    const [input, setInput] = useState({
        sourceCurrency: "",
        targetCurrency: "",
        sendAmount: '100'
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

    const sendingOptions = countries.map(country => ({
        value: country.currency.code,
        label: country.name.esp,
        flag: `data:image/png;base64,${country.flag}`

    }))

    const oneCall = () => {

        apiService
            .getInput(sourceCurrency, targetCurrency, sendAmount)
            .then(({ data }) => {
                setSource(data.providers)
            })
            .catch(err => console.log(err))

    }

    return (

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
                                        <Select
                                            id="sourcecountry"
                                            options={sendingOptions}
                                            key={sendingOptions.label}
                                            onChange={e => setInput({ ...input, sourceCurrency: e.value })}
                                            placeholder="Selecciona el país origen"
                                            name='sourceCurrency'
                                            className='bg-white  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-6 transition-colors duration-200 ease-in-out'
                                        />
                                    </div>

                                    <div className="relative mb-4">
                                        <label className="leading-7 text-sm text-gray-600">País destino</label>
                                        <Select
                                            id="targetCurrency"
                                            options={sendingOptions}
                                            key={sendingOptions.label}
                                            onChange={e => setInput({ ...input, targetCurrency: e.value })}
                                            placeholder="Selecciona el país destino"
                                            name='targetCurrency'
                                            className='bg-white  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-6 transition-colors duration-200 ease-in-out'
                                        />
                                    </div>

                                    <div className="relative mb-4">
                                        <label className="leading-7 text-sm text-gray-600">Cantidad a enviar</label>
                                        <input
                                            id="sendAmount"
                                            type="number"
                                            name='sendAmount'
                                            value={sendAmount}
                                            onChange={handleInput}
                                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 pl-2 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>

                                    <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                        Compara
                                    </button>
                                    <p className="text-xs text-gray-500 mt-3">Buscaremos las mejores opciones para ti.</p>
                                </form>
                            </div>

                        </div>
                    </div>

                </div >

            </section >

            <section className="text-gray-400 body-font">
                <div className="container w-full lg:w-10/12 lg:mx-16">
                    {/* {
                        sourceCurrency === '' && targetCurrency === '' ?
                            <div className="flex flex-col text-center w-full mb-10">
                                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Búsqueda vacía</h1>
                                <p className="mb-8 leading-relaxed">Por favor, selecciona los paises.</p>
                            </div>
                            :
                            <br />
                    } */}

                    {
                        source === 0 ?
                            <div className="flex flex-col text-center w-full mb-10">
                                <div className="flex flex-col text-center w-full mb-10">
                                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">No hay opciones disponibles</h1>
                                    <p className="mb-8 leading-relaxed" >Por favor, elige otro país.</p>
                                </div>
                            </div>
                            :

                            source?.map(provider => {

                                const { logos, quotes } = provider

                                return (
                                    <>

                                        <section className="text-gray-600 body-font relative">

                                            <div className="container px-5 py-5 lg:py-10 mx-auto flex">

                                                <div className=" bg-white rounded-lg p-8 flex flex-col md:flex-row w-full mt-10 md:mt-0 relative z-10 shadow-md">
                                                    <div className="xl:w-1/3 md:w-1/2 p-4" key={provider.id}>
                                                        <div className="w-40 md:w-1/2 h-10 py-2.5 px-5 inline-flex items-center justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center">
                                                            <img className="w-10/12 " viewBox="0 0 24 24" alt='bank logo' src={logos.white.pngUrl} />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col w-full md:w-1/2">
                                                        <p className="text-sm text-gray-500 mt-3">Comisión: {quotes[0].fee} {sourceCurrency}</p>
                                                        <p className="text-sm text-gray-500 mt-3">Tipo de cambio: {quotes[0]?.rate.toFixed(2)} {sourceCurrency} </p>
                                                        <p className="text-sm text-gray-500 mt-3">Cantidad recibida: {quotes[0]?.receivedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {targetCurrency} </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </>
                                )
                            })

                    }


                </div>
            </section>

        </div >


    )

}
export default IndexPage
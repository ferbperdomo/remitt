import apiService from '../../services/api.service'
import { useState } from 'react'
import '../IndexPage/indexPage.css'
import countries from '../../countries.json'
import Select from 'react-select'
import { useToast } from '../../hooks/useToast'

const IndexPage = () => {

    const [input, setInput] = useState({
        sourceCurrency: "",
        targetCurrency: "",
        sendAmount: ''
    })
    const [source, setSource] = useState()
    const { sourceCurrency, targetCurrency, sendAmount } = input
    const toast = useToast()

    const handleInput = e => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (sourceCurrency === "" || targetCurrency === "" || sendAmount === "") {
            toast('error', 'Please fill all the fields')
        }
        oneCall()
    }

    const sendingOptions = countries.map(country => ({
        value: country.currency.code,
        label: country.name.esp,
        flag: `data:image/png;base64,${country.flag}`,
    }))




    const oneCall = () => {

        apiService
            .getInput(sourceCurrency, targetCurrency, sendAmount)
            .then(({ data }) => {
                console.log(data)
                setSource(data.providers)
            })
            .catch(err => console.log(err))

    }

    return (

        <div className='main'>
            <section className="text-gray-400 body-font">
                <div className="container mx-auto flex md:py-24 md:flex-row flex-col items-center">

                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Buscamos los envios internacionales más favorables por ti.</h1>
                        <p className="inline-block title-font sm:text-xl text-2xl mb-4 font-medium text-white" >Encuentra un mejor precio en pocos clicks. </p>
                        <p className="mb-8 leading-relaxed">Aquí podrás comparar entre las distintas opciones para el envío de remesas y elegir la opción que más te convenga.</p>
                    </div>

                    <div className="lg:max-w-lg lg:w-full md:w-1/2 ">
                        <div className="container mx-auto ">
                            <div className="w-full bg-white rounded-lg p-8 flex flex-col mt-2 mb-4 md:mb-0 md:mt-0 relative z-10 shadow-lg">
                                <form className="w-full" onSubmit={handleSubmit}>

                                    <div className="relative mb-4">
                                        <label className="leading-7 text-sm text-gray-600">País origen</label>
                                        <Select
                                            id="sourcecountry"
                                            options={sendingOptions}
                                            key={sendingOptions.label}
                                            onChange={e => setInput({ ...input, sourceCurrency: e.value })}
                                            placeholder="Selecciona el país origen"
                                            name='sourceCurrency'
                                            className='bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-6 transition-colors duration-200 ease-in-out'
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
                                            className='bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-6 transition-colors duration-200 ease-in-out'
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

                                    <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full">
                                        Buscar la mejor opción
                                    </button>
                                    <p className="text-xs text-gray-500 mt-3">Lo hacemos por ti.</p>
                                </form>
                            </div>

                        </div>
                    </div>

                </div >

            </section >

            <section className="text-gray-400 body-font">
                <div className="w-full">

                    {/* {
                        oneCall() && sourceCurrency === '' && targetCurrency === '' ?
                            <div className="flex flex-col text-center w-full mb-10">
                                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Búsqueda vacía</h1>
                                <p className="mb-8 leading-relaxed">Por favor, selecciona los paises.</p>
                            </div>
                            :
                            null
                    } */}


                    {
                        source == 0 ?
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

                                        <section className=" body-font relative">

                                            <div className="container py-5 lg:py-10 mx-auto flex ">

                                                <div className="bg-white rounded-lg p-8 flex flex-col md:flex-row w-full lg:w-10/12 lg:m-auto">

                                                    <div className="flex mt-3 place-content-between align-middle md:flex-col md:mx-12 lg:mx-7" >
                                                        <div >
                                                            <img className="w-28 max-h-14 object-cover lg:w-60" viewBox="0 0 24 24" alt='bank logo' src={logos.normal.svgUrl} />
                                                        </div>
                                                        <div className='px-4 py-2 my-1 text-xs md:my-3 lg:mx-7 leading-none text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"'>
                                                            <p >Comisión: </p>
                                                            <p >{quotes[0].fee} {sourceCurrency}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col w-full text-sm text-black md:items-center md:text-base lg:flex-row lg:justify-evenly lg:text-xl">
                                                        <div className=' flex flex-row lg:flex-col'>
                                                            <p className="mt-3">Tú envías:&nbsp; </p>
                                                            <p className="mt-3 lg:mt-0"> {sendAmount} {sourceCurrency}</p>
                                                        </div>
                                                        <div className=' flex flex-row lg:flex-col'>
                                                            <p className="mt-3">Allí reciben:&nbsp; </p>
                                                            <p className="mt-3 lg:mt-0"> {quotes[0]?.receivedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} {targetCurrency} </p>
                                                        </div>
                                                    </div>

                                                    <div className='mt-6 md:mx-12 md:mt-3 lg:mx-7'>
                                                        <button type="button" className="rounded-lg text-sm lg:text-lg px-5 py-2.5 text-center flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ">
                                                            Enviar dinero
                                                            <svg className="w-5 h-5 lg:w-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </>
                                )
                            })

                    }


                </div>
            </section >

        </div >


    )

}
export default IndexPage
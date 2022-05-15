export default function Login() {
    return (

        <section className="text-gray-400 body-font">
            <div className="container mx-auto flex py-24 flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 flex flex-col mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Estamos trabajando en esto.</h1>
                    <p className="inline-block title-font sm:text-xl text-2xl mb-4 font-medium text-white" >Te avisamos en cuanto esté disponible </p>
                    <p className="mb-8 leading-relaxed">Aquí podrás comparar entre las distintas opciones para el envío de remesas y elegir la opción que más te convenga.</p>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 ">
                    <div className="container px-5 py-15 mx-auto flex">
                        <div className="md:w-full bg-white rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0 relative z-10 shadow-lg">
                            <form className="w-full max-w-sm">
                                <div className="relative mb-4">
                                    <label className="leading-7 text-sm text-gray-600">Nombre</label>
                                    <input
                                        id="sourcecountry"
                                        type="search"
                                        name='sourceCurrency'
                                        aria-label="Search"
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>

                                <div className="relative mb-4">
                                    <label className="leading-7 text-sm text-gray-600">Email</label>
                                    <input
                                        id="sourcecountry"
                                        type="search"
                                        name='sourceCurrency'
                                        aria-label="Search"
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>

                                <button type='submit' className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Avísame</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
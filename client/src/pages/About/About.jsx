import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'
import { useContext } from 'react'
import { ThemeContext } from '../../context/theme.context'

const features = [
    {
        name: 'Envío de remesas a todo el mundo',
        description:
            'Sin importar el país de origen. No importa si es una persona física o una empresa. Aquí puedes consultar la mejor opción de envío para ti. ',
        icon: GlobeAltIcon,
    },
    {
        name: 'Transparencia',
        description:
            'Nuestros servicios son transparentes. No necesitas registrarte para poder realizar una consulta. Es tan fácil como una consulta en línea.',
        icon: ScaleIcon,
    },
    {
        name: 'Tasas de cambio a tiempo real',
        description:
            'Las tasas de cambio son actualizadas a tiempo real. Así puedes saber con exactitud cuánto te costará enviar una remesa a otro país en ese instante.',
        icon: LightningBoltIcon,
    },
    {
        name: 'Obtén alertas de envíos',
        description:
            'Podrás recibir alertas cuando haya una variación en el precio de envío. No te preocupes, no te cobramos nada.',
        icon: AnnotationIcon,
    },
]
const teamMembers = [
    {
        name: 'Cristian Perdomo',
        title: 'Fullstack Developer',
        image: 'https://media-exp1.licdn.com/dms/image/C4D03AQFRvhLfTkSJIA/profile-displayphoto-shrink_800_800/0/1647878416644?e=1658361600&v=beta&t=3Gq7pajDSPH9UkRM65gTPRRGS8hRZ6nTRO5DchHTl1g',
        media: 'https://www.linkedin.com/in/ferbperdomo/'
    },
    {
        name: 'Mikel Vallejo',
        title: 'Growth Engineer',
        image: 'https://media-exp1.licdn.com/dms/image/C4D03AQERv-M5fKmcvA/profile-displayphoto-shrink_800_800/0/1636979394064?e=1658361600&v=beta&t=ceAMJhpdrIXLl4JuaJEfkJNRWsdf8-gFDvIUBAT9c4s',
        media: 'https://www.linkedin.com/in/mikelvallejo/'
    },
]

export default function About() {
    const { theme } = useContext(ThemeContext)
    return (
        <>
            <div className={theme === "dark" ? "dark" : "light"}>
                <div className={'mb-10 px-5 py-10'}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15">
                        <div className="lg:text-center">
                            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">¿Por qué usar nuestros servicios?</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                                Puedes obtener más por el dinero que envías.
                            </p>
                            <p className="my-6 max-w-2xl text-xl lg:mx-auto">
                                Nuestros servicios son gratuitos y no te cobramos nada. Nos interesa que puedas usar nuestros servicios para mejorar tu vida.
                                Escoge el país de origen y el destino de tu remesa y obtén la mejor opción de envío.

                            </p>
                        </div>

                        <div className="mt-10">
                            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative">
                                        <dt>
                                            <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 ">
                                                <feature.icon className="h-6 w-6" aria-hidden="true" />
                                            </div>
                                            <p className="ml-16 text-lg leading-6 font-medium ">{feature.name}</p>
                                        </dt>
                                        <dd className="mt-2 ml-16 text-base">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div className={theme === "dark" ? "light" : "dark"}>

                <div className="px-5 py-10 ">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15">
                        <div className="lg:text-center">
                            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Equipo</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                                ¿Quiénes somos?
                            </p>
                            <p className="my-6 max-w-2xl text-xl text-gray-300 lg:mx-auto">
                                Nos dedicamos a la creación de soluciones tecnológicas para la comunidad. Nuestra misión es ayudar a las personas a mejorar su vida.
                                En esta ocasión te brindamos una herramienta que te ayudará a conseguir más por el dinero que envías.
                            </p>
                        </div>
                        <div>
                            <div className="flex justify-evenly items-center">
                                {teamMembers.map((member) => (
                                    <div key={member.name}>
                                        <div className="flex-col flex justify-evenly items-center">
                                            <div className='m-auto py-3'>
                                                <img
                                                    className="w-20 h-20 rounded-full"
                                                    src={member.image}
                                                    alt={member.name}
                                                />
                                            </div>
                                            <a
                                                href={member.media}
                                                target="_blank"
                                            >
                                                <p className="text-lg leading-6 font-medium text-gray-300 py-3">{member.name}</p>
                                            </a>
                                            <p className="text-base text-gray-400">{member.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>


    )
}





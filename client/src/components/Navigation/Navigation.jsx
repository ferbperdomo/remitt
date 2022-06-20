import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import './navigation.css'
import logo from './../../img/logo.svg'
import Switch from "react-switch"
import { useContext } from 'react'
import { ThemeContext } from '../../context/theme.context'

const navigation = [
    { name: 'Compara', href: '/', current: false },
    { name: 'Quienes somos', href: '/about', current: false },
    { name: 'Crea una alerta', href: '/signup', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const { theme, toggleTheme } = useContext(ThemeContext)


    return (

        <Disclosure as="nav" className={theme}>
            {({ open }) => (
                <>
                    <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-2 sm:px-6 xl:px-0">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">

                                {/* Mobile menu button*/}
                                <Disclosure.Button className="toggle inline-flex items-center justify-end p-2 rounded-md text-white hover:text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            <div className="flex items-center px-4 justify-center sm:items-stretch sm:justify-start">

                                <div className="flex-shrink-0 flex items-start">
                                    <Link
                                        to={'/'}
                                    >
                                        <img
                                            className="h-8 logo"
                                            src={logo}
                                            alt="Workflow"
                                        />
                                    </Link>
                                </div>
                                <div className='switch flex flex-col'>
                                    < Switch onChange={toggleTheme} checked={theme === "dark"} />
                                    <label >
                                        {theme === 'light' ? "light mode" : "dark mode"}
                                    </label>
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium',
                                                    item.name === 'Crea una alerta' ? 'md: hidden' : 'inline-flex',
                                                )}
                                            // aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>

                                </div>


                            </div>
                            <div className="absolute hidden md:inline-grid inset-y-0 left-0  items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Link to={"/signup"}>
                                    <button type="button" className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                        Crea una alerta
                                    </button>
                                </Link>
                            </div>

                        </div>

                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col items-end">
                            {navigation.map((item) => (
                                <Disclosure.Button>

                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>

    )
}

import { Routes, Route } from 'react-router-dom'
import IndexPage from './../pages/IndexPage/IndexPage'
import CountriesPage from '../pages/CountriesPage/CountriesPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route path='/countries' element={<CountriesPage />} />
        </Routes >
    )
}

export default AppRoutes
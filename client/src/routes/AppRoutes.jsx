import { Routes, Route } from 'react-router-dom'
import IndexPage from '../pages/IndexPage/IndexPage'
import About from './../pages/About/About'
import Login from './../pages/Login/Login'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
        </Routes >
    )
}

export default AppRoutes
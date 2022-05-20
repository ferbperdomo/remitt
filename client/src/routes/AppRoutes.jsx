import { Routes, Route } from 'react-router-dom'
import IndexPage from '../pages/IndexPage/IndexPage'
import About from './../pages/About/About'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/signup' element={<SignUpPage />} />
        </Routes >
    )
}

export default AppRoutes
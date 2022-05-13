import { Routes, Route } from 'react-router-dom'
import IndexPage from './../pages/IndexPage/IndexPage'
import About from './../pages/About/About'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route path='/about' element={<About />} />
        </Routes >
    )
}

export default AppRoutes
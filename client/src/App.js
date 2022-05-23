import './App.css'
import AppRoutes from './routes/AppRoutes'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Navigation />
      <main>
        <AppRoutes />
      </main>
    </>
  )
}

export default App

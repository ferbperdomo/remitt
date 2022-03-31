import axios from 'axios'

class CountriesService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `https://restcountries.com/v3.1/name/`
        })
    }
    getCountry(country) {
        return this.axiosApp.get(`${country}`)
    }
}

const countriesService = new CountriesService()
export default countriesService
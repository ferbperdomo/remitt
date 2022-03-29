import axios from 'axios'

class ApiService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `https://api.transferwise.com/v3/comparisons/`
        })
    }

    getInput() {
        return this.axiosApp.get(`?sourceCurrency=EUR&targetCurrency=MXN&sendAmount=1000`)
    }

    // getInput() {
    //     return this.axiosApp.get(`?sourceCurrency=${sourceCurrency}&targetCurrency=${targetCurrency}&sendAmount=${ammount}`)
    // }
}

const apiService = new ApiService()
export default apiService

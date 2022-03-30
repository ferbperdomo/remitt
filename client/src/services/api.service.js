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

    getSourceCurrency(inputValue) {
        return this.axiosApp.get(`?sourceCurrency=${inputValue}`)
    }
}

const apiService = new ApiService()
export default apiService

import axios from 'axios'

class ApiService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: `https://api.transferwise.com/v3/comparisons/`
        })
    }

    getInput(sourceCurrency, targetCurrency, sendAmount) {
        return this.axiosApp.get(`?sourceCurrency=${sourceCurrency}&targetCurrency=${targetCurrency}&sendAmount=${sendAmount}`)
    }

   
}

const apiService = new ApiService()
export default apiService

import countries from '../../countries.json'
import { useState, useEffect } from 'react'
import { Container, Form, FormControl, Button } from 'react-bootstrap'

const CountriesPage = () => {
    const [input, setInput] = useState({ country: '' })
    const [sourceCountry, setSourceCountry] = useState()
    const [targetCountry, setTargetCountry] = useState()


    useEffect(() => {
        countries?.map(country => {
            if (input.country === country.name) {
                setSourceCountry(country)
            }
        })
    }, [input.country])


    const handleInput = e => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }


    const handleSubmit = e => {
        e.preventDefault()
        oneCall()
    }

    const oneCall = () => {
        const country = countries.filter(country => country.name === input.country)
        setSourceCountry(country)
        console.log('pais', country)
        console.log('input', input)
    }



    return (

        < Container className="main" >
            <h1>Countries Page</h1>


            <Form className="mb-3 mt-5" onSubmit={handleSubmit}>
                <FormControl

                    id="sourcecountry"
                    type="search"
                    placeholder="Remitente"
                    name='country'
                    aria-label="Search"
                    value={sourceCountry?.name}
                    onChange={handleInput}
                />
                <br />
                
                <FormControl

                    id="targetcountry"
                    type="search"
                    placeholder="Destinatario"
                    name='country'
                    aria-label="Search"
                    value={targetCountry?.name}
                    onChange={handleInput}
                />
                <br />

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>



        </Container >

    )
}
export default CountriesPage
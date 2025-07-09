import { countries } from "../../data/countries"
import styles from './Form.module.css'
import { useState } from "react"
import type { SearchType } from "../../types"
import Alert from "../alert/Alert"

type FormPros = {
    fetchWeather: (search: SearchType) => Promise<void>;
}

export default function Form({fetchWeather}: FormPros) {
    const [alert, setAlert] = useState('')

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios')
            
        } else {
            fetchWeather(search)
            setAlert('')
        }
    }

  return (
    <form className={styles.form}
    onSubmit={handleSubmit}>
        {alert && <Alert>{alert}</Alert>}
        <div className={styles.field}>
            <label htmlFor="city">Ciudad:</label>
            <input type="text" 
            name="city"
            id="city"
            placeholder="Ciudad"
            value={search.city}
            onChange={handleChange}/>
        </div>
        <div className={styles.field}>
            <label htmlFor="country">País: </label>
            <select
            id="country"
            name="country"
            value={search.country}
            onChange={handleChange}>
                <option>--Seleccione un Pais--</option>
                {countries.map(country => (
                    <option key={country.code} value={country.code}>
                        {country.name}
                    </option>
                )) }
            </select>
        </div>
        <input className={styles.submit} type="submit" value='Consultar clima' />
    </form>
  )
}

import React from 'react'
import { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { GEO_API_URL, geoApiOptions} from '../../Api'

function Search({onSearchChange}) {

    const [search, setSearch] = useState(null)

    async function LoadOptions(inputValue) {
        try {
            const response = await fetch(
                `${GEO_API_URL}/cities?minPopulatiion=500000&namePrefix=${inputValue}`, geoApiOptions)
            const response_1 = await response.json()
            return {
                options: response_1.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    }
                })
            }
        } catch (err) {
            return console.error(err)
        }
    } 

    const handleOnChange = (searchData) => {
        setSearch(searchData)
        onSearchChange(searchData)
    }

  return (
    
    <AsyncPaginate  
    placeholder="Search for city"
    debounceTimeout={600}
    value={search}
    onChange={handleOnChange}
    loadOptions={LoadOptions} 
    />
  )
}

export default Search
import axios from "axios";
import {z} from "zod";
import type { SearchType } from "../types";
import { useMemo, useState } from "react";


//Zid
export const SearchSchema = z.object({
    name: z.string(),
    main: z.object({ 
        temp: z.number(),
        temp_min: z.number(),
        temp_max: z.number(),
    })
})

export type Weather = z.infer<typeof SearchSchema>;

const InitialWeather: Weather = {
    name: '',
    main: {
        temp: 0,
        temp_min: 0,
        temp_max: 0  
}
}

export default function useWeater() {
    const [notFound, setNotFound] = useState(false);

    const [weather, setWeather] = useState<Weather>(InitialWeather)

    const [loading, setLoading] = useState(false);

    const fetchWeather = async (search: SearchType) => {
        const appid = import.meta.env.VITE_API_KEY;
        setLoading(true);
        setWeather(InitialWeather);
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appid}`;
            const {data} = await axios.get(geoUrl);
            // Comprobar si existe data
            if (!data[0]){
                setNotFound(true);
                return
            }
            const lat = data[0].lat;
            const lon = data[0].lon;
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`;
            const {data: weatherData} = await axios.get(weatherUrl);

            const result = SearchSchema.safeParse(weatherData);

            if (result.success) {
                setNotFound(false)
                setWeather(result.data)
            }

        } catch (error) {
            console.log(error);
            
        }
        finally {
            setLoading(false);
        }
    }
    const hasWeatherData = useMemo(() => weather.name, [weather]);


    return {
        loading,
        hasWeatherData,
        weather,
        fetchWeather,
        notFound,
    }

}

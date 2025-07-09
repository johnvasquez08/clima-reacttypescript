import styles from './App.module.css';
import Alert from './components/alert/Alert';
import Form from './components/form/Form';
import Spinner from './components/spinner/Spinner';
import WeatherDetail from './components/weatherdetail/WeatherDetail';
import useWeater from './hooks/useWeater';

Spinner


function App() {
  const { weather ,fetchWeather, hasWeatherData, loading, notFound } = useWeater();

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>
      <div className={styles.container}>
        <Form
        fetchWeather = {fetchWeather}
        />
      {loading &&  <Spinner/>}
        {hasWeatherData &&
        <WeatherDetail
          weather={weather}
        />}
        {notFound ? <Alert>Ciudad no encontrada</Alert> : ''}

        
      </div>
      
    </>
  )
}

export default App

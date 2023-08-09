/* eslint-disable max-len */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/space-before-blocks */
/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import styles from './WeatherInfo.module.css';

const WeatherInfo: React.FC = ():JSX.Element | null => {
    const { data, error, loading } = useSelector((state:RootState) => state.weather);
   if (error){
    return <div>Error: {error}</div>;
   }
   if (loading){
    return <div>Loading...</div>;
   }
   if (!data) {
    return null;
   }
  return (
    <div>
        <h2 className={styles.caption}>Weather information:</h2>
        <div className={styles.weather}>
        <p className={styles.weather_info}>City: {data.name}</p>
        <p className={styles.weather_info}>Country: {data.sys.country}</p>
        <p className={styles.weather_info}>Temperature: {(data.main.temp - 273.15).toFixed(1)} &#8451;</p>
        <p className={styles.weather_info}>Max temperature: {(data.main.temp_max - 273.15).toFixed(1)} &#8451;</p>
        <p className={styles.weather_info}>Min temperature: {(data.main.temp_min - 273.15).toFixed(1)} &#8451;</p>
        <p className={styles.weather_info}>Description: {data.weather[0].description}</p>
        <p className={styles.weather_info}>Humidity: {data.main.humidity}%</p>
        <p className={styles.weather_info}>Wind: {data.wind.speed} km/h</p>
        </div>
    </div>
  );
};

export default WeatherInfo;

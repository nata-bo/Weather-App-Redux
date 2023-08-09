/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/function-component-definition */
import React, { useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../redux/weatherSlice';
import styles from './WeatherForm.module.css';

const WeatherForm: FC = (): JSX.Element => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // отключаем дефолтное поведения тега (form)
    e.preventDefault();
    dispatch(fetchWeather(city));
    setCity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        className={styles.textinput}
        // Ниже двухстороння связка состояния и input
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />
      <button type="submit" className={styles.get_weather}>Get weather</button>
    </form>
  );
};

export default WeatherForm;

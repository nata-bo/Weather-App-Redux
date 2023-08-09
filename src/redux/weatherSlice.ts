/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from './store';

interface DataWeather {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind:{
    speed: number;
  };
  sys: {
    country: string;
  }
  weather: {
    description: string;
  }[];
}
interface WeatherState {
  loading: boolean;
  error: string | null;
  data: DataWeather | null;
}

const initialState: WeatherState = {
  loading: false,
  error: null,
  data: null,
};

const appSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherStart(state) {
      state.loading = true;
      state.error = null;
      state.data = null;
    },
    fetchWeatherSuccess(state, actions: PayloadAction<DataWeather>) {
      state.loading = false;
      state.data = actions.payload;
    },
    fetchWeatherFailure(state, actions: PayloadAction<string>) {
      state.loading = false;
      state.error = actions.payload;
    },
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } =
  appSlice.actions;

export const fetchWeather = (city: string):any => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchWeatherStart());
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fa1e72ff893c6a4a5ed4077327e855b4`
    );
    dispatch(fetchWeatherSuccess(res.data));
  } catch (error: any) {
    dispatch(fetchWeatherFailure(error.message));
  }
};
export const weatherReducer = appSlice.reducer;

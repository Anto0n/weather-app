import React, { useEffect } from "react";
import { View } from "react-native";
import { Text, SearchBar } from "react-native-elements";
import MetaWeatherApi from "libs/metaWeatherApi";
import WeatherCard from "./WeatherCard";

import { STYLES } from "./styles";

const Weather = ({
  coordinates,
  setCoordinates,
  setForecast,
  forecast,
  setIsLoading,
  isLoading,
  setError,
  error,
  search,
  setSearch,
}) => {
  const metaWeatherApi = new MetaWeatherApi();

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setCoordinates({ latitude, longitude });
      },
      (error) => {
        setError(error);
      }
    );
    setIsLoading(false);
  };

  const getWeather = async () => {
    const weather = await metaWeatherApi.getWeatherByLocation({
      coordinates,
      locationName: search,
    });

    setForecast(weather);
    setIsLoading(false);
  };

  const handleSearchUpdate = (input) => {
    setSearch(input);
    getWeather();
  };

  const handleSearchClear = () => {setSearch(''); getWeather();};

  useEffect(() => {
    setIsLoading(true);
    getLocation();
    getWeather();
  }, []);

  if (forecast) {
    return (
      <View style={[STYLES.container]}>
        <View style={[STYLES.searchBar]}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={handleSearchUpdate}
            onClear={handleSearchClear}
            value={search}
          />
        </View>
        <View style={STYLES.headerContainer}>
          {!forecast.default ? (
            <WeatherCard
              forecast={forecast}
              error={error}
              search={search}
              setSearch={setSearch}
            />
          ) : (
            <Text style={STYLES.error}>{search} Not found</Text>
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View style={STYLES.headerContainer}>
        <Text style={STYLES.error}>Something went wrong...</Text>
        <Text style={STYLES.error}>Try to reload your App</Text>
      </View>
    );
  }
};

export default Weather;

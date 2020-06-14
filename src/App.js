import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { registerRootComponent } from "expo";
import Weather from "./screens/weather/Weather";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [forecast, setForecast] = useState();
  const [search, setSearch] = useState();
  const [coordinates, setCoordinates] = useState({
    latitude: "50.4501",
    longitude: "30.5234",
  });

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <Weather
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          setForecast={setForecast}
          forecast={forecast}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          error={error}
          setError={setError}
          search={search}
          setSearch={setSearch}
        />
      ) : (
        <Text>Is loading...</Text>
      )}
    </View>
  );
};

export default registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: "center",
    justifyContent: "center",
  },
});

import React from "react";
import { View } from "react-native";
import { Text, SearchBar } from "react-native-elements";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { weatherConditions } from "libs/weatherConditions";

import { STYLES } from "./styles";

const weatherCard = ({ forecast, isError }) => {
  const { title, weather } = forecast;
  const { weather_state_abbr, temperature, backgroundColor } = weather;

  return (
    <View style={[STYLES.weatherContainer, { backgroundColor }]}>
      <View style={STYLES.headerContainer}>
        <Text style={STYLES.tempText}> {temperature}˚</Text>
        <MaterialCommunityIcons
          size={72}
          name={weatherConditions[weather_state_abbr].icon}
          color={"#fff"}
        />
        <Text style={STYLES.title}>
          {weatherConditions[weather_state_abbr].title}
        </Text>
        <Text style={STYLES.city}>{title}</Text>
      </View>
    </View>
  );
};

export default weatherCard;

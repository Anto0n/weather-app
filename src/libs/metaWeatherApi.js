import axios from "axios";
import { getBackgroundColor } from 'utils/helpers.js';

export default class MetaWeatherApi {
  constructor () {
    this.apiDomain = 'https://www.metaweather.com/api/';
    this.defaultSearchQuery = 'location/search/?';
    this.defaultCity = { title: 'Kiev', woeid: '924938', default: true };
    this.notFound = false;
  }

  buildQuery ({ locationName, coordinates, locationId }) {
    const searchQuery = `${this.apiDomain}${this.defaultSearchQuery}`;

    if (locationName) {
      const searchLocationByNameQuery = 'query=';

      const query = `${searchQuery}${searchLocationByNameQuery}${locationName}`;

      return query;
    }

    if (coordinates) {
      const { latitude, longitude } = coordinates;
      const searchLocationByCoordinatesQuery = 'lattlong=';

      const query = `${searchQuery}${searchLocationByCoordinatesQuery}${latitude},${longitude}`;

      return query;
    }

    if (locationId) {
      const searchByLocation = 'location/';

      const query = `${this.apiDomain}${searchByLocation}${locationId}`;

      return query;
    }
  }

  async locationSearchByName (locationName) {
    try {
      const query = this.buildQuery({ locationName })
      const location = await axios.get(query);

      if (location.data.length) {
        const { title, woeid } = location.data[0];

        return { title, woeid };
      }

      return undefined;
    } catch (error) {
      console.error(error);
    }
  }

  async locationSearchByCoordinates (coordinates) {
    try {
      const { latitude, longitude } = coordinates;
      const query = this.buildQuery({ coordinates });
      const location = await axios.get(query);

      if (location.data.length) {

        const { title, woeid } = location.data[0];

        return { title, woeid };
      }

      return undefined;
    } catch (error) {
      console.error(error);
    }
  }

  async getWeatherByLocation ({ coordinates, locationName }) {
    try {
      let city;
      if (locationName) city = await this.locationSearchByName(locationName);
      else if (coordinates) city = await this.locationSearchByCoordinates(coordinates);

      if (city) {
        const { title, woeid } = city;

        const query = this.buildQuery({ locationId: woeid } );
        const response = await axios.get(query);

        const { consolidated_weather } = response.data;
        const weatherFromFirstSource = consolidated_weather[0];

        const { the_temp } = weatherFromFirstSource;
        const temperature = parseInt(the_temp);
        const backgroundColor = getBackgroundColor(temperature);

        return { title, weather: { ...weatherFromFirstSource, temperature, backgroundColor } };
      }

      return this.defaultCity;
    } catch (error) {
      console.error(error);
    }
  }
}
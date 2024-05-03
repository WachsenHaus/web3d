import { useEffect, useState } from 'react';
import Earth from './Earth';
import Weather from './Weather';
import { getCityWeather, getCurrentWeahter } from '../utils/weatherApi';
import { cities } from '../utils/cities';

const key = process.env.REACT_APP_API_KEY;

const Scene = () => {
  const [content, setContent] = useState();

  const getCitiesWeather = () => {
    const promises = cities.map((element) => {
      return getCityWeather(element, key);
    });
    Promise.all(promises)
      .then((data) => setContent(data))
      .catch((error) => {
        console.log(error);
        return setContent([]);
      });
  };

  useEffect(() => {
    getCitiesWeather();
  }, []);

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <>
      <Earth position={[0, -2, 0]} />
      {content?.map((element, index) => {
        return (
          <Weather
            key={index + 'model key'}
            position={[-1 + index * 0.5, 0, 0]}
            weather={element.weatherData.weather[0].main.toLowerCase()}
          />
        );
      })}
    </>
  );
};

export default Scene;

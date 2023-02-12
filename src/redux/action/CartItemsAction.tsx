import axios from 'axios';
import {GET_DATA, IS_LOGGED} from '../types';

// export const getWeather = currentAddress => async dispatch => {
//   console.log(currentAddress, 'currentAddress in actions');
//   const {data} = await axios.get(
//     `https://api.openweathermap.org/data/2.5/forecast?zip=11102&weather?q=${currentAddress}&APPID=6113ff2d6d0ef09bd1a0cc061a15fbfb&units=metric`,
//   );
//   console.log(data, 'response in actions');
//   const dailyInfo = data.list.filter(item => {
//     return item.dt_txt.includes('18:00:00');
//   });
//   console.log(dailyInfo, 'dailyInfo in main screen');

//   dispatch({
//     type: GET_DATA,
//     payload: dailyInfo,
//   });
// };

export const isLoggedIn = (name: string) => {
  return {
    type: IS_LOGGED,
    payload: {name},
  };
};

export const cartItemsData = (data: any) => {
  return {
    type: GET_DATA,
    payload: data,
  };
};

import * as React from 'react';
import { useState, useEffect } from 'react';
import { ICars, getCars } from './cars'
import axios from 'axios';

const App: React.FC = () => {

  const [duration, setDuration] = useState<string>('0');
  const [distance, setDistance] = useState<string>('0');
  const [cars,setCars] = useState([]);
  const [error, setError] = useState('');

  const handleInputDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value);
  }

  const handleInputDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(event.target.value);
  }
  
  let data: ICars[] //; = getCars(duration, distance);

  // Ideally, this will update the data via another call to the API
  // Throws a hook warning at the moment
  // useEffect(() => {
  //   const data = getCars(duration, distance);
  // }, [duration, distance]);


  // We retrieved the get request here for it to work
  useEffect(() => {
    const params = {
      duration : parseInt(duration) | 0,
      distance : parseInt(distance) | 0
    };

    axios
      .get<ICars[]>('./cars.json', {params})
      .then(response => {
          setCars(response.data);
          console.log(response.data[0])
      })
      .catch(ex => {
          setError(ex.response);
          console.log(error);
      });

    
  }, [duration, distance]);

  return(
  <div>
    <div className='header'>
      Cars
      <div className='search'>
        <input id="message" type='text' onChange={handleInputDurationChange} placeholder="Rental duration" /> 
        <input id="message" type='text' onChange={handleInputDistanceChange} placeholder="Distance"/> 
      </div>
    </div>
    <div className='main'>
      <ul className='cars'>
        {cars.map( (car) => (
          <li key={car.id}>
            <img className='car-pic' src={car.picturePath} alt='Car picture'/>
            <div className='car-attr'>
              <p><b>{car.brand} </b>{car.model}</p>
              <p>Price/day : {car.pricePerDay}</p>
              <p>Price/km : {car.pricePerKm}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default App;

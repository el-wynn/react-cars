import * as React from 'react';
import { useState, useEffect } from 'react';
import { ICars, getCars } from './cars'

const App: React.FC = () => {

  const [duration, setDuration] = useState<string>('');
  const [distance, setDistance] = useState<string>('');

  const handleInputDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value);
  }

  const handleInputDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(event.target.value);
  }

  const data: ICars[]  = getCars(duration, distance);
  
    // useEffect(() => {
    //   const fdata = getCars(duration, distance);
    // }, [duration, distance]);
  
  return(
  <div>
    <div className='header'>
      Cars
      <div className='search'>
        <input id="message" type='text' onChange={handleInputDurationChange} placeholder="Duration" /> 
        <input id="message" type='text' onChange={handleInputDistanceChange} placeholder="Distance"/> 
      </div>
    </div>
    <div className='main'>
      <ul className='cars'>
        {data.map( (car) => (
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

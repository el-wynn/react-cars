import * as React from 'react';
import { useState, useEffect } from 'react';
import { ICars, getCars } from './cars'
import axios from 'axios';
import numeral from 'numeral';

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
          console.log(response.data.length + " cars found");
      })
      .catch(ex => {
          setError(ex.response);
          console.log(error);
      });

    
  }, [duration, distance]);

  // Element that will display only if both inputs are not empty
  const TotalPrice = (props) => {
    if (parseInt(duration) != 0 && parseInt(distance) != 0) {
      let totalPrice:number = props.pricePerDay/100 * parseInt(duration) + props.pricePerKm/100 * parseInt(distance);
      return (<p className='total-price'>Total Price : {numeral(totalPrice).format('0,0.00')} €</p>)
    }
    return null;
  }

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
              <p>Price/day : {numeral(car.pricePerDay/100).format('0.00')} €</p>
              <p>Price/km : {numeral(car.pricePerKm/100).format('0.00')} €</p>
              <TotalPrice 
                pricePerDay={car.pricePerDay} 
                pricePerKm={car.pricePerKm}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default App;

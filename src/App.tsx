import * as React from 'react';
import { useState, useEffect } from 'react';
import { ICars } from './cars'
import axios from 'axios';
import numeral from 'numeral';

const App: React.FC = () => {

  const [duration, setDuration] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [cars,setCars] = useState([]);
  const [error, setError] = useState('');

  const handleInputDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(parseInt(event.target.value));
  }

  const handleInputDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(parseInt(event.target.value));
  }

  // Ideally, this will update the data via another call to the API
  // from another component, cars
  // Throws a hook warning at the moment
  // useEffect(() => {
  //   const data = getCars(duration, distance);
  // }, [duration, distance]);


  // We retrieved the get request here for it to work
  useEffect(() => {
    const params = {
      duration : duration | 0,
      distance : distance | 0
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
    if (duration != 0 && distance != 0) {
      let totalPrice:number = props.pricePerDay * duration + props.pricePerKm * distance;
      return (<p className='total-price'>Total Price : {formatPrice(totalPrice)} €</p>)
    }
    return null;
  }

  // Applies a degressive discount
  const DiscountPrice = (props) => {
    const price: number = props.price;
    if (duration > 10)  {
      return (<span><span className='old-price'> {formatPrice(price)}</span> <span className='new-price'> {formatPrice(price - 0.5*price)}</span></span>);
    }
    else if (duration > 4) {
      return (<span><span className='old-price'> {formatPrice(price)}</span> <span className='new-price'> {formatPrice(price - 0.3*price)}</span></span>);
    }
    else if (duration > 1) {
      return (<span><span className='old-price'> {formatPrice(price)}</span> <span className='new-price'> {formatPrice(price - 0.1*price)}</span></span>);
    }
    return (<span>{formatPrice(price)}</span>);
  }

  // Convert price from cent to euro with a user-readable formatting
  const formatPrice = (price: number) =>  {
    return numeral(price/100).format('0,0.00')
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
            <img 
              className='car-pic' 
              src={car.picturePath} 
              alt='Car picture'
            />
            <div className='car-attr'>
              <p><b>{car.brand} </b>{car.model}</p>
              <p>Price/day : <DiscountPrice price={car.pricePerDay}/> €</p>
              <p>Price/km : {formatPrice(car.pricePerKm)} €</p>
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

import * as React from 'react';
import { ICars, getCars } from './cars'

const App: React.FC = () => {

  const data: ICars[]  = getCars();
  if (data.length ==0) return null;
  
  return(
  <div>
    <h1>Hello!</h1>
    <div>
      <ul className='cars'>
        {data.map( (car) => (
          <li key={car.id}>
            <p>Brand : {car.brand}</p>
            <p>Model : {car.model}</p>
            <p>Price/day : {car.pricePerDay}</p>
            <p>Price/km : {car.pricePerKm}</p>
            <p>Brand : {car.brand}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default App;

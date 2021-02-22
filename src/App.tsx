import * as React from 'react';
import { ICars, getCars } from './cars'

const App: React.FC = () => {

  const data: ICars[]  = getCars();
  if (data.length ==0) return null;
  
  return(
    <div>
    <div className='header'>Cars</div>
    <div className='main'>
      <ul className='cars'>
        {data.map( (car) => (
          <li key={car.id}>
            <img className='car-pic' src={car.picturePath} alt='Car picture'/>
            <div className='car-attr'>
              <p><b>{car.brand} </b>{car.model}</p>
              <p>Price/day : {car.pricePerDay/100}</p>
              <p>Price/km : {car.pricePerKm/100}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import axios from 'axios';

export interface ICars {
    id: number;
    picturePath: string;
    brand: string;
    model: string;
    pricePerDay: number;
    pricePerKm: number;
    availability: { maxDuration: number, maxDistance: number };
}

export const getCars = () => {
    const [cars,setCars] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
    axios
        .get<ICars[]>('./cars.json')
        .then(response => {
            setCars(response.data);
            console.log(response.data[0])
        })
        .catch(ex => {
            setError(ex.response);
            console.log(error);
        })
    }, []);

    return cars;
}
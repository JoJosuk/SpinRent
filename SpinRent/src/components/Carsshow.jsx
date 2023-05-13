import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Carsshow() {
    const [cars,setCars]=useState([]);
    useEffect(()=>{
        axios.get('/cars').then(({data})=>{
            setCars(data);
            console.log(cars);
        });
    },[])
    return (
        
        <div>
            {cars.length>0 && cars.map((car,index)=>(
            <Link to ={'/account/cars/'+car._id} key={index} className='bg-gray-100 p-4  flex gap-2 m-2 rounded-lg cursor-pointer'>
                <div className='w-32 h-32 bg-gray-200 '>
                    {car.photos.length >0  && (
                        <img src={'http://localhost:4000/upload/'+car.photos[0]} alt='' className='w-32 h-32 rounded-lg' />
                    )}
                </div>

                <div className='shrink-0'>
                    <h1 className='text-xl font-semibold'>{car.title}</h1>
                    <p className='text-sm mt-2'>{car.description}</p>
                </div>
            </Link>
            ))}
            
        </div>
        
    );
}
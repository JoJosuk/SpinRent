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
        
        <div className='flex flex-col justify-center items-center'>
            {cars.length>0 && cars.map((car,index)=>(
            <Link to ={'/account/cars/'+car._id} key={index} className='bg-gray-100 p-4 max-w-4xl w-full flex flex-col md:flex-row gap-2 m-2 rounded-lg cursor-pointer'>
                <div className=' bg-gray-200 '>
                    {car.photos.length >0  && (
                        <img className='object-cover aspect-square w-56 rounded-lg' src={'http://localhost:4000/uploads/'+car.photos[0]} alt='' />
                    )}
                </div>

                <div className=''>
                    <h1 className='text-xl font-semibold'>{car.title}</h1>
                    <p className='text-sm mt-2'>{car.description}</p>
                </div>
            </Link>
            ))}
            
        </div>
        
    );
}
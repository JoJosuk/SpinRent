/* eslint-disable no-unused-vars */
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CarspageForm from "./CarspageForm";
import axios from "axios";
export default function CarsPage() {
    const [cars,setCars]=useState([]);
    const {action} = useParams();
    useEffect(()=>{
        axios.get('/cars').then(({data})=>{
            setCars(data);

        });
    },[])
    
    // const[redirect,setRedirect]=useState('');
    
    // if(redirect){
    //     return <Navigate to={redirect}  />
    // }
     
    return (
        <div>
            {
                action!=='add' &&(
                    <div className="flex justify-center py-10 ">
                        <div className="flex justify-center gap-2 max-w-md bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <Link to={'/account/cars/add'} > Add new vehicle</Link>
                        </div>
                    </div>
                )
            }
            {
                action==='add' &&(
                
                <CarspageForm/>
                )
            }
        </div>
    )
}
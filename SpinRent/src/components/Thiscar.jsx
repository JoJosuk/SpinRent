import { useEffect} from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import axios from 'axios';
import Photoshow from "./Photoshow";
import {  differenceInCalendarDays } from "date-fns";

export default function Thiscar() {
    const [car,setCar]=useState([]);
    const [start,setStart]=useState('');
    const [stop,setStop]=useState('');
    const [fullname,setFullname]=useState('');
    const [phone,setPhone]=useState('');
    const[showallphotos,setShowallphotos]=useState(false);
    const {id}=useParams();
    console.log(id);
    useEffect(()=>{
        axios.get('/showcar/'+id).then(({data})=>{setCar(data);});
    },[]);


    async function book(){
        if(fullname!=='' && stop>start){
        const data={
            car:car._id,
            start,stop,fullname,phone,
            price:String(differenceInCalendarDays(new Date(stop),new Date(start))*car.price)
        };
        console.log(data);
        const a =await axios.post('/booking',data);
        console.log(a); 
    }
    }
    const allphotos=()=>{
       setShowallphotos(true);
    }
    if (showallphotos){
        return (
            <>
            
            <Photoshow car={car} showallphotos={showallphotos} onchange={setShowallphotos}/>
            </>
            
            )
    }
    return (
        <div>
            
            <div className="flex justify-center flex-col items-center ">
                <div className="bg-gray-100 rounded-xl pt-3 w-full max-w-4xl ">
                    <h1 className="text-2xl font-semibold px-3 text-start w-full max-w-4xl ">{car.title}</h1>
                    <h2 className="text-xl px-3 text-start w-full max-w-4xl">{car.location}</h2>
                    <div className="p-4 py-8 max-w-4xl relative grid gap-2 grid-cols-[2fr_1fr]">
                        <div>
                            {
                                car.photos?.[0] && (
                                    <img className="aspect-square object-cover rounded-xl" src={'http://localhost:4000/uploads/'+car.photos[0]} alt="" />
                                )
                            }
                        </div>
                        <div className="grid gap-1">
                            <div>
                            {
                                car.photos?.[1] && (
                                    <img className="aspect-square object-cover rounded-xl" src={'http://localhost:4000/uploads/'+car.photos[1]} alt="" />
                                )
                            }
                            </div>
                            <div>
                            {
                                car.photos?.[2] && (
                                    <img className="aspect-square object-cover rounded-xl" src={'http://localhost:4000/uploads/'+car.photos[2]} alt="" />
                                )
                            }
                            </div>
                        </div>
                            <button className="gap-2 cursor-pointer absolute bottom-3 right-3 p-2 px-4 w-fit rounded-lg bg-black flex bg-opacity-50 text-white" onClick={allphotos}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
                                </svg>
                                see all photos
                            </button>
                    
                    </div>
                    
                    <div className="grid grid-cols-2 w-full">
                    <div>
                    <h2 className="text-2xl font-semibold px-2 text-start ">Description</h2>
                        <p className="text-left my-4 text-lg p-3">{car.description}</p>      
                        <h3 className="p-3 font-medium">Maximum Num of passengers :{car.maxnum}</h3>
                    </div>
                    <div>
                         <div className="bg-white rounded-xl shadow-md p-8 py-12 mx-5">
                            <h2 className="text-2xl font-bold pb-3">
                                Rent Per 24 hours : {car.price}$
                                
                            </h2>
                            <p className="text-xl pb-4">Enter the start date and end date</p>
                            <div className="flex gap-2 my-4 border p-2 rounded">
                                <label>Start </label>
                                <input className="w-full" 
                                value={start}
                                onChange={(e)=>setStart(e.target.value)}
                                type="date"  />
                                
                            </div>
                            
                            <div className="flex gap-2 my-4 border p-2 rounded">
                                <label>Stop </label>
                                <input className="w-full" type="date" 
                                value={stop}
                                onChange={(e)=>setStop(e.target.value)}
                                 />
                                
                            </div>
                            {start && stop && stop > start &&(
                                <>
                                    <div className="flex gap-2 my-4 border p-4 rounded items-center">
                                        <label>Full&nbsp;Name </label>
                                        <input className="w-full p-2" type="text" 
                                        value={fullname}
                                        onChange={(e)=>setFullname(e.target.value)}
                                        />
                                        
                                    </div>
                                    <div className="flex gap-2 my-4 border p-4 rounded items-center">
                                        <label>Phone&nbsp;Number </label>
                                        <input className="w-full p-2" type="tel" 
                                        value={phone}
                                        onChange={(e)=>setPhone(e.target.value)}
                                        />
                                        
                                    </div>

                                </>
                            )}
                            <button
                                onClick={book}
                                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Book &nbsp; $
                                {start && stop && stop > start &&(
                                    <>
                                    <span>{differenceInCalendarDays(new Date(stop),new Date(start))*car.price}</span>
                                    </>
                                )}
                            </button>
                         </div>
                    </div>

                    </div>
                    
                </div>
            </div>
        </div>
    )   
}
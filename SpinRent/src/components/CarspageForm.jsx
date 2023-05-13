import {useState} from 'react';
import { Navigate  } from "react-router-dom";
import axios from 'axios';
import Features from './Features';
export default function CarsPage() {

    const[title,setTitle]=useState('');
    const[license,setLicense]=useState('');
    const[addedPhotos,setAddedPhotos]=useState([]);
    const[photolinks,setPhotolinks]=useState('');
    const[features,setFeatures]=useState([]);
    const[description,setDescription]=useState('');
    const[maxpassengers,setMaxpassengers]=useState('');
    
    const[location,setLocation]=useState('');
    const[redirect,setRedirect]=useState('');

    async function addphotobylink(ev){
        ev.preventDefault();
        const {data:filename} =await axios.post('/uploadbylink',{link:photolinks})
        setAddedPhotos(prev=>[...prev,filename]);
        setPhotolinks('');
        console.log('http://localhost:4000/uploads/'+filename);
    }
    async function uploadthisphoto(ev){
        const files = ev.target.files;
        const data = new FormData();
        for(let i=0;i<files.length;i++){
            data.append('photos',files[i]);
        }
        const {data:filename}=await axios.post('/upload',data,{
            headers:{'Content-Type':'multipart/form-data'}
        });
        console.log(filename);
        setAddedPhotos(prev=>[...prev,...filename]);

    }
    async function carsubmit(ev){
        ev.preventDefault();
        await axios.post('/cars',{
            title,
            license,
            location,
            addedPhotos,
            features,
            description,
            maxpassengers
        });
        setRedirect('/account');
    }
    if(redirect){
        return <Navigate to={redirect}  />
    }
    return(
        <form onSubmit={carsubmit}>
                    <div className="flex flex-col gap-4 items-center py-10">
                        <div className="max-w-xl w-full">
                            <label htmlFor="carname" className="block text-sm font-medium leading-6 text-gray-900">
                            Car Name
                            </label>
                            <label className='text-sm text-slate-400' htmlFor="carname">Please specify the model of your vehicle</label>
                            <div className="mt-2">
                            <input
                                id="carname"
                                name="carname"
                                type="text"
                                autoComplete="name"
                                placeholder="Eg: Toyota Corolla 2019"
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                        <div className="max-w-xl w-full">
                            <label htmlFor="licenseplate" className="block text-sm font-medium leading-6 text-gray-900">
                            Location
                            </label>
                            <label className='text-sm text-slate-400' htmlFor="licenseplate">Please Mention the locality of your car</label>
                            <div className="mt-2">
                            <input
                                id="location"
                                name="location"
                                type="text"
                                autoComplete="name"
                                required
                                placeholder="Kottarakara,Kerala"
                                value={location}
                                onChange={(e)=>setLocation(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                        <div className="max-w-xl w-full">
                            <label htmlFor="licenseplate" className="block text-sm font-medium leading-6 text-gray-900">
                            License Plate
                            </label>
                            <label className='text-sm text-slate-400' htmlFor="licenseplate">Please specify your vehicle Number</label>
                            <div className="mt-2">
                            <input
                                id="licenseplate"
                                name="licenseplate"
                                type="text"
                                autoComplete="name"
                                required
                                placeholder="KL 01 AB 1234"
                                value={license}
                                onChange={(e)=>setLicense(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                    
                        <div className="w-full max-w-xl">
                            <label htmlFor="photos" className="block text-sm font-medium leading-6 text-gray-900">
                                Photos
                            </label>
                            <label className='text-sm text-slate-400' htmlFor="photos">More = Better</label>
                            <div className="flex">
                                <input
                                    id="photosurl"
                                    name="photosurl"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="https://example.com/"
                                    value={photolinks}
                                    onChange={(e)=>setPhotolinks(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <button
                                    onClick={addphotobylink}
                                    className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >Add using link</button>
                            </div>
                            <div className="mt-2 grid gap-2 grid-cols-4 md:grid-cols-4 sm:grid-cols-3">
                                {
                                    addedPhotos.length >0 && addedPhotos.map((link,index) =>(
                                        <div className="h-40 flex" key={index}>
                                         <img className ='rounded-2xl object-cover object-center ' src={'http://localhost:4000/uploads/'+link} alt="" />    
                                        </div>
                                    ))
                                }
                                 
                                <label className="cursor-pointer flex flex-col items-center border bg-transparent rounded-2xl p-10">
                                    <input type="file" multiple className="hidden" onChange={uploadthisphoto} />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    Upload
                                </label>
                            </div>
                    
                        </div>
                        <div className="w-full max-w-xl">
                        <label htmlFor="photos" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <label className='text-sm text-slate-400' htmlFor="photos">A small description of the vehicle</label>
                            <textarea 
                            value={description} 
                            onChange={(e)=>setDescription(e.target.value)} 
                            className="block  w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6">

                            </textarea>
                        </div>
                        <Features selected={features} onChange={setFeatures}/>
                        <div className="w-full max-w-xl">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Maximum No Of Passengers</label>
                            <input
                                    id="passengers"
                                    name="passengers"
                                    type="number"
                                    autoComplete="name"
                                    required
                                    placeholder="Eg: 5"
                                    value={maxpassengers}
                                    onChange={(e)=>setMaxpassengers(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                        </div>
                        <div className="w-full max-w-xl">
                                <button
                                type="submit"
                                className="my-5 flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                 >
                                Save
                                </button>
                        </div>
                    </div>
                </form>
    )
}
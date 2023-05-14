import {useEffect, useState} from 'react';
import { Navigate  } from "react-router-dom";
import axios from 'axios';
import Features from './Features';
export default function CarsPage( {actions} ) {
    const id = actions;
    console.log('hiris',id)
    const[title,setTitle]=useState('');
    const[license,setLicense]=useState('');
    const[addedPhotos,setAddedPhotos]=useState([]);
    const[photolinks,setPhotolinks]=useState('');
    const[features,setFeatures]=useState([]);
    const[description,setDescription]=useState('');
    const[maxpassengers,setMaxpassengers]=useState('');
    const[location,setLocation]=useState('');
    const[redirect,setRedirect]=useState('');
    const[price,setPrice]=useState('');
    useEffect(()=>{
        if(actions===undefined){
            return ;
        }
        if(actions==='add'){ /* empty */ }
        else{
        axios.get('/cars/'+actions).then(response=>{ 
            const {data}=response;
            setTitle(data.title);
            setLicense(data.licenseplate);
            setLocation(data.location);
            setAddedPhotos(data.photos);
            setFeatures(data.features);
            setDescription(data.description);
            setMaxpassengers(data.maxnum);
            setPrice(data.price);
            });}
    },[actions])
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
        if(actions==='add'){
        await axios.post('/cars',{
            title,
            license,
            location,
            addedPhotos,
            features,
            description,
            maxpassengers,
            price
        });}
        else{
            await axios.put('/cars',{
                id,
                title,
                license,
                location,
                addedPhotos,
                features,
                description,
                maxpassengers,
                price
            });}
            setRedirect('/account/cars');
        }
       
    function removePhoto(ev,filename){
        ev.preventDefault();
        setAddedPhotos([...addedPhotos.filter(photo=>photo!==filename)]);

    }
    function selectmain(ev,filename){
        ev.preventDefault();
        const without=addedPhotos.filter(photo=>photo!==filename);
        setAddedPhotos([filename,...without]);
        
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
                                        <div className="h-40  relative flex" key={index}>
                                         <img className ='rounded-2xl object-cover object-center ' src={'http://localhost:4000/uploads/'+link} alt="" />    
                                         <button onClick={ev=>removePhoto(ev,link)} className='absolute bottom-2 right-2 text-white p-2 bg-black rounded-lg bg-opacity-70 cursor-pointer'>
                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>

                                         </button>
                                         <button onClick={ev=>selectmain(ev,link)} className='absolute bottom-2 left-2 text-white p-2 bg-black rounded-lg bg-opacity-70 cursor-pointer'>
                                            {
                                                index === 0 ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                    </svg>


                                                ):(
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                                        </svg>
                                                )
                                            }

                                         </button>
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
                            <label className="block text-sm font-medium leading-6 text-gray-900">Rent For 24 hrs</label>
                            <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    autoComplete="name"
                                    required
                                    placeholder="Eg: 5000"
                                    value={price}
                                    onChange={(e)=>setPrice(e.target.value)}
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
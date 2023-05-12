import { Link, useParams } from "react-router-dom";

export default function CarsPage() {
    const {action} = useParams();
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
                <div className="flex flex-col items-center py-10">
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
                            required
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
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <button
                                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >Add using link</button>

                        </div>
                        <div className="mt-2 grid grid-cols-6 md:grid-cols-4 sm:grid-cols-3">
                            <button className="flex flex-col items-center border bg-transparent rounded-2xl p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                Upload
                            </button>
                        </div>
                        
                    </div>
                    <div className="w-full max-w-xl">
                    <label htmlFor="photos" className="block text-sm font-medium leading-6 text-gray-900">
                            Description
                        </label>
                        <label className='text-sm text-slate-400' htmlFor="photos">A small description of the vehicle</label>
                        <textarea className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"></textarea>
                    </div>


                </div>
                
                )
            }
        </div>
    )
}
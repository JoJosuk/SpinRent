// eslint-disable-next-line react/prop-types
export default function Photoshow({car,showallphotos,onchange}) {
    if(showallphotos===false){ 
        return null;
    }
    return(
        <div>
            <button onClick={()=>onchange(false)} className="p-3 mx-8 bg-gray-800 text-white flex gap-2 rounded-xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>

                 close
            </button>
            <div className="grid gap-8 px-8">
                {
                    // eslint-disable-next-line react/prop-types
                    car.photos.map((photo,index)=>(
                        <div key={index}>
                        <img className= 'w-full object-cover' src={'http://localhost:4000/uploads/'+photo} alt="" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

import { useContext,useState } from "react"
import { Usercontext } from "../Usercontext"
import { Navigate, useParams } from "react-router-dom"
// import Loader from "../components/Loader"
import { Link } from "react-router-dom"
import BookedPage from "./Bookedpage"
import axios from "axios"
import CarsPage from "./CarsPage"
export default function Account() {
    let {subpage} =useParams();
    const{user,setUser,ready}=useContext(Usercontext);
    const[redirect,setRedirect]=useState(null);
    if(subpage===undefined){
        subpage='profile';
    }
    
    function linkclasses(type=null){
        let classes= 'py-2 px-6 flex gap-1 rounded-full';
        if (type===subpage ){
            classes+=' bg-gray-800 text-white';
        }
        else{
            classes+=' bg-gray-200';
        }
        return classes;
    }

    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
        
    }
    if (!ready){
        return 'loading...'
    }
    if (ready){
        console.log(user)
    }
    if(ready && !user &&!redirect){
        console.log(user)
        return <Navigate to={'/login'}  />
    }

    

    
    if(redirect){
        return <Navigate to={redirect}  />
    }
    console.log(subpage);
    return(
        <div className="px-2">
            <nav className="w-full flex flex-col justify-center p-2 text-black font-semibold mt-4 md:flex-row gap-2">
                
                <Link className={linkclasses('profile')} to={'/account'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

                    My profile
                </Link>
                <Link className={linkclasses('booked')} to={'/account/booked'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    Vehicles booked
                </Link>
                <Link className={linkclasses('cars')} to={'/account/cars'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                    </svg>

                    Cars to lent
                </Link>
            </nav>
            {
                subpage==='profile' && (
                    <div className="py-20">
                        <h1 className="text-center font-bold text-xl">
                            Logged in as {user?.fname} {user?.lname} {user?.email}
                        </h1>
                        <div className="flex justify-center my-9">
                            <button
                                onClick={logout}
                                className="max-w-md flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                                Log out
                                              </button>
                        </div>
                    </div>
                )
                
            }
            {
                subpage==='cars' && (
                    <CarsPage />
                    )
            }
            {
                subpage==='booked' && (
                    <BookedPage />
                )
            }
        </div>
    )
}

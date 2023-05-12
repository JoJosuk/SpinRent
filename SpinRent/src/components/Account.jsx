import { useContext,useState } from "react"
import { Usercontext } from "../Usercontext"
import { Navigate, useParams } from "react-router-dom"
// import Loader from "../components/Loader"
import { Link } from "react-router-dom"
import axios from "axios"
export default function Account() {
    let {subpage} =useParams();
    const{user,setUser,ready}=useContext(Usercontext);
    const[redirect,setRedirect]=useState(null);
    if(subpage===undefined){
        subpage='profile';
    }
    
    function linkclasses(type=null){
        let classes= 'py-2 px-6';
        if (type===subpage ){
            classes+=' bg-gray-200 rounded-full';
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
        <div>
            <nav className="w-full flex justify-center text-black font-semibold mt-4 sm:flex-col">
                <Link className={linkclasses('profile')} to={'/account'}>My profile</Link>
                <Link className={linkclasses('booked')} to={'/account/booked'}>Vehicles booked</Link>
                <Link className={linkclasses('cars')} to={'/account/cars'}>Cars to lent</Link>
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
        </div>
    )
}

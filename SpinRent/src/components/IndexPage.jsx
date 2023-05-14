import axios from "axios";
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom";
export default function IndexPage() {
	const [cars,setCars]=useState([]);
	useEffect(()=>{
		axios.get('/cars').then(({data})=>{setCars(data);});
	},[]);
	return(
		<div className="mt-8 px-4 gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> 
			{
				cars.length>0 && cars.map((car,index)=>(
					<Link to={'/showcar/'+car._id} key={index} className="cursor-pointer" >
						<div>
						<img className="aspect-square object-cover rounded-2xl" src={'http://localhost:4000/uploads/'+car.photos[0]} alt="" />
						</div>
						<div key={index}>
							<h2 className="px-2 font-semibold text-lg">{car.title}</h2>
							<h3 className="px-2">{car.location}</h3>
							<h4 className='px-2 mt-2text-sm font-semibold'>{'$ '+car.price+' For 24 Hrs'}</h4>
						</div>
					</Link>
				))
			}
		</div>
	);
}
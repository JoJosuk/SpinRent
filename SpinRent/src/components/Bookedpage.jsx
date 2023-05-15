import { useEffect,useState } from "react"
import axios from "axios"
export default function BookedPage() {
    const [booked, setBooked] = useState([])

    useEffect(() => {
        axios.get('/booking').then(({ data }) => { setBooked(data)})
    }, [])

    function getdate(date) {
        var a = new Date(date)
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        var day = a.getDate()
        var month = months[a.getMonth()]
        var year = a.getFullYear()
        return day + ' ' + month + ' ' + year
    }
    return (
        <div className="flex justify-center">
            <div className="w-full max-w-3xl ">
                {
            
                    booked.length > 0 && booked.map((book,index) => (
                        <div key={index} className="bg-gray-200 flex flex-col md:flex-row m-3 rounded-xl">
                            <div className="md:w-48">
                                <img src={'http://localhost:4000/uploads/'+book.car.photos[0]} className=" rounded-l-xl aspect-square object-cover" alt="" />
                            </div>
                            <div className="py-3 px-2 text-gray-900 flex flex-col gap-1">
                                <h1 className="text-xl font-semibold ">{book.car.title}</h1>
                                <h2>{book.car.location}</h2>
                                <h3 className="flex gap-1 font-medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                                    </svg>
                                    { getdate(book.start)}{' -> '}{getdate(book.stop)}
                                </h3>
                                <h1 className="flex gap-1 text-l font-normal"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                                    </svg>Total Days :
                                    {' '+book.price / book.car.price}</h1>
                                <h1 className="pt-4 text-xl font-semibold ">Price: {book.price}</h1>
                            </div>
            
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
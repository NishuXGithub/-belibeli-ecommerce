"use client"
import{useState,useEffect} from "react";

type CardData={
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
    rating:{
        rate:number;
        count:number;
    };

};
function Card(){
    const[data,setData]=useState<CardData[]>([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState<string | null>(null);
    const[counts,setCounts]=useState(0)
   
    useEffect(()=>{
        setLoading(true);
        setError(null);
        const FetchData=async()=>{
            try{
                const res=await fetch("https://fakestoreapi.com/products");
                if(!res.ok){
                    throw new Error("Failed to fectch api");
                }
                const data=await res.json();
                setData(data);
            }
            catch(err){
                if(err instanceof Error){
                    setError(err.message);
                }

             
                else{
                    setError("something went wrong");
                }
            }
            finally{
                setLoading(false);
            }
        };
        FetchData();
            },[]);
            if(loading){
                return <div>Loading...</div>
            }
            if(error){
                return <div>Error: {error}</div>
            }
            const handleAddToCart = ( )=>{
                setCounts((prev)=> prev +1 )

            }
            return(
         <div>
            <div className=" min-h-screen w-full bg-gray-400 rounded-md  border border-white   ">
      
                <div  className="min-h-screen  w-full bg-gray-400 grid grid-cols-4 gap-4 p-4 shadow-xl   ">
                    {data.map((item)=>(
                    <div key={item.id} className=" bg-white border border-white rounded-md p-4 shadow-sm w-full h-[450px] hover:shadow-lg transition-all  duration-300 ">
                        <div className=" flex flex-col items-center jusztify-center  ">
                        <div className=" mt-4 mb-4 ">
                    
                            
                             <img src={item.image} alt={item.title} className="w-full h-40 object-contain"/>
                    </div>
                        <div className="p-4">
                            <h2 className="font-bold line-clamp-1">{item.title}</h2>
                            <p className=" font-semibold ">Price:<span className="text-blue-500">$</span> {item.price.toFixed(2)}</p>
                            <p className="line-clamp-2 font-light text-sm text-gray-500 font-serif">{item.description}</p>
                            <p className=" text-sm text-blue-800">{item.category}</p>
                           

                            <p className=" text-sm text-blue-800" >{item.rating.rate}  <span className="text-yellow-500 text-2xl">★ ★ </span></p>
                            
                              <button className="bg-blue-800 text-white py-2 px-4 rounded-full  hover:bg-blue-900" onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                       </div>
                          </div>
                         
                             
                    ))
                    }
                </div>
            </div>
        </div>
            )
            }
                 
              export default Card;
               
    

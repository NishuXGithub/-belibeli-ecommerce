"use client"
import { useState, useEffect } from "react";


import {
  ShoppingCart,
  Bell,
    Shirt,
  Search,
  Star,
  IndianRupee,
  Store,
  MapPin,
  ShoppingBag,
  MapPinIcon
   
} from "lucide-react";
import { Lobster } from "next/font/google";
const slides = [
  {
    title: "Limited Time Offer!",
    offer: "Limited Time Offer! Up to 50% OFF!",
    subtitle: "Redefine Your Everyday Style",
    image: "/img/scaf.jpg",
  },
  {
    title: "Big Fashion Sale!",
    offer: "Limited Time Offer! Up to 50% OFF!",
    subtitle: "Upgrade Your Wardrobe Today",
    image: "/img/cloth.jpg",
  },
  {
    title: "New Arrivals!",
    offer: "Limited Time Offer! Up to 50% OFF!",
    subtitle: "Shop Latest Trends Now",
    image: "/img/pot.jpg",
  },
];

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400",
});


type CardData = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };


};

const products = [
    {
        image: "/scaf/pot.jpg",
        images: "/img/bag.jpg",
        ime: "/coffee.jpg",
    },
];

function Website() {
    const [data, setData] = useState<CardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [counts, setCounts] = useState(0);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Categories");
    const [currentSlide, setCurrentSlide] = useState(0);


    useEffect(() => {
        setLoading(true);
        setError(null);
        const FetchData = async () => {
            try {
                const res = await fetch("https://fakestoreapi.com/products");
                if (!res.ok) {
                    throw new Error("Failed to fectch api");
                }
                const data = await res.json();
                setData(data);
            }
            catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }


                else {
                    setError("something went wrong");
                }
            }
            finally {
                setLoading(false);
            }
        };
        FetchData();
    }, []);
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }
    const handleAddToCart = () => {
        setCounts((prev) => prev + 1)

    }
    return (
        <div className= "font-serif" >
            {/*outer div  */}

            {/*top 2 right div......................................................................... */}

           <div className="border border-gray-200 px-4 md:px-8 lg:px-12 font-roboto font-bold flex items-center justify-between text-black bg-gray-100 w-full min-h-[60px] text-base md:text-xl lg:text-2xl">
         <div className="flex items-center gap-1 text-xl font-bold"> 
  <div className="font-lobster font-bold text-2xl">B</div>

  <span className="hidden md:inline">
    BeliBeli.com
  </span>
</div>

              
                <div className="flex gap-0 item-center ">
                    {/*search bar */}
                       {/*cateogory select .... */}
                    <div className="w-[130px]  justify-center flex text-sm text-gray-400 items-center border border-gray-400 rounded-l-lg md:w-[150px] h-[30px] ">
                        <select value={category} onChange={(e) => setCategory(e.target.value)}  className="outline-none border-none bg-transparent focus:outline-none focus:ring-0">
                            <option value="All Categories">All Categories</option>
                            <option value="men's clothing">Men"s cloth</option>
                            <option value="women's clothing">Women's cloth</option>
                            <option value="jewelery">Jewelery</option>
                            <option value="electronics">electronics</option>
                        </select>
                        
                    </div>
                    {/*cateogory select .... */}
                   <div > 
                        <div className="flex items-center text-sm gap-2 bg-gray-100 border border-gray-400 rounded-r-lg w-[140px] md:w-[620px] h-[30px] ">
                       <Search className=" ml-4 text-gray-400 w-5 h-5" />
                        <input type="text"
                            placeholder="search cat.."
                            value={search} onChange={(e) => setSearch(e.target.value)}
                            className=" outline-none border-none bg-transparent focus:outline-none focus:ring-0" />
                            </div>
                    </div>
               <div className="flex gap-3 md:gap-4 items-center justify-center pl-3 md:pl-8">
  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-gray-400 fill-gray-400" />
  <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-400 fill-gray-400" />
</div>


                </div>


            </div>

            {/*cateogory select .... ..........................................................................................*/}
            <div className="bg-gray-100 flex gap-7 w-[px] h-[488px] md: w-[1425px] h-[488px] ">
                <div className="font-serif item-center justify-center pt-20 pl-10 w-[400px] h-[px] md:w-[685px] h-[488px] ">
                    <p className="text-2xl text-gray-400 ">{slides[currentSlide].title}  </p>
                    <h1 className="font-bold text-black text-5xl mt-6">{slides[currentSlide].offer}</h1>
                    <p className=" mt-6 text-2xl text-gray-400  "> {slides[currentSlide].subtitle} </p>
                    <div className="flex gap-2 mt-5">
  {slides.map((slide, index) => (
    <button
      key={index}
      onClick={() => setCurrentSlide(index)}
      className={`w-3 h-3 rounded-full ${
        currentSlide === index ? "bg-black" : "bg-gray-300"
      }`}
    ></button>
  ))}
</div>
                </div>

                <div className="w-[740px] h-[488px] object-cover">
                    <img
                    src={slides[currentSlide].image}
                    alt="product image"
                   
                /></div>
            </div>
            {/*product images select radius ciecle card .... ..........................................................................................*/}
            <div className=" flex gap-5   w-full h-[140px] pl-5">
                {data.map((item) => (
                    <div key={item.id} className=" border border-gray-200  w-[50px] h-[50px] rounded-full bg-gray-200 mt-10 item-center justify-center " >


                        <img src={item.image} alt={item.title} className="   w-[40px] h-[40px] rounded-full object-contain" />
                        <h3 className="text-[10px] pl-1 pr-2 mt-2  ">
                            {item.title.split(" ").slice(0, 1).join(" ")}
                        </h3>
                    </div>




                ))}
            </div>
            {/*cards of image select .... ..........................................................................................*/}
     <div className="bg-gray-200 border border-white w-full h-[400px] overflow-x-auto overflow-y-hidden scroll-smooth">
  <div className="font-serif italic text-black mt-10 font-bold ml-10 text-xl">
    Flash Sale
    <span>🕒</span>
  </div>

  <div className="flex flex-row gap-4 px-10 mt-4 min-w-max">
    {data.map((item) => (
      <div
        key={item.id}
        className="w-[200px] min-w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
      >
        <div className="w-full h-[140px] bg-gray-100 flex items-center justify-center p-3">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="w-full h-[130px] bg-white p-4">
          <p className="text-[13px] font-medium text-black line-clamp-1">
            {item.title.split(" ").slice(0, 3).join(" ")}
          </p>

          <div className="flex gap-2 items-center mt-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />

            <p className="text-[14px] text-black">
              {item.rating.rate}
              <span className="text-gray-400 ml-1">
                {item.rating.count}K+ Sold
              </span>
            </p>
          </div>

          <div className="flex gap-1 items-center mt-2">
            <span className="text-yellow-400 font-bold">₹</span>
            <p className="font-bold text-black">{item.price}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
            <div className=" border border-white shaadow-lg  bg-gray-80 w-full h-[1600px] p-10">
                <div>
                    <div className="flex gap-70 ">
                        <div className="mt-2 pl-[20px] font-bold text-xl font-serif italic">Todays For You!</div>
                        <div className="flex gap-4  ">
                            <div className=" border border-gray-400 text-black bg-white border w-[150px] h-[50px] pl-10 rounded-lg   pt-3 hover:text-white hover:bg-gray-600"><button >Best Seller</button></div>
                            <div className=" border border-gray-400 text-black bg-white border  w-[150px] h-[50px] pl-10 rounded-lg   pt-3 hover:text-white hover:bg-gray-600 "><button>Keep Stylish </button></div>
                            <div className=" border border-gray-400 text-black bg-white border w-[150px] h-[50px] pl-10 rounded-lg    pr-2 pt-3 hover:text-white hover:bg-gray-600 "> <button> Discount</button></div>
                            <div className=" border border-gray-400 text-black bg-white border  w-[150px] h-[50px] pl-10 rounded-lg    pr-2 pt-3 hover:text-white hover:bg-gray-600"> <button>official Store </button></div>
                            <div className=" border border-gray-400 text-black bg-white border  w-[150px] h-[50px] pl-10 rounded-lg    pt-3 hover:text-white hover:bg-gray-600">  <button> Product</button></div>
                        </div>

                    </div>
                    <div><div className="grid grid-cols-5 gap-5">
  {data.map((item) => (
    <div
      key={item.id}
      className="border border-gray-200 rounded-lg w-[250px] bg-gray-100 mt-10 shadow-lg overflow-hidden"
    >
      <div className="w-full h-[130px] flex items-center justify-center bg-gray-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-[180px] h-[110px] object-contain"
        />
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <p className="text-[13px]">
          {item.title.split(" ").slice(0, 3).join(" ")}
        </p>

        <div className="flex gap-2 items-center mt-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <p className="text-[15px]">
            {item.rating.rate}
            <span className="text-gray-300"> {item.rating.count}K + Sold</span>
          </p>
        </div>

        <div className="flex gap-2 items-center mt-2">
          <span className="text-yellow-400">₹</span>
          <p>{item.price}</p>
        </div>
      </div>
    </div>
  ))}
</div></div>
                    

                </div>
                <div className=" font-serif italic font-bold text-xl mt-10 pl-140">Best Selling Store</div>
                {/*cards of image select end of card .... ..........................................................................................*/}
                <div className="flex gap-15 pl-13">
                    <div className="bg-gray-300 border border-gray-300 rounded-lg w-[300px] h-[40px] mt-2">
                        <img
                            src="/img/bag.jpg"
                            alt="product images"
                            className=" border border-gray-200  w-[500px] h-[450px] rounded-lg shadow-lg object-cover"
                        />


                    </div>
                    <div >
                        <div className="flex gap-4 mt-3">
                            <div className="border border-gray-200 rounded-lg w-[400px] h-[220px] shadow-lg ">
                                <div className="p-4 pl-4 ">
                                    <div className="flex gap-2 items-center">
                                    <Store className="w-5 h-5 text-gray-200" /> <h5>Shipra Mall, Indirapuram</h5> 
                                    <MapPinIcon className="w-4 h-4 text-red-500"/>
                                    </div>
                                    <p className=" pl-7 text-gray-400 text-sm">"just do it bro"</p>
                                </div>
                                <div className="flex gap-2 mt-2 ml-9">
                                    {data.slice(0, 3).map((item) => (
                                        <div key={item.id} className=" border border-yellow-400  rounded-lg  w-[100px] bg-gray-300 h-[100px] ">
                                            <img src={item.image} className=" mt-2 ml-3 rounded-lg w-[80px] h-[80px] object-contain" />
                                            <div className="flex gap-2 items-center mt-2">
                               <span className="text-yellow-400">₹</span>
                                <p>{item.price}</p>
                                </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="border border-gray-200 rounded-lg w-[400px] h-[220px] shadow-lg ">

                                <div className="p-4 pl-4"> <div className="flex gap-2 items-center">
                                    <Store className="w-5 h-5 text-yellow-500" /> <h5>Mahagun Metro Mall, Vaishali</h5> 
                                    <MapPinIcon className="w-4 h-4 text-red-500"/>
                                    </div>
                                    <p className=" pl-7 text-gray-400 text-sm">"unless your Fashion"</p></div>
                                <div className="flex gap-2 mt-2 ml-9">
                                    {data.slice(3, 6).map((item) => (
                                        <div key={item.id} className=" border border-gray-200  rounded-lg  w-[100px] bg-gray-300 h-[100px] ">
                                            <img src={item.image} className=" mt-2 ml-3 rounded-lg w-[80px] h-[80px] object-contain" />
                                             <div className="flex gap-2 items-center mt-2">
                               <span className="text-yellow-400">₹</span>
                                <p>{item.price}</p>
                                </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-5 mt-3">
                            <div className="border border-gray-200 rounded-lg w-[400px] h-[220px] shadow-lg ">

                                <div className="p-4 pl-4">
                                     <div className="flex gap-2 items-center">
                                    <Store className="w-5 h-5 text-yellow-500" /> <h5>Pacific Mall, Ghaziabad</h5> 
                                    <MapPinIcon className="w-4 h-4 text-red-500"/>
                                    </div>
                                    <p className=" pl-7 text-gray-400 text-sm">"be Extra </p>

                                </div>
                                <div className="flex gap-2 mt-2 ml-9">
                                    {data.slice(6, 9).map((item) => (
                                        <div key={item.id} className=" border border-gray-200  rounded-lg  w-[100px] bg-gray-300 h-[100px] ">
                                            <img src={item.image} className=" mt-2 ml-3 rounded-lg w-[80px] h-[80px] object-contain" />
                                      <div className="flex gap-2 items-center mt-2">
                               <span className="text-yellow-400">₹</span>
                                <p>{item.price}</p>
                                </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg w-[400px] h-[220px] shadow-lg">
                                <div className="p-4 pl-4">
                                    <div className="flex gap-2 items-center">
                                    <Store className="w-5 h-5 text-gray-200" /> <h5>Indirapuram Habitat Centre</h5> 
                                    <MapPinIcon className="w-4 h-4 text-red-500"/>
                                    </div>
                                    <p className=" pl-7 text-gray-400 text-sm">"chic",Bold,confident"</p>
                                </div>
                                <div className="flex gap-2 mt-2 ml-9">
                                    {data.slice(9, 12).map((item) => (
                                        <div key={item.id} className=" border border-yellow-400  rounded-lg  w-[100px] bg-gray-300 h-[100px] ">
                                            <img src={item.image} className=" mt-2 ml-3 rounded-lg w-[80px] h-[80px] object-contain" />
                                              <div className="flex gap-2 items-center mt-2">
                               <span className="text-yellow-400">₹</span>
                                <p>{item.price}</p>
                                </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" mt-70 relative border border-gray-200 w-[1400px] h-[300px] mt-20">
                <img
                    src="/img/coffe.jpg"
                    alt="product images"
                    className="w-[1400px] h-[300px] shadow-lg object-cover"
                />

                <div className="absolute inset-0 bg-gray-900/50"></div>
                <h2 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
                    "let 's Shop Beyond Boundaries!"
                </h2>

            </div>
          





        </div>












    )
} export default Website;



import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Gyro Fidget
            ", category: "Fidget Toys", price: 9.99, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e", best:true },
  { id: 2, name: "Infinity Cube", category: "Fidget Toys", price: 12.99, rating: 4.7, reviews: 98, image: "https://images.unsplash.com/photo-1616628182506-8b0c6c1f07b4", best:true },
  { id: 3, name: "Cable Organizer", category: "Useful Prints", price: 7.99, rating: 4.6, reviews: 52, image: "https://images.unsplash.com/photo-1580894908361-967195033215"},
  { id: 4, name: "Headphone Stand", category: "Useful Prints", price: 15.99, rating: 4.9, reviews: 63, image: "https://images.unsplash.com/photo-1518444028785-8fbcd101ebb9"},
  { id: 5, name: "Dragon Display", category: "Display Pieces", price: 19.99, rating: 5.0, reviews: 44, image: "https://images.unsplash.com/photo-1608500218890-c4b0b4c0a9af", best:true},
  { id: 6, name: "Mini Spaceship", category: "Display Pieces", price: 14.99, rating: 4.5, reviews: 37, image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06"},
  { id: 7, name: "Controller Grip", category: "Accessories", price: 11.99, rating: 4.6, reviews: 28, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db"},
  { id: 8, name: "Keychain Tool", category: "Accessories", price: 6.99, rating: 4.4, reviews: 19, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad"}
];

export default function EddyWorksStore(){

  const [filter,setFilter] = useState("All");
  const [cart,setCart] = useState([]);
  const [showCart,setShowCart] = useState(false);
  const [account,setAccount] = useState(null);

  const [shippingZip,setShippingZip] = useState("");
  const [shippingCost,setShippingCost] = useState(null);

  const [discount,setDiscount] = useState("");
  const [discountAmount,setDiscountAmount] = useState(0);

  const [tracking,setTracking] = useState("");
  const [trackingResult,setTrackingResult] = useState(null);

  const filtered = filter === "All" ? products : products.filter(p=>p.category===filter);
  const best = products.filter(p=>p.best);

  function addToCart(product){
    setCart(prev=>[...prev,product]);
  }

  function removeFromCart(i){
    setCart(prev=>prev.filter((_,index)=>index!==i));
  }

  const subtotal = cart.reduce((sum,item)=>sum+item.price,0);
  const total = (subtotal - discountAmount + (shippingCost?Number(shippingCost):0)).toFixed(2);

  function loginDemo(){
    setAccount({name:"Customer"});
  }

  function calculateShipping(){
    if(!shippingZip) return;
    const cost=(5+cart.length*1.5).toFixed(2);
    setShippingCost(cost);
  }

  function applyDiscount(){

    const code=discount.toUpperCase();

    if(code==="EDDY10"){
      setDiscountAmount(subtotal*0.1);
    }

    else if(code==="PRINT5"){
      setDiscountAmount(5);
    }

    else{
      alert("Invalid code");
    }

  }

  function trackOrder(){

    if(!tracking) return;

    setTrackingResult({
      status:"In Transit",
      location:"Distribution Center",
      eta:"3‑5 days"
    });

  }

  function checkout(){
    alert("Connect Stripe or PayPal to enable real checkout.");
  }

  return(

  <div className="min-h-screen bg-zinc-100 text-zinc-900 p-6">

  <header className="text-center mb-10 relative">

  <h1 className="text-5xl font-bold tracking-wider">EddyWorks</h1>
  <p className="text-zinc-500">Future Made Layer by Layer</p>

  <div className="absolute right-0 top-0 flex gap-3">

  {!account && <Button onClick={loginDemo}>Login</Button>}

  {account && <span>Hi {account.name}</span>}

  <Button onClick={()=>setShowCart(!showCart)}>
  Cart ({cart.length})
  </Button>

  </div>

  </header>


  <section className="mb-12">

  <h2 className="text-2xl font-bold mb-4">🔥 Best Sellers</h2>

  <div className="grid md:grid-cols-3 gap-6">

  {best.map(p=> (

  <Card key={p.id} className="bg-white border-zinc-200 rounded-2xl shadow">

  <CardContent className="p-4">

  <img src={p.image} className="rounded-xl mb-3 w-full h-40 object-cover" />

  <h3 className="font-semibold">{p.name}</h3>

  <p className="text-sm text-zinc-500">{p.category}</p>

  <p className="text-yellow-500">⭐ {p.rating} ({p.reviews})</p>

  <p className="mt-1 font-semibold">${p.price}</p>

  <Button className="mt-2 w-full" onClick={()=>addToCart(p)}>Add to Cart</Button>

  </CardContent>

  </Card>

  ))}

  </div>

  </section>


  <div className="flex flex-wrap justify-center gap-3 mb-8">

  {["All","Fidget Toys","Useful Prints","Display Pieces","Accessories"].map(c=>(

  <Button key={c} onClick={()=>setFilter(c)}>{c}</Button>

  ))}

  </div>


  <div className="grid md:grid-cols-3 gap-6">

  {filtered.map(p=>(

  <motion.div key={p.id} whileHover={{scale:1.05}}>

  <Card className="bg-white border-zinc-200 rounded-2xl shadow">

  <CardContent className="p-4">

  <img src={p.image} className="rounded-xl mb-3 w-full h-40 object-cover" />

  <h2 className="font-semibold">{p.name}</h2>

  <p className="text-sm text-zinc-500">{p.category}</p>

  <p className="text-yellow-500">⭐ {p.rating} ({p.reviews})</p>

  <p className="mt-1">${p.price}</p>

  <Button className="mt-2 w-full" onClick={()=>addToCart(p)}>Add to Cart</Button>

  </CardContent>

  </Card>

  </motion.div>

  ))}

  </div>


  {showCart && (

  <div className="fixed right-4 top-24 w-80 bg-white border border-zinc-200 rounded-2xl p-5 shadow-2xl">

  <h2 className="text-xl font-bold mb-4">Your Cart</h2>

  {cart.map((item,index)=> (

  <div key={index} className="flex justify-between mb-2">

  <span>{item.name}</span>

  <div className="flex gap-2">

  <span>${item.price}</span>

  <button onClick={()=>removeFromCart(index)}>✕</button>

  </div>

  </div>

  ))}


  <div className="border-t my-3"></div>

  <p>Subtotal: ${subtotal.toFixed(2)}</p>


  <div className="mt-3">

  <input
  placeholder="Discount code"
  value={discount}
  onChange={(e)=>setDiscount(e.target.value)}
  className="border rounded p-2 w-full mb-2"
  />

  <Button className="w-full" onClick={applyDiscount}>Apply Code</Button>

  {discountAmount>0 && <p className="text-green-600">Discount applied</p>}

  </div>


  <div className="mt-4">

  <p className="text-sm">Shipping Calculator</p>

  <input
  placeholder="ZIP Code"
  value={shippingZip}
  onChange={(e)=>setShippingZip(e.target.value)}
  className="border rounded p-2 w-full mb-2"
  />

  <Button className="w-full" onClick={calculateShipping}>Calculate Shipping</Button>

  {shippingCost && <p className="mt-1">Shipping: ${shippingCost}</p>}

  </div>


  <div className="border-t my-3"></div>

  <p className="font-semibold">Total: ${total}</p>


  <Button className="mt-3 w-full" onClick={checkout}>Checkout</Button>

  </div>

  )}


  <section className="mt-16 max-w-md">

  <h2 className="text-xl font-bold mb-2">📦 Track Your Order</h2>

  <input
  placeholder="Tracking Number"
  value={tracking}
  onChange={(e)=>setTracking(e.target.value)}
  className="border rounded p-2 w-full mb-2"
  />

  <Button className="w-full" onClick={trackOrder}>Track Order</Button>

  {trackingResult && (

  <div className="mt-3 text-sm">

  <p>Status: {trackingResult.status}</p>

  <p>Location: {trackingResult.location}</p>

  <p>ETA: {trackingResult.eta}</p>

  </div>

  )}

  </section>


  <footer className="text-center text-zinc-500 mt-16">

  © {new Date().getFullYear()} EddyWorks — 3D Printed Innovation

  </footer>


  </div>

  );

}

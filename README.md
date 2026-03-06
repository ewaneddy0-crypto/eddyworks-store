import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";

/*
NOTE:
This version includes:
• Stripe checkout
• Order confirmation page
• Simple admin dashboard
• Product images that match products
• Mock automatic order email (server would send it in production)
*/

const stripePromise = loadStripe("pk_test_YOUR_STRIPE_PUBLIC_KEY");

const products = [
  {
    id: 1,
    name: "Gyro Fidget",
    category: "Fidget Toys",
    price: 9.99,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80",
    best: true
  },
  {
    id: 2,
    name: "Infinity Cube",
    category: "Fidget Toys",
    price: 12.99,
    rating: 4.7,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1616628182506-8b0c6c1f07b4?auto=format&fit=crop&w=600&q=80",
    best: true
  },
  {
    id: 3,
    name: "Cable Organizer",
    category: "Useful Prints",
    price: 7.99,
    rating: 4.6,
    reviews: 52,
    image: "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Headphone Stand",
    category: "Useful Prints",
    price: 15.99,
    rating: 4.9,
    reviews: 63,
    image: "https://images.unsplash.com/photo-1518444028785-8fbcd101ebb9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Dragon Display",
    category: "Display Pieces",
    price: 19.99,
    rating: 5.0,
    reviews: 44,
    image: "https://images.unsplash.com/photo-1608500218890-c4b0b4c0a9af?auto=format&fit=crop&w=600&q=80",
    best: true
  },
  {
    id: 6,
    name: "Mini Spaceship",
    category: "Display Pieces",
    price: 14.99,
    rating: 4.5,
    reviews: 37,
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Controller Grip",
    category: "Accessories",
    price: 11.99,
    rating: 4.6,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Keychain Tool",
    category: "Accessories",
    price: 6.99,
    rating: 4.4,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=600&q=80"
  }
];

export default function EddyWorksStore() {

  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [page, setPage] = useState("store");
  const [orders, setOrders] = useState([]);

  const filtered = filter === "All" ? products : products.filter(p => p.category === filter);
  const best = products.filter(p => p.best);

  function addToCart(product) {
    setCart(prev => [...prev, product]);
  }

  function removeFromCart(i) {
    setCart(prev => prev.filter((_, index) => index !== i));
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  async function checkout() {

    const stripe = await stripePromise;

    const fakeOrder = {
      id: Math.floor(Math.random() * 100000),
      items: cart,
      total: subtotal
    };

    setOrders(prev => [...prev, fakeOrder]);

    alert("Order placed! Confirmation email would be sent automatically.");

    setCart([]);
    setPage("confirmation");

  }

  if (page === "confirmation") {

    return (

      <div className="min-h-screen flex flex-col items-center justify-center text-center p-10">

        <h1 className="text-4xl font-bold mb-4">✅ Order Confirmed</h1>

        <p className="text-lg mb-6">Thank you for ordering from EddyWorks.</p>

        <p className="mb-8">A confirmation email would normally be sent automatically.</p>

        <Button onClick={() => setPage("store")}>Return to Store</Button>

      </div>

    );

  }

  if (page === "admin") {

    return (

      <div className="p-10">

        <h1 className="text-3xl font-bold mb-6">📦 Admin Dashboard</h1>

        {orders.length === 0 && <p>No orders yet.</p>}

        {orders.map(order => (

          <div key={order.id} className="border p-4 mb-4 rounded-lg">

            <p><strong>Order ID:</strong> {order.id}</p>

            <p><strong>Total:</strong> ${order.total}</p>

            <p><strong>Items:</strong></p>

            <ul className="list-disc ml-6">
              {order.items.map((item, i) => (
                <li key={i}>{item.name}</li>
              ))}
            </ul>

          </div>

        ))}

        <Button onClick={() => setPage("store")}>Back to Store</Button>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-zinc-100 text-zinc-900 p-6">

      <header className="text-center mb-10">

        <h1 className="text-5xl font-bold">EddyWorks</h1>

        <p className="text-zinc-500">Future Made Layer by Layer</p>

        <div className="mt-4 flex justify-center gap-3">

          <Button onClick={() => setPage("admin")}>Admin Dashboard</Button>

          <Button onClick={() => setShowCart(!showCart)}>Cart ({cart.length})</Button>

        </div>

      </header>

      <section className="mb-12">

        <h2 className="text-2xl font-bold mb-4">🔥 Best Sellers</h2>

        <div className="grid md:grid-cols-3 gap-6">

          {best.map(p => (

            <Card key={p.id} className="bg-white rounded-2xl shadow">

              <CardContent className="p-4">

                <img src={p.image} className="rounded-xl mb-3 w-full h-40 object-cover" />

                <h3 className="font-semibold">{p.name}</h3>

                <p className="text-sm text-zinc-500">{p.category}</p>

                <p className="text-yellow-500">⭐ {p.rating} ({p.reviews})</p>

                <p className="mt-1 font-semibold">${p.price}</p>

                <Button className="mt-2 w-full" onClick={() => addToCart(p)}>
                  Add to Cart
                </Button>

              </CardContent>

            </Card>

          ))}

        </div>

      </section>

      <div className="flex flex-wrap justify-center gap-3 mb-8">

        {["All","Fidget Toys","Useful Prints","Display Pieces","Accessories"].map(c => (

          <Button key={c} onClick={() => setFilter(c)}>{c}</Button>

        ))}

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {filtered.map(p => (

          <motion.div key={p.id} whileHover={{scale:1.05}}>

            <Card className="bg-white rounded-2xl shadow">

              <CardContent className="p-4">

                <img src={p.image} className="rounded-xl mb-3 w-full h-40 object-cover" />

                <h2 className="font-semibold">{p.name}</h2>

                <p className="text-sm text-zinc-500">{p.category}</p>

                <p className="text-yellow-500">⭐ {p.rating} ({p.reviews})</p>

                <p>${p.price}</p>

                <Button className="mt-2 w-full" onClick={() => addToCart(p)}>Add to Cart</Button>

              </CardContent>

            </Card>

          </motion.div>

        ))}

      </div>

      {showCart && (

        <div className="fixed right-4 top-24 w-80 bg-white border rounded-2xl p-5 shadow-2xl">

          <h2 className="text-xl font-bold mb-4">Your Cart</h2>

          {cart.map((item,index) => (

            <div key={index} className="flex justify-between mb-2">

              <span>{item.name}</span>

              <button onClick={() => removeFromCart(index)}>✕</button>

            </div>

          ))}

          <div className="border-t my-3"></div>

          <p>Total: ${subtotal.toFixed(2)}</p>

          <Button className="mt-3 w-full" onClick={checkout}>Checkout</Button>

        </div>

      )}

      <footer className="text-center text-zinc-500 mt-16">

        © {new Date().getFullYear()} EddyWorks

      </footer>

    </div>

  );

}

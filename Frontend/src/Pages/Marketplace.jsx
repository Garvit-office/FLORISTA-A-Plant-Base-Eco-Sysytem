import { useEffect, useState } from "react";
import axios from "axios";

export default function Marketplace() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => setProducts(res.data));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Marketplace</h1>

            <div className="grid grid-cols-4 gap-4">
                {products.map(p => (
                    <div key={p._id} className="border p-3 rounded shadow">
                        <img src={p.image} className="w-full h-32 object-cover rounded" />
                        <h3 className="font-bold">{p.name}</h3>
                        <p>₹{p.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

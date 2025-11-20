import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: ""
    });

    const fetchProducts = async () => {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async () => {
        await axios.post("http://localhost:5000/api/products/add", form);
        fetchProducts();
    };

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Admin Product Management</h1>

            <div className="grid grid-cols-2 gap-4">
                <input className="border p-2" placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />

                <input className="border p-2" placeholder="Price"
                    onChange={(e) => setForm({ ...form, price: e.target.value })} />

                <input className="border p-2" placeholder="Category"
                    onChange={(e) => setForm({ ...form, category: e.target.value })} />

                <input className="border p-2" placeholder="Stock"
                    onChange={(e) => setForm({ ...form, stock: e.target.value })} />

                <input className="border p-2 col-span-2" placeholder="Image URL"
                    onChange={(e) => setForm({ ...form, image: e.target.value })} />

                <textarea className="border p-2 col-span-2" placeholder="Description"
                    onChange={(e) => setForm({ ...form, description: e.target.value })} />

                <button onClick={addProduct}
                    className="bg-green-600 text-white p-2 rounded col-span-2">
                    Add Product
                </button>
            </div>

            <h2 className="text-lg font-bold mt-6">All Products</h2>

            <div className="grid grid-cols-3 gap-4 mt-4">
                {products.map(p => (
                    <div key={p._id} className="border p-3 rounded shadow">
                        <img src={p.image} alt="" className="w-full h-32 object-cover rounded" />
                        <h3 className="font-bold mt-2">{p.name}</h3>
                        <p>₹{p.price}</p>
                        <button
                            onClick={() => deleteProduct(p._id)}
                            className="mt-2 bg-red-500 text-white p-1 rounded">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

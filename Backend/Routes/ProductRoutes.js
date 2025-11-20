import express from "express";
import Product from "../Models/Product.js";

const router = express.Router();

// ADD PRODUCT
router.post("/add", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json({ success: true, message: "Product added", product });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ success: true, updatedProduct });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

export default router;

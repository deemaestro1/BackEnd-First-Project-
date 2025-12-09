import express from "express";
import { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct } from "../controller/product.js"




const productRouter = express.Router()
productRouter.post('/', createProduct  )
productRouter.get('/', getAllProducts)
productRouter.get('/:id', getProductById)
productRouter.delete('/:id', deleteProduct )
productRouter.put('/:id', updateProduct)


export default productRouter
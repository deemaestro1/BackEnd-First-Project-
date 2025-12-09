import { product } from "../model/product.js"



// create product
export const createProduct = async (req, res)  =>{
try {
    const {name, price, description, image, category} = req.body
    const newProduct = await product.create({
        name,
        price,
        description,
        image,
        category
    })
    res.status(201).json({
        success:true,
        message:"Product Created Succesful", 
        product:newProduct
    })
} catch (error) {
    console.error(error)
    res.status(500).json({ success:false,
        message:"server Error", error
    })   
}
}
// get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await product.find();
    res.status(200).json({ success:true, products });
  } catch (error) {
    res.status(500).json({ success:false, message:"Server error" });
  }
};

// get by product id
export const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const Product = await product.findById(productId)

    if (!Product) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(Product);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
 // DELETE  PRODUCT 
 export const deleteProduct = async (req, res) =>{
  const productId = req.params.id
  try {
    const foundProduct = await product.findById(productId)
    if(!foundProduct) return res.status(404).json({messasge:"Product Dont Exist"})
      await foundProduct.deleteOne()
    res.status(200).json({message:"User Deleted Succesfully"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
  
}



// UPDATE PRODUCRT
export const updateProduct = async (req, res) => {
  let productId = req.params.id
  const {name, price, description, image, category} = req.body
  try {
    let foundProduct = await product.findById(productId)
    if(!foundProduct) return res.status(404).json({message:"Product not Found"})

    //Update Only Provided Fields
 foundProduct.name = name || foundProduct.name
  foundProduct.price = price || foundProduct.price
 foundProduct.description = description || foundProduct.description
  foundProduct.image = image ||foundProduct.image
 foundProduct.category = category || foundProduct.foundProductcategory
  await foundProduct.save()
  res.status(200).json({
    message:"Product Succefully Updated",
    product:{
      name:product.name,
       price:product.price,
        image:product.image,
         category:product.category
    }
  })
} catch (error) {
  res.status(500).json({message:error.message})
}
}


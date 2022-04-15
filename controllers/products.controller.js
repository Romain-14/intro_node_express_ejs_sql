import ProductModel from '../models/products.model.js';

export default (app, db) => {
    const productModel = ProductModel(db);
    app.get("/api/v1/products/all", async (req, res)=>{
        try {
            const result = await productModel.getAllProducts();
            res.json({
                result: result,
            })
            console.log(result);
        } catch (error) {
            console.log('ERROR CONTROLLER =>', error);
        }
    });

}
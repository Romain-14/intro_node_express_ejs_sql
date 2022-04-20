let db;

export default (_db) => {
    db = _db;
    return ProductModel;
}

class ProductModel{

    static async getAllProducts(){
        try {
            const q = await db.query('SELECT * FROM products');
            return {
                status: 200,
                result: q,
            }
        } catch (err){
            return {
                status: 500,
                result: err.sqlMessage,
            }
            
        }
    }

    static async getOneProduct(id){
        try {
            const q = await db.query('SELECT * FROM orders WHERE orderNumber = ?', [id] );
            return {
                status: 200,
                result: q,
            }
        } catch (err){
            return {
                status: 500,
                result: err.sqlMessage,
            }
            
        }
    }

}
const ProductAPI = {
    getProducts: async () => {
        try {
            const response = await fetch('http://localhost:8080/products');
            const products = await response.json();
            return products;
        } catch (error) {
            console.log('Error in getProducts', error);
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/products/getbyid?product_id=${id}`);
            const product = await response.json();
            return product;
        } catch (error) {
            console.log('Error in getProductsById', error);
            throw error;
        }
    },

    
}

export default ProductAPI
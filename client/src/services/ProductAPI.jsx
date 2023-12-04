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
    }
}

export default ProductAPI
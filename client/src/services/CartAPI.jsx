const CartAPI = {

    addItemToCart: async (order_id, item_id, quantity) => {
        try {
            const url = `http://127.0.0.1:8080/carts/add?order_id=${(order_id)}&item_id=${(item_id)}&quantity=${(quantity)}`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include', // Include credentials such as cookies for cross-origin requests
            });
            const orderInfo = await response.json();
            return orderInfo;
        } catch (error) {
            console.log('Error in getCurrentOrder', error);
            throw error;
        }
    },

    getOrderData: async (order_id) => {
        try {
            const url = `http://127.0.0.1:8080/carts/getbyorderid?order_id=${(order_id)}`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include', // Include credentials such as cookies for cross-origin requests
            });
            const orderInfo = await response.json();
            return orderInfo;
        } catch (error) {
            console.log('Error in getCurrentOrder', error);
            throw error;
        }
    },

    deleteItemFromCart: async (cart_id) => {
        try {
            const url = `http://127.0.0.1:8080/carts/delete?cart_id=${cart_id}`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include', // Include credentials such as cookies for cross-origin requests
            });
        } catch (error) {
            console.log('Error in deleteItemFromCart', error);
            throw error;
        }
    }

}

export default CartAPI
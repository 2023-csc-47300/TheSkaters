const OrderAPI = {

    getCurrentOrder: async (user_id) => {
        try {
            const url = `http://127.0.0.1:8080/orders/current?user_id=${(user_id)}`;
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

    startNewOrder: async (user_id) => {
        try {
            const url = `http://127.0.0.1:8080/orders/new?user_id=${(user_id)}`;
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
    

}

export default OrderAPI
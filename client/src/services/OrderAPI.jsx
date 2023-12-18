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

    checkoutOrder: async (order_id) => {
        const url = `http://localhost:8080/orders/checkout?order_id=${(order_id)}`; // Replace with your desired URL
        const newWindow = window.open(url, '_blank');
        if (newWindow) {
            // If the window was successfully opened, redirect
            newWindow.location.href = url;
        } else {
            // Handle if the window was blocked by the browser's pop-up blocker
            console.error('The pop-up window was blocked by the browser.');
            // You might want to provide a message to the user or perform an alternative action.
        }
    },
    


}

export default OrderAPI
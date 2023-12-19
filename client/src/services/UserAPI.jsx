const UserAPI = {
    loginViaGithub: async () => {
        const url = 'http://localhost:8080/users/github'; // Replace with your desired URL
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

    loggedInGithub: async () => {
        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'GET',
                credentials: 'include', // Include credentials such as cookies for cross-origin requests
            });
            const userInfo = await response.json();
            return userInfo;
        } catch (error) {
            console.log('Error in loggedInGithub', error);
            throw error;
        }
    },

    logoutGithub: async () => {
        try {
            const response = await fetch('http://localhost:8080/users/logout', {
                method: 'GET',
                credentials: 'include', // Include credentials such as cookies for cross-origin requests
            });
            // window.location.href = "/#/logIn";
            // const userInfo = await response.json();
            // return userInfo;
        } catch (error) {
            console.log('Error in logoutGithub', error);
            throw error;
        }
    },


    loginLocally: async (email, password) => {
        try {
            const url = `http://localhost:8080/users/loginlocal?email=${(email)}&password=${(password)}`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include', // Include credentials such as cookies for cross-origin requests
            });
            const userInfo = await response.json();
            return userInfo;
        } catch (error) {
            console.log('Error in loginLocally', error);
            throw error;
        }
    },
    

    signUpLocally: async (first_name, last_name, email, password) => {
        try {
            const url = `http://localhost:8080/users/signup?first_name=${(first_name)}&last_name=${(last_name)}&email=${(email)}&password=${(password)}`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include', // Include credentials such as cookies for cross-origin requests
            });
            const userInfo = await response.json();
            return userInfo;
        } catch (error) {
            console.log('Error in loginLocally', error);
            throw error;
        }
    },

}

export default UserAPI
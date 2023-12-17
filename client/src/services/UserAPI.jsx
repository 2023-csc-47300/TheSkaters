const UserAPI = {
    loginViaGithub: async () => {
        try {
            const response = await fetch('http://localhost:8080/users/github', {
                method: 'GET',
                credentials: 'include', // Include credentials such as cookies for cross-origin requests
            });

            const userInfo = await response.json();
            return userInfo;
        } catch (error) {
            console.log('Error in loginViaGithub', error);
            throw error;
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
                method: 'POST',
                credentials: 'include', // Include credentials such as cookies for cross-origin requests
            });

            // const userInfo = await response.json();
            // return userInfo;
        } catch (error) {
            console.log('Error in logoutGithub', error);
            throw error;
        }
    }


}

export default UserAPI
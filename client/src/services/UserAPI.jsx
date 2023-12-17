const UserAPI = {
    // loginViaGithub: async () => {
    //     try {
    //         const response = await fetch('http://localhost:8080/users/github', {
    //             method: 'GET',
    //             credentials: 'include', // Include credentials such as cookies for cross-origin requests
    //             mode: 'no-cors',
    //         });
    //         console.log(response)
    //         const userInfo = await response.json();
    //         return userInfo;
    //     } catch (error) {
    //         console.log('Error in loginViaGithub', error);
    //         throw error;
    //     }
    // },
    loginViaGithub: async () => {
        try {
            const response = await fetch('http://localhost:8080/users/github', {
                method: 'GET',
                credentials: 'include', // Include credentials such as cookies for cross-origin requests
                redirect: 'manual' // Prevent the browser from automatically following redirects
            });
    
            // Check if the response is a redirect
            if (response.status === 302) {
                // Get the redirect URL from the 'Location' header
                const redirectUrl = response.headers.get('Location');
    
                // Redirect the user manually using window.location
                // window.location.href = redirectUrl;
            } else {
                // Handle other responses if needed
                const userInfo = await response;
                return userInfo;
            }
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
                method: 'GET',
                credentials: 'include', // Include credentials such as cookies for cross-origin requests
            });
            // window.location.href = "/logIn";
            // const userInfo = await response.json();
            // return userInfo;
        } catch (error) {
            console.log('Error in logoutGithub', error);
            throw error;
        }
    },
    loginViaLocal: async (formData, body) => {
        try {
            const response = await fetch('http://127.0.0.1:8080/users/login', {
                method: 'GET',
                credentials: 'include', // Include credentials such as cookies for cross-origin requests
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify(body), // Convert body object to JSON
            });

        } catch (error) {
            console.log('Error in loginViaLocal', error);
            throw error;
        }
    },


}

export default UserAPI
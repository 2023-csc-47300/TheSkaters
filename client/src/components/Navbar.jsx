import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'
import DisplayCartCount from './DisplayCartCount';
import UserAPI from '../services/UserAPI';

const Navbar = ({ cartItcartItemsCountems, githubUser }) => {
    // Check if githubUser exists or is not in an error state (Unauthorized)
    const isLoggedIn = githubUser && !githubUser.error;

    const handleGitHubLogout = async () => {
        try {
            const response = await UserAPI.logoutGithub();
            window.location.href = "/logIn";
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    console.log(githubUser)

    return (
        <header className='navBar'>
            <div className="header-container">
                <div className="header-left">
                    <Link to="/">
                        <img src={logo} />
                        <h1>The Skaters</h1>
                    </Link>
                </div>
                <div className="header-right">
                    <Link to="/parts"><button className='partsBtn'>Parts</button></Link>
                    <Link to="/skates"><button className='skatesBtn'>Skates</button></Link>
                    <Link to="/gear"><button className='gearBtn'>Gear</button></Link>
                    <DisplayCartCount cartItemsCount={cartItemsCount} />
                    {/* {
                        githubUser ?
                            <button className='logInBtn' onClick={handleGitHubLogout}>{githubUser.github}</button>
                            : <Link to="/logIn"><button className='logInBtn'>Log-In</button></Link>
                    } */}
                    {!isLoggedIn ? (
                        <Link to="/logIn"><button className='logInBtn'>Log-In</button></Link>
                    ) : (
                        <button className='logInBtn' onClick={handleGitHubLogout}>
                            {githubUser.github}
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar;
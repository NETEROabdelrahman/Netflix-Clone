import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [search, setSearch] = useState(true);
    const [searchVal, setSearchVal] = useState('');

    const profilePicture = JSON.parse(localStorage.getItem("user"))?.profilePic
    

    const handleLogout = () => {
        localStorage.removeItem("user")
        window.location.reload()
    }

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    return (
        <nav className={isScrolled ? "navbar scrolled " : "navbar "}>
            <div className="container">
                    
                
                <div className="left">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                    <Link className="link" to='/'><span>Homepage</span></Link>
                    <Link to="/series" className="link">
                        <span className="navbarmainLinks">Series</span>
                    </Link>
                    <Link to="/movies" className="link">
                        <span className="navbarmainLinks">Movies</span>
                    </Link>
                    <Link className="link"><span>New and Popular</span></Link>
                    <Link className="link"><span>My List</span></Link>
                        
                </div>
                <div className="right">
                    <Search className="icon" onClick={() => setSearch(!search)} />
                    <input
                        type="search"
                        style={search ? { display: 'none' } : { display: 'block' }}
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                    />
                    <span>KID</span>
                    <Notifications className="icon" />
                    <img
                        src={profilePicture}
                        alt=""
                    />
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <span>Settings</span>
                            <span onClick={handleLogout}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </nav>
    );
};

export default Navbar;
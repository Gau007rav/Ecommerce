import React from 'react'
import "./navbar.css"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
function Navbar() {
    return (
        <header>
            <nav>
                <div className='left'>
                    <div className='navlogo'>
                     <NavLink to="/">  <img src="https://flyclipart.com/thumb2/amazon-buy-logo-online-shop-icon-499798.png " style={{width:"87px" }} alt='logo'></img></NavLink> 
                    </div>
                    <div className="nav_searchbaar">
                        <input type="text" name="" placeholder="Search Your Products" />
                        <div className="search_icon">
                            <SearchIcon id="search" />
                        </div>

                    </div>
                </div>
                <div className='right'>
                    <div className="nav_btn">
                        <NavLink to="/login">Sign in</NavLink>
                    </div>
                    <div className='cart_btn'>
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartIcon id="icon" />
                        </Badge>
                        <p>cart</p>
                    </div>
                    <Avatar className='avtar'></Avatar>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
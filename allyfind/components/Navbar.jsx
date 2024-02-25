import React, { useState } from "react";
import  Logo from "../components/assets/logo.png"
import {BsCart2 } from "react-icons/bs";
//import {HiOutLineBars3} from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import '../src/styles/Navbar.css'
import { ListItem } from "@mui/material";


const Navbar = () => {
  
    const [openMenu,setOpenMenu] = useState(false);
    const menuOptions = [
        {
            text :"Home",
            icons:<HomeIcon />,
        },
        {
            text :"About",
            icons:<InfoIcon />,
        },
        {
            text :"SignIn/SignUp",
            icons:<CommentRoundedIcon />,
        },
        
    ];
    
    return (
    <nav>
        <div className = "nav-logo-container">
            <img src={Logo} alt="" />
        </div>
        <div className="navbar-links-container">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/auth">SignIn/SignUp</a>
        </div>
        <Drawer open={openMenu} onClose={() => setOpenMenu(false)}
        anchor="right">
            <Box sx={{width: 250}}
            role="presentation"
            onClick={() => setOpenMenu(false)}
            onKeyDown={() => setOpenMenu(false)}
            >
                <List>
                    {menuOptions.map((item) => (
                        <ListItem KEY={item.text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    </nav>
    );
};

export default Navbar;


import React from 'react';
import './Header.css';
import { Button, Form, FormGroup, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div className="app-header-bar">
            <div className="app-top-power-bar">
                <div className="ts-search-outer" aria-label="search and new chat">
                    <Form role="search" acceptCharset="UTF-8" >
                        <Input className="bar" type="search" name="contact" />
                    </Form>
                </div>
            </div>
            <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </Button>
            <div className="collapse navbar-collapse" id="navbar-list-4">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <Link  className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="Button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width="40" height="40" className="rounded-circle" />
                        </Link >
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link  className="dropdown-item" to="#">Dashboard</Link >
                            <Link  className="dropdown-item" to="#">Edit Profile</Link >
                            <Link  className="dropdown-item" to="#">Log Out</Link >
                        </div>
                    </li>   
                </ul>
            </div>
        </div>
    )
}

export default Header

import React, { useState } from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    DropdownItem,
    DropdownMenu,
    UncontrolledDropdown,
    DropdownToggle,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { logout } from '../../redux/authSlice';
function Header() {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
      };
    return (
        <div className='header'>
            <Navbar color="faded" light expand="sm">
                <NavbarBrand href="/" className="me-auto">
                    Woocommerce
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="me-2" />
                <Collapse isOpen={!collapsed} navbar className='ms-auto'>
                    <Nav navbar>
                        <NavItem>
                            <Link className="nav-link" to="/">Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/products">Products</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/admin">Admin</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/validation">Validation</Link>
                        </NavItem>
                        <NavItem>
                            <NavLink  >
                                Contact
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown
                            className="me-2"
                            direction="down"
                        >
                            <DropdownToggle caret color="primary">
                                {
                                    user&&user?user:"User Info"
                                }
                            </DropdownToggle>
                            <DropdownMenu>

                                <DropdownItem active>
                                    <Link className="nav-link" to="/login">Login</Link>
                                </DropdownItem>
                                <DropdownItem active>
                                    <Link className="nav-link" to="/logout" onClick ={handleLogout}>Logout</Link>
                                </DropdownItem>
                                <DropdownItem divider />

                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>

            </Navbar>
        </div>
    );
}

export default Header;
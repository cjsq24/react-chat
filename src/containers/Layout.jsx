import React, { useState } from 'react';
import {
   Collapse,
   Navbar,
   NavbarToggler,
   //NavbarBrand,
   Nav,
   NavItem,
   //NavLink,
   DropdownToggle,
   UncontrolledDropdown,
   DropdownMenu,
   DropdownItem,
   //NavbarText
} from 'reactstrap';
import { NavLink as NavLinkRouter } from 'react-router-dom';

import useAuth from '../auth/useAuth'

export default function Layout({ children }) {
   const [isOpen, setIsOpen] = useState(false);
   const auth = useAuth()

   const toggle = () => setIsOpen(!isOpen);

   const logout = () => {
      auth.logout()
   }

   return (
      <div>
         <Navbar color="light px-4" light expand="md">
            {/*<NavLinkRouter to='/dashboard' className='navbar-brand'>
               reactstrap
            </NavLinkRouter>*/}
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
               <Nav className="mr-auto" navbar>
                  <NavItem>
                     <NavLinkRouter to='/chat' className='nav-link'>
                        Chat
                     </NavLinkRouter>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                     <DropdownToggle nav caret>
                        {`${auth.user.name} ${auth.user.last_name}`}
                     </DropdownToggle>
                     <DropdownMenu right>
                        <DropdownItem>
                           Option 1
                        </DropdownItem>
                        <DropdownItem>
                           Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={logout}>
                           Cerrar Sesión
                        </DropdownItem>
                     </DropdownMenu>
                  </UncontrolledDropdown>
               </Nav>
            </Collapse>
         </Navbar>
         <div className='container-fluid'>
            {children}
         </div>
      </div>
   );
}
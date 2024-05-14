import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <nav className='mt-2'>
    <ul className='nav nav-pills flex-column' data-widget="treeview" role="menu" data-accordion="true">
        <li className='nav-item'>
            <Link to={"/home"} className='nav-link'>
                <i className='nav-icon fa fa-th mr-2'></i>
                INICIO
            </Link>
            <Link to={"/clientes"} className='nav-link'>
                <i className='nav-icon fa fa-th mr-2'></i>
                Clientes
            </Link>
            <Link to={"/proveedores"} className='nav-link'>
                <i className='nav-icon fa fa-th mr-2'></i>
                Proveedores
            </Link>
            <Link to={"/productos"} className='nav-link'>
                <i className='nav-icon fa fa-th mr-2'></i>
                Productos
            </Link>
        </li>
    </ul>
</nav>
)
};
export default Menu;








import React, {Fragment} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./paginas/auth/login";
import Registro from "./paginas/auth/registro";
import Home from "./Home";
import MostrarClientes from "./paginas/modulos/MostrarClientes";
import AgregarCLiente from "./componentes/AddCliente";
import EditarCliente from "./componentes/Editclient";
import MostrarProductos from "./paginas/modulos/MostrarProductos";
import EditarProducto from "./componentes/EditProducto";
import MostrarProveedores from "./paginas/modulos/MostrarProveedores";
import EditarProveedor from "./componentes/EditProveedor";
import AgregarProducto from "./componentes/Addproducto";
import AgregarProveedor from "./componentes/AddProveedor";


function App() {
  return (
    <div className="App">
      <Fragment>
      <Router>
        <Routes>

          <Route path="/" exact element = {<Login />}></Route>
          <Route path="/Registro" exact element = {<Registro />}></Route>
          <Route path="/Home" exact element = {<Home />}></Route>
          <Route path="/Clientes" exact element = {<MostrarClientes />}></Route>
          <Route path="/Clientes/agregar" exact element = {<AgregarCLiente />}></Route>
          <Route path="/Clientes/editar/:id" exact element = {<EditarCliente />}></Route>
          <Route path="/productos" exact element = {<MostrarProductos />}></Route>
          <Route path="/productos/agregar" exact element = {<AgregarProducto />}></Route>
          <Route path="/productos/editar/:id" exact element = {<EditarProducto />}></Route>
          <Route path="/proveedores" exact element = {<MostrarProveedores />}></Route>
          <Route path="/proveedores/agregar" exact element = {<AgregarProveedor />}></Route>
          <Route path="/proveedores/editar/:id" exact element={<EditarProveedor />} />
        </Routes>
      </Router>
      </Fragment>
    </div>
  );
}

export default App;

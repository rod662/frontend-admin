import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Contentheader from "./Contentheader";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebarcontainer from "./Sidebarcointaner";
import APIInvoke from "../config/APIInvoke"
import swal from "sweetalert";

const AgregarProducto = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState({
        nombre: '',
        tipo: '',
        cantidad: '',
        precio: ''
    })

    const {nombre, tipo, cantidad, precio} = productos;

    useEffect(()=> {
        document.getElementById("nombre").focus();
    }, [])

    const onChange = (e) => {
        setProductos({
            ...productos,
            [e.target.name]: e.target.value
        })
    }

    const crearProducto = async () => {
        const data = {
            nombre: productos.nombre,
            tipo: productos.tipo,
            cantidad: productos.cantidad,
            precio: productos.precio
        }

        const response = await APIInvoke.invokePOST('/api/productos', data);
        const idProductos = response._id;
        if(idProductos === ''){
            const msg = "Hubo un error al agregar el producto";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'ok',
                        value: true,
                        visible: true,
                        classname: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        } else {
            navigate('/productos');
            const msg = "El producto fue agregado con exito";
            swal({
                title: 'Informacion',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'ok',
                        value: true,
                        visible: true,
                        classname: 'btn btn-success',
                        closeModal: true
                    }
                }
            });
            setProductos({
                nombre: '',
                tipo: '',
                cantidad: '',
                precio: ''
            });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearProducto();
    }

  return (
    <div className="wrapper">
        <Navbar></Navbar>
        <Sidebarcontainer></Sidebarcontainer>
        <div className="content-wrapper">
            <Contentheader 
                titulo={"Crear producto"}
                breadCrumb1={"Listado de productos"}
                breadCrumb2={"Agregar"}
                ruta1={"/productos/agregar"}
            />
            <section className="content">
                <div className="card">
                    <div className="card-header">
                        
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="collapse"><i className="fas fa-times"></i></button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove" title="remove"><i className="fas fa-items"></i></button>
                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">                            
                                    <label htmlFor="nombre">Nombre</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="nombre" 
                                    name="nombre"
                                    placeholder="Ingrese el nombre del producto"
                                    value={nombre}
                                    onChange={onChange}
                                    required
                                    />                                    
                                </div>
                            
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="tipo">Tipo</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="tipo" 
                                    name="tipo"
                                    placeholder="Ingrese el tipo de producto"
                                    value={tipo}
                                    onChange={onChange}
                                    required
                                    />                                    
                                </div>
                            </div>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="cantidad">Cantidad</label>
                                    <input 
                                    type="number" 
                                    className="form-control" 
                                    id="cantidad" 
                                    name="cantidad"
                                    placeholder="Ingrese la cantidad de productos"
                                    value={cantidad}
                                    onChange={onChange}
                                    required
                                    />                                    
                                </div>
                            </div>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="precio">Precio</label>
                                    <input 
                                    type="number" 
                                    className="form-control" 
                                    id="precio" 
                                    name="precio"
                                    placeholder="Ingrese el precio del producto"
                                    value={precio}
                                    onChange={onChange}
                                    required
                                    />                                    
                                </div>
                            </div>
                            
                            
                
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <button type="submit" className="btn btn-primary"><i className="bi bi-floppy"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
        
            <Footer />
    </div>
    
  )
}

export default AgregarProducto;
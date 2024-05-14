import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Contentheader from "./Contentheader";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebarcontainer from "./Sidebarcointaner";
import APIInvoke from "../config/APIInvoke";
import swal from "sweetalert";

const EditarProducto = () => {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    // Función actualizar
    const editarProducto = async (e) => {
        e.preventDefault();
        const response = await APIInvoke.invokePUT(`/api/productos/${id}`, {
            nombre, tipo, cantidad, precio
        });
        if (response.msg === "Se ha modificado el producto") {
            swal({
                title: "Información",
                text: "El producto fue actualizado correctamente",
                icon: "success",
                buttons: {
                    confirm: {
                        text: "OK",
                        value: true,
                        visible: true,
                        className: "btn btn-primary",
                        closeModal: true
                    }
                }
            });
            navigate('/productos');
        } else {
            swal({
                title: "Error",
                text: "Hubo un error al actualizar el producto",
                icon: "error",
                buttons: {
                    confirm: {
                        text: "OK",
                        value: true,
                        visible: true,
                        className: "btn btn-danger",
                        closeModal: true
                    }
                }
            });
        }
    }

    useEffect(() => {
        getProductoByID();
        // eslint-disable-next-line
    }, []);

    const getProductoByID = async () => {
        const result = await APIInvoke.invokeGET(`/api/productos/${id}`);
        setNombre(result.nombre);
        setTipo(result.tipo);
        setCantidad(result.cantidad);
        setPrecio(result.precio);
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <Sidebarcontainer></Sidebarcontainer>
            <div className="content-wrapper">
                <Contentheader 
                    titulo={"Editar producto"}
                    breadCrumb1={"Listado de productos"}
                    breadCrumb2={"Editar"}
                    ruta1={"/productos"}
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
                            <form onSubmit={editarProducto}>
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="nombre" 
                                        name="nombre"
                                        placeholder="Ingrese el nombre del producto"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tipo">Tipo</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="tipo" 
                                        name="tipo"
                                        placeholder="Ingrese el tipo del producto"
                                        value={tipo}
                                        onChange={(e) => setTipo(e.target.value)}
                                        required
                                    />                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cantidad">Cantidad</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="cantidad" 
                                        name="cantidad"
                                        placeholder="Ingrese la cantidad del producto"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(e.target.value)}
                                        required
                                    />                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="precio">Precio</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="precio" 
                                        name="precio"
                                        placeholder="Ingrese el precio del producto"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                                        required
                                    />                                    
                                </div>
                                <div className="card-footer text-center">
                                    <button type="submit" className="btn btn-primary"><i className="bi bi-floppy"></i> Guardar</button>
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

export default EditarProducto;

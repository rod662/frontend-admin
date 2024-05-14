import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Contentheader from "../../componentes/Contentheader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import Sidebarcontainer from "../../componentes/Sidebarcointaner";
import APIInvoke from '../../config/APIInvoke';
import swal from "sweetalert";


const MostrarProductos = () => {
    const [productos, setProductos] = useState([]);

    const getProductos = async () => {
        const response = await APIInvoke.invokeGET('/api/productos');
        console.log(response); // Añadir esta línea para ver la respuesta de la API
        setProductos(response.productos || []);
    };

    useEffect(() => {
        getProductos();
    }, []);

    const eliminarProductos = async (e, idProducto) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/productos/${idProducto}`);

        if (response.msg === "El producto fue eliminado") { // Asegurarse de que el mensaje coincida
            const msg = "El producto fue eliminado correctamente";
            swal({
                title: "Información",
                text: msg,
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
            getProductos();
        } else {
            const msg = "Hubo un error al eliminar el producto";
            swal({
                title: "Error",
                text: msg,
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
    };

    return (
        <div className="wrapper">
            <Navbar />
            <Sidebarcontainer />
            <div className="content-wrapper">
                <Contentheader 
                    titulo={"Listado de productos"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Productos"}
                    ruta1={"/home"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={"/productos/agregar"} className="btn btn-block btn-success btn-sm">
                                <i className="bi bi-plus-circle"></i>
                                </Link>
                            </h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus"></i>
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '25%' }}>Nombre</th>
                                        <th style={{ width: '25%' }}>Tipo</th>
                                        <th style={{ width: '25%' }}>Cantidad</th>
                                        <th style={{ width: '20%' }}>Precio</th>
                                        <th style={{ width: '10%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.length > 0 ? (
                                        productos.map((producto, index) => (
                                            <tr key={index}>
                                                <td>{producto.nombre}</td>
                                                <td>{producto.tipo}</td>
                                                <td>{producto.cantidad}</td>
                                                <td>{producto.precio}</td>
                                                <td>
                                                    <Link to={`/productos/editar/${producto._id}`} className="btn btn-sm btn-warning">
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Link>
                                                    <button onClick={(e) => eliminarProductos(e, producto._id)} className="btn btn-sm btn-danger">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">No hay productos disponibles</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </div>
    );
};

export default MostrarProductos;
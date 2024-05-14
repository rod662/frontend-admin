import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Contentheader from "../../componentes/Contentheader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import Sidebarcontainer from "../../componentes/Sidebarcointaner";
import APIInvoke from '../../config/APIInvoke';
import swal from "sweetalert";

const MostrarProveedores = () => {
    const [proveedores, setProveedores] = useState([]);

    const getProveedores = async () => {
        try {
            const response = await APIInvoke.invokeGET('/api/proveedores');
            console.log(response); // Añadir esta línea para ver la respuesta de la API
            setProveedores(response.proveedores || []);
        } catch (error) {
            console.error("Error al obtener proveedores:", error);
        }
    };

    useEffect(() => {
        getProveedores();
    }, []);

    const eliminarProveedor = async (e, idProveedor) => {
        e.preventDefault();
        try {
            const response = await APIInvoke.invokeDELETE(`/api/proveedores/${idProveedor}`);
            if (response.msg === "El proveedor fue eliminado") { // Asegurarse de que el mensaje coincida
                const msg = "El proveedor fue eliminado correctamente";
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
                getProveedores();
            } else {
                const msg = "Hubo un error al eliminar el proveedor";
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
        } catch (error) {
            console.error("Error al eliminar proveedor:", error);
        }
    };

    return (
        <div className="wrapper">
            <Navbar />
            <Sidebarcontainer />
            <div className="content-wrapper">
                <Contentheader 
                    titulo={"Listado de proveedores"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Proveedores"}
                    ruta1={"/home"}
                />
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                <Link to={"/proveedores/agregar"} className="btn btn-block btn-success btn-sm">
                                    <i className="bi bi-person-add"></i>
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
                                        <th style={{ width: '20%' }}>Nombres</th>
                                        <th style={{ width: '20%' }}>Empresa</th>
                                        <th style={{ width: '20%' }}>Cédula</th>
                                        <th style={{ width: '20%' }}>Correo</th>
                                        <th style={{ width: '20%' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proveedores.length > 0 ? (
                                        proveedores.map((proveedor, index) => (
                                            <tr key={index}>
                                                <td>{proveedor.nombres}</td>
                                                <td>{proveedor.empresa}</td>
                                                <td>{proveedor.cedula}</td>
                                                <td>{proveedor.correo}</td>
                                                <td>
                                                    <Link to={`/proveedores/editar/${proveedor._id}`} className="btn btn-sm btn-warning">
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Link>
                                                    <button onClick={(e) => eliminarProveedor(e, proveedor._id)} className="btn btn-sm btn-danger">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">No hay proveedores disponibles</td>
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

export default MostrarProveedores;

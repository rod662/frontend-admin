import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Contentheader from "./Contentheader";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebarcontainer from "./Sidebarcointaner";
import APIInvoke from "../config/APIInvoke";
import swal from "sweetalert";

const EditarProveedor = () => {
    const [nombres, setNombres] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    // Función actualizar
    const editarProveedor = async (e) => {
        e.preventDefault();
        const response = await APIInvoke.invokePUT(`/api/proveedores/${id}`, {
            nombres, empresa, cedula, correo, telefono, direccion
        });
        if (response.msg === "Se ha modificado el proveedor") {
            swal({
                title: "Información",
                text: "El proveedor fue actualizado correctamente",
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
            navigate('/proveedores');
        } else {
            swal({
                title: "Error",
                text: "Hubo un error al actualizar el proveedor",
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
        getProveedorByID();
        // eslint-disable-next-line
    }, []);

    const getProveedorByID = async () => {
        try {
            const result = await APIInvoke.invokeGET(`/api/proveedores/${id}`);
            if (result) {
                setNombres(result.nombres || '');
                setEmpresa(result.empresa || '');
                setCedula(result.cedula || '');
                setCorreo(result.correo || '');
                setTelefono(result.telefono || '');
                setDireccion(result.direccion || '');
            }
        } catch (error) {
            console.error('Error al obtener los datos del proveedor:', error);
        }
    }

    return (
        <div className="wrapper">
            <Navbar />
            <Sidebarcontainer />
            <div className="content-wrapper">
                <Contentheader 
                    titulo={"Editar proveedor"}
                    breadCrumb1={"Listado de proveedores"}
                    breadCrumb2={"Editar"}
                    ruta1={"/proveedores"}
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
                            <form onSubmit={editarProveedor}>
                                <div className="form-group">
                                    <label htmlFor="nombres">Nombres</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="nombres" 
                                        name="nombres"
                                        placeholder="Ingrese los nombres del proveedor"
                                        value={nombres}
                                        onChange={(e) => setNombres(e.target.value)}
                                        required
                                    />                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="empresa">Empresa</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="empresa" 
                                        name="empresa"
                                        placeholder="Ingrese el nombre de la empresa del proveedor"
                                        value={empresa}
                                        onChange={(e) => setEmpresa(e.target.value)}
                                        required
                                    />                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cedula">Cédula</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="cedula" 
                                        name="cedula"
                                        placeholder="Ingrese la cédula del proveedor"
                                        value={cedula}
                                        onChange={(e) => setCedula(e.target.value)}
                                        required
                                    />                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="correo">Correo</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="correo" 
                                        name="correo"
                                        placeholder="Ingrese el correo del proveedor"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        required
                                    />                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telefono">Teléfono</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="telefono" 
                                        name="telefono"
                                        placeholder="Ingrese el teléfono del proveedor"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        required
                                    />                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="direccion">Dirección</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="direccion" 
                                        name="direccion"
                                        placeholder="Ingrese la dirección del proveedor"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
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

export default EditarProveedor;

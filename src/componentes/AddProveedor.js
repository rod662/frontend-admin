import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Contentheader from "./Contentheader";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebarcontainer from "./Sidebarcointaner";
import APIInvoke from "../config/APIInvoke"
import swal from "sweetalert";

const AgregarProveedor = () => {
    const navigate = useNavigate();
    const [proveedores, setProveedores] = useState({
        nombres: '',
        empresa: '',
        cedula: '',
        correo: '',
        telefono: '',
        direccion: ''
    })

    const {nombres, empresa, cedula, correo, telefono, direccion} = proveedores;

    useEffect(()=> {
        document.getElementById("nombres").focus();
    }, [])

    const onChange = (e) => {
        setProveedores({
            ...proveedores,
            [e.target.name]: e.target.value
        })
    }

    const crearProveedor = async () => {
        const data = {
            nombres: proveedores.nombres,
            empresa: proveedores.empresa,
            cedula: proveedores.cedula,
            correo: proveedores.correo,
            telefono: proveedores.telefono,
            direccion: proveedores.direccion
        }

        const response = await APIInvoke.invokePOST('/api/proveedores', data);
        const idProveedores = response._id;
        if(idProveedores === ''){
            const msg = "Hubo un error al agregar el proveedor";
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
            navigate('/proveedores');
            const msg = "El proveedor fue agregado con exito";
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
            setProveedores({
                nombres: '',
                empresa: '',
                cedula: '',
                correo: '',
                telefono: '',
                direccion: ''  
            });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearProveedor();
    }

  return (
    <div className="wrapper">
        <Navbar></Navbar>
        <Sidebarcontainer></Sidebarcontainer>
        <div className="content-wrapper">
            <Contentheader 
                titulo={"Crear proveedor"}
                breadCrumb1={"Listado de proveedores"}
                breadCrumb2={"Agregar"}
                ruta1={"/proveedores/agregar"}
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
                                    <label htmlFor="nombres">Nombres</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="nombres" 
                                    name="nombres"
                                    placeholder="Ingrese los nombres del proveedor"
                                    value={nombres}
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
                                    <label htmlFor="empresa">empresa</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="empresa" 
                                    name="empresa"
                                    placeholder="Ingrese la empresa"
                                    value={empresa}
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
                                    <label htmlFor="cedula">Cedula</label>
                                    <input 
                                    type="number" 
                                    className="form-control" 
                                    id="cedula" 
                                    name="cedula"
                                    placeholder="Ingrese la cedula del proveedor"
                                    value={cedula}
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
                                    <label htmlFor="correo">Correo</label>
                                    <input 
                                    type="email" 
                                    className="form-control" 
                                    id="correo" 
                                    name="correo"
                                    placeholder="Ingrese el correo del proveedor"
                                    value={correo}
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
                                    <label htmlFor="telefono">Telefono</label>
                                    <input 
                                    type="number" 
                                    className="form-control" 
                                    id="telefono" 
                                    name="telefono"
                                    placeholder="Ingrese el telefono del proveedor"
                                    value={telefono}
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
                                    <label htmlFor="direccion">Direccion</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="direccion" 
                                    name="direccion"
                                    placeholder="Ingrese la direccion del proveedor"
                                    value={direccion}
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

export default AgregarProveedor;
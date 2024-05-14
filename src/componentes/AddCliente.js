import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Contentheader from "./Contentheader";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebarcontainer from "./Sidebarcointaner";
import APIInvoke from "../config/APIInvoke"
import swal from "sweetalert";

const AgregarCLiente = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState({
        nombres: '',
        apellidos: '',
        cedula: '',
        correo: '',
        telefono: '',
        direccion: ''
    })

    const {nombres, apellidos, cedula, correo, telefono, direccion} = clientes;

    useEffect(()=> {
        document.getElementById("nombres").focus();
    }, [])

    const onChange = (e) => {
        setClientes({
            ...clientes,
            [e.target.name]: e.target.value
        })
    }

    const crearCliente = async () => {
        const data = {
            nombres: clientes.nombres,
            apellidos: clientes.apellidos,
            cedula: clientes.cedula,
            correo: clientes.correo,
            telefono: clientes.telefono,
            direccion: clientes.direccion
        }

        const response = await APIInvoke.invokePOST('/api/clientes', data);
        const idClientes = response._id;
        if(idClientes === ''){
            const msg = "Hubo un error al agregar el cliente";
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
            navigate('/clientes');
            const msg = "El cliente fue agregado con exito";
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
            setClientes({
                nombres: '',
                apellidos: '',
                cedula: '',
                correo: '',
                telefono: '',
                direccion: ''  
            });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearCliente();
    }

  return (
    <div className="wrapper">
        <Navbar></Navbar>
        <Sidebarcontainer></Sidebarcontainer>
        <div className="content-wrapper">
            <Contentheader 
                titulo={"Crear cliente"}
                breadCrumb1={"Listado de clientes"}
                breadCrumb2={"Agregar"}
                ruta1={"/clientes/agregar"}
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
                                    placeholder="Ingrese los nombres del cliente"
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
                                    <label htmlFor="apellidos">Apellidos</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="apellidos" 
                                    name="apellidos"
                                    placeholder="Ingrese los apellidos del cliente"
                                    value={apellidos}
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
                                    placeholder="Ingrese la cedula del cliente"
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
                                    placeholder="Ingrese el correo del cliente"
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
                                    placeholder="Ingrese el telefono del cliente"
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
                                    placeholder="Ingrese la direccion del cliente"
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

export default AgregarCLiente;
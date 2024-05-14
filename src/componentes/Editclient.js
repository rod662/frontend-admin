import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Contentheader from "./Contentheader";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebarcontainer from "./Sidebarcointaner";
import APIInvoke from "../config/APIInvoke"



const EditarCliente = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    // Funcion actualizar

    const editarClientes = async (e) => {
        e.preventDefault();
        await APIInvoke.invokePUT(`/api/clientes/${id}`, {
            nombres:nombres, apellidos:apellidos, cedula:cedula, correo:correo, telefono:telefono, direccion:direccion
        })
        navigate('/clientes');
    }
    
    useEffect(()=> {
        getClientesID();
// eslint-disable-next-line
    }, []);
    const getClientesID = async () => {
      const resul =  await APIInvoke.invokeGET(`/api/clientes/${id}`)
      setNombres(resul.nombres)
      setApellidos(resul.apellidos)
      setCedula(resul.cedula)
      setCorreo(resul.correo)
      setTelefono(resul.telefono)
      setDireccion(resul.direccion)
    }
  return (
    <div className="wrapper">
        <Navbar></Navbar>
        <Sidebarcontainer></Sidebarcontainer>
        <div className="content-wrapper">
            <Contentheader 
                titulo={"Editar cliente"}
                breadCrumb1={"Listado de clientes"}
                breadCrumb2={"Editar"}
                ruta1={"/clientes/editar"}
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
                        <form onSubmit={editarClientes}>
                            <div className="form-group">                            
                                    <label htmlFor="nombres">Nombres</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="nombres" 
                                    name="nombres"
                                    placeholder="Ingrese los nombres del cliente"
                                    value={nombres}
                                    onChange={(e) => setNombres(e.target.value)}
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
                                    onChange={(e) => setApellidos(e.target.value)}
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
                                    onChange={(e) => setCedula(e.target.value)}
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
                                    onChange={(e) => setCorreo(e.target.value)}
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
                                    onChange={(e) => setTelefono(e.target.value)}
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
                                    onChange={(e) => setDireccion(e.target.value)}
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

export default EditarCliente;
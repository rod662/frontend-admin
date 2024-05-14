import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Contentheader from "../../componentes/Contentheader";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import Sidebarcontainer from "../../componentes/Sidebarcointaner";
import APIInvoke from '../../config/APIInvoke';
import swal from "sweetalert";


const MostrarClientes = () => {
    const [clientes, setClientes] = useState([])
    const getClientes = async() => {
        const response = await APIInvoke.invokeGET('/api/Clientes');
        setClientes(response.clientes);
    }
    useEffect(()=>{
        getClientes();
    }, []);

    const eliminarClientes = async (e, idCliente) => {
        e.preventDefault();
        const response  = await APIInvoke.invokeDELETE(`/api/Clientes/${idCliente}`);

        if(response.msg === "El cliente fue eliminado") {
            const msg = "EL cliente fue eliminado correctamente";
            swal ({
                title: "Informacion",
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
            getClientes();
        } else {
            const msg = "Hubo un error al eliminar el cliente";
            swal ({
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
    }

  return (
    <div className="wrapper">
        <Navbar></Navbar>
        <Sidebarcontainer></Sidebarcontainer>
        <div className="content-wrapper">
            <Contentheader 
                titulo={"Listado de clientes"}
                breadCrumb1={"Inicio"}
                breadCrumb2={"Clientes"}
                ruta1={"/home"}
            />
            <section className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title"><Link to = {"/clientes/agregar"} className="btn btn-block btn btn-success btn-small"><i className="bi bi-person-add"></i></Link></h3> 
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="collapse"><i className="fas fa-times"></i></button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove" title="remove"><i className="fas fa-items"></i></button>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th style={{width: '15%'}}>Nombre</th>
                                    <th style={{width: '15%'}}>Apellidos</th>
                                    <th style={{width: '15%'}}>Cedula</th>
                                    <th style={{width: '20%'}}>Correo</th>
                                    <th style={{width: '10%'}}>Telefono</th>
                                    <th style={{width: '15%'}}>Direccion</th>
                                    <th style={{width: '10%'}}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map((cliente, index) =>(
                                    <tr key={index}>
                                        <td>{cliente.nombres}</td>
                                        <td>{cliente.apellidos}</td>
                                        <td>{cliente.cedula}</td>
                                        <td>{cliente.correo}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.direccion}</td>
                                        <td>
                                            <Link to={`/clientes/editar/${cliente._id}`} className="btn btn-sm btn-warning"><i className="bi bi-pencil-square"></i></Link>
                                            <button onClick={(e) => eliminarClientes(e, cliente._id)} className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    </div>
  )
};

export default MostrarClientes;
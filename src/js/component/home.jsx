import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { func } from "prop-types";

//create your first component
const Home = () => {

	const [tarea, setTarea] = useState("")
	const [lista, setLista] = useState([])

	const crearUsuario = async() => {
		const response = await fetch ("https://assets.breatheco.de/apis/fake/todos/user/dnumon", {
			method: "POST" , 
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json", 
			} 
		})
		const data = await response.json ()
		console.log(data)
	}

	useEffect(() => {
		// crearUsuario()
		obtenerListaTareas ()
	},[])

	useEffect(() => {
		// crearUsuario()
		actualizarListaTareas ()
	},[lista])

	const obtenerListaTareas = async() => {
		try{
			const response = await fetch ("https://assets.breatheco.de/apis/fake/todos/user/dnumon")
			const data = await response.json ()
			console.log(data)
			setLista(data)
		} catch(error){
			console.log(error)
		}
	}

	const actualizarListaTareas = async() => {
		try{
			const response = await fetch ("https://assets.breatheco.de/apis/fake/todos/user/dnumon", {
				method: "PUT",
				body: JSON.stringify(lista),
				headers: {
					"Content-Type": "application/json"
				}
			})
			const data = await response.json ()
		}
		catch (error){
			console.log(error)
		}
	}

	function envioTarea(e){
		e.preventDefault()
		setLista([...lista, {"label": tarea, "done": false }])
		setTarea("")
		// actualizarListaTareas()
	}

    function eliminar(id) {
		let tareaFinal = [] 
		tareaFinal = lista.filter((item, index) => {
			if(index != id){
				return item
			}
		})
		setLista(tareaFinal)
	}
 	return (
		<div className="text-center">
			<h1>To do list</h1>
			<input style={{marginRight: "100px", marginLeft: "1000px"}}
			className="form-control"
			type="text" 
			value={tarea}
			onChange={(e) => setTarea(e.target.value)}/>
			<button style={{marginTop: "10px"}} onClick={envioTarea}>Add task</button>
			<br />
			<div style={{marginTop: "10px", marginLeft: "100px", marginRight: "100px"}}>
			<ul className="list-group">
				{lista.map((item,id) => (
					<li className="list-group-item" key={id}>
						{item.label}
						<button className="btn btn-outline-secondary float-end"
						onClick={() => eliminar(id)}><i className="fa fa-trash"></i></button>
					</li>
				))}
			</ul>
			</div>
		</div>
	);
};

export default Home;

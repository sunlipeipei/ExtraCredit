import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './PokemonDetail.css';

export default function PokemonDetail() {
    const [pokemonDetailsState, setPokemonDetailState] = useState(null);

    const params = useParams();

    const navigate = useNavigate()

    async function getPokemonDetails() {
        let response;
        try {
            response = await axios.get('/api/pokemon/' + params.pokemonId)      
            
            setPokemonDetailState(response.data);
        } catch (error) {
            console.log(error)
            navigate('/banana');
        }


    }

    async function updatePokemon(type, id) {
        const updateValue =  window.prompt(`Enter value for ${type}?`)
        if(!updateValue){
            return;
        }
        try{
            const updatedPokemonInfo = {[type]: updateValue}
            const response = await axios.put(`/api/pokemon/${id}`, updatedPokemonInfo)
            setPokemonDetailState(response.data);
            } catch (error) {
                console.error("Failed to update Pokémon:", error);
            }

    }

    useEffect(() => {
        getPokemonDetails()
    }, []);

    if(!pokemonDetailsState) {
        return (<div>Loading...</div>)
    }

    // return (<div>
    //     Pokemon Details Here for: {params.pokemonId}
    //     <div className="containter">
    //         Name: {pokemonDetailsState.name}
    //         <button onClick={()=>{updatePokemon("name",pokemonDetailsState.id)}}>Update</button>
    //     </div>
    //     <div className="containter">
    //         Health: {pokemonDetailsState.health}
    //         <button onClick={()=>{updatePokemon("health",pokemonDetailsState.id)}}>Update</button>
    //     </div>
        
    //     <div className="containter">
    //         Level: {pokemonDetailsState.level}
    //         <button onClick={()=>{updatePokemon("level",pokemonDetailsState.id)}}>Update</button>
    //     </div>
    //     <Link to={'/'} > Return to Main</Link> 
    // </div>)

    return(
        <div>
            <h3 className="title">Pokemon Details Here for: {params.pokemonId}</h3>
            <div className="pokemon-info">
            <strong>Name:</strong> {pokemonDetailsState.name}
            <button
                className="update-btn"
                onClick={() => updatePokemon("name", pokemonDetailsState.id)}
            >
                Update
            </button>
        </div>
        <div className="pokemon-info">
            <strong>Health:</strong> {pokemonDetailsState.health}
            <button
                className="update-btn"
                onClick={() => updatePokemon("health", pokemonDetailsState.id)}
            >
                Update
            </button>
        </div>
        <div className="pokemon-info">
            <strong>Level:</strong> {pokemonDetailsState.level}
            <button
                className="update-btn"
                onClick={() => updatePokemon("level", pokemonDetailsState.id)}
            >
                Update
            </button>
        </div>
        <div>
            <Link to={'/'} > Return to Main</Link> 
        </div>
        </div>
        
    )

}
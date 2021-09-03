import React, { useEffect, useState } from 'react';
import './home.css'
import md5 from 'md5';

export const Home = () => {

    const [characters, setCharacters] = useState(null);
    const [comics, setComics] = useState(null);
    const [hash] = useState(md5(1+process.env.REACT_APP_PRIVATE_KEY+process.env.REACT_APP_PUBLIC_KEY));
    const [selected, setSelected] = useState(null);

    
        useEffect(() => {
            getCharacters();
            getComics();
        }, [])

    function getCharacters() {
        fetch(`${process.env.REACT_APP_API_URL}/v1/public/characters?ts=1&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`)
            .then( resp => resp.json())
            .then( data => {
                setCharacters(data)
            });
    }

    function getComics() {
        fetch(`${process.env.REACT_APP_API_URL}/v1/public/comics?ts=1&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${hash}`)
            .then( resp => resp.json())
            .then( data => {
                setComics(data);
            });
    }

    console.log(characters);
    console.log(comics);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Home</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 offset-2 mb-3">
                    {   !!selected &&
                        <div className="card detail">
                            <img src={`${selected.thumbnail.path}.${selected.thumbnail.extension}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{ selected.name }</h5>
                                <p className="card-text">
                                {
                                    selected.description
                                }
                                </p>
                                <a href="#" className="btn btn-primary">
                                Go somewhere
                                </a>
                            </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger btn-sm float-end" onClick={ () => setSelected(null)}>Close</button>
                                </div>
                        </div>
                    }

                </div>
            </div>
            <div className="row">
                    {
                        !characters ? 
                            <div className="spinner-border text-secondary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            :
                                !!characters &&
                                characters.data.results.map( ({ id, name, thumbnail, description }, index) =>{
                                    return (
                                        <div key={ index }className="col-md-6">
                                            <div className="card mb-3 info" style={{ maxWidth: 540 }}>
                                                <div className="row g-0">
                                                    <div className="col-md-4">
                                                        <img src={`${thumbnail.path}.${thumbnail.extension}`} className="rounded-start" alt="..." />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body">
                                                            <h5 className="card-title">{name}</h5>
                                                                <p className="card-text">
                                                                {
                                                                    description
                                                                }
                                                                </p>
                                                            <p className="card-text">
                                                                <small className="text-muted">Last updated 3 mins ago</small>
                                                            </p>
                                                            <button className="btn btn-outline-success" onClick={ () => setSelected({ name, thumbnail, description }) }>
                                                                Show Details
                                                            </button>
                                                        </div>
                                                    </div>
                                                    </div>
                                            </div>
                                        </div>

                                    )
                                })
                    
                    }
            </div>
        </div>
    )
}

import React, { useState } from 'react';
import md5 from 'md5';

export const Home = () => {

    const [characters, setCharacters] = useState(null);
    const [comics, setComics] = useState(null);
    const [hash] = useState(md5(1+process.env.REACT_APP_PRIVATE_KEY+process.env.REACT_APP_PUBLIC_KEY));

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    
                </div>
            </div>
        </div>
    )
}

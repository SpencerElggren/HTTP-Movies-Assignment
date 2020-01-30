import React, {useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from "axios";

const initialMovie =  {
    id: 0,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    metascore: 100,
    stars: ["Marlon Brando", "Al Pacino", "Robert Duvall"]
};

const UpdateForm = () => {
    const {movie, setMovie} = useState(initialMovie);
    const { id } = useParams();

    const handleChange = (e) => {
        let value = e.target.value;
        setMovie({[e.target.value]: value})
    };

   const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(r => console.log(r))
    };

        return (
            <form onSubmit={handleSubmit}>
                <div className={'movie-card'}>
                    <label>Title:
                        <textarea value={movie.title} onChange={handleChange} placeholder={movie.title}/>
                    </label>
                    <div className="movie-director">
                        <label>Director:
                            <textarea value={movie.director} onChange={handleChange} placeholder={movie.director}/>
                        </label>
                    </div>
                    <div className="movie-metascore">
                        Metascore: <strong>{movie.metascore}</strong>
                    </div>
                    <h3>Actors:</h3>

                    {movie.stars.map(star => (
                        <div key={star} className="movie-star">
                            <label>
                                <textarea value={movie.stars} onChange={handleChange} placeholder={star}/>
                            </label>
                        </div>
                    ))}
                </div>
            </form>
        )
};

export default UpdateForm;
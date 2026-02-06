import React from "react";
import { Link } from 'react-router-dom';

// Styles
import { Image } from "./Thumb.styles";

const Thumb = ({ image, movieID, clickable }) => {
    return (
    <div>
        {clickable ? (
            <Link to={`/movie/${movieID}`}>
                <Image src={image} alt='movie-thumb' />
            </Link>
        )
        : (<Image src={image} alt='movie-thumb' />)}
    </div>)
};

export default Thumb;
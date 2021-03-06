import React from 'react';
import './WatchList.scss';

const watchList = (props) => (
    <div className="watch__card-info" onClick={props.click}>
        <img className="watch__card-img" src={`https://image.tmdb.org/t/p/w200/${props.movies}`} />
        <button type="button" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
);

export default watchList;
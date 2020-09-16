import React from 'react';
import './MovieList.css';
import * as moment from 'moment'
import ReadMoreReact from 'read-more-react';

const movieList = (props) => (
    <div className="primary__card">
        <div className="row">
            <div className="col-md-3">
                <img src={`https://image.tmdb.org/t/p/w200/${props.data.poster_path}`} alt={props.data.original_title} />
            </div>
            <div className="col-md-9">
                <div className="primary__card-info">
                    <h2>{props.data.title}</h2>
                    <p><span className="primary_card-subtitle">{props.data.title} Score:</span> {props.data.vote_average} / 10</p>
                    <p><span className="primary_card-subtitle">Release Date: </span>{moment(props.data.release_date).format('LL')}</p>
                    <ReadMoreReact text={props.data.overview} min={100} max={500} readMoreText="Read More"/>
                </div>
                <button className="btn btn-outline-dark" onClick={props.add}>Add to Watched List</button>
            </div>
        </div>
    </div>
);

export default movieList;

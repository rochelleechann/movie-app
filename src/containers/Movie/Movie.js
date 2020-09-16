import React, { Component } from 'react';

// Library to make HTTP request
import axios from 'axios';

import MovieList from '../../components/MovieList/MovieList';
import WatchList from '../../components/WatchList/WatchList';
import './Movie.css';

class Movie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: [],
            movieList: 10,
            total: null,
            errorMessage: null,
            selectMovieIndex: 0,
            selectedMovies: [],
            showSelected: false
        };
    }

    async componentDidMount() {
        this.getMovieDetails();
    }

    getMovieDetails = () => {
        // Ideally, we should not hard code this especially since the API is exposed.
        // I wanted to add an AWS Lambda to handle the api request and from there you can add some authentication to the API Gateway
        // Authentication could be a login that passes the credential and if the user exist, it can pass the correct token
        const movieApi = 'https://api.themoviedb.org/3/movie/now_playing?api_key=24d68039a345d8e16b23fb9865fa6fd8&language=en-US&page=10';
        axios.get(movieApi).then(response => {
            const results = response.data.results;
            const totalResults = response.data.total_results;
            this.setState({
                movie: results,
                total: totalResults
            })
        }).catch(error => {
            this.setState({
                errorMessage: 'Oops, something went wrong. There was an error retrieving movies. Please try again.'
            })
        });
    }

    getAdditionalMovies = () => {
        this.setState({ movieList: this.state.movieList + 2 })
    }

    addMovieHandler = (movie) => {
        const updateSelected = [...this.state.selectedMovies];
        updateSelected.push(movie);
        this.setState({
            showSelected: true,
            selectedMovies: [...updateSelected]
        })
    }

    removeMovieHandler = (movie) => {
        const removeSelected = [...this.state.selectedMovies];
        const titleIndex = removeSelected.indexOf(movie);
        removeSelected.splice(titleIndex, 1);
        this.setState({ selectedMovies: [...removeSelected] })
        if (this.state.selectedMovies.length < 1) {
            this.setState({ showSelected: false })
        }
    }

    render() {
        return (
            <div>
                {this.state.showSelected && this.state.selectedMovies.length > 0 &&
                    <div className="mt-4">
                        <h3>Watched List: </h3>
                        <div className="watched__primary">
                            {this.state.selectedMovies.map(movie => {
                                return (
                                    <WatchList movies={movie} click={() => this.removeMovieHandler(movie)} />
                                )
                            })}
                        </div>
                    </div>
                }
                {!this.state.errorMessage &&
                    <div className="row">
                        <div className="col-xs-12 col-md-8 offset-md-2">
                            {this.state.movie.slice(0, this.state.movieList).map(item => {
                                return (
                                    <MovieList add={() => this.addMovieHandler(item.poster_path)} data={item} />
                                )
                            })}
                        </div>
                        <div className="col-xs-12 col-md-8 offset-md-2">
                            <button className="btn btn-outline-info" onClick={this.getAdditionalMovies}>View More Movies</button>
                            <p className="movie_results">Total Search Results Found: {this.state.movieList} / {this.state.total}</p>
                        </div>
                    </div>
                }
                {this.state.errorMessage &&
                    <div className="row mt-4">
                        <div className="col-xs-12 col-md-8 offset-md-2">
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMessage}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Movie;
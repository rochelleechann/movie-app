import React, { Component } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList/MovieList';
import './Movie.css';

// Higher order component
// import { connect } from 'react-redux';

class Movie extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            movie: [],
            movieList: 10,
            total: null,
            errorMessage: null,
            selectMovie: false,
            selectMovieIndex: 0,
            selectedMovie: []
        }
    }
    
    async componentDidMount() {
        this.getMovieDetails();
    }
    
    getMovieDetails = () => {
        const movieApi = 'https://api.themoviedb.org/3/movie/now_playing?api_key=24d68039a345d8e16b23fb9865fa6fd8&language=en-US&page=10';
        axios.get(movieApi).then(response => {
            console.log('resoponse', response);
            // const results = response.data.results.slice(0, 10);
            const results = response.data.results;
            const totalResults = response.data.total_results;
            this.setState({
                movie: results,
                total: totalResults
            })
            console.log('Results:', results);
        }).catch(error => {
            this.setState({
                errorMessage: 'Oops, something went wrong. There was an error retrieving movies. Please try again.'
            })
        });
    }

    getAdditionalMovies = () => {
        this.setState({movieList: this.state.movieList + 2})
    }

    addMovie = (title, index) => {
        // Commented out for now, but want to push the user selection to a new array so I can keep track
        // I was console logging to see if the items gets pushed to the new array, but only gets added on second click
        // if (this.state.selectedMovie.length === 0) {
        //     this.setState({selectedMovie: title});
        // } else if (!(this.state.selectedMovie).includes(title)) {
        //     this.setState({ 
        //         selectedMovie: [...this.state.selectedMovie, title]
        //     })
        // }
        this.setState({
            selectMovie: true,
            selectMovieIndex: index
        })
        console.log('Added', this.state.selectMovieIndex);
        console.log('Title Add:', this.state.selectedMovie);
    }

    // Based on the selectedMovies array, I want to find the title and remove from the array
    // Havent added the logic yet
    removeMovie = (title, index) => {
        this.setState({
            selectMovie: false,
            selectMovieIndex: index
        })
    }
    
    render() {
        return (
            <div>
                {!this.state.errorMessage &&
                <div className="row">
                    <div className="col-xs-12 col-md-8 offset-md-2">
                        {this.state.movie.slice(0, this.state.movieList).map((item, index) => {
                            return (
                                <div>
                                    <MovieList watch={this.state.selectMovie} watchIndex={this.state.selectMovieIndex} add={() => this.addMovie(item.title, index)} remove={() =>this.removeMovie(item.title, index)} index={index} data={item}/>
                                </div>
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

// const mapStateToProps = state => {
//     return {
//         own: state.ownMovie,
//         storeResults: state.results
//     };
// }

// const mapDispatchToProps = dispatch => ({
//     onAddMovie: (id) => dispatch({type: 'ADD', resultItem: id}),
//     onRemoveMovie: (id) => dispatch({type: 'REMOVE', resultItem: id})
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Movie);

export default Movie;
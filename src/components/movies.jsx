import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: {
      path: 'title',
      order: 'asc'
    }
  };

  componentDidMount() {
    const genres = [{ _id: "0", name: "All Movies" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres
    });
  }
  
  handleGenreSelect = (genre) => {
    this.setState({selectedGenre: genre, currentPage: 1});
  }

  handleSort = sortColumn => {
    this.setState({sortColumn});
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleLike = movie => {
    // make shallow copy  
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    // clone the object at index
    movies[index] = { ...movies[index] };
    // toggle the prop liked
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id !== "0"
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sortedMovies, currentPage, pageSize);

    if (count === 0) return <h3>No movies</h3>;

    return (
      <div className="row">
        <div className="col-3">

          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />

        </div>

        <div className="col">
          <h3>Movies {filteredMovies.length}</h3>

          <MoviesTable 
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={filteredMovies.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
          
        </div>
      </div>
    );
  }
}

export default Movies;

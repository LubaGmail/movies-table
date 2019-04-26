import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

class MoviesTable extends Component {
  columns = [
    {path: 'title', name: 'Title'},
    {path: 'genre.name', name: 'Genre'},
    {path: 'numberInStock', name: 'Stock'},
    {path: 'dailyRentalRate', name: 'Rate'},
    {
      key: 'like', 
      content: movie => (<Like toggleLike={() => this.props.onLike(movie)} 
                          liked={movie.liked}
                          /> 
                        )
    },
    {
      key: 'delete',
      content: movie => (<button onClick={() => this.props.onDelete(movie)}
                            className='btn btn-danger btn-sm'
                          >
                          Delete
                        </button>
                        ) 
    }
  ]

  render() {
    const { movies } = this.props;

    return (
      <table className="table table-striped">
      
        <TableHeader
          columns={this.columns}
          sortColumn={this.props.sortColumn}
          onSort={this.props.onSort}
        />

        <TableBody
          data={movies}
          columns={this.columns}
        />

      </table>
    );
  }
}

export default MoviesTable;

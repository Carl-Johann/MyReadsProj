import React, { Component } from 'react';
import BookList from './BookList';
import BookSearch from './BookSearch';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ReactCSSTransitionGroup from 'react';

class BooksApp extends Component {

  state = {
    books: [],
    searchBooks: [],

    bookshelves : [
        'Currently Reading',
        'Want To Read',
        'Read',
    ]

  }

  getBooksAndSetState = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }

  componentDidMount() {
    this.getBooksAndSetState()
  };


  updateNewBook = (bookshelf, book) => {
    BooksAPI.update(book, bookshelf).then( () => {

      // We need to get the book 'again' after updating it,
      // because to show it on the bookslist page without updating the view,
      // the book object needs a bookshelf, and it only get that if we get all the books again.
      this.getBooksAndSetState()
    });

  }


  searchForBook = (searchText) => {

    BooksAPI.search(searchText).then( searchBooks => {

      if ( searchBooks["error"] ) {
      // The BooksAPI returns an error if no books match the search query - 'searchText'.
      // So instead of cheacking if the 'searchBooks' is a valid object everytime we have to itterate through it,
      // we just set it as an empty array.
        console.log("Error: " +searchBooks['error']+ " - Usually because no books matched the search query")
        this.setState({ searchBooks: [] })
      } else {
        // There was books matching the search query.
        this.setState({ searchBooks })
      }

    });

  };

  render() {

    const { books, searchBooks, bookshelves } = this.state
    const { updateNewBook, searchForBook } = this
    return (
      <div>

        {/* BookList.js */}
        <Route exact path="/" render={ () => (
          <BookList
            books={ books }
            updateBook={ (bookshelf, book) => { updateNewBook(bookshelf, book) }}
            bookshelves={ bookshelves }
          />
        )}/>

        {/* BookSearch.js */}
        <Route exact path="/search" render={ ({ history }) => (
          <BookSearch
            onSearchBooks={ searchText => { searchForBook(searchText) }}
            searchBooks={ searchBooks }

            books={ books }
            updateBook={ (bookshelf, book) => { updateNewBook(bookshelf, book) }}
            bookshelves={ bookshelves }
          />
        )}/>

      </div>
    )
  }
}



export default BooksApp

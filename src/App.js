import React, { Component } from 'react'
import update from 'immutability-helper'
import BookList from './BookList'
import BookSearch from './BookSearch'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends Component {
  state = {
    books: [],
    searchBooks: [],
    
  }

  getBooksAndSetState = () => {
    BooksAPI.getAll().then((books) => {
      console.log(books)
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



  getBookshelfForBook = (book) => {
    // this.state.books.filter( filterBook => { filterBook.id == book.id })
    let filteredBooks = this.state.books.includes(book)
    
    return filteredBooks
  }



  searchForBook = (search_text) => {

    BooksAPI.search(search_text).then((books) => {
      // console.log(books)
      
      if ( books["error"] ) {
        console.log("error")
        this.setState({ searchBooks: [] }) 
      } else {        
        this.setState({ searchBooks: books }) 
      }
      
    });

  };
  
  render() {    
    return (
      <div>        
        <Route exact path="/" render={ () => (          
          <BookList
            books={ this.state.books }
            updateBook={(bookshelf, book) => { this.updateNewBook(bookshelf, book) }}            
          />                    
        )}/>

        <Route exact path="/search" render={ ({ history }) => (
          
          <BookSearch 
            searchBooksBookshelf={(book) => { this.getBookshelfForBook(book)  }}
            onSearchBooks={(search_text) => { this.searchForBook(search_text) }}
            searchBooks={this.state.searchBooks}
            books={this.state.books}
            updateBook={(bookshelf, book) => { this.updateNewBook(bookshelf, book) }}
          />          
        )}/>
        
        
      </div>
    )
  }
}



export default BooksApp

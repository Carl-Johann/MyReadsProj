import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './BookComponent'


class BookSearch extends Component {
    
    
    

    render () {      

        return (
            <div>
                 <div className="search-books">
                    <div className="search-books-bar">
                        <Link 
                            to="/"
                            className="close-search"
                        >Close
                        </Link>                        
                            <div className="search-books-input-wrapper">
                                <input type="text" onChange={(e) => this.props.onSearchBooks(e.target.value)} placeholder="Search by title or author"/>
                            </div>
                        </div>
                        <div className="search-books-results">

                        <ol className="books-grid">                                                              
                            {                                
                                this.props.searchBooks.map( book => (
                                <Book
                                    key={book.id}
                                    book={book}
                                    books={this.props.books}
                                    searchBooksBookshelf={this.props.searchBooksBookshelf}
                                    updateBook={this.props.updateBook}
                                />                                
                            ))}
                        </ol>                         
                        
                    </div>
                </div>
            </div>
        )
    }
}


export default BookSearch
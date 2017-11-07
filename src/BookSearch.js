import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './BookComponent';
import { Wave } from 'better-react-spinkit';

class BookSearch extends Component {


    render () {

        const { onSearchBooks, searchBooks, books, updateBook, bookshelves } = this.props

        return (
            <div>
                 <div className="search-books">

                    <div className="search-books-bar">

                        <Link
                            to="/"
                            className="close-search"
                            > Close
                        </Link>

                        <div className="search-books-input-wrapper">
                            <input type="text" onChange={ event => onSearchBooks( event.target.value )} placeholder="Search by title or author"/>
                        </div>

                    </div>

                    <div className="search-books-results">
                        <ol className="books-grid">

                            {searchBooks
                                .map( book => (
                                    <Book
                                        key={ book.id }
                                        book={ book }
                                        books={ books }
                                        updateBook={ updateBook }
                                        bookshelves={ bookshelves }
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
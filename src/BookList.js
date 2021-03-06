import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './BookComponent';
import changeCase from 'change-case';
import { CSSTransitionGroup } from 'react-transition-group'


class BookList extends Component {

    render() {
        const { books, updateBook, bookshelves } = this.props

        return (
            <div>
                <div className="list-books">

                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>

                    <div className="list-books-content">
                        {bookshelves.map( shelf => (

                            <div key={ shelf }>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">{ shelf }</h2>
                                    <div className="bookshelf-books">

                                        <ol className="books-grid">
                                            <CSSTransitionGroup transitionName="bookMove" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} className="bookMove">
                                                {books
                                                    .filter( book => ( book.shelf === changeCase.camelCase( shelf )))
                                                    .map( book => (
                                                        <Book
                                                            key={ book.id }
                                                            book={ book }
                                                            updateBook={ updateBook }
                                                            bookshelves={ bookshelves }
                                                        />
                                                ))}
                                            </ CSSTransitionGroup>
                                        </ol>

                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>

                    <div className="open-search">
                        <Link
                            to='/search'
                            > Add Contact
                        </Link>
                    </div>

                </div>
            </div>

        )
    }

}


export default BookList
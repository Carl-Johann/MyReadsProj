import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './BookComponent'
import changeCase from 'change-case'
import ReactCSSTransitionGroup from 'react';


class BookList extends Component {    
    state = {
        bookshelves : [ 
            'Currently Reading',
            'Want To Read',
            'Read'
        ]
    }

    render() {
        const { books, updateBook } = this.props

        return (
            <div>
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        {this.state.bookshelves.map( shelf => (

                            

                            <div key={shelf}>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">{shelf }</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">                                    
                                            { books
                                                .filter( book => ( book.shelf === changeCase.camelCase(shelf)) )
                                                .map( book => ( 
                                                    <ReactCSSTransitionGroup>
                                                        <Book 
                                                            key={book.id} 
                                                            book={book} 
                                                            updateBook={updateBook}
                                                        /> 
                                                    </ ReactCSSTransitionGroup>
                                                ))
                                            } 
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
import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import changeCase from 'change-case';

class Book extends Component {


    render() {
        const { book, updateBook, books, bookshelves } = this.props

        // We set a default select option as 'none' so the user can select all the other options
        let booksBookshelf = "none";

        // If the book has a bookshelf, if they were fetched with 'get()' or 'getAll()'
        if (book.shelf) {

            // The select tag's correct option is choosen
            booksBookshelf = book.shelf


        // The books have been fethced with 'search()' so they do not have a shelf.
        } else {

            // If the 'usersbooks' contain the book.
            // If the user searches for a book already asigned a bookshelf in the 'MyReads'
            // it will choose the correct option in the 'select' tag
            books.map( propsBook => {
                if ( propsBook.id === book.id ) {
                    booksBookshelf = propsBook.shelf
                }
            })
        }



        let bookAuthors;

        if (book.authors) {
        // If the authors are available

            // Set the 'bookAuthors' to this books authors.
            bookAuthors = book.authors
            if (book.authors.length !== 1) {

                // There's more than one author so we join the with commas
                bookAuthors = book.authors.join(', ')
            }
        }


        return (
            <div>
                <li>

                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks["thumbnail"]})` }}> </div>

                            <div className="book-shelf-changer">
                                <select value={ booksBookshelf } onChange={ event => updateBook( event.target.value, book )}>
                                    <option disabled>Move to...</option>

                                    {bookshelves.map( shelf => (
                                        <option key={ shelf } value={changeCase.camelCase( shelf )}> { shelf } </option>
                                    ))}

                                    <option value="none">None</option>
                                </select>
                            </div>

                        </div>
                        <div className="book-title">{ book.title }</div>
                        <div className="book-authors">{ bookAuthors }</div>
                    </div>

                </li>
            </div>
        )
    }

}

export default Book
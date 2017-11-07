import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
// import { Wave } from 'better-react-spinkit'
import { CSSTransitionGroup } from 'react-transition-group'

class Book extends Component {
    

    


    render() {
        const { book, searchBooksBookshelf, updateBook, books} = this.props
        
        
        // We set a default select option as 'none'
        let booksBookshelf = "none";
        
        // If the book has a bookshelf, if they were fetched with 'get()' or 'getAll()'
        if (book.shelf) {

            // The select tag's correct option is choosen 
            booksBookshelf = book.shelf        
        
        
        // The books are fethced with 'search()' because they do not have a shelf.
        } else {
            
            // If the 'usersbooks' contain the book. 
            // So if the user searches for a book already asigned a bookshelf in the 'MyReads' 
            // it will choose the correct option in the 'select' tagude
            books.map( b => { if (b.id === book.id) { booksBookshelf = b.shelf }} )   
        }



        let bookAuthors;
        
        // If the authors are available
        if (book.authors) {

            // Set the 'bookAuthors' to this books authors
            bookAuthors = book.authors
            if (book.authors.length !== 1) {

                // There's more than one author so we join the with commas
                bookAuthors = book.authors.join(', ')
            } 
        }


        const lorte = {
            // position: relative
            
            
        }

        return (
            <div>                
                <li>
                    
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks["thumbnail"]})` }}></div>
                            <div className="book-shelf-changer">
                                <select value={booksBookshelf} onChange={(e) => updateBook(e.target.value, book)}>
                                    <option disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{bookAuthors}</div>
                    </div>
                </li>
            </div>            
        )
    }
}

export default Book
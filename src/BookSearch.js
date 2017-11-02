import React, { Component } from 'react';
import { Link } from 'react-router-dom'

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
                                <input type="text" onChange={(e) => this.props.searchBooks(e.target.value)} placeholder="Search by title or author"/>
                            </div>
                        </div>
                        <div className="search-books-results">

                        <ol className="books-grid"></ol>
                    </div>
                </div>
            </div>
        )
    }
}


export default BookSearch
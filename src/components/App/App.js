import React from 'react';
import './App.css';
import { Component } from 'react';
import LibraryService from '../../repository/libraryRepository';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from '../Header/header';
import BookAdd from '../Books/BookAdd/bookAdd';
import BookEdit from '../Books/BookEdit/bookEdit';
import Books from '../Books/BookList/books';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books : [],
      authors : [],
      categories : [],
      countries : []
    }
  }

  // TODO: dodadi getBook(bookId) i posle dodadi selectedBook i posle testiraj site funkcionalnosti
  // so localhost:3000, otkoga se raboti moze da deploy-nesh React aplikaciajta na heroku

  render () {
    return (
      <Router>
                <main>
                    <Header/>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"/books/add"}
                                   element={<BookAdd categories={this.state.categories}
                                                        authors={this.state.authors}
                                                        onAddBook={this.addBook}/>} exact/>
                            <Route path={"/books/:id/edit"}
                                   element={<BookEdit categories={this.state.categories}
                                                         authors={this.state.authors}
                                                         onEditBook={this.editBook}
                                                        />} exact/>
                            <Route path={"/books"}
                                   element={<Books books={this.state.books}
                                                      onDelete={this.deleteProduct}
                                                      />}
                                   exact/>
                            <Route path="/" element={<Navigate replace to="/books"/>}/>
                        </Routes>
                    </div>
                </main>
            </Router>
    );
  }

  loadAuthors = () => {
    LibraryService.fetchAuthors()
    .then((data) => {
      this.setState({
        authors : data.data
      })
    })
  }

  loadCategories = () => {
    LibraryService.fetchCategories()
    .then((data) => {
      this.setState({
        categories : data.data
      })
    })
  }

  loadCountries = () => {
    LibraryService.fetchCountries()
    .then((data) => {
      this.setState({
        countries : data.data
      })
    })
  }

  loadBooks = () => {
    LibraryService.fetchBooks()
    .then((data) => {
      this.setState({
        books : data.data
      })
    })
  }

  addBook = (name, category, authorId, availableCopies) => {
    LibraryService.addBook(name, category, authorId, availableCopies)
    .then(() => {
      this.loadBooks();
    })
  }

  editBook = (id, name, category, authorId, availableCopies) => {
    LibraryService.editBook(id, name, category, authorId, availableCopies)
        .then(() => {
            this.loadBooks();
        });
  }

  deleteBook = (id) => {
    LibraryService.deleteBook(id)
    .then(() => {
      this.loadBooks();
    })
  }

  componentDidMount() {
    this.loadCountries();
    this.loadCategories();
    this.loadAuthors();
    this.loadBooks();
  }

}

export default App;

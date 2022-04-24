import React from 'react';
import './App.css';
import { Component } from 'react';
import LibraryService from '../../repository/libraryRepository';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from '../Header/header';
import BookAdd from '../Books/BookAdd/bookAdd';
import BookEdit from '../Books/BookEdit/bookEdit';
import Books from '../Books/BookList/books';
import Categories from '../Categories/categories'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books : [],
      authors : [],
      categories : [],
      countries : [],
      selectedBook : {}
    }
  }

  render () {
    return (
      <Router>
                <main>
                    <Header/>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"/categories"} 
                                   element={<Categories categories={this.state.categories}/>} exact/>
                            <Route path={"/books/add"}
                                   element={<BookAdd categories={this.state.categories}
                                                     authors={this.state.authors}
                                                     onAddBook={this.addBook}/>} exact/>
                            <Route path={"/books/:id/edit"}
                                   element={<BookEdit categories={this.state.categories}
                                                      authors={this.state.authors}
                                                      onEditBook={this.editBook}
                                                      book = {this.state.selectedBook}
                                                      />} exact/>
                            <Route path={"/books"}
                                   element={<Books  books={this.state.books}
                                                    onDelete={this.deleteBook}
                                                    onEdit={this.fetchBookById}
                                                    onMarkAsTaken={this.markBookAsTaken}
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

  fetchBookById = (bookId) => {
    LibraryService.fetchBookById(bookId)
    .then((data) => {
      this.setState({
        selectedBook: data.data
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

  markBookAsTaken = (id) => {
    LibraryService.markBookAsTaken(id)
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

import axios from '../custom-axios/axios'

const LibraryService = {

  fetchCountries: () => {
    return axios.get("/countries");
  },

  fetchCategories: () => {
    return axios.get("/categories");
  },

  fetchAuthors: () => {
    return axios.get("/authors");
  },

  fetchBooks: () => {
    return axios.get("/books");
  },

  fetchBookById: (bookId) => {
    return axios.get(`/books/${bookId}`);
  },

  addBook: (name, category, authorId, availableCopies) => {
    return axios.post("/books/add", {
      "name" : name,
      "category" : category,
      "authorId" : authorId,
      "availableCopies" : availableCopies
    });
  },

  editBook : (bookId, name, category, authorId, availableCopies) => {
    return axios.put(`/books/${bookId}/edit`, {
      "name" : name,
      "category" : category,
      "authorId" : authorId,
      "availableCopies" : availableCopies
    });
  },

  markBookAsTaken : (bookId) => {
    return axios.put(`/books/${bookId}/mark-as-taken`);
  },

  deleteBook: (bookId) => {
    return axios.delete(`/books/${bookId}/delete`);
  }
}

export default LibraryService;
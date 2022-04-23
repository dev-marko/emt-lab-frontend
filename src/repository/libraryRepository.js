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

  // mi nedostasuva metod za vlecenje na edna kniga
  // na backend

  fetchBooks: () => {
    return axios.get("/books");
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
    return axios.put(`/boooks/${bookId}/edit`, {
      "name" : name,
      "category" : category,
      "authorId" : authorId,
      "availableCopies" : availableCopies
    });
  },

  deleteBook: (bookId) => {
    return axios.delete(`/books/${bookId}/delete`);
  }
}

export default LibraryService;
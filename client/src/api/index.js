import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getAllBooks = async (filter) => {
  return await axios.get(`${BASE_URL}/books?filter=${filter}`);
};

export const getOneBook = async (bookId) => {
  return await axios.get(`${BASE_URL}/books/${bookId}`);
};

export const createBook = async (payload) => {
  return await axios.post(`${BASE_URL}/books`, payload);
};

export const updateBook = async (bookId, payload) => {
  return await axios.put(`${BASE_URL}/books/${bookId}`, payload);
};

export const deleteBook = async (bookId) => {
  return await axios.delete(`${BASE_URL}/books/${bookId}`);
};

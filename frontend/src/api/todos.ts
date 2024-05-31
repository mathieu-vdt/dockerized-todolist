import axios from 'axios';

const API_URL = 'http://localhost:8000/api/todos/';

export async function fetchTodos() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createTodo(todo) {
  try {
    const response = await axios.post(API_URL, todo);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTodo(id, todo) {
  try {
    const response = await axios.put(`${API_URL}${id}/`, todo);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodo(id) {
  try {
    const response = await axios.delete(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
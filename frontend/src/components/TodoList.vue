<!-- TodoList.vue -->
<script>
import { fetchTodos, deleteTodo,createTodo,updateTodo } from '@/api/todos.ts';

export default {
  data() {
    return {
      todos: [],
      newTodo: ''
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      this.todos = await fetchTodos();
    },
    async deleteTodo(id) {
      await deleteTodo(id);
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    async addTodo() {
      const todo = await createTodo({title: this.newTodo, completed: false, description: ''});
      this.todos.push(todo);
      this.newTodo = '';
    },
    async changeTodo(todo) {
      const updatedTodo = await updateTodo(todo.id, todo);
      const index = this.todos.findIndex(t => t.id === updatedTodo.id);
      this.todos.splice(index, 1, updatedTodo);
      todo.isEditing = false;
    },
    async toggleCompleted(todo) {
      todo.completed = !todo.completed;
      await updateTodo(todo.id, todo);
    },
    // You can add methods for create, update, and delete here
  }
}
</script>

<template>
  <div class="todos-container">
    <h1>Todos</h1>
    <ul class="todos-list">
      <li v-for="todo in todos" :key="todo.id">
        <template v-if="todo.isEditing">
          <input v-model="todo.title" type="text" />
          <div class="buttons">
            <button @click="changeTodo(todo)"><font-awesome-icon icon="check" /></button>
            <button @click="todo.isEditing = false"><font-awesome-icon icon="times" /></button>
          </div>
          
        </template>
        <template v-else>
          <p>{{ todo.title }}</p>
          <div class="buttons">
            <input type="checkbox" :checked="todo.completed" @change="toggleCompleted(todo)" />
            <button class="edit" @click="todo.isEditing = true"><font-awesome-icon icon="edit" /></button>
            <button class="trash" @click="deleteTodo(todo.id)"><font-awesome-icon icon="trash" /></button>
          </div>
        </template>
      </li>
    </ul>
    <div class="add-todo">
      <input v-model="newTodo" type="text" placeholder="Add new todo" />
      <button @click="addTodo">Add</button>
    </div>
  </div>
</template>

<style scoped>
  .todos-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    .todos-list {
      list-style-type: none;
      padding: 0;
      width: 70%;

      li{
        padding: 10px;
        border-radius: 12px;
        border: solid 1px #ccc;
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 10px;

        .buttons{
          display: flex;
          align-items: center;
          justify-self: center;
          column-gap: 10px;

            input{
              margin: 0;
              width: 13.5px;
              height: 13.5px;
            }
            button{
              padding: 0;
              background-color: transparent;
              border: none;
              cursor: pointer;
              &.trash{
                color: rgb(144, 1, 1);
              }
            }
          }
      }
    }

    .add-todo{
      padding: 10px;
      border: solid 1px #ccc;
      border-radius: 5px;

      input{
        padding: 10px;
        border-radius: 5px;
        border: solid 1px #ccc;
        margin-right: 10px;
      }

      button{
        padding: 10px;
        border-radius: 5px;
        border: solid 1px #ccc;
        cursor: pointer;
        outline: none;
        color: white;
        background-color: rgb(80, 130, 80);
      }
    }
  }
</style>
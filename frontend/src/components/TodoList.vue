<!-- TodoList.vue -->
<script>
import { fetchTodos, deleteTodo, createTodo, updateTodo } from "@/api/todos.ts";

export default {
  data() {
    return {
      todos: [],
      newTodo: "",
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
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    async addTodo() {
      const todo = await createTodo({
        title: this.newTodo,
        completed: false,
        description: "",
      });
      this.todos.push(todo);
      this.newTodo = "";
    },
    async changeTodo(todo) {
      const updatedTodo = await updateTodo(todo.id, todo);
      const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
      this.todos.splice(index, 1, updatedTodo);
      todo.isEditing = false;
    },
    async toggleCompleted(todo) {
      todo.completed = !todo.completed;
      await updateTodo(todo.id, todo);
    },
    // You can add methods for create, update, and delete here
  },
};
</script>

<template>
  <div class="container mx-auto my-10">
    <h1 class="text-center text-3xl font-semibold mb-4">To Do List</h1>
    <div class="md:w-1/2 mx-auto">
      <div class="bg-white shadow-md rounded-lg p-6">
        <form id="todo-form">
          <div class="flex mb-4">
            <input
              v-model="newTodo"
              type="text"
              class="w-full border-b-2 rounded-b-[0] px-4 py-2 mr-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
              id="todo-input"
              placeholder="Add new task"
              required
            />
            <button
              @click="addTodo"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add
            </button>
          </div>
        </form>
        <ul class="todos-list flex flex-col gap-4">
          <li
            v-for="todo in todos"
            :key="todo.id"
            :class="{
              'border-2 rounded-md cursor-pointer grid grid-cols-4 border-gray-300 transition ease-in-out delay-50 hover:scale-[1.02]': true,
              'border-dotted border-orange-200': todo.isEditing,
              'border-solid': !todo.isEditing,
            }"
          >
            <!-- Edit Enable -->
            <template v-if="todo.isEditing">
              <input
                v-model="todo.title"
                type="text"
                class="py-2 px-4 edit-input col-span-3 outline-none"
              />
              <div class="buttons flex gap-4 justify-end py-2 px-4">
                <button @click="changeTodo(todo)">
                  <font-awesome-icon icon="check" />
                </button>
                <button @click="todo.isEditing = false">
                  <font-awesome-icon icon="times" />
                </button>
              </div>
            </template>
            <!-- End Edit Enable -->

            <!-- Actions -->
            <template v-else>
              <p class="col-span-3 text-left py-2 px-4">{{ todo.title }}</p>
              <div class="buttons flex gap-4 justify-end py-2 px-4">
                <input
                  class="col-span-3"
                  type="checkbox"
                  :checked="todo.completed"
                  @change="toggleCompleted(todo)"
                />
                <button class="edit" @click="todo.isEditing = true">
                  <font-awesome-icon icon="edit" />
                </button>
                <button class="trash" @click="deleteTodo(todo.id)">
                  <font-awesome-icon icon="trash" />
                </button>
              </div>
            </template>
            <!-- End Actions -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .todos-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .todos-list {
    list-style-type: none;
    padding: 0;
    width: 70%;

    .edit-input {
      padding: 5px;
      border-radius: 5px;
      border: solid 1px #ccc;
      margin-right: 10px;
    }
    li {
      padding: 10px;
      border-radius: 12px;
      border: solid 1px #ccc;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 10px;

      .buttons {
        display: flex;
        align-items: center;
        justify-self: center;
        column-gap: 10px;

        input {
          margin: 0;
          width: 13.5px;
          height: 13.5px;
        }
        button {
          padding: 0;
          background-color: transparent;
          border: none;
          cursor: pointer;
          &.trash {
            color: rgb(144, 1, 1);
          }
        }
      }
    }
  }

  .add-todo {
    padding: 10px;
    border: solid 1px #ccc;
    border-radius: 5px;

    input {
      padding: 10px;
      border-radius: 5px;
      border: solid 1px #ccc;
      margin-right: 10px;
    }

    button {
      padding: 10px;
      border-radius: 5px;
      border: solid 1px #ccc;
      cursor: pointer;
      outline: none;
      color: white;
      background-color: rgb(80, 130, 80);
    }
  }
} */

.fa-check {
  color: green;
}
.fa-xmark {
  color: rgb(158, 0, 0);
}
</style>

<template>
  <section>
    <label class="sr-only">Add todo</label>
    <input
      @keyup.enter="add"
      type="text"
      placeholder="Add a todo here ..."
      v-model.trim="value"
      required
    />
    <div class="truncate">Add your todo task above, hit Enter to submit.</div>
    <ul class="collection" v-for="todo in todos" :key="todo.index">
      <li
        class="collection-item"
        :key="todo"
        :value="todo.index"
        :style="[
          todo.completed
            ? 'textDecoration: line-through;'
            : 'textDecoration: none',
        ]"
      >
        {{ todo.text }}
        <button
          class="todo"
          type="button"
          @click="(event) => handleUpdateTodo(todo, event)"
        >
          <span v-if="todo.completed"><i class="fa fa-undo" /></span>
          <span v-else><i class="fa fa-check-circle" /></span>
        </button>
        <button
          class="todo"
          type="button"
          @click="(event) => handleDeleteTodo(todo, event)"
        >
          <span><i class="fa fa-times-circle"></i></span>
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: "todo-layout",
  data() {
    return {
      todos: [],
      value: "",
      beUrl: import.meta.env.VITE_API_ENDPOINT || 'http://localhost:5000',
    };
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    getTodos() {
      axios.get(`${this.beUrl}/todos`)
          .then((res) => res.data)
          .then((data) => this.todos = data)
          .catch((e) => console.log(e));
    },
    add() {
      axios.post(`${this.beUrl}/todos`,
    {
            index: this.todos.length,
            text: this.value,
            completed: false,
          })
      .then(() => this.getTodos());
      this.value = "";
    },
    handleUpdateTodo(todo) {
      const updated = { ...todo, completed: !todo.completed };
      axios.patch(`${this.beUrl}/todos/${todo._id}`, updated)
      .then(() => this.getTodos());
    },
    handleDeleteTodo(todo) {
      axios.delete(`${this.beUrl}/todos/${todo._id}`)
      .then(() => this.getTodos());
    },
  },
};
</script>

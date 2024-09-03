import { addTodoFrom, start } from './utils.js'

const listElement = document.getElementById('list');
const inputElement = document.getElementsByTagName('input')[0];
const buttonElement = document.getElementsByTagName('button')[0];

class TodoStorage {
  #data = [];

  static async create() {
    const instance = new TodoStorage();
    await start(instance, listElement);
    return instance;
  }

  async add(title) {
    this.#data.push({ title, isCompleted: false });
  }

  async markAsCompleted(title) {
    const target = this.#data.find((el) => el.title === title);
    if (!target) {
      throw new Error('Not found item');
    }
    target.isCompleted = true;
  }

  async currentList() {
    return Promise.resolve(this.#data);
  }
}

const ts = await TodoStorage.create();

buttonElement.onclick = () => addTodoFrom(ts, inputElement, listElement);
import { addTodoFrom, start } from './utils.js'

const listElement = document.getElementById('list');
const inputElement = document.getElementsByTagName('input')[0];
const buttonElement = document.getElementsByTagName('button')[0];

class TodoStorage {
  #localStorageKey = 'todos';

  static async create() {
    const instance = new TodoStorage();
    await start(instance, listElement);
    return instance;
  }

  async add(title) {
    const currentList = await this.currentList();
    currentList.push({ title, isCompleted: false });
    localStorage.setItem(this.#localStorageKey, JSON.stringify(currentList));
  }

  async markAsCompleted(title) {
    const currentList = await this.currentList();
    const target = currentList.find((el) => el.title === title);
    if (!target) {
      throw new Error('Not found item');
    }
    target.isCompleted = true;
    localStorage.setItem(this.#localStorageKey, JSON.stringify(currentList));
  }

  async currentList() {
    const currentList = localStorage.getItem(this.#localStorageKey);
    if (currentList) {
      return Promise.resolve(JSON.parse(currentList));
    } else {
      return Promise.resolve([]);
    }
  }
}

const ts = await TodoStorage.create();

buttonElement.onclick = () => addTodoFrom(ts, inputElement, listElement);
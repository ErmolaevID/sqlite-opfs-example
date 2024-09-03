import * as Comlink from './comlink-esm.js'
import { addTodoFrom, start } from './utils.js'

const listElement = document.getElementById('list');
const inputElement = document.getElementsByTagName('input')[0];
const buttonElement = document.getElementsByTagName('button')[0];

class TodoStorage {
  #db;

  static async create() {
    const worker = new Worker("worker.js");
    const instance =  new TodoStorage(Comlink.wrap(worker));
    worker.onmessage = (e) => {
      if (e.data === 'ready') {
        start(instance, listElement);
      }
    }
    return instance;
  }

  constructor(db) {
    this.#db = db;
  }

  async add(title) {
    await this.#db.add(title);
  }

  async markAsCompleted(title) {
    await this.#db.markAsCompleted(title);
  }

  async currentList() {
    return await this.#db.currentList();
  }
}

const ts = await TodoStorage.create();

buttonElement.onclick = () => addTodoFrom(ts, inputElement, listElement);
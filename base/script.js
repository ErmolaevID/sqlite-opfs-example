import { addTodoFrom, start } from './utils.js'

const listElement = document.getElementById('list');
const inputElement = document.getElementsByTagName('input')[0];
const buttonElement = document.getElementsByTagName('button')[0];

class TodoStorage {
  /**
   * Создать инстанс TodoStorage
   */
  static async create() {}

  /**
   * Добавить задачу в список
   * @param {string} title - название
   */
  async add(title) {}

  /**
   * Отметить задачу с названием title как выполненную
   * @param {string} title 
   */
  async markAsCompleted(title) {}

  /**
   * Получить список текущих задач
   */
  async currentList() {}
}

const ts = await TodoStorage.create();

buttonElement.onclick = () => addTodoFrom(ts, inputElement, listElement);
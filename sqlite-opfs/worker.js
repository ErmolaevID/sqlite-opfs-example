importScripts("comlink.js");
importScripts("sqlite3.js");

class Sqlite3 {
  #db;

  constructor(db) {
    this.#db = new db.oo1.OpfsDb('/example.db', 'c');
    this.#db.exec("CREATE TABLE IF NOT EXISTS todos(title,isCompleted)");
  }

  add(title) {
    this.#db.exec({
      sql: "insert into todos(title,isCompleted) values (?,?)",
      bind: [title, false],
    })
  }

  currentList() {
    return this.#db.selectObjects("SELECT * FROM todos")
      .map((item) => ({ ...item, isCompleted: !!item.isCompleted }))
  }

  markAsCompleted(title) {
    this.#db.exec({
      sql: "update todos set isCompleted = true where title = ?",
      bind: [title]
    })
  }
}

globalThis.sqlite3InitModule({ print: console.log, printErr: console.error })
  .then((sqlite3) => {
    Comlink.expose(new Sqlite3(sqlite3));
    self.postMessage('ready');
  })

/**
 * Заполнение <li> элемента наполнение в зависимости от статуса выполнения задачи
 * @param liElement - элемент, который наполняется
 * @param title - название задачи
 * @param isCompleted - выполнена ли задача
 * @returns {HTMLElement}
 */
function fillLiElement(liElement, title, isCompleted) {
  let element;
  if (isCompleted) {
    element = document.createElement('s');
    element.innerText = title;
    liElement.appendChild(element);
  } else {
    element = document.createElement('span');
    element.innerText = title;
    liElement.appendChild(element);
  }

  return element;
}

/**
 * Замена содержимого <li> элемента в связи с выполнением задачи
 * @param liElement - элемент <li>
 * @param currentElement - элемент внутри <li>, который заменяем
 */
function replaceItemAfterComplete(liElement, currentElement) {
  const textElement = document.createElement('s');
  textElement.innerText = currentElement.innerText;
  liElement.replaceChild(textElement, currentElement);
}

/**
 * Добавление новой задачи. Вызывается из шаблона
 */
export async function addTodoFrom(ts, inputElement, listElement) {
  const todoTitle = inputElement.value;
  inputElement.value = '';

  await ts.add(todoTitle);

  const newLiElement = document.createElement('li');
  const innerElement = fillLiElement(newLiElement, todoTitle, false);
  newLiElement.onclick = async () => {
    await ts.markAsCompleted(todoTitle);
    replaceItemAfterComplete(newLiElement, innerElement);
  }

  listElement.appendChild(newLiElement);
}

/**
 * Восстановление состояния приложения
 */
export async function start(ts, listElement) {
  const currList = await ts.currentList();
  currList.map((element) => {
    const newLiElement = document.createElement('li');
    const innerElement = fillLiElement(newLiElement, element.title, element.isCompleted);
    if (!element.isCompleted) {
      newLiElement.onclick = async () => {
        await ts.markAsCompleted(element.title);
        replaceItemAfterComplete(newLiElement, innerElement);
      }
    }
    listElement.appendChild(newLiElement);
  })
}
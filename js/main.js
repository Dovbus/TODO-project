import { UI_ELEM } from './view.js'
let id = 4;

function createNewElement(task) {

   const taskElement = document.createElement('li');
   const checkButton = document.createElement('input');
   checkButton.type = 'checkbox';
   checkButton.classList.add('checkbox');
   checkButton.setAttribute('id', `${++id}`);

   const label = document.createElement('label');
   label.setAttribute('for', `${id}`);
   label.innerText = task;

   const deleteButton = document.createElement('input');
   deleteButton.type = 'button';
   deleteButton.classList.add('delete-button', 'task-button');

   taskElement.append(checkButton, label, deleteButton);

   checkButton.addEventListener('click', function (event) {
      changeStatus(event.target);
   })

   deleteButton.addEventListener('click', function (event) {
      deleteTask(event.target);
   })

   return taskElement;
}

UI_ELEM.FORMS.forEach(element => {
   element.addEventListener('submit', function (event) {
      event.preventDefault();

      let isValidInput = Boolean(UI_ELEM.NEW_TASK_HIGH.value || UI_ELEM.NEW_TASK_LOW.value);

      if (!isValidInput) { return }
      element.firstElementChild.classList.contains('new-task-high') ?
         addTask(UI_ELEM.NEW_TASK_HIGH, UI_ELEM.HIGH_PRIORITY_LIST) :
         addTask(UI_ELEM.NEW_TASK_LOW, UI_ELEM.LOW_PRIORITY_LIST)
   })
});

function addTask(task, list) {
   const newTask = createNewElement(task.value);
   list.append(newTask);
   task.value = '';
}


for (const button of UI_ELEM.DONE_BUTTONS) {
   button.addEventListener('click', function (event) {
      changeStatus(event.target);
   })
}

function changeStatus(button) {
   const ul = button.parentElement.parentElement;
   const li = button.parentElement;
   li.classList.toggle('change-bg');
   ul.append(li);
}

for (const button of UI_ELEM.DELETE_BUTTONS) {
   button.addEventListener('click', function (event) {
      deleteTask(event.target);
   })
}

function deleteTask(button) {
   button.parentElement.remove();
}





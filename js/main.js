import { UI_ELEM } from './view.js'
import { storage } from './storage.js'
let id = 4;

function initial() {
   if (localStorage.getItem('highTasks')) {
      const highTasks = storage.getHighTasks();
      for (let elem of highTasks) {
         addTask(elem, UI_ELEM.HIGH_PRIORITY_LIST)
      }
   } else {
      localStorage.setItem('highTasks', `[]`)
   }

   if (localStorage.getItem('lowTasks')) {
      const lowTasks = storage.getLowTasks();
      for (let elem of lowTasks) {
         addTask(elem, UI_ELEM.LOW_PRIORITY_LIST)
      }
   } else {
      localStorage.setItem('lowTasks', `[]`)
   }
}

initial();

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
      deleteStorageTasks(event.target.parentElement.textContent);
      deleteUiTask(event.target);
   })

   return taskElement;
}

UI_ELEM.FORMS.forEach(element => {
   element.addEventListener('submit', function (event) {
      event.preventDefault();

      let isValidInput = Boolean(UI_ELEM.NEW_TASK_HIGH.value || UI_ELEM.NEW_TASK_LOW.value);

      if (!isValidInput) { return }
      if (element.firstElementChild.classList.contains('new-task-high')) {
         const highTask = addTask(UI_ELEM.NEW_TASK_HIGH, UI_ELEM.HIGH_PRIORITY_LIST);
         const highPriorTasks = storage.getHighTasks();
         highPriorTasks.push(highTask);
         storage.saveHighTasks(highPriorTasks)
      } else {
         const lowTask = addTask(UI_ELEM.NEW_TASK_LOW, UI_ELEM.LOW_PRIORITY_LIST);
         const lowPriorTasks = storage.getLowTasks();
         lowPriorTasks.push(lowTask);
         storage.saveLowTasks(lowPriorTasks);
      }
      this.reset();
   })
});


function addTask(task, list) {
   const newTask = task.value ? createNewElement(task.value) : createNewElement(task);
   list.append(newTask);
   const taskName = task.value;
   newTask.value = '';
   return taskName;
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
      deleteStorageTasks(event.target.parentElement.textContent);
      deleteUiTask(event.target);
   })
}

function deleteUiTask(button) {
   button.parentElement.remove();
}

function deleteStorageTasks(task) {
   const highTasks = storage.getHighTasks();
   const lowTasks = storage.getLowTasks();

   if (highTasks.includes(task)) {
      let filteredTasks = highTasks.filter(elem => elem !== task);
      storage.saveHighTasks(filteredTasks)
   } else {
      let filteredTasks = lowTasks.filter(elem => elem !== task);
      storage.saveLowTasks(filteredTasks)
   }
}


// const container = document.getElementById("container");

// document.addEventListener("click", handle);

// function handle(e) {
//    if (!e.target.classList.contains('element')) {
//       return
//    }
//    const newEl = e.target.cloneNode(true);
//    container.appendChild(newEl);
// }
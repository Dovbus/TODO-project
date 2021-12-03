
const addButton = document.getElementById('add');
let inputTask = document.getElementById('new-task');
const elementForm = document.getElementById('form');
const highPriorityTask = document.getElementById('high-priority-task');

function createNewElement(task) {
	let taskElement = document.createElement('li');
	let checkButton = document.createElement('input');
	checkButton.type = 'checkbox';
	checkButton.classList.add('checkbox');
	let label = document.createElement('label');
	label.innerText = task;
	let deleteButton = document.createElement('input');
	deleteButton.type = 'button';
	deleteButton.classList.add('task-button');

	taskElement.appendChild(checkButton);
	taskElement.appendChild(label);
	taskElement.appendChild(deleteButton);

	return taskElement;
}

function addTask() {
	if (inputTask.value) {
		let taskElement = createNewElement(inputTask.value);
		highPriorityTask.appendChild(taskElement);
		inputTask.value = '';
	}
}

addButton.addEventListener('click', function (event) {
	addTask();
})

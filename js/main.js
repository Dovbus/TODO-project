import {
	inputTaskHigh, elementHighForm, highPriorityTask, inputTaskLow, elementLowForm, lowPriorityTask,
	doneButtons, deleteButtons
} from './view.js'

let id = 4;

function createNewElement(task) {
	let taskElement = document.createElement('li');
	let checkButton = document.createElement('input');
	checkButton.type = 'checkbox';
	checkButton.classList.add('checkbox');
	checkButton.setAttribute('id', `${++id}`);

	let label = document.createElement('label');
	label.setAttribute('for', `${id}`);
	label.innerText = task;

	let deleteButton = document.createElement('input');
	deleteButton.type = 'button';
	deleteButton.classList.add('delete-button');

	taskElement.append(checkButton, label, deleteButton);

	checkButton.addEventListener('click', function (event) {
		changeStatus(event.target);
	})

	deleteButton.addEventListener('click', function (event) {
		deleteTask(event.target);
	})

	return taskElement;
}

function addHighTask() {
	if (inputTaskHigh.value) {
		let taskElement = createNewElement(inputTaskHigh.value);
		highPriorityTask.append(taskElement);

		inputTaskHigh.value = '';
	}
}

console.log(elementHighForm)
elementHighForm.addEventListener('submit', function (event) {
	event.preventDefault();
	addHighTask();
})

function addLowTask() {
	if (inputTaskLow.value) {
		let taskElement = createNewElement(inputTaskLow.value);
		lowPriorityTask.append(taskElement);
		inputTaskLow.value = '';
	}
}

elementLowForm.addEventListener('submit', function (event) {
	event.preventDefault();
	addLowTask();
})


for (const button of doneButtons) {
	button.addEventListener('click', function (event) {
		changeStatus(event.target);
	})
}

function changeStatus(button) {
	const ul = button.parentElement.parentElement;
	const li = button.parentElement;
	li.classList.toggle('changebg');
	ul.append(li);
}

for (const button of deleteButtons) {
	button.addEventListener('click', function (event) {
		deleteTask(event.target);
	})
}

function deleteTask(button) {
	button.parentElement.remove();
}





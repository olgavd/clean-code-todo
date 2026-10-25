const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementsByTagName('button')[0];
const incompleteTaskList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskText) {
  const taskItem = document.createElement('li');
  const taskCheckbox = document.createElement('input');
  const taskLabel = document.createElement('label');
  const editTaskInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImage = document.createElement('img');

  taskLabel.innerText = taskText;
  taskLabel.className = 'task';

  taskCheckbox.type = 'checkbox';
  editTaskInput.type = 'text';
  editTaskInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImage.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImage);

  taskItem.appendChild(taskCheckbox);
  taskItem.appendChild(taskLabel);
  taskItem.appendChild(editTaskInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  const taskText = newTaskInput.value.trim();
  if (taskText === '') return;
  const taskItem = createNewTaskElement(taskText);

  incompleteTaskList.appendChild(taskItem);
  bindTaskEvents(taskItem, moveTaskToCompleted);

  newTaskInput.value = '';
};

const editTask = function () {
  const taskItem = this.parentNode;
  const editTaskInput = taskItem.querySelector('input[type=text]');
  const taskLabel = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditMode = taskItem.classList.contains('editMode');
  // Save changes when leaving edit mode.
  if (isEditMode) {
    const taskText = editTaskInput.value.trim();

    if (taskText !== '') {
      taskLabel.innerText = taskText;
    }
    editButton.innerText = 'Edit';
  } else {
    editTaskInput.value = taskLabel.innerText;
    editButton.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  // Remove the task from its current list.
  taskList.removeChild(taskItem);
};

const moveTask = function (taskItem, destinationList, checkboxChangeHandler) {
  destinationList.appendChild(taskItem);
  bindTaskEvents(taskItem, checkboxChangeHandler);
};

const moveTaskToCompleted = function () {
  const taskItem = this.parentNode;

  // Move the task to the completed list.
  moveTask(taskItem, completedTasksList, moveTaskToIncomplete);
};

const moveTaskToIncomplete = function () {
  const taskItem = this.parentNode;

  // Move the task back when it is unchecked.
  moveTask(taskItem, incompleteTaskList, moveTaskToCompleted);
};

addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskItem, checkboxChangeHandler) {
  const taskCheckbox = taskItem.querySelector('input[type=checkbox]');
  const editButton = taskItem.querySelector('button.edit');
  const deleteButton = taskItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  taskCheckbox.onchange = checkboxChangeHandler;
};

for (let i = 0; i < incompleteTaskList.children.length; i++) {
  bindTaskEvents(incompleteTaskList.children[i], moveTaskToCompleted);
}

for (let j = 0; j < completedTasksList.children.length; j++) {
  bindTaskEvents(completedTasksList.children[j], moveTaskToIncomplete);
}

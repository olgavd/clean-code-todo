const newTaskInput = document.getElementById('new-task'); //Add a new task.
const addTaskButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTaskList = document.getElementById('incompleteTasks'); //ul of #incompleteTasks
const completedTasksList = document.getElementById('completed-tasks'); //completed-tasks

//New task list item
const createNewTaskElement = function (taskText) {
  const taskItem = document.createElement('li');

  //input (checkbox)
  const taskCheckbox = document.createElement('input'); //checkbx
  //label
  const taskLabel = document.createElement('label'); //label
  //input (text)
  const editTaskInput = document.createElement('input'); //text
  //button.edit
  const editButton = document.createElement('button'); //edit button

  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  const deleteButtonImage = document.createElement('img'); //delete button image

  taskLabel.innerText = taskText;
  taskLabel.className = 'task';

  //Each elements, needs appending
  taskCheckbox.type = 'checkbox';
  editTaskInput.type = 'text';
  editTaskInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImage.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImage);

  //and appending.
  taskItem.appendChild(taskCheckbox);
  taskItem.appendChild(taskLabel);
  taskItem.appendChild(editTaskInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const taskItem = createNewTaskElement(newTaskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskList.appendChild(taskItem);
  bindTaskEvents(taskItem, moveTaskToCompleted);

  newTaskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const taskItem = this.parentNode;

  const editTaskInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditMode = taskItem.classList.contains('editMode');
  //If class of the parent is .editmode
  if (isEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editTaskInput.value;
    editButton.innerText = 'Edit';
  } else {
    editTaskInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  taskItem.classList.toggle('editMode');
};

//Delete task.
const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  //Remove the parent list item from the ul.
  taskList.removeChild(taskItem);
};

const moveTask = function (destinationList, checkboxChangeHandler) {
  const taskItem = this.parentNode;
  destinationList.appendChild(taskItem);
  bindTaskEvents(taskItem, checkboxChangeHandler);
};

//Mark task completed
const moveTaskToCompleted = function () {
  //Append the task list item to the #completed-tasks
  moveTask.call(this, completedTasksList, moveTaskToIncomplete);
};

const moveTaskToIncomplete = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  moveTask.call(this, incompleteTaskList, moveTaskToCompleted);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkboxChangeHandler) {
  //select ListItems children
  const taskCheckbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  taskCheckbox.onchange = checkboxChangeHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskList.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskList.children[i], moveTaskToCompleted);
}

//cycle over completedTasksHolder ul list items
for (let j = 0; j < completedTasksList.children.length; j++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksList.children[j], moveTaskToIncomplete);
}

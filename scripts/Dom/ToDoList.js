import { sectionStatus } from "../Main.js";
export let TitleisEditable = false
export let FormStatus = false

export function storeTodoList(){
  let $TodoListContent = document.getElementById('TodolistContent').outerHTML
  localStorage.setItem('TodoListContent', $TodoListContent)
	localStorage.setItem('TodoListHasContent', true);
}

export function loadTodoList(){
	const TodoListhasContent = localStorage.getItem('TodoListHasContent')
  const $TodoListContent = localStorage.getItem('TodoListContent')
  const $TodoListContainer = document.querySelector('.ContentCard')

	if (!TodoListhasContent) storeTodoList('false')
	else if (TodoListhasContent == 'true') {
    $TodoListContainer.innerHTML = `  <div id="TodoListControls">
		<i class="fas fa-plus-circle" id="AddTask"></i>
		<i class="fas fa-cog" id="TaskGear"></i>
	  </div>`  
    $TodoListContainer.innerHTML += $TodoListContent
  }
}

export function storeNotes(){
  let $NotesContent = document.getElementById('NotesContent').outerHTML
  localStorage.setItem("NotesContent", $NotesContent)
  localStorage.setItem("NotesHasContent", true)
}

export function loadNotes(){
  const NotesHasContent = localStorage.getItem("NotesHasContent")
  const $NotesContent = localStorage.getItem("NotesContent")
  const $NotesContainer = document.querySelector('.ContentCard2')

  if (!NotesHasContent) storeNotes('false')
  else if (NotesHasContent == 'true') {
    $NotesContainer.innerHTML = `<div id="NotesControls" contenteditable="false">
    <i class="fa-solid fa-font" id="AddTitle"></i>
    <i class="fa-solid fa-pen" id="AddText"></i>
    <i class="fa-solid fa-floppy-disk" id="SaveNotes"></i>
  </div>`
    $NotesContainer.innerHTML += $NotesContent
  }
}

export function addTitle(){
  const $NotesContainer = document.getElementById('NotesContent')
  let $Title = document.createElement("h3")
  $Title.innerText = "Sample Title"
  $NotesContainer.appendChild($Title)
}

export function addText(){
  const $NotesContainer = document.getElementById('NotesContent')
  let $Text = document.createElement("p")
  $Text.innerText = "Sample Text"
  $NotesContainer.appendChild($Text)
}

export function CreateTodoListForm(){
  const $TaskForm = `	
  <div class="CardFormBg" id="TodoFormBg">
    <div class="CardsForm" id="CardsForm">
      <span class="fa-solid fa-xmark" id="CloseForm"></span>
    </div>
  </div>
  `
  document.body.innerHTML += $TaskForm
}

export function ShowForm(){
  const $TodoListForm = document.getElementById('TodoFormBg');
  $TodoListForm.classList.add('open');
  createTaskForm()
  FormStatus = true
  //resetManag()
}

export function AbleToEditTitle(){
  const $Title = document.getElementById('TodoTitle')
  $Title.setAttribute('contenteditable', "true")
  TitleisEditable = true
}

export function DisableToEditTitle(){
  const $Notes = document.getElementById('Notes')
  $Notes.setAttribute('contenteditable', "false")
  TitleisEditable = false
}

function createTaskForm() {
  let formContainer = document.createElement("form")
  formContainer.setAttribute("id", "TaskForm")
  formContainer.innerHTML = `
    <i class="fas fa-tasks"></i>
    <input type="text" placeholder="Type Your Task" id="TaskInput">
    <span id="AddTaskButton">Add Task</span>
  `
  const formCards = document.getElementById('CardsForm');
  formCards.appendChild(formContainer)

  AddTaskByButton()
  AddTaskByEnterkey()
  HiddenTaskIcons()
}

export function BORRAR(){
  let $CloseButton = document.getElementById('CloseForm')
  $CloseButton.addEventListener("click", (e)=>{
    const $TodoListForm = document.getElementById('TodoFormBg');
    $TodoListForm.classList.toggle('open')
    const $TaskButton = document.getElementById('AddTaskButton')
    $TaskButton.parentNode.remove()
  })
}

function AddTaskByEnterkey(){
  let TaskInput = document.getElementById('TaskInput')
  TaskInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();   
      const $TodoListForm = document.getElementById('TodoFormBg');
      $TodoListForm.classList.toggle('open')
      AddTaskToTheList()
      eraseTaskForm
    }
  });
}

function AddTaskByButton(){
  const TaskAdder = document.getElementById('AddTaskButton')
  TaskAdder.addEventListener("click", (e)=>{
      const $TodoListForm = document.getElementById('TodoFormBg');
      $TodoListForm.classList.toggle('open')
      AddTaskToTheList()
      eraseTaskForm
  })
}

export function CloseByEscapeKey(){
  const $TodoListForm = document.getElementById('TodoFormBg');
  $TodoListForm.classList.toggle('open')
  let TaskButton = document.getElementById('AddTaskButton')
  TaskButton.parentNode.remove()
  FormStatus = false
}
  
function eraseTaskForm() {
  let TaskButton = document.getElementById('AddTaskButton')
  TaskButton.parentNode.remove()
  FormStatus = false
}

function AddTaskToTheList() {
  let TodoList = document.getElementById('ListTDo')
  let Input = document.getElementById('TaskInput')
  let li = document.createElement('li')
  li.setAttribute("class", "Task2")
  li.innerHTML = `
  <span class="Task">-${Input.value}<span class="fa-solid fa-xmark EraseTask"></span><span class="fa-solid fa-circle-check CheckTask"></span></span>
  `
    
  TodoList.appendChild(li)
  storeTodoList()
  eraseTaskForm()
}
    
export function CrossOutTask() {    
  document.addEventListener("click", (e)=>{
    if (e.target.matches(".CheckTask")) {
      let child = e.target
      let padre = child.parentNode
      padre.classList.toggle('Finished')
      storeTodoList()
    }
  })
}

    
export function RemoveTask() {    
  document.addEventListener("click", (e)=>{
    if (e.target.matches(".EraseTask ")) {
      let child = e.target
      let padre = child.parentNode
      let abuelo = padre.parentNode
      abuelo.remove()
      storeTodoList()
    }
  })
}

export function ShowTaskIcons(){
let TaskGear = document.getElementById('TaskGear')
document.addEventListener("click", (e)=>{ if (e.target.matches("#TaskGear")) 	managCards() })
}

function managCards(){
  //let eraseButton = document.querySelectorAll('.eraseCard')
  let eraseTask = document.querySelectorAll('.EraseTask')
  let checkTask = document.querySelectorAll('.CheckTask')
  
  if (sectionStatus == 1) {
    for (let i=0;i<eraseTask.length;i++){
      eraseTask[i].classList.toggle('Open')
      checkTask[i].classList.toggle('Open')
    }
  }

  storeTodoList()
    
    //Use this for the Watching Section at a new Function
    // if (sectionStatus == 3) {
    //   for(let i=0;i<eraseButton.length;i++){
    //     eraseButton[i].classList.toggle('open');
    //   }
    // }
};
  
function HiddenTaskIcons(){
  let eraseTask = document.querySelectorAll('.EraseTask')
  let checkTask = document.querySelectorAll('.CheckTask')
  
  if (sectionStatus == 1) {
    for (let i=0;i<eraseTask.length;i++){
      eraseTask[i].classList.remove('Open')
      checkTask[i].classList.remove('Open')
    }
  }
}

function resetManag(){
    let eraseButton = document.querySelectorAll('.eraseCard')
    let eraseTask = document.querySelectorAll('.EraseTask')
    let checkTask = document.querySelectorAll('.CheckTask')
    
    if (sectionStatus == 1) {
      for (let i=0;i<eraseTask.length;i++){
        eraseTask[i].classList.remove('Open')
        checkTask[i].classList.remove('Open')
      }
    }else if (sectionStatus == 3) {
      for(let i=0;i<eraseButton.length;i++){
        eraseButton[i].classList.remove('open');
      }
    }
  };
  

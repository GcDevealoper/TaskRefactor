import { OpenUserMenu } from "./Dom/Header.js";
import { Header } from "./Dom/Header.js";
import { CreateSidebarMenu } from "./Dom/SectionsMenu.js";
import { load } from "./Dom/Header.js";
import { EraseLoader } from "./Dom/Loader.js";
import { AbleToEditTitle, BORRAR, CreateTodoListForm, CrossOutTask, DisableToEditTitle, ShowForm, RemoveTask, ShowTaskIcons, TitleisEditable, CloseByEscapeKey, FormStatus, loadTodoList, storeTodoList, storeNotes, loadNotes, addTitle, addText } from "./Dom/ToDoList.js";

const $UserMenu = document.getElementById('UserProfileMenu')
export let sectionStatus = 1
const $Title = document.getElementById('TodoTitle')

document.addEventListener("DOMContentLoaded", ()=>{
    Header()
    load()
    CreateSidebarMenu()
    CreateTodoListForm()
    ShowTaskIcons()
    CrossOutTask()
    RemoveTask()
    BORRAR()
    loadTodoList()
    loadNotes()
    EraseLoader()
})

document.addEventListener("click", (e)=>{

  if(e.target.matches("#UserProfileMenu") || e.target.matches("#UserProfileMenu img") || e.target.matches("#UserProfileMenu h3")) {
    OpenUserMenu()
    console.log(e.target)
  }
  
  if(e.target.matches("#SaveNotes")) storeNotes()

  if(e.target.matches("#AddTask"))ShowForm()

  if(e.target.matches("#AddTitle")) addTitle()

  if(e.target.matches("#AddText")) addText()

  if(e.target.matches('#TodoTitle') && !TitleisEditable) AbleToEditTitle()

  if(!(e.target.matches('#TodoTitle')) && TitleisEditable) {
    DisableToEditTitle()
    storeTodoList()
  }

})

document.addEventListener("keydown", (e)=>{
  if(e.key == "Escape" && FormStatus) CloseByEscapeKey()
})
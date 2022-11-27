import { toggle_todoTemplate, toggle_projectTemplate, remove_unusedDays } from "./logic.js"
import { submit_Todo } from "./generate.js"
import { submit_Project, populate_HTML_Calender } from "./generate.js"

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

const btn_newProject = document.querySelector('.addProject_btn')
const btn_subProject = document.querySelector('.projectTemplate_submitBtn.done')
const btn_canProject = document.querySelector('.projectTemplate_submitBtn.cancel')

const btn_newTodo = document.querySelector('.add_todo_btn')
const btn_subTodo = document.querySelector('.input_submitBtn.done')
const btn_canTodo = document.querySelector('.input_submitBtn.cancel')

const btn_Calender = document.querySelector('.timeFrame_btn.calender')

//-----------------------------------------------------------------

btn_newProject.addEventListener('click', toggle_projectTemplate)
btn_subProject.addEventListener('click', submit_Project)
btn_canProject.addEventListener('click', toggle_projectTemplate)

btn_newTodo.addEventListener('click', toggle_todoTemplate)
btn_subTodo.addEventListener('click', submit_Todo)
btn_canTodo.addEventListener('click', toggle_todoTemplate)

btn_Calender.addEventListener('click', () => {
    remove_unusedDays()
    populate_HTML_Calender()
})
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////




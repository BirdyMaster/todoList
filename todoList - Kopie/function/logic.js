import {  projects_ALL } from "../index.js"
import { populate_HTML_Project, populate_HTML_Calender } from "./generate.js"

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
export let activeProj

//-----------------------------------------------------------------

function toggle_projectTemplate() {
    const template = document.querySelector('.projectTemplate')

    if (template.style.display == "none") {
        template.style.display = "block"
    } else {
        template.style.display = "none"
        toggle_projectInput()
    } 
}

function toggle_projectInput() {
    
    const template = document.querySelector('.projectTemplate')
    template.style.display = 'none'
    
    const input_title = document.querySelector('.newProject_titleInput');
    input_title.value = '';
}

//-----------------------------------------------------------------

function toggle_todoTemplate() {
    const todoTemplate = document.querySelector('.todo.template')
    
    if (todoTemplate.style.display == "none") {
        todoTemplate.style.display = "flex"
    } else {
        todoTemplate.style.display = "none"
        toggle_todoInput()
    }
}

function toggle_todoInput() {
    const input_title = document.querySelector('.input_todo.title');
    const input_desc = document.querySelector('.input_todo.desc');

    input_title.value = '';
    input_desc.value = ''

}

//-----------------------------------------------------------------

function changeActiveProject(name) {

    let NEW_active = projects_ALL.filter(cat => cat.projects.filter(p => p.projName == name)[0])[0].projects.filter(p => p.projName == name)[0];
    activeProj = NEW_active
    
    populate_HTML_Project(NEW_active)
    
    const todoTemplate = document.querySelector('.todo.template')
    todoTemplate.style.display = "none"
}

function remove_unusedDays() {
    const emptyDays = projects_ALL[0].projects.filter((day) => day.todos.length == 0)
    
    let indexes = []

    projects_ALL[0].projects.forEach((element, index) => { //find empty cell index
        if (element.todos.length == 0) {
            indexes.push(index)
        }
    })
       
    for (let i = 0; i < indexes.length; i++) {
    projects_ALL[0].projects.splice(indexes[i], 1)
    
    }
    
    
}



///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

export {toggle_todoInput, toggle_todoTemplate, changeActiveProject, toggle_projectTemplate, toggle_projectInput}
export {remove_unusedDays}
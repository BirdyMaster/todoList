import { projects_ALL } from "../index.js"
import { populate_HTML_Calender, populate_HTML_rightSide } from "./generate.js"

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
export let activeProj

//-----------------------------------------------------------------

function toggle_todoTemplate() {
    const todoTemplate = document.getElementById('todo_template_right')
    
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
    
    populate_HTML_rightSide(NEW_active)
    
    const todoTemplate = document.querySelector('.todo.template')
    todoTemplate.style.display = "none"
}

function submit_Todo() {
    const inputs_wrap = document.getElementById('todo_template_right')
    const input_title = document.getElementById('input_todo_title_right').value
    const input_desc = document.getElementById('input_todo_desc_right').value
   
    if (!input_title.match(/^[a-z|[0-9]/i)) {
        return
    } else {
        activeProj.todos.push({
            todoName: input_title,
            todoDesc: input_desc,
        });
    
        populate_HTML_rightSide(activeProj)
        toggle_todoInput()
    }

    inputs_wrap.style.display = 'none'

}

function delete_Todo(index) {
    const editedTodos = activeProj.todos.filter((todo, todoIndex) => {
         if (todoIndex != index) return todo
     })

    activeProj.todos = editedTodos
    populate_HTML_rightSide(activeProj)

}

// function remove_unusedDays() {
//     const emptyDays = projects_ALL[0].projects.filter((day) => day.todos.length == 0)
    
//     let indexes = []

//     projects_ALL[0].projects.forEach((element, index) => { //find empty cell index
//         if (element.todos.length == 0) {
//             indexes.push(index)
//         }
//     })
       
//     for (let i = 0; i < indexes.length; i++) {
//     projects_ALL[0].projects.splice(indexes[i], 1)
    
//     }

//     console.log('active');
    
    
// }



///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

export {toggle_todoInput, toggle_todoTemplate, changeActiveProject, submit_Todo, delete_Todo }
// export {remove_unusedDays}
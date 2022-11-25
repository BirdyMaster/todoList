import { newTodoTemplate } from "./function/logic.js"
import { createProjectless, createTodo, project_to_HTML} from "./function/generate.js"

const addBtn = document.querySelector('.add_todo_btn')
const submitBtn = document.querySelector('.input_submitBtn.done')
const cancelNewTodo_btn = document.querySelector('.input_submitBtn.cancel')

addBtn.addEventListener('click', newTodoTemplate)
cancelNewTodo_btn.addEventListener('click', newTodoTemplate)
submitBtn.addEventListener('click', createTodo)
addBtn.addEventListener('click', () => {
    console.log('clicked');
})

export let allProjects = []
export let activeProj;

let load = (function() {
    const todoTemplate = document.querySelector('.todo.template')
    todoTemplate.style.dispaly = 'none'

    createProjectless()
    activeProj = allProjects[0]
    project_to_HTML(activeProj) 

})();










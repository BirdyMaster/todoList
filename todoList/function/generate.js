import { allProjects, activeProj } from "../index.js"
import { resetOnSubmit } from "./logic.js"


function createProjectless() {
    let obj = {
        projName: "Projectless",
        todos: [
            {
                todoName: "Test1",
                todoDesc: "Tesing stuff out",
                todoParent: "Projectless"
            },
            {
                todoName: "Test2",
                todoDesc: "Maybe things will work",
                todoParent: "Projectless"
            },
            {
                todoName: "Test3",
                todoDesc: "Hope they work",
                todoParent: "Projectless"
            }
        ]
    }

    allProjects.push(obj) 
    
}

function createTodo() {
    const input_title = document.querySelector('.input_todo.title').value
    const input_desc = document.querySelector('.input_todo.desc').value
   
    activeProj.todos.push({
        todoName: input_title,
        todoDesc: input_desc,
    });

    project_to_HTML(activeProj)
    resetOnSubmit()
    console.log(activeProj.todos);
}

function project_to_HTML(projectObj) {
    const mainTitle = document.querySelector('.mainTitle')
    mainTitle.textContent = projectObj.projName

    const todoWrap_html = document.querySelector('.todo_wrap')
    todoWrap_html.innerHTML = ''

    projectObj.todos.forEach((todo, index) => {

        let todoElement = document.createElement('div')
        todoElement.classList.add('todo')
        todoElement.setAttribute("data-id",index)

        todoElement.innerHTML = ` <div class="todo_textInputs_wrap">
                                <h3 class="todo_title">${todo.todoName}</h3>
                                <p class="todo_desc">${todo.todoDesc}</p>
                            </div>
                            <div class="todo_buttons_wrap">
                                <!--<div class="todo_btn edit"></div> -->
                                <div class="todo_btn delete">
                                    <div class="line one"></div>
                                    <div class="line two"></div>
                                </div>
                            </div>`

        todoElement.querySelector('.todo_btn.delete').addEventListener('click', (e) => {
            deleteTodo(e.currentTarget.parentElement.parentElement.dataset.id)  
        })

        todoWrap_html.appendChild(todoElement)

    });

}

function deleteTodo(index) {
    const editedTodos = activeProj.todos.filter((todo, todoIndex) => {
         if (todoIndex != index) return todo
     })

    activeProj.todos = editedTodos
    project_to_HTML(activeProj)

}

export {createProjectless, project_to_HTML, createTodo}

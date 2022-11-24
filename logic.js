import { todoList } from "./index.js"


export function addItem() {

    const input = document.querySelector('.titleInput')

    let element = document.createElement('div')
    element.classList.add('item')
    element.setAttribute("data-id","")
    element.innerHTML = `<h1 class="title">${input.value}</h1>
                    <div class="btn delete"></div>
                    <div class="btn edit"></div>`

    element.querySelector('.btn.delete').addEventListener('click', (e) => {
        deleteTodo(e.target.parentElement.dataset.id)  
    })

    todoList.push({element});
    resetOnSubmit()
    render()

}

function render() {

    const todoWrap = document.querySelector('.box')
    
    console.log(todoList)
    todoList.forEach((todo, index) => {
        todoWrap.appendChild(todo.element)
        todo.element.dataset.id = index
    })
}

function deleteTodo(index) {

    const htmlBox = document.querySelector('.box')
    htmlBox.innerHTML = ''

    todoList.splice(index, 1)
    render()
   
}

function resetOnSubmit() {
    const input = document.querySelector('.titleInput')
    input.value = ''
}


function resetOnSubmit() {
    const input_title = document.querySelector('.input_todo.title');
    const input_desc = document.querySelector('.input_todo.desc');

    input_title.value = '';
    input_desc.value = ''

}
function newTodoTemplate() {
    const todoTemplate = document.querySelector('.todo.template')

    if (todoTemplate.style.display == "none") {
        todoTemplate.style.display = "flex"
    } else todoTemplate.style.display = "none"

    resetOnSubmit()
    
}

export {resetOnSubmit, newTodoTemplate}
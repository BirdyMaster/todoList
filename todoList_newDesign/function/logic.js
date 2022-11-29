import { projects_ALL } from "../index.js"
import { populate_HTML_Calender, populate_HTML_rightSide } from "./generate.js"

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
export let activeProj

//-----------------------------------------------------------------

function toggle_todoTemplate() {
    const todoTemplate = document.getElementById('todo_template_right')
    
    if (!todoTemplate.classList.contains('show')) {
        todoTemplate.classList.add('show')
    
    } else {
        todoTemplate.classList.remove('show')
        toggle_todoInput()
    }

    // console.log(todoTemplate.getBoundingClientRect().height);
}

function toggle_todoInput() {
    const input_title = document.querySelector('.input_todo.title');
    const input_desc = document.querySelector('.input_todo.desc');
    const radio_low = document.querySelector('.input_priority.low');

    input_title.value = '';
    input_desc.value = ''
    radio_low.checked = true
}

//-----------------------------------------------------------------

function changeActiveProject(name) {

    let NEW_active = projects_ALL.filter(cat => cat.projects.filter(p => p.projName == name)[0])[0].projects.filter(p => p.projName == name)[0];
    activeProj = NEW_active
    
    populate_HTML_rightSide(NEW_active)
    
    // const todoTemplate = document.querySelector('.todo.template')
    // todoTemplate.style.display = "none"
}

function submit_Todo() {
    const inputs_wrap = document.getElementById('todo_template_right')

    const input_title = document.getElementById('input_todo_title_right').value
    const input_desc = document.querySelector('.input_todo.desc').value
   

    const priorityInputs= document.querySelectorAll('.input_priority')
    // const activePriority = priorities.filter (p => p.checked == true)
    const priority = Array.from(priorityInputs).filter(inp => inp.checked == true)[0].dataset.priority
    

    console.log(priority);

    if (!input_title.match(/^[a-z|[0-9]/i)) {
        return
    } else {
        activeProj.todos.push({
            todoName: input_title,
            todoDesc: input_desc,
            priority,
        });

    
        populate_HTML_rightSide(activeProj)
        toggle_todoInput()
    }

    // inputs_wrap.classList.remove('show')

}

function delete_Todo(index) {
    const editedTodos = activeProj.todos.filter((todo, todoIndex) => {
         if (todoIndex != index) return todo
     })

     console.log(index);

    activeProj.todos = editedTodos
    populate_HTML_rightSide(activeProj)

}

function openTodo(todo_el) {

    const desc_Preview = todo_el.querySelector('.todo_desc.preview')
    const line_Title = todo_el.querySelector('.line_todoTitle') 
    const todo_Back = todo_el.querySelector('.todo_Back')

            if (todo_el.getBoundingClientRect().height == 50) {
                let height = 0;
                Array.from(todo_el.children).forEach(el => { //children height
                    height += el.getBoundingClientRect().height      
                });

                todo_el.style.height = `${height + 15}px`
                todo_el.classList.add('open');
                desc_Preview.style.opacity = '0%';
                line_Title.style.flexGrow = '1';
                todo_Back.classList.add('show');
                setTimeout(() => {
                    desc_Preview.style.display = 'none'
                }, 50);
                console.log('open');

            } else {
                console.log('close');
                todo_el.style.height = "50px";
                todo_el.classList.remove('open');
                line_Title.style.flexGrow = '0';
                todo_Back.classList.remove('show');
                desc_Preview.style.display = 'block';
                
                setTimeout(() => {
                    
                    desc_Preview.style.opacity = '100%'
                }, 150);
            }


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

export {toggle_todoInput, toggle_todoTemplate, changeActiveProject, submit_Todo, delete_Todo, openTodo }
// export {remove_unusedDays}
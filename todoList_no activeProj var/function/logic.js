import { projects_ALL, pageLoaded } from "../index.js"
import { find_displayedDay, populate_HTML_rightSide, clickToday } from "./generate.js"


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
function toggle_todoTemplate() {
    const todoTemplate = document.getElementById('todo_template_right');
    const btn_newTodo = document.querySelector('.add_todo_btn')
    
    if (!todoTemplate.classList.contains('show')) {
        btn_newTodo.style.opacity = '0%'
        todoTemplate.classList.add('show')
    
    } else {
        todoTemplate.classList.remove('show')
        toggle_todoInput()
        setTimeout(() => {
            btn_newTodo.style.opacity = '100%'
        }, 60);
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

function submit_Todo() {
    
    
    const input_title = document.querySelector('.input_todo.title').value

    if (!input_title.match(/^[a-z|[0-9]/i)) {
        return
    } else {
        const input_desc = document.querySelector('.input_todo.desc').value
        const priorityInputs= document.querySelectorAll('.input_priority')
        const input_priority = Array.from(priorityInputs).filter(inp => inp.checked == true)[0].dataset.priority;

        find_displayedDay().todos.push({
            todoName: input_title,
            todoDesc: input_desc,
            priority: input_priority
        });

    

        populate_HTML_rightSide(find_displayedDay())
        toggle_todoInput()
    }

    // inputs_wrap.classList.remove('show')

}

function delete_Todo(index) {
    
    find_displayedDay().todos.splice(index, 1)
    populate_HTML_rightSide(find_displayedDay())
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
//-----------------------------------------------------------------

function remove_unusedDays() {

    if (pageLoaded == false) {
        return
    } else {
         
        projects_ALL[0].projects.forEach((element, index) => {  
            if (element.todos.length == 0 && element.projName != find_displayedDay().projName) {
                console.log('unused');
                console.log(element);

                projects_ALL[0].projects.splice(index, 1)
                
            }
        })           
    }
}
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

export {toggle_todoInput, toggle_todoTemplate, submit_Todo, delete_Todo, openTodo }
export {remove_unusedDays}




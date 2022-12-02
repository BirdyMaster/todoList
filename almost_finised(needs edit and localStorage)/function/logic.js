import { projects_ALL, pageLoaded } from "../index.js"
import { add_singleTodo_rightSide } from "./generate.js"



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
    input_title.focus()

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
            priority: input_priority,
            id: generateID(),
            open: false,
            height: undefined,
        });

        const obj_theTodo = find_displayedDay().todos.filter(todo => todo.todoName == input_title)[0]

        // populate_HTML_rightSide(find_displayedDay())
        add_singleTodo_rightSide(obj_theTodo)
        toggle_todoInput()
        console.log(projects_ALL[0].projects);
    }
}



function openTodo(todo_el, todo_obj) {
    
    todo_el.classList.toggle('open')

    if (todo_el.classList.contains('open')) {
            todo_obj.open = true
            let height = 0;
            Array.from(todo_el.children).forEach(el => { //children height
                height += el.getBoundingClientRect().height      
            });

            todo_el.style.height = `${height + 15}px`

    } else {
            todo_obj.open = false
            todo_el.style.height = "50px";
    }

    

    projects_ALL[0].projects.forEach(dayObj => {
        // console.log('These are open');
        dayObj.todos.forEach(todo => {
            if (todo.open == true) {
                // console.log(todo);
            }
        })
        
    })
   

    

}
//-----------------------------------------------------------------

function remove_unusedDays() {

    if (pageLoaded == false) {
        return
    } else {
         
        projects_ALL[0].projects.forEach((element, index) => {  
            if (element.todos.length == 0 && element.projName != find_displayedDay().projName) {
                //console.log('unused');
                // console.log(element);

                projects_ALL[0].projects.splice(index, 1)
                
            }
        })           
    }
}

//-----------------------------------------------------------------

function priorityToggle(e) {

    const inputList = document.querySelector('.todo_priorityWrap').children


    switch(e.keyCode) {
        case 38: 
            console.log('up');
            selectPrevious(inputList)
            
        break
        case 40:
            console.log('down');
            selectNext(inputList)
     }
}

function selectPrevious(list) {
    
    let item
    for (let i = 0; i < Array.from(list).length; i++) {
        if (Array.from(list)[i].checked == true) {
            let nr = i - 1
            if (nr < 0) {
                nr = 2
                item = Array.from(list)[nr]
            } else {
                item = Array.from(list)[i - 1]
            }
            
        }  
    }

    item.checked = true
 
}

function selectNext(list) {
    
    let item
    for (let i = 0; i < Array.from(list).length; i++) {
        if (Array.from(list)[i].checked == true) {
            let nr = i + 1
            if (nr > 2) {
                nr = 0
                item = Array.from(list)[nr]
            } else {
                item = Array.from(list)[i + 1]
            }
            
        }  
    }

    item.checked = true
 
}

function generateID() {
    let id = []
    for (let i = 0; i < 20; i++) {
        const nr = Math.floor(Math.random() * 10)
        id += nr
        
    }
    return parseInt(id)
}

function delete_Todo(id) {

    localStorage.setItem("iiiiiitem",find_displayedDay().todos[0].todoName);

    const newTodos = find_displayedDay().todos.reduce((box, todo) => {
        if (todo.id != id) {
            box.push(todo)
        } else {
            // console.log('delete this');
            // console.log(todo);
        }
        return box
    },[])

    

    find_displayedDay().todos = newTodos
    
}

function find_displayedDay() {
    const dateOf_displayedDay = document.getElementById('title_Right').textContent
    const obj_displayedDay = projects_ALL[0].projects.filter(p => p.projName == dateOf_displayedDay)[0]
    // console.log(obj_displayedDay);
    return obj_displayedDay
}


document.addEventListener('keyup', priorityToggle)
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

export {toggle_todoInput, toggle_todoTemplate, submit_Todo, delete_Todo, openTodo }
export {remove_unusedDays, find_displayedDay}





 
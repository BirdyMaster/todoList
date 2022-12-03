import { projects_ALL, pageLoaded } from "../index.js"
import { add_singleTodo_rightSide } from "./generate.js"
import { populate_HTML_Calender } from "./generate.js";
import { dates } from "./eListeners.js";

const selected_Dates = {
    sel_Month: dates.month,
    sel_Year: dates.year
}

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
}
function delete_Todo(id) {


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
function change_todo_priority(priority, obj_todo, html_Todo, html_wrapPrioritySelection) {

    const date_Selected = document.getElementById('title_Right')
    obj_todo.priority = priority
    populate_HTML_Calender(date_Selected.dataset.year, date_Selected.dataset.month)

    const title = html_Todo.querySelector('.todo_title')
    const line = html_Todo.querySelector('.line_todoTitle')
    const dot = html_Todo.querySelector('.mark_priorityEditBtn')

    title.className = '';
    line.className = '';
    dot.className = '';

    title.classList.add(`todo_title`);
    line.classList.add(`line_todoTitle`);
    dot.classList.add(`mark_priorityEditBtn`);

    title.classList.add(priority)
    line.classList.add(priority)
    dot.classList.add(priority)

    html_wrapPrioritySelection.classList.remove('active')
    // console.log('change this');
    // console.log(obj_todo);
}
//-----------------------------------------------------------------

function find_displayedDay() {
    const dateOf_displayedDay = document.getElementById('title_Right').textContent
    const obj_displayedDay = projects_ALL[0].day_Objects.filter(p => p.title == dateOf_displayedDay)[0]
    // console.log(obj_displayedDay);
    return obj_displayedDay
}
function remove_unusedDays() {

    if (pageLoaded == false) {
        return
    } else {
         
        projects_ALL[0].day_Objects.forEach((element, index) => {  
            if (element.todos.length == 0 && element.title != find_displayedDay().title) {
                //console.log('unused');
                // console.log(element);

                projects_ALL[0].day_Objects.splice(index, 1)
                
            }
        })           
    }
}
function generateID() {
    let id = []
    for (let i = 0; i < 50; i++) {
        const nr = Math.floor(Math.random() * 10)
        id += nr
        
    }
    return parseInt(id)
}
//-----------------------------------------------------------------

function change_CalenderView(btn_Clicked) {
    switch (btn_Clicked) {
//============================================= 
        case 'prev':
            if (selected_Dates.sel_Month == 0) {
                selected_Dates.sel_Month = 11
                selected_Dates.sel_Year --
              } else {
                selected_Dates.sel_Month --
              }
        break;
//--------------------------------------------   
        case 'now':
            selected_Dates.sel_Year = dates.year
            selected_Dates.sel_Month = dates.month
        break;
//--------------------------------------------    
        case 'next':
          if (selected_Dates.sel_Month == 11) {
            selected_Dates.sel_Month = 0
            selected_Dates.sel_Year ++
          } else {
            selected_Dates.sel_Month ++
          }
          
        break;
      }
//=============================================  

populate_HTML_Calender(selected_Dates.sel_Year, selected_Dates.sel_Month)
    

}


export {toggle_todoInput, toggle_todoTemplate, submit_Todo, delete_Todo, openTodo }
export {remove_unusedDays, find_displayedDay, change_todo_priority, change_CalenderView}







 
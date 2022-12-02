import { projects_ALL } from "../index.js"
import { delete_Todo, openTodo, remove_unusedDays, find_displayedDay } from "./logic.js"
import { months, dates } from "./eListeners.js"

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
function populate_HTML_rightSide(chosenObj) {

   
    const html_todoBundle_right = document.querySelector('.todo_wrap_right')
    html_todoBundle_right.innerHTML = ''

    const pageHeading_right = document.getElementById('title_Right')
    pageHeading_right.textContent = chosenObj.projName
    pageHeading_right.setAttribute('data-month', chosenObj.date.getMonth())
    pageHeading_right.setAttribute('data-year', chosenObj.date.getFullYear())

    chosenObj.todos.forEach((todo, index) => { //create a Div for every todo

        let html_Todo = document.createElement('div')
        html_Todo.classList.add('todo')
        html_Todo.setAttribute("data-id",index)
        html_Todo.setAttribute("data-ID", todo.id)

        
        // if (todo.id == id) {
        //     html_Todo.classList.add('active')
        // }

        //==============================================================                 
        html_Todo.innerHTML = `
                            <div class="todo_Front">                        
                                <h3 class="todo_title ${todo.priority}">${todo.todoName}</h3>
                                <div class="line_todoTitle ${todo.priority}"></div>
                                <p class="todo_desc preview">${todo.todoDesc}</p>
                            </div>
                            <div class="todo_Back">
                                <p class="todo_desc">${todo.todoDesc}</p>
    
                                <div class="todo_buttons_wrap">
                                    <div class="todo_btn shrink">
                                        <img src="./img/Arrow up.svg" class="icon_btn arrow">
                                    </div>  
                                    <div class="todo_btn edit">
                                        <img src="./img/pen_Edit.svg" class="icon_btn edit">
                                    </div>
                                    <div class="todo_btn delete">
                                        <div class="line one"></div>
                                        <div class="line two"></div>
                                    </div>
                                    <div class="todo_btn priority">
                                        <div class="edit_PriorityWrap">
                                            <input type="radio" name="${todo.id}" class="edit_Priority low" id="low"></input>
                                            <input type="radio" name="${todo.id}" class="edit_Priority medium" id="medium"></input>
                                            <input type="radio" name="${todo.id}" class="edit_Priority high" id="high"></input>
                                        </div>
                                        <div class="mark_priorityEditBtn ${todo.priority}"></div>
                                    </div>  
                                </div> 
                            </div> `
                               
        //open and close tod
        html_Todo.addEventListener('click', (e) => { 
            openTodo(e.currentTarget, todo)
            e.stopPropagation()
            
        })

        const parentBtn_editPriority = html_Todo.querySelector('.todo_btn.priority')
        const btns_editPriority = html_Todo.querySelectorAll('.edit_Priority')

        parentBtn_editPriority.addEventListener('click', (e) => {
            e.currentTarget.classList.add('active')
            e.stopImmediatePropagation()
        })

        // select new color
        btns_editPriority.forEach(btn => btn.addEventListener('click', (e) => {

            const wrap_prioritySelection = e.currentTarget.parentElement.parentElement
            change_todo_priority(e.currentTarget.id, todo, html_Todo, wrap_prioritySelection)
            e.stopImmediatePropagation()
        }))

        // show active color
        btns_editPriority.forEach(btn => {
            if (btn.id == todo.priority) {
                btn.checked = true
            }
        })

        // delete todo
        html_Todo.querySelector('.todo_btn.delete').addEventListener('click', (e) => {
            const todo_id = e.currentTarget.parentElement.parentElement.parentElement.dataset.id;
            const html_selectedTodo = e.currentTarget.parentElement.parentElement.parentElement

            html_selectedTodo.style.opacity = '0%'
            html_selectedTodo.style.height = '0px'

            const date_Selected = document.getElementById('title_Right')
            
            setTimeout(() => {
                html_selectedTodo.style.display = 'none'
                delete_Todo(todo_id)
                populate_HTML_Calender(date_Selected.dataset.year, date_Selected.dataset.month);
                
            }, 150);
            
            e.stopImmediatePropagation()    
        })

        // close todo
        html_Todo.querySelector('.todo_btn.shrink').addEventListener('click', (e) => {
            const html_selectedTodo = e.currentTarget.parentElement.parentElement.parentElement
            openTodo(html_selectedTodo, todo)
            e.stopImmediatePropagation()
            
        })

       
        html_todoBundle_right.appendChild(html_Todo)
    });
}

function add_singleTodo_rightSide(singleTodo) {
    
    const html_todoBundle_right = document.querySelector('.todo_wrap_right')

    //create a Div for every todos

        let html_Todo = document.createElement('div')
        html_Todo.classList.add('todo')
        html_Todo.setAttribute("data-id", singleTodo.id)

        
        //==============================================================                 
        html_Todo.innerHTML = `
                            <div class="todo_Front">                        
                                <h3 class="todo_title ${singleTodo.priority}">${singleTodo.todoName}</h3>
                                <div class="line_todoTitle ${singleTodo.priority}"></div>
                                <p class="todo_desc preview">${singleTodo.todoDesc}</p>
                            </div>
                            <div class="todo_Back">
                                <p class="todo_desc">${singleTodo.todoDesc}</p>
    
                                <div class="todo_buttons_wrap">
                                    <div class="todo_btn shrink">
                                        <img src="./img/Arrow up.svg" class="icon_btn arrow">
                                    </div>  
                                    <div class="todo_btn edit">
                                        <img src="./img/pen_Edit.svg" class="icon_btn edit">
                                    </div>
                                    <div class="todo_btn delete">
                                        <div class="line one"></div>
                                        <div class="line two"></div>
                                    </div>
                                    <div class="todo_btn priority">
                                        <div class="edit_PriorityWrap">
                                            <input type="radio" name="${singleTodo.id}" class="edit_Priority low" id="low"></input>
                                            <input type="radio" name="${singleTodo.id}" class="edit_Priority medium" id="medium"></input>
                                            <input type="radio" name="${singleTodo.id}" class="edit_Priority high" id="high"></input>
                                        </div>
                                        <div class="mark_priorityEditBtn ${singleTodo.priority}"></div>
                                    </div>  
                                </div> 
                            </div> `
                               
        //open and close tod
        html_Todo.addEventListener('click', (e) => { 
            openTodo(e.currentTarget, singleTodo)
            e.stopPropagation()
            
        })

        const parentBtn_editPriority = html_Todo.querySelector('.todo_btn.priority')
        const btns_editPriority = html_Todo.querySelectorAll('.edit_Priority')

        parentBtn_editPriority.addEventListener('click', (e) => {
            e.currentTarget.classList.add('active')
            e.stopImmediatePropagation()
        })

        // select new color
        btns_editPriority.forEach(btn => btn.addEventListener('click', (e) => {

            const wrap_prioritySelection = e.currentTarget.parentElement.parentElement
            change_todo_priority(e.currentTarget.id, singleTodo, html_Todo, wrap_prioritySelection)
            e.stopImmediatePropagation()
        }))

        // show active color
        btns_editPriority.forEach(btn => {
            if (btn.id == singleTodo.priority) {
                btn.checked = true
            }
        })

        // delete todo
        html_Todo.querySelector('.todo_btn.delete').addEventListener('click', (e) => {
            const todo_id = e.currentTarget.parentElement.parentElement.parentElement.dataset.id;
            const html_selectedTodo = e.currentTarget.parentElement.parentElement.parentElement

            html_selectedTodo.style.opacity = '0%'
            html_selectedTodo.style.height = '0px'
            
            const date_Selected = document.getElementById('title_Right')
            
            setTimeout(() => {

                //const year = 
                delete_Todo(singleTodo.id)
                populate_HTML_Calender(date_Selected.dataset.year, date_Selected.dataset.month);
            }, 150);
            
            e.stopImmediatePropagation()    

            
        })

        // close todo
        html_Todo.querySelector('.todo_btn.shrink').addEventListener('click', (e) => {
            const html_selectedTodo = e.currentTarget.parentElement.parentElement.parentElement
            openTodo(html_selectedTodo, singleTodo)
            e.stopImmediatePropagation()
            
        })

        html_Todo.classList.add('added')
       
        html_todoBundle_right.appendChild(html_Todo)

            

        setTimeout(() => {
            html_Todo.classList.remove('added')
        }, 1); 
    
}
//-----------------------------------------------------------------

function populate_HTML_Calender(chosenYear, chosenMonth) { 
    
    console.log('populate');
    //console.log(chosenMonth);
    remove_unusedDays()
    
    const html_content = document.querySelector('.calender')
    html_content.innerHTML = ''

    const pageHeading = document.querySelector('.mainTitle')
    pageHeading.textContent = months[chosenMonth] + " " + chosenYear

    // check what weekday the first day of month is
    let start_Gen = new Date(chosenYear, chosenMonth, 0).getDay()
    for (let i = 0; i < (start_Gen); i++) {
        const html_Blank = document.createElement('div')
        html_Blank.classList.add('blankDay')
        html_content.appendChild(html_Blank)
    }

    const daysInMonth = new Date(chosenYear, chosenMonth + 1, 0).getDate()
    for (let i = 1; i < daysInMonth + 1; i++) { // generate content in dayBox
        html_content.appendChild(forgeDay(i, chosenMonth, chosenYear))  
    }

    // localStorage.setItem("projects_ALL", projects_ALL[0].projects[0].projName)
    
    
    

}

function forgeDay(NR, given_Month, given_Year) {

    const html_content = document.querySelector('.calender')

    const html_DAY = document.createElement('div')
    html_DAY.classList.add('day')

    const dayOfWeek = new Date(given_Year, given_Month, NR).getDay()
    if (dayOfWeek == 6 || dayOfWeek == 0) {
        html_DAY.classList.add('weekendDay')  
    }

    const number = document.createElement('p')
    number.classList.add('calNumber')
    number.textContent = NR

    html_DAY.setAttribute("data-date", `${NR}. ${months[given_Month]} ${given_Year}`)
    html_DAY.setAttribute("data-day", NR)

    html_DAY.appendChild(number)

    const obj_Day = {
        html_DAY,
        projName: `${NR}. ${months[given_Month]} ${given_Year}`,
        type: 'calDay',
        todos:[],
        date: new Date(given_Year, given_Month, NR),

    }

    const title_rightSide = document.getElementById('title_Right').textContent

    //find currently selected day
    Array.from(html_content.children).forEach(x => {
        if (title_rightSide == x.dataset.date) {
            x.classList.add('selected')
        } 
    })
    
    const YEAR = obj_Day.date.getFullYear()
    const MONTH = obj_Day.date.getMonth()
    const DAY = obj_Day.date.getDate()

    // find days passed
    if ((DAY < dates.dayOfMonth && MONTH == dates.month && YEAR == dates.year)
        || (MONTH < dates.month && YEAR == dates.year)
        || (YEAR < dates.year)) {
        obj_Day.html_DAY.classList.add('day_passed')
    }

    // append active circles to calender
    if (projects_ALL[0].projects.some(p => p.projName == obj_Day.projName)) { 

        let todos_thisDay = projects_ALL[0].projects.filter(p => p.projName == obj_Day.projName)[0].todos

        for (let i = 0; i < todos_thisDay.length; i++) {
            const todo_Priority = todos_thisDay[i].priority
            const html_calDot = document.createElement('div')

            html_calDot.classList.add('mark_activeTodo')
            html_calDot.classList.add(todo_Priority)

            obj_Day.html_DAY.appendChild(html_calDot)
        }

    }

    // find curernt Day
    if (NR == dates.dayOfMonth && given_Month == dates.month && given_Year == dates.year) {
        obj_Day.html_DAY.classList.add('today')
    }

    // DAY CLICK
    html_DAY.addEventListener('click', () => {
        
        load_calenderDay(obj_Day, obj_Day.html_DAY.dataset.date)
        remove_unusedDays()     
    })

    return obj_Day.html_DAY
}
//-----------------------------------------------------------------

function load_calenderDay(obj, obj_date) {  
    
    if (projects_ALL[0].projects.length != 0 && 
        projects_ALL[0].projects.some(p => p.projName == obj_date)) {
            
            populate_HTML_rightSide(projects_ALL[0].projects.filter(p => p.projName == obj_date)[0])

    } else {
            projects_ALL[0].projects.push(obj)
            populate_HTML_rightSide(obj)        
    }

    const title_rightSide = document.getElementById('title_Right').textContent
    const html_content = document.querySelector('.calender')

    //find currently selected day
    Array.from(html_content.children).forEach(x => {
            if (title_rightSide == x.dataset.date) {
                x.classList.add('selected')
            } else {
                x.classList.remove('selected')
            }
        })
} 
function change_todo_priority(priority, obj_todo, html_Todo, html_wrapPrioritySelection) {

    const date_Selected = document.getElementById('title_Right')

    // console.log('change this');
    // console.log(obj_todo);
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
    
}
//-----------------------------------------------------------------

function findIndex(obj_Todo) {
    let theIndex
    projects_ALL[0].projects.forEach(day => {
        day.todos.forEach((todo, index) => {
            if (todo.todoName == obj_Todo.todoName) {
                theIndex = index
            }
        })
    })

    return theIndex
}
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

export { clickToday, populate_HTML_rightSide, populate_HTML_Calender, load_calenderDay}


function createTodo() {
    const input_title = document.querySelector('.input_todo.title');
    const input_desc = document.querySelector('.input_todo.desc');
    const submit_btn = document.querySelector('.input_submitBtn.done')

    input_title.value = 'Edit priority';
    input_desc.value = 'Try to fix this'
    submit_btn.click()
}

function clickToday() {
    const html_calenderChildren = document.querySelector('.calender').children
    const html_today = Array.from(html_calenderChildren).filter( day => day.dataset.day == new Date().getDate())[0]

    html_today.click()
    
}




export {createTodo, add_singleTodo_rightSide}
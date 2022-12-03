import { projects_ALL } from "../index.js"
import { delete_Todo, openTodo, remove_unusedDays, change_todo_priority } from "./logic.js"
import { months, dates } from "./eListeners.js"
import { hasDayPassed, isWeekend, containsTodos, collectTitles, findToday, findSelectedDay, createBlanks } from "./other.js"

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
function populate_HTML_rightSide(chosenObj) {

   
    const html_todoBundle_right = document.querySelector('.todo_wrap_right')
    html_todoBundle_right.innerHTML = ''

    const pageHeading_right = document.getElementById('title_Right')
    pageHeading_right.textContent = chosenObj.title

    pageHeading_right.setAttribute('data-month', chosenObj.month)
    pageHeading_right.setAttribute('data-year', chosenObj.year)

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
function load_calenderDay(obj, obj_date) {  
    
    if (projects_ALL[0].day_Objects.length != 0 && 
        projects_ALL[0].day_Objects.some(p => p.title == obj_date)) {
            
            populate_HTML_rightSide(projects_ALL[0].day_Objects.filter(p => p.title == obj_date)[0])
    } else {
            projects_ALL[0].day_Objects.push(obj)
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


function populate_HTML_Calender(chosenYear, chosenMonth) { 
    
    remove_unusedDays()
    
    const html_content = document.querySelector('.calender')
    const pageHeading = document.querySelector('.mainTitle')
    const blank_Count = new Date(chosenYear, chosenMonth, 0).getDay()
    
    html_content.innerHTML = ''
    pageHeading.textContent = months[chosenMonth] + " " + chosenYear
    
    createBlanks(blank_Count).forEach(blank => {
        html_content.appendChild(blank)
    })

    const daysInMonth = new Date(chosenYear, chosenMonth + 1, 0).getDate()
    // generate days
    for (let i = 1; i < daysInMonth + 1; i++) { 
        html_content.appendChild(forgeDay(i, chosenMonth, chosenYear))  
    }

    findSelectedDay()
    localStorage.setItem("projects_ALL", JSON.stringify(projects_ALL))
}

//simplify
function forgeDay(NR, given_Month, given_Year, month_dayCount) {

    const daysInMonth = new Date(given_Year, given_Month + 1, 0).getDate()
    let output = []

    const cal_Day = document.createElement('p')
    cal_Day.classList.add('calNumber')
    cal_Day.textContent = NR

    const html_DAY = document.createElement('div')
    html_DAY.classList.add('day')
    html_DAY.setAttribute("data-date", `${NR}. ${months[given_Month]} ${given_Year}`)
    html_DAY.setAttribute("data-day", NR)
    html_DAY.appendChild(cal_Day)

    const obj_Day = {
        html_DAY,
        title: `${NR}. ${months[given_Month]} ${given_Year}`,
        type: 'calDay',
        todos:[],
        date: new Date(given_Year, given_Month, NR),

        // localStorage converts the date to a string.
        // this solves the problem at populate_HTML_rightSide, pageHeadingRight
        year: given_Year,
        month: given_Month,

    }

    // DAY CLICK
    html_DAY.addEventListener('click', () => { 
        load_calenderDay(obj_Day, obj_Day.html_DAY.dataset.date)
        remove_unusedDays()    
    })

    if (isWeekend(given_Year, given_Month, NR)) {
        html_DAY.classList.add('weekendDay')  
    }
    if (hasDayPassed(obj_Day.date)) {
        obj_Day.html_DAY.classList.add('day_passed')
    }
    if (containsTodos(obj_Day.title)) { 

        collectTitles(obj_Day.title).forEach(html_title => {
            obj_Day.html_DAY.appendChild(html_title)
        })
    }
    if (findToday(NR, given_Month, given_Year)) {
        obj_Day.html_DAY.classList.add('today')
    }

    // const output = []

    // for (let i = 1; i < repeat_count + 1; i++) { 
    //     output.push(obj_Day.html_DAY) 
    // }

    return obj_Day.html_DAY
}

///////////////////////////////////////////////////////////////////


export { clickToday, populate_HTML_rightSide, populate_HTML_Calender, load_calenderDay}


function clickToday() {
    const html_calenderChildren = document.querySelector('.calender').children
    const html_today = Array.from(html_calenderChildren).filter( day => day.dataset.day == new Date().getDate())[0]

    html_today.click()
    
}




export { add_singleTodo_rightSide, forgeDay}
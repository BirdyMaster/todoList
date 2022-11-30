import { projects_ALL } from "../index.js"
import { submit_Todo, delete_Todo, openTodo, remove_unusedDays } from "./logic.js"
import { months, dates } from "./eListeners.js"

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
function populate_HTML_rightSide(chosenObj) {

    const html_todoBundle_right = document.querySelector('.todo_wrap_right')
    html_todoBundle_right.innerHTML = ''

    const pageHeading_right = document.getElementById('title_Right')
    pageHeading_right.textContent = chosenObj.projName
    pageHeading_right.setAttribute('data-date', chosenObj.date)

    chosenObj.todos.forEach((todo, index) => { //create a Div for every todo

        let html_Todo = document.createElement('div')
        html_Todo.classList.add('todo')
        html_Todo.setAttribute("data-id",index)

        
                            
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
                                        <div class="mark_priorityEditBtn ${todo.priority}"></div>
                                    </div>  
                                </div> 
                            </div> `
                           

        html_Todo.querySelector('.todo_btn.delete').addEventListener('click', (e) => {
            const todo_id = e.currentTarget.parentElement.parentElement.parentElement.dataset.id;
            e.stopImmediatePropagation()

            delete_Todo(todo_id)
            populate_HTML_Calender();      
        })

        html_Todo.querySelector('.todo_btn.shrink').addEventListener('click', (e) => {
            
            openTodo(html_Todo)
            e.stopImmediatePropagation()
            
        })

        //open and close tod
        html_Todo.addEventListener('click', (e) => { 
            openTodo(html_Todo)
            e.stopPropagation()
            
    })

        html_todoBundle_right.appendChild(html_Todo)

    });

}

function populate_HTML_Calender(chosenYear, chosenMonth) {
    
    remove_unusedDays()
    
    const html_content = document.querySelector('.calender')
    html_content.innerHTML = ''

    const optional_Year = chosenYear || dates.year;
    const optional_Month = chosenMonth || dates.month;
    const count_days = new Date(optional_Year, optional_Month, 0).getDate()

    for (let i = 1; i < count_days; i++) { // generate content in dayBox
        const html_DAY = document.createElement('div')
        html_DAY.classList.add('day')

        const number = document.createElement('p')
        number.classList.add('calNumber')
        number.textContent = i

        html_DAY.setAttribute("data-date", `${i}. ${months[optional_Month]} ${optional_Year}`)
        html_DAY.setAttribute("data-day", i)

        html_DAY.appendChild(number)

        const obj_Day = {
            html_DAY,
            projName: `${i}. ${months[optional_Month]} ${optional_Year}`,
            type: 'calDay',
            todos:[],
            date: new Date(optional_Year, optional_Month, i),

        }

        const title_rightSide = document.getElementById('title_Right').textContent

        //find currently selected day
        Array.from(html_content.children).forEach(x => {
            if (title_rightSide == x.dataset.date) {
                x.classList.add('selected')
            } 
        })

        // find days passed
        if (obj_Day.date.getDate() < dates.dayOfMonth && obj_Day.date.getMonth() <= dates.month && obj_Day.date.getFullYear() <= dates.year) {
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
        if (i == dates.dayOfMonth && optional_Month == dates.month && optional_Year == dates.year) {
            obj_Day.html_DAY.classList.add('today')
        }

        // DAY CLICK
        html_DAY.addEventListener('click', () => {
            load_calenderDay(obj_Day, obj_Day.html_DAY.dataset.date)
            remove_unusedDays()     
        })
        html_content.appendChild(obj_Day.html_DAY)  
    }


    // console.log("spits out =" + optional_Month);
    // console.log("given =" +chosenMonth);

    const pageHeading = document.querySelector('.mainTitle')
    pageHeading.textContent = months[optional_Month] + " " + optional_Year

    console.log(projects_ALL[0].projects)
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

function find_displayedDay() {
    const dateOf_displayedDay = document.getElementById('title_Right').textContent
    const obj_displayedDay = projects_ALL[0].projects.filter(p => p.projName == dateOf_displayedDay)[0]
    return obj_displayedDay
}
//-----------------------------------------------------------------

function clickToday() {
    const html_calenderChildren = document.querySelector('.calender').children

    const html_today = Array.from(html_calenderChildren).filter( day => day.dataset.day == new Date().getDate())[0]

    html_today.click()
    
}
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

export {find_displayedDay, clickToday, populate_HTML_rightSide, populate_HTML_Calender, load_calenderDay}

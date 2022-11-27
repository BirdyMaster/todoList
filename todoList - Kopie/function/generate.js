import { projects_ALL } from "../index.js"
import { toggle_todoInput, activeProj, changeActiveProject, toggle_projectInput } from "./logic.js"

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dates = {
    today: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    dayOfMonth: new Date().getDate(),
}
const chosenDates = {
    year: dates.year,
    month: dates.month

}

//-----------------------------------------------------------------

function create_calenderDay(chosenObj) {
    
    // if (projects_ALL[0].projects.some(p => p.projName == chosenObj.projName)) {
    //     return
    // } else {
    //     projects_ALL[0].projects.push(chosenObj)
    //     create_projectLinks()
    //     changeActiveProject(chosenObj.projName)
    //     populate_HTML_Project(activeProj)
    // }

    
    projects_ALL[0].projects.push(chosenObj)

        create_projectLinks()
        changeActiveProject(chosenObj.projName)
        populate_HTML_Project(activeProj)

}

function create_defaultProjects() {
    
    let objOne = {
        projName: "genNew",
        todos: [
            {
                todoName: "Epicness",
                todoDesc: "Gonna get some epic",
            }
        ]
    }

    let objTwo = {
        projName: "Gym",
        todos: [
            {
                todoName: "Buy chalk",
                todoDesc: "Gonna get some chalk",
            },
            {
                todoName: "Train legs",
                todoDesc: "Never skip leg day",
            }
        ]
    }

    let objThree = {
        projName: "Books to read",
        todos: [
            {
                todoName: "Why the outsiders win",
                todoDesc: "Advised by Sam Ovens",
            },
            {
                todoName: "The Evolutionary Phychology",
                todoDesc: "Dr. David Buss",
            }
        ]
    }
    projects_ALL[1].projects.push(objOne, objTwo, objThree) 
}

function create_projectLinks() {

    const projLinks_HtmlWrap = document.querySelector('.nav_projects')
    projLinks_HtmlWrap.innerHTML = ""

    projects_ALL[1].projects.forEach(proj => {
        
        const projLink = document.createElement('p')
        projLink.classList.add('project')

        projLink.setAttribute('data-objname', proj.projName)
        projLink.textContent = proj.projName

        let bnt_deleteProj = document.createElement('div')
        bnt_deleteProj.classList.add('bnt_deleteProj')
        bnt_deleteProj.addEventListener('click', (e) => {
            delete_Project(e.currentTarget.parentElement)
        })
        projLink.appendChild(bnt_deleteProj)

        projLink.addEventListener('click', (e) => {
            changeActiveProject(proj.projName)
        })
        projLinks_HtmlWrap.appendChild(projLink)
    })

}

function submit_Project() {

    const input_projectTitle = document.querySelector('.newProject_titleInput').value
    const obj = {       
        projName: document.querySelector('.newProject_titleInput').value,
        todos: []
    }

    if (!input_projectTitle.match(/^[a-z|[0-9]/i)) {
        return
    } else {

        projects_ALL[1].projects.push(obj);
        create_projectLinks()
        changeActiveProject(obj.projName)

        populate_HTML_Project(activeProj)
        toggle_projectInput()
}
}

function delete_Project(projectLink) {
     console.log(`Delete ${projectLink.dataset.objname}`);
    
}
//-----------------------------------------------------------------

function submit_Todo() {
    const input_title = document.querySelector('.input_todo.title').value
    const input_desc = document.querySelector('.input_todo.desc').value
   
    if (!input_title.match(/^[a-z|[0-9]/i)) {
        return
    } else {
        activeProj.todos.push({
            todoName: input_title,
            todoDesc: input_desc,
        });
    
        populate_HTML_Project(activeProj)
        toggle_todoInput()
    }

}

function delete_Todo(index) {
    const editedTodos = activeProj.todos.filter((todo, todoIndex) => {
         if (todoIndex != index) return todo
     })

    activeProj.todos = editedTodos
    populate_HTML_Project(activeProj)

}

//-----------------------------------------------------------------

function populate_HTML_Project(chosenObj) {

    const addTodoBtn = document.querySelector('.add_todo_btn')
    addTodoBtn.style.display = 'flex'

    const html_content = document.querySelector('.todo_wrap')
    html_content.classList.remove('temp')

    const html_todoBundle = document.querySelector('.todo_wrap')
    html_todoBundle.innerHTML = ''

    const pageHeading = document.querySelector('.mainTitle')
    pageHeading.textContent = chosenObj.projName

    chosenObj.todos.forEach((todo, index) => { //create a Div for every todo

        let html_Todo = document.createElement('div')
        html_Todo.classList.add('todo')
        html_Todo.setAttribute("data-id",index)

        html_Todo.innerHTML = ` <div class="todo_textInputs_wrap">
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

        html_Todo.querySelector('.todo_btn.delete').addEventListener('click', (e) => {
            delete_Todo(e.currentTarget.parentElement.parentElement.dataset.id)  
        })

        html_todoBundle.appendChild(html_Todo)

    });

}

function populate_HTML_Calender(chosenYear, chosenMonth) {


    const html_content = document.querySelector('.todo_wrap')
    html_content.innerHTML = ''
    html_content.classList.add('temp')

    const optional_Year = chosenYear || dates.year;
    const optional_Month = chosenMonth || dates.month;
    const count_days = new Date(optional_Year, optional_Month, 0).getDate()

    for (let i = 1; i < count_days; i++) { // generate content in dayBox
        const html_DAY = document.createElement('div')
        html_DAY.classList.add('day')

        const number = document.createElement('p')
        number.classList.add('calNumber')
        number.textContent = i

        

        if (i == dates.dayOfMonth && optional_Month == dates.month && optional_Year == dates.year) {
            number.classList.add('current')
        }


        html_DAY.appendChild(number)

        const project_day = {
            html_DAY,
            projName: `${i}. ${months[optional_Month]} ${optional_Year}`,
            type: 'calDay',
            todos:[],
            date: new Date(optional_Year, optional_Month, i), 
        }

        if (projects_ALL[0].projects.some(p => p.projName == project_day.projName)) { // append activeCircles
   
            // html_DAY.classList.add('isAProject')

            let todos_thisDay = projects_ALL[0].projects.filter(p => p.projName == project_day.projName)[0].todos

            for (let i = 0; i < todos_thisDay.length; i++) {
                const activeDot = document.createElement('div')
                activeDot.classList.add('mark_activeTodo')
                project_day.html_DAY.appendChild(activeDot)
            }

        }
        
        

        html_DAY.addEventListener('click', () => {
            create_calenderDay(project_day)
        })


        // let test = projects_ALL[0].projects.filter(p => p.projname == project_day.projName)


        // console.log(project_day.projName);

        

        html_content.appendChild(project_day.html_DAY)
    
    }

    const pageHeading = document.querySelector('.mainTitle')
    pageHeading.textContent = months[optional_Month] + " " + optional_Year

    const addTodoBtn = document.querySelector('.add_todo_btn')
    addTodoBtn.style.display = 'none'

    const todoTemplate = document.querySelector('.todo.template')
    todoTemplate.style.display = "none"
}
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

export {create_defaultProjects, create_projectLinks, submit_Project}
export {submit_Todo}
export {populate_HTML_Project, populate_HTML_Calender}

const btn_prevMonth = document.querySelector('.btn_changeMonth.prev')
const btn_nextMonth = document.querySelector('.btn_changeMonth.next')
const btn_currentMonth = document.querySelector('.btn_changeMonth.current')


btn_prevMonth.addEventListener('click', () => {
    chosenDates.month --;
    if (chosenDates.month < 0) {
        chosenDates.month = 11
        chosenDates.year --
    }
    populate_HTML_Calender(chosenDates.year, chosenDates.month)
})

btn_nextMonth.addEventListener('click', () => {
    chosenDates.month ++;
    if (chosenDates.month > 11) {
        chosenDates.month = 0
        chosenDates.year ++
    }
    populate_HTML_Calender(chosenDates.year, chosenDates.month)
})

btn_currentMonth.addEventListener('click', () => {

    chosenDates.year = dates.year
    chosenDates.month = dates.month 
    populate_HTML_Calender(dates.year, dates.month)
})


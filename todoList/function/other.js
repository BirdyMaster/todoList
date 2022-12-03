
import { dates } from "./eListeners.js";
import { projects_ALL } from "../index.js";


function hasDayPassed(given_Date) {
    const YEAR = given_Date.getFullYear()
    const MONTH = given_Date.getMonth()
    const DAY = given_Date.getDate()

    // find days passed
    if ((DAY < dates.dayOfMonth && MONTH == dates.month && YEAR == dates.year)
       || (MONTH < dates.month && YEAR == dates.year)
       || (YEAR < dates.year)) {
        return true

    } else {
        return false
    }
}

function isWeekend(year, month, day) {
    const weekDay = new Date(year, month, day).getDay()

    if (weekDay == 6 || weekDay == 0) {
        return true
    } else {
        return false
    }
}

function containsTodos(given_Title) {
    const dayList = projects_ALL[0].day_Objects

    if (dayList.some(day => day.title == given_Title)) {
        return true
    } return false
}

function collectTitles(given_Title) {
    
    const todos = projects_ALL[0].day_Objects.filter(p => p.title == given_Title)[0].todos

    let output = []

    for (let i = 0; i < todos.length; i++) {
        const todo_Priority = todos[i].priority
        const title_Todo = document.createElement('p')

        title_Todo.textContent = todos[i].todoName
        title_Todo.classList.add('dayBox_todoTitle')
        title_Todo.classList.add(todo_Priority)
        // const Dot = document.createElement('div')
        // Dot.classList.add('mark_activeTodo')
        // Dot.classList.add(todo_Priority)
        output.push(title_Todo)
    }

    return output
}

function findToday(day, month, year) {
    if (day == dates.dayOfMonth && month == dates.month && year == dates.year) {
        return true
    } return false
}

function findSelectedDay() {
    const title_rightSide = document.getElementById('title_Right').textContent
    const html_content = document.querySelector('.calender')

    Array.from(html_content.children).forEach(day => {

        if (title_rightSide == day.dataset.date) {
            day.classList.add('selected')
        } 
    })
}

function createBlanks(count) {
    let output = []

    for (let i = 0; i < count; i++) {
        const html_Blank = document.createElement('div')
        html_Blank.classList.add('blankDay')
        output.push(html_Blank)
    }

    return output
}



export { hasDayPassed, isWeekend, containsTodos, collectTitles, findToday, findSelectedDay, createBlanks }
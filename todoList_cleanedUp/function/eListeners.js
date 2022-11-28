import { toggle_todoTemplate } from "./logic.js"
import { submit_Todo, populate_HTML_Calender } from "./generate.js"

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
export {months, dates, chosenDates}

//-----------------------------------------------------------------
const btn_newTodo = document.getElementById('add_todo_btn_right')
const btn_subTodo = document.getElementById('input_submitBtn_done_right')
const btn_canTodo = document.getElementById('input_submitBtn_cancel_right')

const btn_prevMonth = document.querySelector('.btn_changeMonth.prev')
const btn_nextMonth = document.querySelector('.btn_changeMonth.next')
const btn_currentMonth = document.querySelector('.btn_changeMonth.current')

//-----------------------------------------------------------------

btn_newTodo.addEventListener('click', toggle_todoTemplate)
btn_subTodo.addEventListener('click', () => {
    submit_Todo(),
    populate_HTML_Calender()
    
})
btn_canTodo.addEventListener('click', toggle_todoTemplate)


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
    console.log("correct = " + chosenDates.month);
    populate_HTML_Calender(chosenDates.year, chosenDates.month)
})

btn_currentMonth.addEventListener('click', () => {

    chosenDates.year = dates.year
    chosenDates.month = dates.month 
    populate_HTML_Calender(dates.year, dates.month)
})
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////





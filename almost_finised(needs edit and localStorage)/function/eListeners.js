import { toggle_todoTemplate, submit_Todo  } from "./logic.js"
import { populate_HTML_Calender } from "./generate.js"

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dates = {
    today: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    weekDay: new Date().getDay(),
    dayOfMonth: new Date().getDate(),
}

const selected_Dates = {
    sel_Month: dates.month,
    sel_Year: dates.year
}

export {months, dates}

//-----------------------------------------------------------------
const btn_newTodo = document.querySelector('.add_todo_btn')
const btn_subTodo = document.getElementById('btn_submitTodo')
const btn_canTodo = document.getElementById('btn_cancelTodo')

const btn_prevMonth = document.querySelector('.btn_changeMonth.prev')
const btn_nextMonth = document.querySelector('.btn_changeMonth.next')
const btn_currentMonth = document.querySelector('.btn_changeMonth.current')

//-----------------------------------------------------------------

btn_newTodo.addEventListener('click', toggle_todoTemplate)
btn_subTodo.addEventListener('click', () => {

    const date_Selected = document.getElementById('title_Right')
    //console.log(date_Selected.dataset.year, date_Selected.dataset.month);
    
    submit_Todo();
    populate_HTML_Calender(date_Selected.dataset.year, date_Selected.dataset.month)
    
})
btn_canTodo.addEventListener('click', toggle_todoTemplate)
//-----------------------------------------------------------------

btn_prevMonth.addEventListener('click', (e) => {
    change_CalenderView(e.currentTarget.id)
})

btn_currentMonth.addEventListener('click', (e) => {
    change_CalenderView(e.currentTarget.id)
})

btn_nextMonth.addEventListener('click', (e) => {
    change_CalenderView(e.currentTarget.id)
})
//-----------------------------------------------------------------

document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        btn_canTodo.click()
    }
})



///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


function change_CalenderView(btn_Clicked) {

    //const calDate = document.getElementById('calDate')
    //let year = parseInt(calDate.dataset.year)
    //let month = parseInt(calDate.dataset.month)
    

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




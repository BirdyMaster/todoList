import { projects_ALL } from "../index.js"
import { activeProj, changeActiveProject, submit_Todo, delete_Todo, openTodo } from "./logic.js"
import { months, dates } from "./eListeners.js"


function create_calenderDay(chosenObj) {    
    projects_ALL[0].projects.push(chosenObj)
    changeActiveProject(chosenObj.projName)
    populate_HTML_rightSide(activeProj)
    
}

function populate_HTML_rightSide(chosenObj) {

    const html_todoBundle_right = document.querySelector('.todo_wrap_right')
    html_todoBundle_right.innerHTML = ''

    const pageHeading_right = document.getElementById('title_Right')
    pageHeading_right.textContent = chosenObj.projName

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
            delete_Todo(e.currentTarget.parentElement.parentElement.parentElement.dataset.id)
            
            populate_HTML_Calender();
            e.stopImmediatePropagation()

        })

        html_Todo.querySelector('.todo_btn.shrink').addEventListener('click', (e) => {
            openTodo(html_Todo)
            e.stopImmediatePropagation()
        })

        
        html_Todo.addEventListener('click', (e) => { //open and close todo
            openTodo(html_Todo)
            e.stopPropagation()
    })



        html_todoBundle_right.appendChild(html_Todo)

    });

}

function populate_HTML_Calender(chosenYear, chosenMonth) {
    
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

        

        html_DAY.appendChild(number)

        const obj_Day = {
            html_DAY,
            projName: `${i}. ${months[optional_Month]} ${optional_Year}`,
            type: 'calDay',
            todos:[],
            date: new Date(optional_Year, optional_Month, i),

        }

        // find days passed
        if (obj_Day.date.getDate() < dates.dayOfMonth && obj_Day.date.getMonth() <= dates.month && obj_Day.date.getFullYear() <= dates.year) {
            obj_Day.html_DAY.classList.add('day_passed')
        }
        

        // append activeCircles
        if (projects_ALL[0].projects.some(p => p.projName == obj_Day.projName)) { 
   
            // html_DAY.classList.add('isAProject')

            let todos_thisDay = projects_ALL[0].projects.filter(p => p.projName == obj_Day.projName)[0].todos

            for (let i = 0; i < todos_thisDay.length; i++) {
                const activeDot = document.createElement('div')
                activeDot.classList.add('mark_activeTodo')
                obj_Day.html_DAY.appendChild(activeDot)
            }

        }

        // find curernt Day
        if (i == dates.dayOfMonth && optional_Month == dates.month && optional_Year == dates.year) {
            obj_Day.html_DAY.classList.add('current')
        }
        
        html_DAY.addEventListener('click', () => {
            create_calenderDay(obj_Day)     
            console.log(obj_Day.date.getDate()); 
            console.log(dates.month);      
        })
        html_content.appendChild(obj_Day.html_DAY)
    
        
    }

    // console.log("spits out =" + optional_Month);
    // console.log("given =" +chosenMonth);

    console.log(projects_ALL[0].projects);
    

    const pageHeading = document.querySelector('.mainTitle')
    pageHeading.textContent = months[optional_Month] + " " + optional_Year

    
}

export {populate_HTML_rightSide, populate_HTML_Calender, submit_Todo}

// function create_defaultProjects() {
    
//     let objOne = {
//         projName: "genNew",
//         todos: [
//             {
//                 todoName: "Epicness",
//                 todoDesc: "Gonna get some epic",
//             }
//         ]
//     }

//     let objTwo = {
//         projName: "Gym",
//         todos: [
//             {
//                 todoName: "Buy chalk",
//                 todoDesc: "Gonna get some chalk",
//             },
//             {
//                 todoName: "Train legs",
//                 todoDesc: "Never skip leg day",
//             }
//         ]
//     }

//     let objThree = {
//         projName: "Books to read",
//         todos: [
//             {
//                 todoName: "Why the outsiders win",
//                 todoDesc: "Advised by Sam Ovens",
//             },
//             {
//                 todoName: "The Evolutionary Phychology",
//                 todoDesc: "Dr. David Buss",
//             }
//         ]
//     }
//     projects_ALL[1].projects.push(objOne, objTwo, objThree) 
// }


let user = {
    name: "John",
    surname: "Smith",
  
    get fullName() {
      return `${this.name} ${this.surname}`;
    }
  };
  
  console.log(user.fullName); // John Smith
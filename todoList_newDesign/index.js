import { populate_HTML_Calender} from "./function/generate.js"

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
export let projects_ALL = [
    {
        name: "calProjects",
        projects: []
    },
    {
        name: "not_calProjects",
        projects: []
    }
]

//-----------------------------------------------------------------

let load = (function() {
    populate_HTML_Calender()

    const todoWrap = document.querySelector('.todo_wrap_right')
    todoWrap.innerHTML = `
                    <div class= "todo">
                        <div class="todo_Front">
                            <h3 class="todo_title">The title</h3>
                            <div class="todo_priorityMark medium"></div>                          
                        </div>
                        <div class="todo_Back">
                            <p class="todo_desc">Looooooong description Looooooong description Looooooong description Looooooong description </p>
    
                            <div class="todo_buttons_wrap">
                                <div class="todo_btn shrink">Back up</div>  
                                <p class="todo_btn edit">Edit</p>
                                <p class="todo_btn delete">Delete</p>
                                <div class="todo_btn priority">Priority</div>  
                            </div> 
                        </div>
                    </div>`

    // const toggle = document.querySelector('.todo')
    // const desc_height = document.querySelector('.todo_desc').getBoundingClientRect().height
    // toggle.addEventListener('click', () => {

    //     if (toggle.getBoundingClientRect().height == 50) {

    //         let height = 0;
    //         Array.from(toggle.children).forEach(el => {
    //             height += el.getBoundingClientRect().height      
    //         });
            
    //         toggle.style.height = `${height + 15}px`

    //         console.log();
    //     } else {
    //         toggle.style.height = "50px"
    //     }
    // })

    
})();
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



 



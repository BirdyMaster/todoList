import { create_defaultProjects, create_projectLinks, populate_HTML_Calender} from "./function/generate.js"

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
    const todoTemplate = document.querySelector('.todo.template')
    todoTemplate.style.dispaly = 'none'

    create_defaultProjects()
    create_projectLinks()
    populate_HTML_Calender()

})();
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////







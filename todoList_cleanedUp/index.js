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

})();
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////







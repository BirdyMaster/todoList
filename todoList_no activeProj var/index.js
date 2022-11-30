import { populate_HTML_Calender, clickToday} from "./function/generate.js";


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
export var pageLoaded = false;

//-----------------------------------------------------------------

let load = (function() {
    populate_HTML_Calender()
    pageLoaded = true
    clickToday()
})();
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



 



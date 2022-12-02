import { populate_HTML_Calender, clickToday, createTodo} from "./function/generate.js";
import { dates } from "./function/eListeners.js";


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
    console.log('load');
    populate_HTML_Calender(dates.year, dates.month)
    pageLoaded = true
    clickToday()

    createTodo()
})();
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

 






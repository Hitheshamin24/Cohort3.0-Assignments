import Department from "../../features/admin module/departments/ui/pages/department";
import Document from "../../features/admin module/documents/ui/pages/Document";
import Employee from "../../features/admin module/employees/ui/pages/Employee";
import Task from "../../features/admin module/tasks/ui/pages/Task";

export const adminRoutes=[
    {
        path:"/home/employee",
        element:<Employee/>
    },
    {
        path:"/home/departments",
        element:<Department/>
    },
    {
        path:"/home/task",
        element:<Task/>
    },
    {
        path:"/home/documents",
        element:<Document/>
    },
]
import { Routes } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: 'lists', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'new-list', component: NewListComponent},
    { path: 'lists', component: TaskViewComponent},
    { path: 'lists/:listId', component: TaskViewComponent},
    { path: 'lists/:listId/new-task', component: NewTaskComponent}
];
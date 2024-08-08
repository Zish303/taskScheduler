import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { TaskComponent } from './component/task/task.component';
import { EditComponent } from './component/edit/edit.component';
import { AuthGuard } from './auth.guard';
import { ChangePasswordComponent } from './component/change-password/change-password.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: TaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

import { Routes } from '@angular/router';
import {Home} from './shared/presentation/views/home/home';

const about = () => import('./shared/presentation/views/about/about').then(m => m.About);
const register = () => import('./shared/presentation/views/register/register').then(m => m.Register);
const courseList = () => import('./shared/presentation/views/course-list/course-list').then(m => m.CourseList);
const categoryList = () => import('./shared/presentation/views/category-list/category-list').then(m => m.CategoryList);
const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found')
  .then(m => m.PageNotFound);
const baseTitle = 'ACME Learning Center';
export const routes: Routes = [
  { path: 'register', loadComponent: register, title: `${baseTitle} - Register` },
  { path: 'resource-1', component: Home, title: `${baseTitle} - Resource 1` },
  { path: 'resource-2', loadComponent: about, title: `${baseTitle} - Resource 2` },
  { path: 'resource-3', loadComponent: courseList, title: `${baseTitle} - Resource 3` },
  { path: 'resource-4', loadComponent: categoryList, title: `${baseTitle} - Resource 4` },
  { path: '', redirectTo: '/register', pathMatch:'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` },
];

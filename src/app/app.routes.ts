import {Routes} from '@angular/router';
import {StripComponent} from './components/strip/strip.component';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
  {
    path: 'Home',
    component: HomeComponent,
  },
  {
    path: 'Strips',
    component: StripComponent,
  },
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  }
];

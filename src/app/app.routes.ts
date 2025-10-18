import { Routes } from '@angular/router';
import { InfoCcComponent } from './view/info-cc/info-cc.component';

export const routes: Routes = [
  {
    path: 'details',
    children: [{ path: 'info-cc', component: InfoCcComponent }],
  },
];

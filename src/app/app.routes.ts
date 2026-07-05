import { Routes } from '@angular/router';
import { InfoCcComponent } from './view/info-cc/info-cc.component';
import { WeddingOneComponent } from './view/wedding/wedding-one/wedding-one.component';
import { WeddingTwoComponent } from './view/wedding/wedding-two/wedding-two.component';

export const routes: Routes = [
  {
    path: 'details',
    children: [
      { path: 'info-cc', component: InfoCcComponent },
      { path: 'wedding-one', component: WeddingOneComponent },
      { path: 'wedding-two', component: WeddingTwoComponent },
    ],
  },
];

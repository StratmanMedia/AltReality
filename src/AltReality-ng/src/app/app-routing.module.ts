import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/guest-layout/guest-layout.module').then(m => m.GuestLayoutModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user-layout/user-layout.module').then(m => m.UserLayoutModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

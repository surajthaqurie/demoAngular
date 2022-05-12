import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthAdminGuard } from './@core/guards/auth.admin.guard';
import { AuthLoginGuard } from './@core/guards/auth.login.guard';

import { HomeComponent } from './pages/shared/home/home.component';
import { PageNotFoundComponent } from './pages/shared/page-not-found/page-not-found.component';

// import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
// import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'post/category/:title',
    component: HomeComponent,
    // data: { postdata: '' }
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.module').then((mod) => mod.UserModule),
  },
  {
    path: 'auth',
    canActivate: [AuthLoginGuard],
    loadChildren: () =>
      import('./pages/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'admin',
    canActivate: [AuthAdminGuard],
    loadChildren: () =>
      import('./pages/admin/admin.module').then((mod) => mod.AdminModule),
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./pages/post/post.module').then((mod) => mod.PostModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

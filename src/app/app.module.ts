import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/shared/home/home.component';
import { HeaderComponent } from './pages/shared/header/header.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { PageNotFoundComponent } from './pages/shared/page-not-found/page-not-found.component';

import { AuthModule } from './pages/auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './@core/interceptors/auth.interceptor';
import { PostModule } from './pages/post/post.module';
import { CategoryModule } from './pages/category/category.module';
import { AdminModule } from './pages/admin/admin.module';
import { UserModule } from './pages/user/user.module';

import { AuthLoginGuard } from './@core/guards/auth.login.guard';
import { AuthAdminGuard } from './@core/guards/auth.admin.guard';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    PostModule,
    CategoryModule,
    AdminModule,
    UserModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthLoginGuard,
    AuthAdminGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

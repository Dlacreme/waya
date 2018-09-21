import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'my-yana', component: HomeComponent, children: [
    { path: 'news', component: NewsFeedComponent },
    { path: 'news/:action', component: NewsFeedComponent },
    { path: 'order/new', component: NewOrderComponent },
  ]},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }

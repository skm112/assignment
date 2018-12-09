import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDetailsComponent } from './add-details/add-details.component';
import { ShowDetailsComponent } from './show-details/show-details.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "update/:id",
    component: AddDetailsComponent,
  },
  {
    path: "home",
    component: AddDetailsComponent,
  },
  {
    path: "details",
    component: ShowDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

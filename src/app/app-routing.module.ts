import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'createlist', loadChildren: './createlist/createlist.module#CreatelistPageModule' },
  { path: 'lists', loadChildren: './listes/listes.module#ListesPageModule' },
  { path: 'lists/:id', loadChildren: './details/details.module#DetailsPageModule' },
  { path: 'discount-details/:id', loadChildren: './discount-details/discount-details.module#DiscountDetailsPageModule' },
  { path: 'discount-details', loadChildren: './discount-details/discount-details.module#DiscountDetailsPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

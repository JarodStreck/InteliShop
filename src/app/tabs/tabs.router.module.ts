import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'listes',
        children: [
          {
            path: '',
            loadChildren: '../listes/listes.module#ListesPageModule'
          }
        ]
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            loadChildren: '../products/products.module#ProductsPageModule'
          }
        ]
      },
      {
        path: 'shops',
        children: [
          {
            path: '',
            loadChildren: '../shops/shops.module#ShopsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/listes',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/listes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

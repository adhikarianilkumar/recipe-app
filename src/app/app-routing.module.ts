import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  // { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'} // Older version
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping.module').then(
        (m) => m.ShoppingListModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  // Turn on console tracking for your routing by adding enableTracing
  // imports: [RouterModule.forRoot(appRoutes, {enableTracing: true})],
  exports: [RouterModule],
})
export class ApproutingModule {}

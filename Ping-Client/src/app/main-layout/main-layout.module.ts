import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authGuard/auth.guard';
import { HomeResolver } from '../home/resolver/home.resolver';
import { ChatResolver } from '../chat/resolver/chat.resolver';


const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard],
        resolve: [HomeResolver]
      },
      {
        path: "chat",
        loadChildren: () => import('../chat/chat.module').then(m => m.ChatModule),
        canActivate: [AuthGuard],
        resolve: [HomeResolver, ChatResolver]
      },
      {
        path: "videoOraudioCall",
        loadChildren: () => import('../video-oraudio-call/video-oraudio-call.module').then(m => m.VideoOraudioCallModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class MainLayoutModule { }

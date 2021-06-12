import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoOraudioCallComponent } from './component/video-oraudio-call.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: VideoOraudioCallComponent
  }
]

@NgModule({
  declarations: [VideoOraudioCallComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VideoOraudioCallModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoOraudioCallComponent } from './component/video-oraudio-call.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';

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
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VideoOraudioCallModule { }

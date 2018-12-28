import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import {SoundCloudService} from './sound-cloud.service';
import { MusicAppComponent } from './music-app/music-app.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicAppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [SoundCloudService],
  bootstrap: [AppComponent]
})
export class AppModule { }

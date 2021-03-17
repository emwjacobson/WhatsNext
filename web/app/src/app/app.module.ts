import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassesService } from './services/classes.service';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkComponent } from './work/work.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ClassesComponent,
    WorkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [
    ClassesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

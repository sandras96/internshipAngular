import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CandidateListComponent } from './candidate/candidate-list/candidate-list.component';
import { CandidateProfileComponent } from './candidate/candidate-profile/candidate-profile/candidate-profile.component';
import { SkillDetailsComponent } from './skill/skill-details/skill-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidateListComponent,
    CandidateProfileComponent,
    SkillDetailsComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

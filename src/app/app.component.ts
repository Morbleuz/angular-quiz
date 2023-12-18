import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { QUIZ } from './mock/mock.questionnaire';
import { Reponse } from './class/reponse'
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatProgressBarModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit  {
  quiz = QUIZ;
  index_quiz : number = 0 
  point : number = 0 
  selected_reponse : Reponse | null = null;
  disabled_quiz : boolean = false; 
  max_streak = 0;
  percent_finish = Math.round((this.index_quiz) / this.quiz.questions.length * 100);

  ngOnInit(): void {
    initFlowbite();
  }
  
  calcul_pourcent() : void{
    this.percent_finish = Math.round((this.index_quiz) / this.quiz.questions.length * 100)
  }

  submit_quiz() : void {
    if(this.quiz.questions.length-1 == this.index_quiz){
      this.disabled_quiz = true;
      this.percent_finish = 100
      this.calcul_point();
      this.calcul_pourcent();
    }else if(this.selected_reponse != null){
      this.index_quiz++;
      this.calcul_point();
      this.calcul_pourcent();
      this.selected_reponse = null;
    }
  }

  get_all_selectionner() : Reponse[] {
    let selectionner = [];
    for(let reponse of this.quiz.questions[this.index_quiz].reponses){
      if(reponse.est_selectionner){
        selectionner.push(reponse);
      }
    } 
    return selectionner;
  }

  selectionner_reponse(reponse : Reponse) : void{
    this.selected_reponse = reponse;
    console.log(reponse)
  }

  calcul_point() : void{
    console.log(this.selected_reponse != null)
    console.log(this.selected_reponse != null && this.selected_reponse.bonne_reponse)

    if(this.selected_reponse != null && this.selected_reponse.bonne_reponse){
      this.point++;
      this.quiz.streak++;
      console.log("bonne réponse ! ")
    }else{
      console.log("mauvaise réponse")
      if(this.max_streak<this.quiz.streak){
        this.max_streak=this.quiz.streak;
      }
      this.quiz.streak = 0;
    }
  }

  restart_quiz() : void {
    this.index_quiz = 0;
    this.point = 0; 
    this.selected_reponse = null;
    this.disabled_quiz = false;
    this.max_streak = 0
    this.calcul_pourcent()
  }
}

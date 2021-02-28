import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/model/candidate.model';
import { CandidateService } from 'src/app/services/candidate-service.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {

  @Input() candidate : Candidate;

  constructor(private candidateService : CandidateService) { }

  ngOnInit(): void {
    console.log("kandidat je ", this.candidate)
    this.getCandidate(this.candidate.id);
  }

  getCandidate(id){
    this.candidateService.get(id)
      .subscribe(data=>{
        this.candidate=data;
        console.log(this.candidate)
      },error=>{
        console.log(error)
      })
  }

}

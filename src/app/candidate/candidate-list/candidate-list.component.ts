import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Candidate } from 'src/app/model/candidate.model';
import { CandidateService } from 'src/app/services/candidate-service.service';
import { SkillService } from 'src/app/services/skill-service.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  candidates : Candidate[]
  candidateForm : FormGroup;
  skillForm : FormGroup;
  submittedCan = false;
  submittedSkill = false;

  constructor(private candidateService : CandidateService,
              private skillService : SkillService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllCandidates();

    this.candidateForm = new FormGroup({
       id : new FormControl(''),
       fullName : new FormControl('', Validators.required),
       birthdate : new FormControl('', Validators.required),
       contactNumber: new FormControl('', Validators.required),
       email: new FormControl('', Validators.required)
     });
    this.skillForm = new FormGroup({
       id : new FormControl(''),
       name: new FormControl('', Validators.required),
     });
 
}
get f() { return this.candidateForm.controls; }
get f2() { return this.skillForm.controls; }

  getAllCandidates(){
    console.log("getAllCandidates")
    this.candidateService.getAll()
      .subscribe(data=>{
       this.candidates = data;
      })
  }

  submitCandidate(){
    console.log(this.candidateForm.value)
    this.submittedCan = true;

   if (this.candidateForm.invalid) {
       return false;
   }
     this.createCandidate()
 }

 createCandidate(){
   this.candidateService.create(this.candidateForm.value)
   .subscribe(data=>{
      this.candidates = [...this.candidates, data]
      this.modalService.dismissAll();
  },error=>{
    console.log(error)
  })
 }

  deleteCandidate(c){
    this.candidateService.delete(c.id)
      .subscribe(data=>{
        this.candidates = this.candidates.filter(candidate => candidate!== c)
      },error=>{
        console.log(error)
      })
  }

  submitSkill(){
    this.submittedSkill = true;

    if (this.skillForm.invalid) {
        return false;
    }
    this.createSkill();
  }

  createSkill(){
    this.skillService.create(this.skillForm.value)
    .subscribe(data=>{
      this.modalService.dismissAll();
    },error=>{
      console.log(error)
    })
  }

  retrieveCandidates(search, param){
    if(search!=""){
      if(param=="name"){
        this.searchByName(search);
      }
      if(param=="skill"){
        this.searchBySkill(search);
      }
    }else{
      this.getAllCandidates();
    }
  }

  searchByName(name){
    this.candidateService.findByName(name)
      .subscribe(data=> {
        this.candidates = data
  })
}
  searchBySkill(skill){
    this.candidateService.findBySkill(skill)
      .subscribe(data=> {
        this.candidates = data
    })
}

  open(content) {
    this.modalService.open(content, { size: 'md' });
    }
}
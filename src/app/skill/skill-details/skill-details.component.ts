import { CandidateService } from 'src/app/services/candidate-service.service';
import { SkillService} from './../../services/skill-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/model/candidate.model';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Skill } from 'src/app/model/skill.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-skill-details',
  templateUrl: './skill-details.component.html',
  styleUrls: ['./skill-details.component.css']
})
export class SkillDetailsComponent implements OnInit {
  
  submitted = false;
  skillForm: FormGroup;
  customSkill : Skill;
  allSkills : Skill[];  
  selected =[]
  @Input() candidate : Candidate;

  constructor(private skillService: SkillService,
              private candidateService : CandidateService,
              private modalService: NgbModal) {}            
              

  ngOnInit(): void {
    this.skillForm = new FormGroup({
       id : new FormControl(''),
       name: new FormControl('', Validators.required),
     })
  }
  get f() { return this.skillForm.controls; }

 onSubmit(){
  this.submitted = true;
  if (this.skillForm.invalid) {
    return false;
  }
   this.createSkill();
 }
 
 createSkill(){
   this.skillService.create(this.skillForm.value)
    .subscribe(data=>{
      this.customSkill = data;
      this.selected = [...this.selected,this.customSkill ]
    },error=>{
      console.log(error)
    })
 }

  openSm(content) {
    this.modalService.open(content, { size: 'md' });
    this.getAllSkills();
  }

  getAllSkills(){
    this.skillService.getAll()
      .subscribe(data=>{
        console.log(data)
        this.allSkills = data;
      },error=>{
        console.log(error)
      })
  }

  getSelectedValue(){ 
    console.log(this.selected)
    this.candidateService.update(this.selected, this.candidate.id)
      .subscribe(data=>{
        this.modalService.dismissAll();
        this.candidate.skills.push(...this.selected)
      },error=>{
        console.log(error)
      })
  }
  
  removeSkill(s){
    console.log(s)
    this.candidateService.deleteSkill(s.id, this.candidate.id)
      .subscribe(data=>{
        this.candidate.skills = this.candidate.skills.filter(skill => skill !== s )
        console.log(data)
      },error=>{
        console.log(error)
      })
  }

}

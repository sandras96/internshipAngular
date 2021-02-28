
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../model/candidate.model';
import { Skill } from '../model/skill.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService{

  private baseUrl = 'http://localhost:8080/api/candidates';

  constructor(private http : HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(`${this.baseUrl}/all`);
  }
  get(candidate_id: number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${candidate_id}`);
  }
  create(candidate : Candidate): Observable<any>{
    return this.http.post(`${this.baseUrl}`, candidate);
  }
  update(data, candidate_id) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${candidate_id}`, data);
  }
  delete(candidate_id : number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${candidate_id}`);
  }
  findByName(name): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchByName/${name}`);
  }
  findBySkill(skill): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchBySkill/${skill}`);
  }
  deleteSkill(skill_id : number, candidate_id : number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/deleteSkill/${candidate_id}/${skill_id}`);
  }
}

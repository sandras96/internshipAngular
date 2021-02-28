import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../model/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private baseUrl = 'http://localhost:8080/api/skills';

  constructor(private http : HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(`${this.baseUrl}/all`);
  }
  get(candidate_id: number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/candidate/${candidate_id}`);
  }
  create(skill : Skill): Observable<any>{
    return this.http.post(`${this.baseUrl}`, skill);
  }
}

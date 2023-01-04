import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

type Response = Record<string, any>;

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  async get(route: string) {
    const requestObserver = this.http.get<Response>(`${this.serverUrl}/${route}`);
    return await lastValueFrom(requestObserver);
  }
  
  async post(route: string, body: object) {
    const requestObserver = this.http.post<Response>(`${this.serverUrl}/${route}`, body);
    return await lastValueFrom(requestObserver)
  }

  async patch(route: string, body: object) {
    const requestObserver = this.http.patch<Response>(`${this.serverUrl}/${route}`, body);
    return await lastValueFrom(requestObserver)
  }
}

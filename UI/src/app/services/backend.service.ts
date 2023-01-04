import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

type Response = Record<string, any>;

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private serverUrl = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  applyDefaultOptions(options?: object) {
    return { ...this.httpOptions, options };
  }

  async get(route: string, options?: object) {
    const reqOptions = this.applyDefaultOptions(options);
    const requestObserver = this.http.get<Response>(`${this.serverUrl}/${route}`, reqOptions);
    return await lastValueFrom(requestObserver);
  }
  
  async post(route: string, body: object, options?: object) {
    const reqOptions = this.applyDefaultOptions(options);
    const requestObserver = this.http.post<Response>(`${this.serverUrl}/${route}`, body, reqOptions);
    return await lastValueFrom(requestObserver)
  }
  
  async patch(route: string, body: object, options?: object) {
    const reqOptions = this.applyDefaultOptions(options);
    const requestObserver = this.http.patch<Response>(`${this.serverUrl}/${route}`, body, reqOptions);
    return await lastValueFrom(requestObserver)
  }
}

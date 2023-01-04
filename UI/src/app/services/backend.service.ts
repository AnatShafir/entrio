import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

type Response = Record<string, any>;

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private serverUrl = environment.serverUrl;
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
  
  async put(route: string, body: object, options?: object) {
    const reqOptions = this.applyDefaultOptions(options);
    const requestObserver = this.http.put<Response>(`${this.serverUrl}/${route}`, body, reqOptions);
    return await lastValueFrom(requestObserver)
  }
}

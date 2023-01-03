import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

type Response = Record<string, any>;

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  
  async _handleResponse(observer: Observable<Object>) {
    try {
      return await lastValueFrom(observer);
    } catch (error) {
      return error as HttpErrorResponse;
    }
  }

  async get(route: string): Promise<Response | HttpErrorResponse> {
    const requestObserver = this.http.get(`${this.serverUrl}/${route}`);
    return await this._handleResponse(requestObserver);
  }
  
  async post(route: string, object: object): Promise<Response | HttpErrorResponse> {
    const requestObserver = this.http.post(`${this.serverUrl}/${route}`, object);
    return await this._handleResponse(requestObserver)
  }

  async patch(route: string, object: object): Promise<Response | HttpErrorResponse> {
    const requestObserver = this.http.patch(`${this.serverUrl}/${route}`, object);
    return await this._handleResponse(requestObserver)
  }
}

import { Injectable } from '@angular/core';
import { Settings } from 'src/app/interfaces/settings';
import { User } from 'src/app/interfaces/user';
import { UserForm } from 'src/app/interfaces/user-form';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private route: string = 'user';

  constructor(private backend: BackendService) { }

  async login(userForm: UserForm) {
    const response = await this.backend.post(`${this.route}/login`, { user: userForm });
    if (!('user' in response)) throw new Error('Response must contain user');
    return response['user'];
  }
  
  async register(userForm: UserForm) {
    const response = await this.backend.post(`${this.route}`, { user: userForm });
    if (!('user' in response)) throw new Error('Response must contain user');
    return response['user'];
  }

  async updateSettings(settings: Settings) {
    await this.backend.patch(`${this.route}/settings`, { settings });
  }
}

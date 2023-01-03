import { Injectable } from '@angular/core';
import { Settings } from 'src/app/interfaces/settings';
import { User } from 'src/app/interfaces/user';
import { UserForm } from 'src/app/interfaces/user-form';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private route: string = 'user';

  constructor(private backend: BackendService) { }

  async login(userForm: UserForm) {
    return await this.backend.post(`${this.route}/authenticate`, { user: userForm });
  }

  async register(userForm: UserForm) {
    return await this.backend.post(`${this.route}`, { user: userForm });
  }

  async getUser(userId: string) {
    return await this.backend.get(`${this.route}/${userId}`);
  }

  async updateSettings(settings: Settings, user: User) {
    return await this.backend.patch(`${this.route}/${user._id}/settings`, { settings, user });
  }
}

import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/settings';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private user?: User;

  constructor() { }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

  getSettings() {
    return this.user?.settings;
  }

  setSettings(settings: Settings) {
    this.user!.settings = settings;
  }
}

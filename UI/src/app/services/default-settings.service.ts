import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/settings';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultSettingsService {
  private route: string = 'default-settings';

  constructor(private backend: BackendService) { }
  
  async update(settingsUpdate: Settings) {
    await this.backend.put(`${this.route}`, { settings: settingsUpdate });
  }

  async get() {
    const response = await this.backend.get(`${this.route}`);
    if (!('settings' in response)) throw new Error('Response must contain settings');
    return response['settings'];
  }
}

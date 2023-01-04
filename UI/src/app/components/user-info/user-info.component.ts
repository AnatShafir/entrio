import { Component } from '@angular/core';
import { Settings } from 'src/app/interfaces/settings';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { DefaultSettingsService } from 'src/app/services/default-settings.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  editDefaultSettings: boolean = false;
  settings?: Settings;

  constructor(
    public currentUser: CurrentUserService,
    private defaultSettings: DefaultSettingsService,
  ) { }
  
  async ngOnInit() {
    await this.loadRelevantSettings();
  }
  
  async loadRelevantSettings() {
    if (!this.editDefaultSettings) this.settings = this.currentUser.getSettings();
    else this.settings = await this.defaultSettings.get();
  }
}

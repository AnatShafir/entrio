import { Component, Input, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service'
import { Settings } from 'src/app/interfaces/settings';
import { SettingsService } from 'src/app/services/settings.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  @Input() user?: User;
  isDisabled: boolean = true;

  constructor(
    private settingsService: SettingsService,
    private usersService: UsersService,
    private errorService: ErrorService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.user = changes['user'].currentValue;
  }

  editMode(form?: NgForm) {
    this.isDisabled = !this.isDisabled;
    if (form) form.resetForm(this.user?.settings);
  }

  async onSaveChanges(form: NgForm) {
    const { value: formValue } = form;
    const settingsUpdate: Settings = this.getSettingsFromFormValue(formValue);
    const newSetting = { ...this.user?.settings, ...settingsUpdate };
    const isEqualSettings = this.settingsService.settingsDeepEqual(newSetting, this.user!.settings);
    if (isEqualSettings) {
      this.editMode();
      return;
    }
    const isSettingsValid = this.settingsService.validateSettings(newSetting);
    if (isSettingsValid) await this.updateUserSettings(settingsUpdate);
  }

  getSettingsFromFormValue(formValue: Record<string, string>) {
    return Object.keys(formValue).reduce((settingsObj, settingKey) => {
      settingsObj[settingKey as keyof Settings] = +parseFloat(formValue[settingKey]).toFixed(2);
      return settingsObj;
    }, {} as Settings);
  }

  async updateUserSettings(settingsUpdate: Settings) {
    try {
      await this.usersService.updateSettings(settingsUpdate, this.user!);
      this.user!.settings = { ...this.user?.settings, ...settingsUpdate };
      this.editMode();
    } catch (error: Error | any) {
      const message = error?.error.message === 'Forbidden' ? 'Sorry! This user is not permitted to this update' : '';
      this.errorService.openDialog(message);
    };
  }
}

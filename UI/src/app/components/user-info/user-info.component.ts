import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Settings } from 'src/app/interfaces/settings';
import { SettingsService } from 'src/app/services/settings.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  isDisabled: boolean = true;

  constructor(
    private settingsService: SettingsService,
    public currentUser: CurrentUserService,
    private errorService: ErrorService
  ) { }

  editMode(form?: NgForm) {
    this.isDisabled = !this.isDisabled;
    if (form) form.resetForm(this.currentUser.getSettings());
  }

  async onSaveChanges(form: NgForm) {
    try {
      const { value: formValue } = form;
      const settingsUpdate: Settings = this.getSettingsFromFormValue(formValue);
      await this.settingsService.update(settingsUpdate);
      this.editMode();
    } catch (error: Error | any) {
      const message = error.error.message === 'Validation' ? `The user settings should sum up to 1 but instead sum up to ${error.sumOfSettings}` : '';
      this.errorService.openDialog(message);
    }
  }

  getSettingsFromFormValue(formValue: Record<string, string>) {
    return Object.keys(formValue).reduce((settingsObj, settingKey) => {
      settingsObj[settingKey as keyof Settings] = +parseFloat(formValue[settingKey]).toFixed(2);
      return settingsObj;
    }, {} as Settings);
  }
}

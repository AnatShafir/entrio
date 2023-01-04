import { Component,  Input, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Settings } from 'src/app/interfaces/settings';
import { ErrorService } from 'src/app/services/error.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  isDisabled: boolean = true;
  @Input() editDefaultSettings?: boolean;
  @Input() settings?: Settings;
  @Input() disableUserScoring?: boolean;

  constructor(private settingsService: SettingsService, private errorService: ErrorService) {}

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      this[propName as keyof this] = changes[propName].currentValue;
    }
  }

  editMode(form?: NgForm) {
    this.isDisabled = !this.isDisabled;
    if (form) form.resetForm(this.settings);
  }
  
  async onSaveChanges(form: NgForm) {
    try {
      const { value: formValue } = form;
      const settingsUpdate: Settings = this.getSettingsFromFormValue(formValue);
      this.settings = await this.settingsService.update(settingsUpdate, this.settings!, this.editDefaultSettings!);
      this.editMode();
    } catch (error: Error | any) {
      const message = this.getSaveChangesErrorMessage(error);
      this.errorService.openDialog(message);
    }
  }
  
  getSaveChangesErrorMessage(error: Error | any) {
    switch (error?.error?.message) {
      case 'Validation':
        return `The user settings should sum up to 1 but instead sum up to ${error.sumOfSettings}`;
      case 'Forbidden':
        return 'Sorry! This user is not permitted to this update';
      default:
        return '';
    }
  }

  getSettingsFromFormValue(formValue: Record<string, string>) {
    return Object.keys(formValue).reduce((settingsObj, settingKey) => {
      settingsObj[settingKey as keyof Settings] = Number(parseFloat(formValue[settingKey]).toFixed(2));
      return settingsObj;
    }, {} as Settings);
  }
}

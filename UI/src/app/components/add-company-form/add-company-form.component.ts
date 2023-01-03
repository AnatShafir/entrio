import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Company } from 'src/app/interfaces/company';

@Component({
  selector: 'app-add-company-form',
  templateUrl: './add-company-form.component.html',
  styleUrls: ['./add-company-form.component.css'],

})
export class AddCompanyFormComponent {
  company?: Company;

  constructor(
    public dialogRef: MatDialogRef<AddCompanyFormComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from 'src/app/interfaces/company';
import { AddCompanyFormComponent } from '../add-company-form/add-company-form.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  header: string = 'Companies';
  @Output() newCompanyEvent = new EventEmitter<Company>();

  constructor(public dialog: MatDialog) { }

  openAddCompanyForm(): void {
    const dialogRef = this.dialog.open(AddCompanyFormComponent);

    dialogRef.afterClosed().subscribe(newCompany => {
      if (newCompany) this.newCompanyEvent.emit(newCompany);
    });
  }
}

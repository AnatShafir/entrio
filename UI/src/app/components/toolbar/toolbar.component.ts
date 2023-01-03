import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from 'src/app/interfaces/company';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { AddCompanyFormComponent } from '../add-company-form/add-company-form.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  header: string = 'Companies';
  @Output() newCompanyEvent = new EventEmitter<Company>();

  constructor(public dialog: MatDialog, private companiesService: CompaniesService) { }

  openAddCompanyForm(): void {
    const dialogRef = this.dialog.open(AddCompanyFormComponent);

    dialogRef.afterClosed().subscribe(newCompany => {
      console.log(newCompany);
      // if (newCompany) {
      //   await this.companiesService.postCompany(newCompany);
      //   this.newCompanyEvent.emit(newCompany)
      // }
    });
  }
}

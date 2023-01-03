import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from 'src/app/interfaces/company';
import { DialogError } from 'src/app/interfaces/dialog-error';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css'],
  providers: [CompaniesService]
})
export class CompaniesListComponent {
  companies: Company[] = [];

  constructor(public dialog: MatDialog, private companiesService: CompaniesService) {
    this.getAllCompanies();
  }
  
  async getAllCompanies() {
    const response = await this.companiesService.getCompanies();
    if (!(response instanceof HttpErrorResponse)) this.companies = response['companies'] as Company[];
    else {
      const { message } = response.error;
      const data: DialogError = { 
        message: `Please try again later. error: ${message}`,
        origin: 'loading companies list' 
      };
      this.dialog.open(ErrorDialogComponent, { data });
    }
  }

  addCompany(newCompany: Company) {
    this.companies.push(newCompany);
  }
}

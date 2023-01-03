import { Component } from '@angular/core';
import { Company } from 'src/app/interfaces/company';
import { CompaniesService } from 'src/app/services/companies.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css'],
  providers: [CompaniesService]
})
export class CompaniesListComponent {
  companies: Company[] = [];

  constructor(private companiesService: CompaniesService, private errorService: ErrorService) {}
  
  async ngOnInit() {
    try {
      this.companies = await this.companiesService.getCompanies();
    } catch (error) {
      this.errorService.openDialog();
    }
  }

  async addCompany(newCompany: Company) {
    try {
      const company = await this.companiesService.postCompany(newCompany);
      this.companies.push(company);
    } catch (error) {
      this.errorService.openDialog();
    }
  }
}

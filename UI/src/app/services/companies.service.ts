import { Injectable } from '@angular/core';
import { Company } from 'src/app/interfaces/company';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private companiesRoute: string = 'company';
  
  constructor(private backend: BackendService) { }

  async getCompanies() {
    const response = await this.backend.get(this.companiesRoute);
    if (!('companies' in response)) throw new Error('Response must contain companies');
    return response['companies'];
  }
  
  async postCompany(company: Company) {
    const response = await this.backend.post(this.companiesRoute, { company });
    if (!('company' in response)) throw new Error('Response must contain company');
    return response['company'];
  }
}

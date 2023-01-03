import { Injectable } from '@angular/core';
import { Company } from 'src/app/interfaces/company';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private companiesRoute: string = 'company';
  
  constructor(private backend: BackendService) { }

  async getCompanies() {
    return await this.backend.get(this.companiesRoute);
  }
  
  async postCompany(company: Company) {
    return await this.backend.post(this.companiesRoute, { company });
  }
}

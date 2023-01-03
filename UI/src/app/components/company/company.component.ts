import { Component, Input } from '@angular/core';
import { Company } from 'src/app/interfaces/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  @Input() company?: Company;

  constructor() { }
  
  calcAvgUserScoring() {
    const userScoring = this.company?.userScoring as number[];
    if (userScoring.length < 1) return 0;
    else return userScoring?.reduce((a, b) => a + b, 0) / userScoring?.length;
  }
}

import { Component, Input } from '@angular/core';
import { Company } from 'src/app/interfaces/company';
import { CompaniesService } from 'src/app/services/companies.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { ErrorService } from 'src/app/services/error.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  @Input() company?: Company;

  constructor(
    private companiesService: CompaniesService,
    public currentUser: CurrentUserService,
    private errorService: ErrorService,
    private _snackBar: MatSnackBar
  ) {}
  
  calcAvgUserScoring() {
    const userScoring = this.company?.userScoring as number[];
    if (userScoring.length < 1) return 0;
    const sumOfScoring = userScoring?.reduce((a, b) => a + b, 0);
    const average = Number((sumOfScoring / userScoring?.length).toFixed(2));
    return average;
  }

  async getCompanyScore() {
    try {
      const score = await this.companiesService.getCompanyScore(this.company!._id);
      const message = `The company "${this.company?.name}" got the score ${score}`;
      this._snackBar.open(message, 'Ok');
    } catch (error: Error | any) {
      const message = error?.error?.message === 'Unauthorized' ? 'Please login before trying to calculate company score' : '';
      this.errorService.openDialog(message);
    }
  }
}

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { CompanyComponent } from './components/company/company.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AddCompanyFormComponent } from './components/add-company-form/add-company-form.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserContainerComponent } from './components/user-container/user-container.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    CompaniesListComponent,
    CompanyComponent,
    ToolbarComponent,
    AddCompanyFormComponent,
    UserInfoComponent,
    UserContainerComponent,
    UserFormComponent,
    ErrorDialogComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

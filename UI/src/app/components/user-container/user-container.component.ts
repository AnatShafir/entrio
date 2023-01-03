import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserForm } from 'src/app/interfaces/user-form';
import { UsersService } from 'src/app/services/users/users.service';
import { DialogError } from 'src/app/interfaces/dialog-error';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent {
  userLoggedIn: boolean = false;
  showUserRegister: boolean = false;
  user?: User;
  
  constructor(public dialog: MatDialog, private userService: UsersService) {}

  async handleLogin(userForm: UserForm) {
    const response = await this.userService.login(userForm);
    if (response instanceof HttpErrorResponse) {
      const { message } = response.error;
      const dialogError: DialogError = { message, origin: 'login' };
      if (message === 'Unauthorized') dialogError.message = 'User name or password are incorrect';
      else dialogError.message = `Please try again later. error: ${message}`;
      this.openDialog(dialogError);
    } else {
      this.userLoggedIn = true;
      this.user = response['user'] as User;
    }
  }
  
  async handleRegister(userForm: UserForm) {
    const response = await this.userService.register(userForm);
    if (response instanceof HttpErrorResponse) {
      const { message } = response.error;
      const dialogError: DialogError = { message, origin: 'register' };
      if (message === 'Conflict') dialogError.message = 'Sorry! This user name is already taken';
      else dialogError.message = `Please try again later. error: ${message}`;
      this.openDialog(dialogError);
    } else {
      this.userLoggedIn = true;
      this.user = response['user'] as User;
    }
  }

  openDialog(data: DialogError) {
    this.dialog.open(ErrorDialogComponent, { data });
  }
}

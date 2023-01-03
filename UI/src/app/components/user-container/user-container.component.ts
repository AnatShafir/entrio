import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserForm } from 'src/app/interfaces/user-form';
import { ErrorService } from 'src/app/services/error.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent {
  userLoggedIn: boolean = false;
  showUserRegister: boolean = false;
  user?: User;
  
  constructor(private userService: UsersService, private errorService: ErrorService) {}

  async handleLogin(userForm: UserForm) {
    try {
      this.user = await this.userService.login(userForm);
      this.userLoggedIn = true;
    } catch (error: Error | any) {
      const message = error?.error?.message === 'Unauthorized' ? 'User name or password are incorrect' : '';
      this.errorService.openDialog(message);
    }
  }
  
  async handleRegister(userForm: UserForm) {
    try {
      this.user = await this.userService.register(userForm);
      this.userLoggedIn = true;
    } catch (error: Error | any) {
      const message = error?.error.message === 'Conflict' ? 'Sorry! This user name is already taken' : '';
      this.errorService.openDialog(message);
    }
  }
}

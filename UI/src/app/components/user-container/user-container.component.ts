import { Component } from '@angular/core';
import { UserForm } from 'src/app/interfaces/user-form';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { ErrorService } from 'src/app/services/error.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent {
  showUserRegister: boolean = false;
  
  constructor(
    private userService: UsersService,
    private errorService: ErrorService,
    public currentUser: CurrentUserService
  ) {}

  async handleLogin(userForm: UserForm) {
    try {
      const user = await this.userService.login(userForm);
      this.currentUser.setUser(user);
      this.currentUser.loggedIn = true;
    } catch (error: Error | any) {
      const message = error?.error?.message === 'Unauthorized' ? 'User name or password are incorrect' : '';
      this.errorService.openDialog(message);
    }
  }
  
  async handleRegister(userForm: UserForm) {
    try {
      const user = await this.userService.register(userForm);
      this.currentUser.setUser(user);
      this.currentUser.loggedIn = true;
    } catch (error: Error | any) {
      const message = error?.error.message === 'Conflict' ? 'Sorry! This user name is already taken' : '';
      this.errorService.openDialog(message);
    }
  }
}

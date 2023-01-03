import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserForm } from 'src/app/interfaces/user-form';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  hidePassword = true;
  @Input() type: string = '';
  @Output() submitEvent = new EventEmitter<UserForm>();

  submit(username: string, password: string) {
    this.submitEvent.emit({ username, password });
  }
}

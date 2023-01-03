import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(public dialog: MatDialog) { }

  openDialog(message?: string) {
    if (!message) message = `Please try again later`;
    this.dialog.open(ErrorDialogComponent, { data: { message } });
  }
}

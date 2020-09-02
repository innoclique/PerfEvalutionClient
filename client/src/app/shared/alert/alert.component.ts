import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AlertDialog } from 'src/app/Models/AlertDialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input()
  cancelButtonText: String;
  @Input()
  confirmButtonText: String;
  @Input()
  showConfirm: boolean;
  @Input()
  showCancel: boolean = true;
  @Input()
  content: String;
  @Input()
  title: String;

  public data: AlertDialog;
  constructor(
    private dialogRef: MatDialogRef<AlertComponent>, @Inject(MAT_DIALOG_DATA) data: any) {    
    this.data = data;


  }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
  save() {
    this.dialogRef.close('ddd');
  }
}

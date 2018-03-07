import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CarDetailComponent } from '../../components/car-detail/car-detail.component';

@Component({
  selector: 'app-unregister-user-dialog',
  templateUrl: './unregister-user-dialog.component.html',
  styleUrls: ['./unregister-user-dialog.component.scss']
})
export class UnregisterUserDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CarDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() { }

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    this.dialogRef.close(false);
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CarDetailComponent } from '../../components/car-detail/car-detail.component';

@Component({
  selector: 'app-create-order-dialog',
  templateUrl: './create-order-dialog.component.html',
  styleUrls: ['./create-order-dialog.component.scss']
})
export class CreateOrderDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CarDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() { }

  save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}

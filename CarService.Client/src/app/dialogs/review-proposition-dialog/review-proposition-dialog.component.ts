import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderListComponent } from '../../components/order-list/order-list.component';

@Component({
  selector: 'app-review-proposition-dialog',
  templateUrl: './review-proposition-dialog.component.html',
  styleUrls: ['./review-proposition-dialog.component.scss']
})
export class ReviewPropositionDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<OrderListComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() { }

  apply() {
    this.dialogRef.close(this.data);
  }

  decline() {
    this.dialogRef.close();
  }

}

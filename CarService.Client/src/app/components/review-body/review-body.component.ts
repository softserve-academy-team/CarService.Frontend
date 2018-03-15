import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-review-body',
  templateUrl: './review-body.component.html',
  styleUrls: ['./review-body.component.scss']
})
export class ReviewBodyComponent {
  @Input() reviewId: number;
  uploadFile: any;
  url: string;

  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean = false;

  constructor(private communicationService: CommunicationService, private detector: ChangeDetectorRef) {
    this.communicationService.reviewReceived.subscribe(d => {
      this.reviewId = d;
      this.url = `https://localhost:44340/api/review/save_photo/${this.reviewId}`;

      this.uploader = new FileUploader({
        url: this.url,
        authToken: `Bearer ${localStorage.getItem("token")}`
      });
    });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}

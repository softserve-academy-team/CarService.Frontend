import { Component, OnInit, Input } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
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
  public hasAnotherDropZoneOver: boolean = false;

  constructor(private communicationService: CommunicationService) {
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

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}

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
  photoUrl: string;
  videoUrl: string;

  public videoUploader: FileUploader;
  public photoUploader: FileUploader;
  public hasVideoDropZoneOver: boolean = false;
  public hasPhotoDropZoneOver: boolean = false;

  constructor(private communicationService: CommunicationService, private detector: ChangeDetectorRef) {
    this.communicationService.reviewReceived.subscribe(d => {
      this.reviewId = d;

      this.videoUrl = `https://localhost:44340/api/review/save_video/${this.reviewId}`;
      this.photoUrl = `http://localhost:5000/api/review/save_photo/${this.reviewId}`;

      this.videoUploader = new FileUploader({
        url: this.videoUrl,
        authToken: `Bearer ${localStorage.getItem("token")}`
      });

      this.photoUploader = new FileUploader({
        url: this.photoUrl,
        authToken: `Bearer ${localStorage.getItem("token")}`
      });
    });
  }

  public fileOverVideo(e: any): void {
    this.hasVideoDropZoneOver = e;
  }

  public fileOverPhoto(e: any): void {
    this.hasPhotoDropZoneOver = e;
  }
}

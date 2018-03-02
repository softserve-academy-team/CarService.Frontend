import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-review-body',
  templateUrl: './review-body.component.html',
  styleUrls: ['./review-body.component.scss']
})
export class ReviewBodyComponent {
  reviewId: number;
  uploadFile: any;
  @Input() Url: string;

  public uploader: FileUploader;
  public hasDropZoneOver: boolean = false;

  constructor(private communicationService: CommunicationService, private detector: ChangeDetectorRef) {
    this.communicationService.reviewReceived.subscribe(d => {
      this.Url += `/${d}`;

      this.uploader = new FileUploader({
        url: this.Url,
        authToken: `Bearer ${localStorage.getItem("token")}`
      });

      this.uploader.onAfterAddingFile = file => {
        file.upload();
      };
    });
  }

  public fileOverDropZone(e: any): void {
    this.hasDropZoneOver = e;
  }
}

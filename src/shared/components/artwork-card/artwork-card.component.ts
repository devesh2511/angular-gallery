import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { artworkData } from 'src/shared/models/sharedInterfaces';
import { ArtworkService } from 'src/shared/services/artwork.service';

@Component({
  selector: 'app-artwork-card',
  templateUrl: './artwork-card.component.html',
  styleUrls: ['./artwork-card.component.scss'],
})
export class ArtworkCardComponent implements OnInit, OnDestroy {
  @Input() artwork_id: number;
  artwork: artworkData;
  artwork_image_url: string;
  isLoaded: boolean = false;
  savedForLater: boolean = false;
  subscriptions: Subscription[] = [];

  saveForLaterIcon = 'bi-heart';

  constructor(private artworkService: ArtworkService) {}

  ngOnInit(): void {
    const ArtworkSubscription = this.artworkService
      .getArtworkByID(this.artwork_id)
      .subscribe({
        next: (artwork) => {
          this.artwork = artwork.data;
          this.artwork_image_url = this.artworkService.getImageByID(
            this.artwork.image_id
          );
          this.isLoaded = true;

          this.artworkService.savedForLaterItems$.subscribe({
            next: (ids) => {
              if (ids.find((id) => id === this.artwork_id)) {
                this.savedForLater = true;
                this.saveForLaterIcon = 'bi-heart-fill';
              } else {
                this.savedForLater = false;
                this.saveForLaterIcon = 'bi-heart';
              }
            },
            error: (er) => {
              console.error(er);
            },
          });
        },
        error: (er) => console.error(er),
        complete: () => console.log('sub complete'),
      });
    this.subscriptions.push(ArtworkSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  handleSaveForLater() {
    if (this.savedForLater) {
      this.artworkService.deleteFromSavedForLater(this.artwork_id);
      this.savedForLater = false;
      this.saveForLaterIcon = 'bi-heart';
    } else {
      this.artworkService.addIntoSavedForLater(this.artwork_id);
      this.savedForLater = true;
      this.saveForLaterIcon = 'bi-heart-fill';
    }
  }
}

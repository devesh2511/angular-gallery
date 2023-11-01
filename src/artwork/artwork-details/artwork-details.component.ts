import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { artworkData } from 'src/shared/models/sharedInterfaces';
import { ArtworkService } from 'src/shared/services/artwork.service';

@Component({
  selector: 'app-artwork-details',
  templateUrl: './artwork-details.component.html',
  styleUrls: ['./artwork-details.component.scss'],
})

export class ArtworkDetailsComponent implements OnInit, OnDestroy {
  artwork_id: number;
  artwork: artworkData = {
    id: 0,
    api_model: '',
    api_link: '',
    title: '',
    date_display: '',
    artist_display: '',
    place_of_origin: '',
    dimensions: '',
    credit_line: '',
    publication_history: '',
    exhibition_history: '',
    provenance_text: '',
    image_id: '',

  };

  artwork_image_url: string = '../../assets/placeholder-image.png';
  isLoaded: boolean = false;
  subscriptions: Subscription[] = [];
  savedForLater: boolean = false;
  saveForLaterText = 'Add to WishList';

  constructor(
    private artworkService: ArtworkService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    console.log(this.router.url);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.artwork_id = param['id'];
      console.log(this.artwork_id);

    });

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
                this.saveForLaterText = 'Added to WishList';
              } else {
                this.savedForLater = false;
                this.saveForLaterText = 'Add to WishList';
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
    this.artworkService.savedForLaterItems$.subscribe((ids) => {
      if (ids.findIndex((id) => id === this.artwork_id) !== -1) {
        this.savedForLater = false;
        this.saveForLaterText = 'Add to WishList';
        this.artworkService.deleteFromSavedForLater(this.artwork_id);
      } else {
        this.savedForLater = true;
        this.saveForLaterText = 'Added to WishList';
        this.artworkService.addIntoSavedForLater(this.artwork_id);
      }
    });
  }
  shareOnFacebook() {
    this.artworkService.shareOnFacebook(this.artwork_image_url + " Check this masterpiece here " + window.location.href)
  }

  shareOnTwitter() {
    this.artworkService.shareOnTwitter(this.artwork_image_url + " Check this masterpiece here " + window.location.href)
  }

}

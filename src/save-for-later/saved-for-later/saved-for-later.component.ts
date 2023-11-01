import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtworkService } from 'src/shared/services/artwork.service';

@Component({
  selector: 'app-saved-for-later',
  templateUrl: './saved-for-later.component.html',
  styleUrls: ['./saved-for-later.component.scss'],
})
export class SavedForLaterComponent implements OnInit, OnDestroy {
  artworkIDs: Array<number> = [];
  isLoading: boolean = true;
  subscriptions: Subscription[] = [];
  isEmpty: boolean = true;

  constructor(private artworkService: ArtworkService) {}

  ngOnInit(): void {
    const subscription: Subscription =
      this.artworkService.savedForLaterItems$.subscribe({
        next: (ids) => {
          this.artworkIDs = ids;
          this.isLoading = false;
          if(this.artworkIDs.length > 0){
            this.isEmpty = false;
          }
        },
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe);
  }
}

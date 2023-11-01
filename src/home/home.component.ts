import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArtworkService } from 'src/shared/services/artwork.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import {
  multipleArtwork,
  searchArtworkResponse,
} from 'src/shared/models/sharedInterfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  artworkIDs: Array<number> = [];
  subscriptions: Array<Subscription> = [];
  artworkListLength: number;
  pageEvent: PageEvent;
  page: number = 1;
  isLoading: boolean = true;

  constructor(private artworkService: ArtworkService, private fb: FormBuilder) {
    console.log('inside home component constructor');
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchQuery: this.fb.control(''),
    });

    this.pageEvent = {
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: 12,
      length: this.artworkListLength,
    };
    this.page = 1;

    this.handlePagination();

    this.searchForm.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((ele) => ele.unsubscribe());
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.page = this.pageEvent.pageIndex + 1;
    this.handlePagination();
  }

  handlePagination() {
    this.artworkIDs = [];
    this.isLoading = true;
    const subscription: Subscription = this.artworkService
    .getArtworkByPage(this.page, this.pageEvent.pageSize)
    .subscribe({
      next: (multipleArtwork: multipleArtwork) => {
          console.log('inside subscribe');

          multipleArtwork.data.forEach((art) => {
            this.artworkIDs.push(art.id);
          });
          this.artworkListLength = multipleArtwork.pagination.total;
          this.isLoading = false;
        },
        error: (er) => {
          console.error(er);
        },
        complete: () => {
          console.log('subscribe completes');
        },
      });

    this.subscriptions.push(subscription);
  }

  applyFilter() {
    const searchQuery: string = this.searchForm.controls['searchQuery'].value;
    if (searchQuery.length < 2) {
      this.handlePagination();
      return;
    }
    this.subscriptions.forEach((ele) => ele.unsubscribe());

    const subscription = this.artworkService
      .getArtworkAfterSearch(searchQuery, this.pageEvent.pageSize)
      .subscribe({
        next: (searchArtworkRepsonse: searchArtworkResponse) => {
          console.log('inside filter');

          const temp_subscriptions: Subscription[] = [];
          this.artworkIDs = [];

          console.log(searchArtworkRepsonse.data.length);

          searchArtworkRepsonse.data.forEach((artwork) => {
            console.log('inside loop', artwork.id);
            this.artworkIDs.push(artwork.id);
          });
          this.isLoading = false;

          temp_subscriptions.forEach((sub) => sub.unsubscribe());

          this.artworkListLength = searchArtworkRepsonse.pagination.total;
        },
        error: (er) => {
          console.error(er);
        },
        complete: () => {},
      });

    this.subscriptions.push(subscription);
  }

  getImageByID(imageID: string) {
    return this.artworkService.getImageByID(imageID);
  }
}

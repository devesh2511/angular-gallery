import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { searchArtworkResponse } from '../models/sharedInterfaces';
import { artwork } from '../models/sharedInterfaces';
import { multipleArtwork } from '../models/sharedInterfaces';

@Injectable({
  providedIn: 'root',
})
export class ArtworkService {
  rootLink = 'https://api.artic.edu/api/v1/artworks';
  imageRootLink = 'https://www.artic.edu/iiif/2';
  fields =
    'id,api_model,api_link,title,date_display,artist_display,place_of_origin,dimensions,credit_line,publication_history,exhibition_history,provenance_text,image_id';

  SFLItems: number[] = [];
  savedForLaterItems$: Observable<number[]> = of(this.SFLItems);

  constructor(private http: HttpClient) { }

  getArtworkByPage(page: number, limit: number): Observable<multipleArtwork> {
    return this.http.get<multipleArtwork>(
      this.rootLink + '?page=' + page + '&field=id&limit=' + limit
    );
  }

  getArtworkByID(id: number): Observable<artwork> {
    return this.http.get<artwork>(
      this.rootLink + '/' + id + '?field=' + this.fields
    );
  }

  getArtworkAfterSearch(
    searchQuery: string,
    limit: number
  ): Observable<searchArtworkResponse> {
    console.warn(
      this.rootLink + '/search?q=' + searchQuery + '&field=id&limit=' + limit
    );
    return this.http.get<searchArtworkResponse>(
      this.rootLink +
      '/search?q=' +
      searchQuery +
      '&field=' +
      this.fields +
      '&limit=' +
      limit
    );
  }

  getImageByID(image_id: string): string {
    return this.imageRootLink + '/' + image_id + '/full/843,/0/default.jpg';
  }

  addIntoSavedForLater(id: number) {
    this.SFLItems.push(id);

    this.savedForLaterItems$ = of(this.SFLItems);
    console.log(this.SFLItems);
  }

  deleteFromSavedForLater(id: number) {
    const index = this.SFLItems.findIndex((sfl_id) => {
      sfl_id === id;
    });
    this.SFLItems.splice(index, 1);

    this.savedForLaterItems$ = of(this.SFLItems);
    console.log(this.SFLItems);
  }

  shareOnFacebook(shareUrl: string) {
    shareUrl = encodeURIComponent(shareUrl);
    console.log(shareUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?url=${shareUrl}`, 'sharer');
  }

  shareOnTwitter(shareUrl: string) {
    shareUrl = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`, 'sharer');
  }

}
import { Component, OnInit } from '@angular/core';
import { ArtworkService } from 'src/shared/services/artwork.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  saveForLaterIcon: string = 'bi-heart';
  constructor(private artworkService: ArtworkService){}
  ngOnInit(): void{
    this.artworkService.savedForLaterItems$.subscribe((ids) => {
      if(ids.length > 0){
        this.saveForLaterIcon = 'bi-heart-fill';
      } else {
        this.saveForLaterIcon = 'bi-heart';
      }
    })
  }
}

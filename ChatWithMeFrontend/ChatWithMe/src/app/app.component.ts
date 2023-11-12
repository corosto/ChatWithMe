import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatchService } from '@components/home/services/match.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private matchService: MatchService,
  ) { }

  ngOnInit(): void {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        const currentWidth = position.coords.longitude;
        const currentHeight = position.coords.latitude;
        this.matchService.setUserLocation({ currentHeight, currentWidth });
      });
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ControllerService } from '@shared/services/controller.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private controllerService: ControllerService,
  ) { }

  ngOnInit(): void {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        const currentWidth = position.coords.longitude;
        const currentHeight = position.coords.latitude;
        this.controllerService.setUserLocation({ currentWidth, currentHeight });
      });
  }

}

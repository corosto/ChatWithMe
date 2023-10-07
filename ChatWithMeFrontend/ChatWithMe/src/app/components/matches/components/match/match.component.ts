import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { USER_MOCK } from './mock/mock';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'match',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchComponent {

  USER_MOCK = USER_MOCK;

  currentImage = 0;

  switchImage(side: number): void {
    this.currentImage = this.currentImage + side;
  }



  // calculateDistance(cityA: string, cityB: string) {
  //   const geocoder = new google.maps.Geocoder();

  //   geocoder.geocode({ address: cityA }, (resultsA, statusA) => {
  //     if (statusA === 'OK') {
  //       geocoder.geocode({ address: cityB }, (resultsB, statusB) => {
  //         if (statusB === 'OK') {
  //           const locationA = resultsA[0].geometry.location;
  //           const locationB = resultsB[0].geometry.location;

  //           const distance = google.maps.geometry.spherical.computeDistanceBetween(locationA, locationB);

  //           console.log(`Odległość między ${cityA} a ${cityB}: ${distance} metrów`);
  //         } else {
  //           console.error(`Błąd podczas geokodowania ${cityB}: ${statusB}`);
  //         }
  //       });
  //     } else {
  //       console.error(`Błąd podczas geokodowania ${cityA}: ${statusA}`);
  //     }
  //   });
  // }
}
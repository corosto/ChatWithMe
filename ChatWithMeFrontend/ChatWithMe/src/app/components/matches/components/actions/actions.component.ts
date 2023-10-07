import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output } from '@angular/core';
import { ACTIONS, action } from '@components/matches/components/actions/constants/actions.const';

@Component({
  selector: 'actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsComponent {
  @HostListener('window:keydown', ['$event']) onKeypress(event: KeyboardEvent) {
    if (window.innerWidth > 1000)
      switch (event.code) {
        case 'ArrowLeft':
          this.action.emit('left');
          break;
        case 'ArrowRight':
          this.action.emit('right');
          break;
        case 'ArrowUp':
          this.action.emit('up');
          break;
        case 'ArrowDown':
          this.action.emit('down');
          break;
        case 'Space':
          this.action.emit('space');
          break;
      }
  }

  @Output() action = new EventEmitter<action>;

  ACTIONS = ACTIONS;
}

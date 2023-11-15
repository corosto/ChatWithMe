import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output } from '@angular/core';
import { ACTIONS, action } from '@components/home/components/matches/components/keyboard-actions/constants/actions.const';
import { ControllerService } from '@shared/services/controller.service';

@Component({
  selector: 'keyboard-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyboard-actions.component.html',
  styleUrls: ['./keyboard-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyboardActionsComponent {

  constructor(
    private controllerService: ControllerService,
  ) { }

  @HostListener('window:keydown', ['$event']) onKeypress(event: KeyboardEvent) {
    if (window.innerWidth > 1000 && !!this.controllerService.getCurrentMatchIdRaw())
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
        case 'Enter':
          this.action.emit('enter');
          break;
        case 'Space':
          this.action.emit('space');
          break;
      }
  }

  @Output() action = new EventEmitter<action>;

  ACTIONS = ACTIONS;
}

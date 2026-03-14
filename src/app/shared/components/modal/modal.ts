import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
  readonly title = input('');
  readonly isOpen = input(false);
  readonly closed = output<void>();

  onClose(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }

  onBackdropKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.onClose();
    }
  }

  onBackdropKeypress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onClose();
    }
  }

  onBackdropKeyup(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onClose();
    }
  }
}

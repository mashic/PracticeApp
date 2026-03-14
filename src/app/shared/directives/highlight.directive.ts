import { Directive, ElementRef, HostListener, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  readonly appHighlight = input('yellow');
  readonly highlightTextColor = input('black');

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.setStyle(this.appHighlight(), this.highlightTextColor());
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.setStyle('', '');
  }

  private setStyle(bgColor: string, textColor: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', bgColor);
    this.renderer.setStyle(this.el.nativeElement, 'color', textColor);
  }
}

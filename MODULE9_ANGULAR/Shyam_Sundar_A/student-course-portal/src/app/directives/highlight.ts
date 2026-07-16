import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight {

  @Input()
  appHighlight = 'yellow';

  private originalBackground = '';

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) { }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.originalBackground = this.el.nativeElement.style.backgroundColor;
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.appHighlight);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.originalBackground);
  }
}

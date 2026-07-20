import { ElementRef, Renderer2 } from '@angular/core';

import { Highlight } from './highlight';

describe('Highlight', () => {
  let directive: Highlight;
  let element: HTMLElement;
  let renderer: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    element = document.createElement('div');
    renderer = jasmine.createSpyObj<Renderer2>('Renderer2', ['setStyle']);
    directive = new Highlight(new ElementRef(element), renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should default appHighlight to yellow', () => {
    expect(directive.appHighlight).toBe('yellow');
  });

  it('should apply the highlight color on mouseenter', () => {
    directive.onMouseEnter();

    expect(renderer.setStyle).toHaveBeenCalledWith(element, 'background-color', 'yellow');
  });

  it('should apply a custom highlight color on mouseenter when appHighlight is set', () => {
    directive.appHighlight = 'lightblue';

    directive.onMouseEnter();

    expect(renderer.setStyle).toHaveBeenCalledWith(element, 'background-color', 'lightblue');
  });

  it('should restore the original background on mouseleave', () => {
    element.style.backgroundColor = 'rgb(255, 255, 255)';

    directive.onMouseEnter();
    directive.onMouseLeave();

    expect(renderer.setStyle).toHaveBeenCalledWith(element, 'background-color', 'rgb(255, 255, 255)');
  });
});

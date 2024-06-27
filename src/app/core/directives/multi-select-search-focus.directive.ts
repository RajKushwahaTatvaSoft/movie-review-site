import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMultiSelectSearchFocus]',
})
export class MultiSelectSearchFocusDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('click', ['$event.target'])
  onClick(btn:any) {
    debugger;
    console.log('button', btn, 'number of clicks:');
    const input = this.elementRef.nativeElement.querySelector(
      '.filter-textbox > input'
    );
    if (input) {
      input.focus();
    }
  }
}

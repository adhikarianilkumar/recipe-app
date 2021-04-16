import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  // @HostListener('click') toggleOpen(){
  //   this.isOpen = !this.isOpen;
  // }

  // Below code snipet is to close the dropdown on clicking on anywhere in the page.
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}

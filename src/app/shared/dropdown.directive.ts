import { Directive, HostListener, HostBinding } from "@angular/core";

// directive decorator to define that this is a directive
@Directive({
    selector: '[appDropdown]'
})

// directive to toggle dropdown on and off
export class DropdownDirective {
    // bind property to class attribute of element
    @HostBinding('class.open') isOpen = false;

    // listen for click to run toggle function
    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    }
}
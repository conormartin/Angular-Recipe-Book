import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DropdownDirective } from "./dropdown.directive";

// store declarations used in more than one module in the shared module 
@NgModule({
    declarations: [
        DropdownDirective
    ],
    // need to export directives to make them accessable in other modules
    exports: [
        CommonModule,
        DropdownDirective
    ]
})

export class SharedModule {}
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardExtendedComponent, CardExtendedActions, CardExtendedCollapser, CardExtendedCustomSubTitle, CardExtendedCustomTitle, CardExtendedIcon, CardExtendedPanel, CardExtendedSubHeader, CardExtendedSubTitle, CardExtendedTitle } from './card-extended.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CardExtendedComponent, CardExtendedActions, CardExtendedCollapser, CardExtendedCustomSubTitle, CardExtendedCustomTitle, CardExtendedIcon, CardExtendedPanel, CardExtendedSubHeader, CardExtendedSubTitle, CardExtendedTitle],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [CardExtendedComponent, CardExtendedActions, CardExtendedCollapser, CardExtendedCustomSubTitle, CardExtendedCustomTitle, CardExtendedIcon, CardExtendedPanel, CardExtendedSubHeader, CardExtendedSubTitle, CardExtendedTitle]
})
export class CardExtendedModule { }

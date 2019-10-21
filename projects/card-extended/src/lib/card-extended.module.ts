import { NgModule } from '@angular/core';
import { CardExtendedComponent, CardExtendedActions, CardExtendedCollapser, CardExtendedCustomSubTitle, CardExtendedCustomTitle, CardExtendedIcon, CardExtendedPanel, CardExtendedSubHeader, CardExtendedSubTitle, CardExtendedTitle } from './card-extended.component';

@NgModule({
  declarations: [CardExtendedComponent, CardExtendedActions, CardExtendedCollapser, CardExtendedCustomSubTitle, CardExtendedCustomTitle, CardExtendedIcon, CardExtendedPanel, CardExtendedSubHeader, CardExtendedSubTitle, CardExtendedTitle],
  imports: [
  ],
  exports: [CardExtendedComponent, CardExtendedActions, CardExtendedCollapser, CardExtendedCustomSubTitle, CardExtendedCustomTitle, CardExtendedIcon, CardExtendedPanel, CardExtendedSubHeader, CardExtendedSubTitle, CardExtendedTitle]
})
export class CardExtendedModule { }

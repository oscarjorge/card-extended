import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, AfterContentInit, ContentChildren, ChangeDetectorRef, Renderer2, QueryList } from '@angular/core';

import { AnimationEvent } from '@angular/animations';

import { CardExtendedAnimations } from './card-extended.animations';

import { Subject } from 'rxjs';

import { distinctUntilChanged } from 'rxjs/operators';



export interface ICard {

  isOpen();

  hasChildren(): boolean;

  getChildren(): CardExtendedComponent[];

  toggleChild(idCard);

  toggleAllChildren();

  toggle();

  open();

  close();

}

export abstract class CardBaseComponent implements ICard {

  @Input('id') id: string;

  abstract isOpen();

  abstract hasChildren(): boolean;

  abstract getChildren(): CardExtendedComponent[];

  abstract toggleChild(idCard);

  abstract toggleAllChildren();

  abstract toggle();

  abstract open();

  abstract close();

}




@Component({

  selector: 'card-extended-title',

  templateUrl: 'card-extended-title.html',

  encapsulation: ViewEncapsulation.None,

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: { 'class': 'card-extended-title' }

})

export class CardExtendedTitle { }



@Component({

  selector: 'card-extended-subtitle',

  templateUrl: 'card-extended-subtitle.html',

  encapsulation: ViewEncapsulation.None,

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: { 'class': 'card-extended-subtitle' }

})

export class CardExtendedSubTitle { }



@Component({

  selector: 'card-extended-subheader',

  templateUrl: 'card-extended-subheader.html',

  encapsulation: ViewEncapsulation.None,

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: { 'class': 'card-extended-subheader' }

})

export class CardExtendedSubHeader { }



@Component({

  selector: 'card-extended-actions',

  templateUrl: 'card-extended-actions.html',

  encapsulation: ViewEncapsulation.None,

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: { 'class': 'card-extended-actions' }

})

export class CardExtendedActions { }



@Component({

  selector: 'card-extended-icon',

  templateUrl: 'card-extended-icon.html',

  encapsulation: ViewEncapsulation.None,

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: { 'class': 'card-extended-icon' }

})

export class CardExtendedIcon { }



@Component({

  selector: 'card-extended-custom-title',

  templateUrl: 'card-extended-custom-title.html',

  encapsulation: ViewEncapsulation.None,

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: { 'class': 'card-extended-custom-title' }

})

export class CardExtendedCustomTitle { }



@Component({

  selector: 'card-extended-custom-subtitle',

  templateUrl: 'card-extended-custom-subtitle.html',

  encapsulation: ViewEncapsulation.None,

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: { 'class': 'card-extended-custom-subtitle' }

})

export class CardExtendedCustomSubTitle { }



@Component({

  selector: 'card-extended-panel',

  templateUrl: 'card-extended-panel.html',

  encapsulation: ViewEncapsulation.None,

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: { 'class': 'card-extended-panel' },

  inputs: ['disabled', 'expanded'],



})

export class CardExtendedPanel {

  expanded: boolean;

  constructor() { }



}



@Component({

  selector: 'card-extended-collapser',

  templateUrl: 'card-extended-collapser.html',

  encapsulation: ViewEncapsulation.None,

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: { 'class': 'card-extended-collapser' },

  animations: [CardExtendedAnimations.indicatorRotate]

})

export class CardExtendedCollapser {

  @Input('expandable') expandable: boolean;

  @Input('wait-expand') waitExpand: boolean;

  @Input('expansion-async') expansionAsync: boolean = true;

  @Input() expanded: boolean;

  @Output() onClickRotator = new EventEmitter();



  constructor() { }

  clickRotator() {

    this.onClickRotator.emit();

  }



  getState = (expanded) => expanded ? 'expanded' : 'collapsed';

  public _getExpandedState(): string {

    return this.getState(this.expanded);

  }

  public toggle() {

    this.expanded = !this.expanded;

  }

  public isOpen() {

    return this.expanded;

  }

}



@Component({

  selector: 'card-extended',

  templateUrl: './card-extended.component.html',

  styleUrls: ['./card-extended.component.less'],

  encapsulation: ViewEncapsulation.None,

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {

    'class': 'card-extended'

  },

  animations: [CardExtendedAnimations.bodyExpansion, CardExtendedAnimations.expansionHeaderHeight, CardExtendedAnimations.indicatorRotate, CardExtendedAnimations.disabledIconState],

})

export class CardExtendedComponent extends CardBaseComponent implements AfterContentInit {

  @ContentChildren(CardExtendedComponent, { descendants: true }) panels: QueryList<CardExtendedComponent>;

  public childrenCards: CardExtendedComponent[];

  //https://stackoverflow.com/questions/56359504/how-should-i-use-the-new-static-option-for-viewchild-in-angular-8

  //A este componente no le puede afectar ninguna directiva tipo ngIf porque fallará.

  @ViewChild(CardExtendedCollapser, { static: true }) _lazyContent: CardExtendedCollapser;



  @Output() onClosed = new EventEmitter<string>();

  @Output() onOpened = new EventEmitter<string>();

  @Output() onWaitExpand = new EventEmitter<string>();



  @Input('expandable-header') expandableHeader: boolean = false;

  @Input('expandable') expandable: boolean = true;

  @Input() expanded: boolean = true;

  @Input('expansion-async') expansionAsync: boolean = false;

  expandedAll: boolean = false;

  waitExpand: boolean = false;

  bodyExpansionDoneEvent = new Subject<AnimationEvent>();

  constructor(private cd: ChangeDetectorRef, private renderer: Renderer2) {

    super();

    // We need a Subject with distinctUntilChanged, because the `done` event

    // fires twice on some browsers. See https://github.com/angular/angular/issues/24084

    this.bodyExpansionDoneEvent.pipe(distinctUntilChanged((x, y) => {

      return x.fromState === y.fromState && x.toState === y.toState;

    })).subscribe(event => {

        if(event.toState=="expanded" && (event.fromState=="collapsed" || event.fromState=="void")){

          this.renderer.removeStyle(event.element,'overflow');

          this.renderer.setStyle(event.element,'overflow-x', 'auto');

          this.renderer.setStyle(event.element,'overflow-y', 'visible');

          this.onOpened.emit(this.id);

        }

        if(event.toState=="collapsed" && (event.fromState=="expanded" || event.fromState=="void")){

          this.onClosed.emit(this.id);

        }

    });

  }



  _getExpandedState(): string {

    return this._lazyContent.getState(this._lazyContent.expanded);

  }



  ngAfterContentInit() {

    if (this.panels)

      if (this.panels.length > 1) {

        this.childrenCards = this.panels.filter(a => a.id != this.id);

      }

  }

  onClickHeader() {

    if (this.expandableHeader && !this.expandable)

      this.toggle();

  }

  public _getExpandedStateAll(): string {

    return this._lazyContent.getState(!this.expandedAll);

  }

  clickRotatorChildren() {

    this.toggleAllChildren();

  }

  public isOpen() {

    return (this._lazyContent) ? this._lazyContent.expanded : this.expanded;

  }

  public hasChildren(): boolean {

    return this.panels.length > 1;

  }

  public getChildren(): CardExtendedComponent[] {

    if (this.hasChildren())

      return this.panels.filter(a => a.id != this.id);

  }

  public toggleChild(idCard) {

    if (this.isToggeable()) {

      if (this.hasChildren()) {

        let card = this.getChildren().find(c => c.id == idCard);

        if (card)

          card.toggle();

      }

    }

    else

      console.warn('El card no togglea porque está deshabilitado');



  }

  public toggleAllChildren() {

    if (this.isToggeable()) {

      if (this.hasChildren()) {

        this.getChildren().forEach(card =>

          (this.expandedAll) ? card.close() : card.open()

        );

        this.expandedAll = !this.expandedAll;

        this.cd.detectChanges();

      }

    }

    else

      console.warn('El card no togglea porque está deshabilitado');



  }

  public toggle() {

    if (this.isToggeable()) {



      if (!this.expansionAsync || this.isOpen())

        (this._lazyContent.isOpen()) ? this.close() : this.open();

      else {

        if (!this.waitExpand) {

          this.waitExpand = true;

          this.onWaitExpand.emit(this.id);

        }

        else {

          this._lazyContent.toggle();

          this.waitExpand = false;

          this.cd.detectChanges();

        }



      }

    }

    else

      console.warn('El card no togglea porque está deshabilitado');

  }

  public open() {

    if (this.isToggeable()) {

      this._lazyContent.expanded = true;

      this.waitExpand = false;

      this.cd.detectChanges();

    }

    else

      console.warn('El card no se abre porque está deshabilitado');

  }

  public close() {

    if (this.isToggeable()) {

      this._lazyContent.expanded = false;

      this.cd.detectChanges();

    }

    else

      console.warn('El card no se cierra porque está deshabilitado');

  }

  public setExpandable(expandable: boolean): CardExtendedComponent{

    this.expandable = expandable;

    return this;

  }

  private waitExpandRotator() {

    this.onWaitExpand.emit();

  }

  private waitEndedExpandRotator() {



  }

  private isToggeable(): boolean {

    return this.expandable;

  }



  bodyExpansionStartedEvent(event: AnimationEvent){

    if(event.toState=="collapsed" && event.fromState=="expanded" || event.fromState=="void"){

      this.renderer.removeStyle(event.element,'overflow');

      this.renderer.setStyle(event.element,'overflow-x', 'hidden');

      this.renderer.setStyle(event.element,'overflow-y', 'hidden');

    }

  }

}






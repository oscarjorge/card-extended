import {

  animate,

  animateChild,

  group,

  state,

  style,

  transition,

  trigger,

  query,

  AnimationTriggerMetadata,

} from '@angular/animations';



/** Time and timing curve for expansion panel animations. */

export const EXPANSION_PANEL_ANIMATION_TIMING = '325ms cubic-bezier(0.4,0.0,0.2,1)';



export const CardExtendedAnimations: {

  readonly indicatorRotate: AnimationTriggerMetadata;

  readonly expansionHeaderHeight: AnimationTriggerMetadata;

  readonly bodyExpansion: AnimationTriggerMetadata;

  readonly disabledIconState: AnimationTriggerMetadata;

} = {

  /** Animation that rotates the indicator arrow. */

  indicatorRotate: trigger('indicatorRotate', [

    state('collapsed, void', style({transform: 'rotate(0deg)'})),

    state('expanded', style({transform: 'rotate(180deg)'})),

    transition('expanded <=> collapsed, void => collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING)

      // query('.mat-icon', animate(EXPANSION_PANEL_ANIMATION_TIMING), { optional: true })

    )

  ]),



  /** Animation that expands and collapses the panel header height. */

  expansionHeaderHeight: trigger('expansionHeight', [

    state('collapsed, void', style({

      height: '{{collapsedHeight}}',

    }), {

      params: {collapsedHeight: '48px'},

    }),

    state('expanded', style({

      height: '{{expandedHeight}}'

    }), {

      params: {expandedHeight: '64px'}

    }),

    transition('expanded <=> collapsed, void => collapsed', group([

      query('@indicatorRotate', animateChild(), {optional: true}),

      animate(EXPANSION_PANEL_ANIMATION_TIMING),

    ])),

  ]),



  /** Animation that expands and collapses the panel content. */

  bodyExpansion: trigger('bodyExpansion', [

    state('collapsed, void', style({height: '0px', visibility: 'hidden', opacity:0})),

    state('expanded', style({height: '*', visibility: 'visible', opacity:1})),

    transition('expanded <=> collapsed, void => collapsed',

      animate(EXPANSION_PANEL_ANIMATION_TIMING)),

  ]),

  disabledIconState: trigger('disabledIconState', [

    state('collapsed, void', style({ color: '#c8c1bc' })),

    state('expanded', style({ color: '#00508F'} )),

    transition('expanded <=> collapsed, void => collapsed',

      animate(EXPANSION_PANEL_ANIMATION_TIMING)),

  ])



};

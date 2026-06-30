
import $ from 'jquery';

import tooltips from '../modules/tooltips';


beforeEach(() => {
  // TODO: Re-use 6-components/templates/
  document.body.innerHTML = '<a href="#" class="button" data-tooltip>Hover over to see a tooltip</a>';
});


test( 'Automatically initialises a single tooltip on a single existing element with `data-tooltip` attribute.', () => {
  tooltips.initTooltips();
  expect( $( '.button' ).text()).toEqual( 'Hover over to see a tooltip' );
});

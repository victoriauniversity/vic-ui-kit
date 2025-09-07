import enquire from 'enquire.js';



/* Tab state */
let tabState = window.sessionStorage.tabState;
// console.log( 'tabstate== ', tabState );

// Only execute if tabs exist
if ( document.querySelectorAll( '#search-tab-js' ).length > 0 ) {


  const defaultActive = $( '.p-search__tabs .active a, .p-search__tabs .active button' ).data( 'tab' );
  const tabs = $( '.p-search__tab > a, .p-search__tab > button' );


  // console.log( defaultActive );

  const $resultSections = $( '.search-results' );

  // console.log( $resultSections );

  // Initialize ARIA attributes
  $( '.p-search__tabs' ).attr({
    'role':       'tablist',
    'aria-label': 'Search categories'
  });

  // Set up each tab with proper ARIA attributes
  tabs.each(( index, tab ) => {
    const $tab = $( tab );
    const tabId = `tab-${index}`;
    const panelId = `panel-${index}`;
    const $panel = $( `.search-results[data-content="${$tab.data( 'tab' )}"]` );
    const isActive = $tab.parent().hasClass( 'active' );

    $tab.attr({
      'role':          'tab',
      'id':            tabId,
      'aria-selected': isActive ? 'true' : 'false',
      'aria-controls': panelId,
      'tabindex':      isActive ? '0' : '-1'
    });

    $panel.attr({
      'role':            'tabpanel',
      'id':              panelId,
      'aria-labelledby': tabId,
      'tabindex':        '0'
    });
  });

  /* Sets default vault based on default active tab */
  $resultSections.each(( index, section ) => {
    // element == this
    const $section = $( section );
    const sectionData = $section.data( 'content' );
    // console.log( $section.data('content' ));

    // eslint-disable-next-line eqeqeq
    if ( sectionData == defaultActive ) {
      // console.log( 'match ' + sectionData, defaultActive );
      $section.addClass( 'search-active' );
      $section.attr( 'aria-hidden', 'false' );
    } else {
      $section.addClass( 'search-inactive' );
      $section.attr( 'aria-hidden', 'true' );
    }

  });

  /* Tab click and keyboard navigation */
  tabs.each(( _index, tab ) => {
    // element == this
    const $tab = $( tab );
    const isButton = $tab.is( 'button' );
    const tabContent = $tab.data( 'tab' );
    const $resultsContainer = $( `.search-results[data-content="${tabContent}"]` );

    $tab.on( 'click keydown', ( e ) => {
      // Handle keyboard navigation
      if ( e.type === 'keydown' ) {
        const key = e.key;

        // For links: handle both Enter/Space and arrow keys
        // For buttons: only handle arrow keys (Enter/Space handled automatically)
        if ( !isButton && ( key !== 'Enter' && key !== ' ' ) ) {
          if ( key === 'ArrowRight' || key === 'ArrowLeft' ) {
            e.preventDefault();
            const currentIndex = tabs.index( $tab );
            const nextIndex = key === 'ArrowRight' ? currentIndex + 1 : currentIndex - 1;
            const $nextTab = tabs.eq( nextIndex >= tabs.length ? 0 : nextIndex < 0 ? tabs.length - 1 : nextIndex );
            $nextTab.focus().trigger( 'click' );
          }
          return;
        } else if ( isButton && key !== 'ArrowRight' && key !== 'ArrowLeft' ) {
          // Let the button handle its own Enter/Space events
          return;
        }

        // Handle arrow navigation for buttons
        if ( isButton && ( key === 'ArrowRight' || key === 'ArrowLeft' ) ) {
          e.preventDefault();
          const currentIndex = tabs.index( $tab );
          const nextIndex = key === 'ArrowRight' ? currentIndex + 1 : currentIndex - 1;
          const $nextTab = tabs.eq( nextIndex >= tabs.length ? 0 : nextIndex < 0 ? tabs.length - 1 : nextIndex );
          $nextTab.focus().trigger( 'click' );
          return;
        }
      }

      // enrich search tabs, make them update input to maintain correct tab location
      let tabQuery = $tab.text().replace( /\([^)]*\)\s*/g, '' ).toLowerCase().trim();
      // console.log(tabQuery);

      if ( tabQuery === 'website' ) {
        tabQuery = 'web';
      }

      $( '#search-form input[name="tab"]' ).remove();
      $( '#search-form' ).append( `<input type="hidden" name="tab" value="${tabQuery}">` );

      if ( !$tab.parent().hasClass( 'active' )) {
        // Update ARIA attributes for all tabs
        tabs.each(( _, t ) => {
          const $t = $( t );
          $t.attr({
            'aria-selected': 'false',
            'tabindex': '-1'
          })
          .removeClass('active');
        });

        // Update ARIA attributes for current tab
        $tab.attr({
          'aria-selected': 'true',
          'tabindex': '0'
        })
        .addClass('active');

        // Update ARIA attributes for panels
        $resultSections.each(( _, panel ) => {
          const $panel = $( panel );
          $panel.attr( 'aria-hidden', 'true' );
        });
        $resultsContainer.attr( 'aria-hidden', 'false' );

        // Update visual state
        tabs.parents().removeClass( 'active' );
        $tab.parent().addClass( 'active' );
        $resultSections.removeClass( 'search-active' ).addClass( 'search-inactive' );
        $resultsContainer.toggleClass( 'search-active' ).toggleClass( 'search-inactive' );

        /* Set active tab state */
        tabState = $tab.data( 'tab' );
        window.sessionStorage.setItem( 'tabState', tabState );

        // console.log( tabState );
        // console.log( 'sessionStorage state == ', window.sessionStorage.tabState );

      } else {
        // is active tab

      }

    });


  });

  /* Get secondary tab data values hide if not relevant results -- fixes pgination issue in squiz */
  $( '.tab-secondary' ).each(( _indexInArray, sectab ) => {
    const $sectab = $( sectab );
    const  fullyMatching = parseInt( $sectab.data( 'matching' ), 10 );
    const  currStart = $sectab.data( 'currstart' );

    //disable click if not results
    if ( fullyMatching === 0 ) {
      // $sectab.find( 'a' ).off('click');
      // $sectab.addClass( 'disabled-tab' );
    }
  });

  //ie11 urlsearchparam polyfill
  ( function ( w ) {
    w.URLSearchParams =
      w.URLSearchParams ||
      function ( searchString ) {
        let self = this;
        self.searchString = searchString;
        self.get = function ( name ) {
          let results = new RegExp( '[?&]' + name + '=([^&#]*)' ).exec(
            self.searchString
          );
          if ( results == null ) {
            return null;
          } else {
            return decodeURI( results[1]) || 0;
          }
        };
      };
  })( window );


  // Set tab from query param
  let queryParam = new URLSearchParams( document.location.search ).get( "tab" );

  // console.log("query param", queryParam);

  switch ( queryParam ) {
    case 'web':
      window.sessionStorage.setItem( 'tabState', 'vuw-web' );
      tabState = window.sessionStorage.tabState;
      break;
    case 'courses':
      window.sessionStorage.setItem( 'tabState', 'sqc-all-courses' );
      tabState = window.sessionStorage.tabState;
      break;
    case 'subjects':
      window.sessionStorage.setItem( 'tabState', 'wgtn-meta-study-areas' );
      tabState = window.sessionStorage.tabState;
      break;
    case 'people':
      window.sessionStorage.setItem( 'tabState', 'vic-push-staff-prod' );
      tabState = window.sessionStorage.tabState;
      break;
    case 'intranet':
      window.sessionStorage.setItem( 'tabState', 'intranet' );
      tabState = window.sessionStorage.tabState;
      break;
    case 'qualifications':
      window.sessionStorage.setItem( 'tabState', 'wgtn-meta-qualifications' );
      tabState = window.sessionStorage.tabState;
      break;
    case 'courses-new':
      window.sessionStorage.setItem( 'tabState', 'sqc-all-courses-test' );
      tabState = window.sessionStorage.tabState;
      break;

    default:
      break;
  }

    // change state based on session storage tab state
    if ( window.sessionStorage.tabState && queryParam ) {
      // console.log('tabstate exists in local storage');

    // get tabs
    tabs.each(( index, tab ) => {

      // console.log(tab);

      const $tab = $( tab );
      const tabData = $( tab ).data( 'tab' );

      // match against sessionStorage
      if ( tabData === tabState ) {
        // console.log( 'tab should be set to --- ', tabState );
        // set content state

        $( `.p-search__tab [data-tab="${tabState}"]` ).trigger( 'click' );

      } else {
        // console.warn('No tab found');
      }

    });
  }

  /* Filter toggle on mobile */
  const TABLET_AND_SMALLER = 'screen and (max-width: 975px)';
  let isTabletAndBelow = false;

  enquire.register( TABLET_AND_SMALLER, () => {
    isTabletAndBelow = true;
  });

  // console.log( isTabletAndBelow );

  if ( isTabletAndBelow ) {
    $( '.filter-results-title' ).on( 'click', ( e ) => {
      const $this = $( e );
      // console.log( $this );
      // Change caret
      $( '.filter-results-title span' ).toggleClass( 'icon-caret-down' ).toggleClass( 'icon-caret-right' );
      // show filters
      $( '.p-search-filter-group' ).toggle( 'medium', () => {

      });
    });
  }

  //hide long tabs

  $( ".search-facets .toggle" ).each(( i, el ) => {

    let $el = $( el );
    let $totalTags = $( el ).next().children().length;

    // console.log( ` ${$el.text()} ${ $totalTags }` );
    //sets filter state from filter totals
    if ( $totalTags === 0 ) {
      $el.hide();
    } else if ( $totalTags >= 6 ) {
      $el.append( '<span class="icon-caret-right"></span>' );
      $el.next().toggle();
    } else if ( $totalTags < 6 ) {
      $el.append( '<span class="icon-caret-down"></span>' );
    }


    $( el ).on( 'click' , () => {

      $( el ).next().toggle();

      //toggle caret
      $( el ).find( 'span' ).toggleClass(() => $( el ).find( 'span' ).is( '.icon-caret-right' ) ? 'icon-caret-down icon-caret-right': 'icon-caret-right icon-caret-down' );

    });

  });


}


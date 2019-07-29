import enquire from 'enquire.js'

$( () => {

  /* Tab state */
  let tabState = window.sessionStorage.tabState;
  // console.log( 'tabstate== ', tabState );

  // Only execute if tabs exist
  if ( document.querySelectorAll( '#search-tab-js' ).length > 0 ) {

    /* Get secondary tab data values hide if not relevant results -- fixes pgination issue in squiz */
    $('.tab-secondary').each((_indexInArray, sectab ) => {
      const $sectab = $( sectab );
      const  fullyMatching = $sectab.data('matching');
      const  currStart = $sectab.data('currstart');

      if ( fullyMatching === 0 ) {
        $sectab.find( 'a' ).click( 'false' );
      }

    });


    const defaultActive = $( '.p-search__tabs .active a' ).data( 'tab' );
    const tabs = $( '.p-search__tab a' );

    // console.log( defaultActive );

    const $resultSections = $( '.search-results' );

    // console.log( $resultSections );

    /* Sets default vault based on default active tab */
    $resultSections.each( ( index, section ) => {
      // element == this
      const $section = $( section );
      const sectionData = $section.data( 'content' );
      // console.log( $section.data('content' ));

      // eslint-disable-next-line eqeqeq
      if ( sectionData == defaultActive ) {
        // console.log( 'match ' + sectionData, defaultActive );
        $section.addClass( 'search-active' );
      } else {
        $section.addClass( 'search-inactive' );
      }

    } );

    /* Tab click */
    tabs.each( ( _index, tab ) => {
      // element == this
      const $tab = $( tab );

      $tab.on( 'click', () => {

        // console.log( $tab );
        if ( !$tab.parent().hasClass( 'active' ) ) {
          // not active tab add class and remove from current
          tabs.parents().removeClass( 'active' );
          $tab.parent().addClass( 'active' );

          // set matching content to show
          // console.log( $tab.data( 'tab' ));

          // Match tab with content
          const tabContent = $tab.data( 'tab' );
          const $resultsContainer = $( `.search-results[data-content="${tabContent}"]` );

          // console.log( $resultsContainer );
          // Toggle active state
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

      } );


    } );


    // change state based on session storage tab state
    if ( window.sessionStorage.tabState ) {
      // console.log('tabstate exists in local storage');
      const tabStorage = window.sessionStorage.tabState;

      // get tabs
      tabs.each(( index, tab ) => {

        const $tab = $( tab );
        const tabData = $(tab ).data( 'tab' );

        // match against sessionStorage
        if ( tabData === tabState ) {
          // console.log( 'tab should be set to --- ', tabState );
          // set content state

          $( `.p-search__tab a[data-tab="${tabState}"]` ).trigger( 'click' );

        }

      });
    }

    /* Filter toggle on mobile */
    const TABLET_AND_SMALLER = 'screen and (max-width: 975px)';
    let isTabletAndBelow = false;

    enquire.register( TABLET_AND_SMALLER, () => {
      isTabletAndBelow = true;
    } );

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

  }
});

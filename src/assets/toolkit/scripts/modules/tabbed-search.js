import enquire from 'enquire.js'

$( () => {
  // Only execute if tabs exist
  if ( document.querySelectorAll( '#search-tab-js' ).length > 0 ) {

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


    //  tab click

    //  not active change status set results set to show


    // console.log( 'tabs == ', tabs );

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

        } else {
          // is active tab

        }

      } );


    } );

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
} );

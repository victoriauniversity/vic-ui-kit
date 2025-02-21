import enquire from 'enquire.js'



/* Tab state */
let tabState = window.sessionStorage.tabState;
// console.log( 'tabstate== ', tabState );

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

  /* Tab click */
  tabs.each( ( _index, tab ) => {
    // element == this
    const $tab = $( tab );

    $tab.on( 'click', () => {

      // enrich search tabs, make them update input to maintain correct tab location
      let tabQuery = $tab.text().replace(/\([^)]*\)\s*/g, '').toLowerCase().trim();
      // console.log(tabQuery);

      if (tabQuery === 'website') {
        tabQuery = 'web';
      }

      $('#search-form input[name="tab"]').remove();
      $('#search-form').append(`<input type="hidden" name="tab" value="${tabQuery}">`);

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

  /* Get secondary tab data values hide if not relevant results -- fixes pgination issue in squiz */
  $('.tab-secondary').each((_indexInArray, sectab ) => {
    const $sectab = $( sectab );
    const  fullyMatching = parseInt( $sectab.data('matching'), 10 );
    const  currStart = $sectab.data('currstart');

    //disable click if not results
    if ( fullyMatching === 0 ) {
      $sectab.find( 'a' ).off('click');
      $sectab.addClass( 'disabled-tab' );
    }
  });

  //ie11 urlsearchparam polyfill
  (function (w) {
    w.URLSearchParams =
      w.URLSearchParams ||
      function (searchString) {
        var self = this
        self.searchString = searchString
        self.get = function (name) {
          var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(
            self.searchString
          )
          if (results == null) {
            return null
          } else {
            return decodeURI(results[1]) || 0
          }
        }
      }
  })(window)


  // Set tab from query param
  let queryParam = new URLSearchParams(document.location.search).get("tab")

  // console.log("query param", queryParam);

  switch (queryParam) {
    case 'web':
      window.sessionStorage.setItem( 'tabState', 'vuw-web' );
      tabState = window.sessionStorage.tabState;
      break;
    case 'courses':
      window.sessionStorage.setItem( 'tabState', 'wgtn_courses' );
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
      window.sessionStorage.setItem( 'tabState', 'sqc-all-courses' );
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

      const $tab = $( tab );
      const tabData = $(tab ).data( 'tab' );

      // match against sessionStorage
      if ( tabData === tabState ) {
        // console.log( 'tab should be set to --- ', tabState );
        // set content state

        $( `.p-search__tab a[data-tab="${tabState}"]` ).trigger( 'click' );

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

  //hide long tabs

  $(".search-facets .toggle").each( (i, el) => {

    let $el = $(el);
    let $totalTags = $(el).next().children().length;

    // console.log( ` ${$el.text()} ${ $totalTags }` );
    //sets filter state from filter totals
    if ( $totalTags === 0 ) {
      $el.hide();
    } else if ( $totalTags >= 6 ) {
      $el.append('<span class="icon-caret-right"></span>');
      $el.next().toggle();
    } else if ( $totalTags < 6 ) {
      $el.append('<span class="icon-caret-down"></span>');
    }


    $(el).on('click' , () => {

      $(el).next().toggle();

      //toggle caret
      $(el).find('span').toggleClass(() => $(el).find('span').is('.icon-caret-right') ? 'icon-caret-down icon-caret-right': 'icon-caret-right icon-caret-down' );

    })

  })


}


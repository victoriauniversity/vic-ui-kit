import enquire from 'enquire.js';

const TABLET_AND_SMALLER = 'screen and (max-width: 975px)',
      DESKTOP_AND_LARGER = 'screen and (min-width: 61em)';
// eslint-disable-next-line import/prefer-default-export
export function initTray() {

  // console.log( 'tray...', $( '.tray-toggle' ));

  function toggleTray() {
    $( '.tray' ).toggleClass( 'tray-closed', 'normal' );
    $( '.tray' ).toggleClass( 'tray-open', 'normal' );

    $( 'body' ).toggleClass( 'noscroll' );
  }

  $( '.tray-toggle' ).click(( e ) => {
    toggleTray();
    // return false;
    e.preventDefault();

  });

  $( '.expanded-draw' ).click(( e ) => {
    e.preventDefault();
    toggleTray();
  });
  $( '.tray-close' ).click(( e ) => {
    e.preventDefault();
    toggleTray();
  });

  $( '.search-toggle' ).click(( e ) => {
    e.preventDefault();
    toggleTray();
    setTimeout(() => {
      $('.tray .search-input').focus();
    }, 500);
  });

  $( 'body' ).on( 'click', ( e ) => {

    // console.log( e.target.className, 'clicked' );
    if ( e.target.className.includes( 'tray-open' )) {
      e.preventDefault();
      toggleTray();
    }

  });

  // $('.search-button-inside form').on('focus', (e) => {
  //   $( this ).toggleClass('focus')
  //   console.log( $(this) );

  // })

  // sidemenu tray

  const SIDEMENU_TOGGLE_CLASS   = 'sidemenu-toggle';
  const SIDEMENU_EXPANDER_CLASS = 'btn-expander';
  const SIDEMENU_SUBMENU_CLASS  = 'has-submenu';

  const SIDEMENU_SELECTED_ITEM_CLASS = 'active';
  const SIDEMENU_EXPANDED_CLASS      = 'expanded';

  function buildTray(index, item) {
    // console.log(index);

    // console.log( 'nav item', $(this).parent().children('a').text() );
    const nav = $(this);

    let navClassString = $(this).parent().children('a').text();
    let titleLink = $(this).parent().children('a').attr('href');
    // console.log(titleLink);

    //push into traw div
    nav.clone().appendTo('.draw-nav').addClass( navClassString ).attr("data-index",index);
    //add title
    $( `.draw-nav ul[data-index='${index}']` ).prepend(`<h4 class="sub-draw-title"><a href="${titleLink}">${navClassString}</a></h4>`);
  }

  let sidemeneuExpanded = false;
  const $draw = $('.sidemenu-drawer');

  function expandTray(index, button) {

    $( button ).on( 'click', () => {

      //toggle sidemenu draw and content

      if( $(button).parent().hasClass('expanded-draw') ) {

        // console.log('has class button close tray');
        sidemeneuExpanded = !sidemeneuExpanded;
        $draw.toggleClass('active');
        $(button).parent().removeClass('expanded-draw');

      } else {

        //show tray
        if (sidemeneuExpanded === false) {
          $draw.addClass('active');
          sidemeneuExpanded = !sidemeneuExpanded;
        }

        $( '.sidemenu-homepage > ul > li').removeClass('expanded-draw');

        $(button).parent().addClass('expanded-draw');
      }

      // console.log(index, button);
      let matchingNavGroup = $(`.draw-nav ul[data-index='${index}']`);
      $('.draw-nav > ul').removeClass('active-nav-group');
      matchingNavGroup.toggleClass('active-nav-group');

    });

  }

  function expandDrawSubContent() {
    // console.log('expand expandDrawSubContent');
    let subDrawExpander = $('.sidemenu-drawer .draw-nav ul ').find('.btn-expander');
    // console.log(subDrawExpander);

    subDrawExpander.each( (i, button) => {

      let $button = $(button);

      $button.on('click', () => {
        console.log($button);
        $button.parent('li').toggleClass('expanded');

      });
    });

  }

  function closeSideMenuDraw() {
    $('.close-draw').on( 'click', ()=> {
      if(sidemeneuExpanded) {
        sidemeneuExpanded = !sidemeneuExpanded;
        $( '.sidemenu-homepage .expanded-draw' ).removeClass( 'expanded-draw' );
        $draw.toggleClass('active');
      }
    });

    $( 'body' ).on( 'click', ( e ) => {
      console.log(e.target);

      let sidemenu = $('.sidemenu-homepage');
      // let  megamenu = $('.sidemenu-drawer');
      if (!sidemenu.is(e.target) // if the target of the click isn't the container...
      && sidemenu.has(e.target).length === 0) // ... nor a descendant of the container
        {
          sidemeneuExpanded = !sidemeneuExpanded;
          $( '.sidemenu-homepage .expanded-draw' ).removeClass( 'expanded-draw' );
          $draw.toggleClass('active');
        }


      // console.log( e.target.className, 'clicked' );
      // if ( e.target.className.includes( 'tray-open' )) {
      //   e.preventDefault();
      //   toggleTray();
      // }
      // if(sidemeneuExpanded) {
      //   console.log('sidemenu is expanded');
      //   // sidemeneuExpanded = !sidemeneuExpanded;
      //   // $( '.sidemenu-homepage .expanded-draw' ).removeClass( 'expanded-draw' );
      //   // $draw.toggleClass('active');
      // } else {
      //   console.log('draw not expanded');
      // }

    });


  }

  function sidemenuTray() {
    const menu = $('.sidemenu-homepage');
    // console.log(menu);

    //build tray nav content
    const trayNavItems = $( '.sidemenu-homepage > ul > li > ul' );

    const buttonExpander = $('.sidemenu-homepage > ul > li > .btn-expander');

    // console.log(trayNavItems);

    buttonExpander.each( expandTray );

    trayNavItems.each( buildTray );

    expandDrawSubContent();

    closeSideMenuDraw();

  }

  if ($('.sidemenu-homepage').length  ) {
    // console.log('sidemeny homepage init');

    // enquire.register( TABLET_AND_SMALLER, () => {
    //   console.log('tray is small size for mob');
    //   initSidemenuExpandability( sidemenu-homepage );
    // });

    enquire.register( DESKTOP_AND_LARGER, () => {
      // console.log('Tray is large size cool ');
      sidemenuTray();

    });

  }

}


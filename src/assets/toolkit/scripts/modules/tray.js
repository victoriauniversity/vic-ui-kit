

// eslint-disable-next-line import/prefer-default-export
export function initTray() {

  console.log( 'tray...', $( '.tray-toggle' ));

  function toggleTray() {
    $( '.tray' ).toggleClass( 'tray-closed', 'normal' );
    $( '.tray' ).toggleClass( 'tray-open', 'normal' );

    $( 'body' ).toggleClass( 'noscroll' );
  }

  $( '.tray-toggle' ).click(( e ) => {
    toggleTray();
    // return false;
    e.preventDefault();
    console.log( 'clicked try toggle' );

  });

  $( '.close-tray' ).click(( e ) => {
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




}





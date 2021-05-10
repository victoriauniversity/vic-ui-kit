// Public API interface


function init() {
  console.log( 'is this working?' );
  let menuItems = $('.horizontal-menu .has-submenu')
  let menuItemsWithSub = $('.horizontal-menu .has-submenu')

  // menuItemsWithSub.on('click', (e)=>{
  //   e.preventDefault();
  //   console.log(e);
  //   e.
  // } )



  function buildSubNav() {

  }


    // // Expanding/Collapsing of the entire side menu on mobile devices
    // menuElement.children( `.${SIDEMENU_TOGGLE_CLASS}` ).children( 'a' ).on( 'click', function ( e ) {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   $( this ).parent().toggleClass( SIDEMENU_EXPANDED_CLASS );
    // });



}

const horizontalNav = {
  init: init,
};

export default horizontalNav;

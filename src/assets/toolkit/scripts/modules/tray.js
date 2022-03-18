/* eslint-disable func-names */
import enquire from "enquire.js";

const TABLET_AND_SMALLER = "screen and (max-width: 975px)",
  DESKTOP_AND_LARGER = "screen and (min-width: 61em)";
// eslint-disable-next-line import/prefer-default-export
export function initTray() {
  // console.log( 'tray...', $( '.tray-toggle' ));

  // tray functionality
  function toggleTray() {
    $(".tray").toggleClass("tray-closed", "normal");
    $(".tray").toggleClass("tray-open", "normal");

    $("body").toggleClass("noscroll");
  }

  $(".tray-toggle").click((e) => {
    toggleTray();
    // return false;
    e.preventDefault();
  });

  $(".expanded-draw").click((e) => {
    e.preventDefault();
    toggleTray();
  });
  $(".tray-close").click((e) => {
    e.preventDefault();
    toggleTray();
  });

  $(".search-toggle").click((e) => {
    e.preventDefault();
    toggleTray();
    setTimeout(() => {
      $(".tray .search-input").focus();
    }, 500);
  });

  $("body").on("click keyup", (e) => {
    // Close tray if clicked away from or escpae buttons

    // console.log( e.target.className, 'clicked' );
    if (
      e.target.className.includes("tray-open") ||
      (e.key == "Escape" && $(".tray-open").length)
    ) {
      e.preventDefault();
      toggleTray();
    }
  });

  // $('.search-button-inside form').on('focus', (e) => {
  //   $( this ).toggleClass('focus')
  //   console.log( $(this) );

  // })

  // ****************************************
  // ****************************************
  // sidemenu tray

  // const SIDEMENU_TOGGLE_CLASS   = 'sidemenu-toggle';
  // const SIDEMENU_EXPANDER_CLASS = 'btn-expander';
  // const SIDEMENU_SUBMENU_CLASS  = 'has-submenu';

  // const SIDEMENU_SELECTED_ITEM_CLASS = 'active';
  // const SIDEMENU_EXPANDED_CLASS      = 'expanded';

  let horizontalMenuExpanded = false;

  function buildTray(index, item) {
    // console.log(index);

    // console.log( 'nav item', $(this).parent().children('a').text() );
    const nav = $(this);
    // console.log(nav);

    let navClassString = $(this).parent().children("a").html();
    let titleLink = $(this).parent().children("a").attr("href");
    // console.log(titleLink);

    //push into traw div
    nav
      .clone()
      .appendTo(".draw-nav")
      .addClass(navClassString)
      .attr("data-index", index);
    //add title
    $(`.draw-nav ul[data-index='${index}']`).prepend(
      `<h4 class="sub-draw-title"><a href="${titleLink}">${navClassString}</a></h4>`
    );
  }

  let sidemeneuExpanded = false;
  const $draw = $(".sidemenu-drawer");

  function expandTray(index, button) {
    $(button).on("click keypress", (e) => {
      // console.log( e );
      if (e.type == "click" || e.key == "Enter") {
        //toggle sidemenu draw and content

        if ($(button).parent().hasClass("expanded-draw")) {
          // console.log('has class button close tray');
          sidemeneuExpanded = !sidemeneuExpanded;
          $draw.toggleClass("active");
          $(button).parent().removeClass("expanded-draw");
        } else {
          //show tray
          if (sidemeneuExpanded === false) {
            $draw.addClass("active");
            sidemeneuExpanded = !sidemeneuExpanded;
          }

          $(".sidemenu-homepage > ul > li").removeClass("expanded-draw");

          $(button).parent().addClass("expanded-draw");
        }

        // console.log(index, button);
        let matchingNavGroup = $(`.draw-nav ul[data-index='${index}']`);
        $(".draw-nav > ul").removeClass("active-nav-group");
        matchingNavGroup.toggleClass("active-nav-group");
      }
    });
  }

  function expandDrawSubContent() {
    // console.log('expand expandDrawSubContent');
    let subDrawExpander = $(".sidemenu-drawer .draw-nav ul ").find(
      ".btn-expander"
    );
    // console.log(subDrawExpander);

    subDrawExpander.each((i, button) => {
      let $button = $(button);

      $button.on("click keypress", (e) => {
        if (e.type == "click" || e.key == "Enter") {
          // console.log($button);
          $button.parent("li").toggleClass("expanded");
        }
      });
    });
  }

  function closeSideMenuDraw(location) {
    let loc = location || "expanded-draw";
    // console.log(loc);

    $(".close-draw").on("click", (e) => {
      if (sidemeneuExpanded) {
        sidemeneuExpanded = !sidemeneuExpanded;
        $(`.sidemenu-homepage .${loc}`).removeClass("expanded-draw");
        $draw.toggleClass("active");
      }

      // horizontal mega menu draw
      if (horizontalMenuExpanded) {
        // console.log(e);
        horizontalMenuExpanded = !horizontalMenuExpanded;
        $(".sidemenu-drawer").removeClass(`${loc}`);
        $(".mega-menu-top-level > li").removeClass("expanded-nav");
        $(".menu-blip").css({
          width: 0,
        });
        // $draw.toggleClass('active');
      }
    });

    $("body").on("click", (e) => {
      // console.log(e.target);

      let sidemenu = $(".sidemenu-homepage");
      // let  megamenu = $('.sidemenu-drawer');
      if (
        sidemeneuExpanded &&
        !sidemenu.is(e.target) && // if the target of the click isn't the container...
        sidemenu.has(e.target).length === 0
      ) {
        // ... nor a descendant of the container
        sidemeneuExpanded = !sidemeneuExpanded;
        $(".sidemenu-homepage .expanded-draw").removeClass("expanded-draw");
        $draw.toggleClass("active");
      }

      // closes menu if not clicking on header.. .should this be behaviour?
      if ($(".show-mega-menu-top").length) {
        const horizontalNavHeader = $(".main-site-header");
        if (
          horizontalMenuExpanded &&
          !horizontalNavHeader.is(e.target) &&
          horizontalNavHeader.has(e.target).length === 0
        ) {
          horizontalMenuExpanded = !horizontalMenuExpanded;
          $(".sidemenu-drawer").removeClass(`${loc}`);
          $(".mega-menu-top-level > li").removeClass("expanded-nav");
          $(".menu-blip").css({
            width: 0,
          });
        }
      }
    });
  }

  function sidemenuTray() {
    const menu = $(".sidemenu-homepage");
    // console.log(menu);

    //build tray nav content
    const trayNavItems = $(".sidemenu-homepage > ul > li > ul");

    const buttonExpander = $(".sidemenu-homepage > ul > li > .btn-expander");

    // console.log(trayNavItems);

    buttonExpander.each(expandTray);

    trayNavItems.each(buildTray);

    expandDrawSubContent();

    closeSideMenuDraw();
  }

  if ($(".sidemenu-homepage").length) {
    // console.log('sidemeny homepage init');

    // enquire.register( TABLET_AND_SMALLER, () => {
    //   console.log('tray is small size for mob');
    //   initSidemenuExpandability( sidemenu-homepage );
    // });

    enquire.register(DESKTOP_AND_LARGER, () => {
      // console.log('Tray is large size cool ');
      sidemenuTray();
    });
  }

  // **********
  // Horizontal Nav
  // **********

  function initHorizontalNav() {
    // console.log('hori nav go');
    let menuItems = $(
      ".show-mega-menu-top .mega-menu-top-level .nav-item-parent "
    );
    let menuItemsWithSub = $(
      ".show-mega-menu-top .mega-menu-top-level > .has-submenu"
    );

    let subMenuItems = $(
      ".show-mega-menu-top .mega-menu-top-level > .nav-item-parent "
    );

    // build sub menu for expand
    subMenuItems.each(function (index) {
      const $item = $(this);
      // console.log( $item, index );

      let titleLink = $item.children("a").attr("href");
      let titleText = $item.children("a").text();
      let titleHtml = $item.children("a").html();

      // console.log(titleLink, ' ', titleText);

      //push into traw div
      if ($item.children("ul").length) {
        $item
          .children("ul")
          .clone()
          .appendTo(".draw-nav")
          .attr("data-index", index);
      } else {
        // console.log('No UL CHILDREN');
        $(".draw-nav").append(`<ul data-index="${index}"></ul>`);
      }

      //add title
      $(`.draw-nav > ul[data-index='${index}']`).prepend(
        `<li class="sub-draw-title"><a href="${titleLink}">${titleHtml}</a></li>`
      );
    });

    // console.log('testing horizontalMenuExpanded  ----   ', horizontalMenuExpanded);

    // expand menu
    menuItems.on("mouseenter", function (e) {
      let index = $(this).index() - 2;
      // console.log("🚀 ~ file: tray.js ~ line 254 ~ menuItemsWithSub.on ~ index", index)

      e.preventDefault();
      e.stopPropagation();

      // console.log(e);

      const $navItem = $(this);
      // console.log( $(this).parent() );

      if ($navItem.hasClass("expanded-nav")) {
        // console.log('has class button close tray');
        horizontalMenuExpanded = !horizontalMenuExpanded;
        $(".sidemenu-drawer").toggleClass("horizontal-drawer-expanded");
        $navItem.removeClass("expanded-nav");
      } else {
        //show expanded menu
        // console.log('not exapnded.. expand');
        // console.log( horizontalMenuExpanded );
        if (horizontalMenuExpanded === false) {
          $(".sidemenu-drawer").addClass("horizontal-drawer-expanded");
          horizontalMenuExpanded = !horizontalMenuExpanded;
        }

        menuItems.removeClass("expanded-nav");
        $navItem.addClass("expanded-nav");
      }

      // set active submenu to display
      let matchingNavGroup = $(` .draw-nav > ul[data-index='${index}']`);
      $(".draw-nav > ul").removeClass("active-nav-group");
      matchingNavGroup.toggleClass("active-nav-group");

      // console.log('horizontalMenuExpanded',horizontalMenuExpanded);
    });

    // Set nav offset height for css variable
    const navHeight = $(".show-mega-menu-top .mega-sub-menu").height() + 6;
    // console.log(navHeight);
    document
      .querySelector(":root")
      .style.setProperty("--horizontal-nav-offset", `${navHeight}px`);

    closeSideMenuDraw("horizontal-drawer-expanded");
    expandDrawSubContent();
  }

  if ($(".show-mega-menu-top").length) {
    // only run on desktop size
    enquire.register(DESKTOP_AND_LARGER, () => {
      initHorizontalNav();
    });
  }

  // Blip movement logic
  var $blip = $(".menu-blip");

  $("#mega-menu > li").on("mouseover", function () {
    $blip.css({
      left: $(this).offset().left - $("#mega-menu").offset().left + 1,
      width: $(this).outerWidth(),
    });
  });

  $("#mega-menu > li").on("mouseout", function () {
    var activeItem = $(".expanded-nav");

    if (activeItem.length) {
      $blip.css({
        left: activeItem.offset().left - $("#mega-menu").offset().left + 1,
        width: activeItem.outerWidth(),
      });
    }
  });
}

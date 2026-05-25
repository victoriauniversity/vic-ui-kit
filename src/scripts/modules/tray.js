/* eslint-disable func-names */
import enquire from "enquire.js";

const TABLET_AND_SMALLER = "screen and (max-width: 975px)",
  DESKTOP_AND_LARGER = "screen and (min-width: 1200px)";
// eslint-disable-next-line import/prefer-default-export
export function initTray() {
  // console.log( 'tray...', $( '.tray-toggle' ));
  console.log("Init tray");
  // Check title length and shrink if too long
  var pageTitleEl = $(".header-content > a");
  var pageTitleLength = pageTitleEl.text().length;
  console.log($(".header-content > a").text().length);

  if (pageTitleLength > 150) {
    pageTitleEl.parent().addClass("long-title");
    pageTitleEl.addClass("long-title");
  }

  // Change URLs of all links in sidebar on #hubv4 design
  // if ($("body#hubv4")) {
  //   $("body#hubv4 a").each(function () {
  //     var href = $(this).attr("href");
  //     if (href && href.includes("cms.wgtn.ac.nz")) {
  //       $(this).attr("href", href + "?SQ_DESIGN_NAME=v4&mode=dev");
  //     }
  //   });
  // }

  $("body").on("click keyup", (e) => {
    // Close tray if clicked away from or escpae buttons

    // If not enter key
    if (e.which !== 13 && e.target) {
      if (
        (e.target.className.includes("tray-open") && $(".tray-open").length) ||
        (e.key == "Escape" && $(".tray-open").length)
      ) {
        e.preventDefault();
        toggleTray();
      }
    }

    // Close dropdown if click away
    // If key is not tab or shift
    if (e.which !== 9 && e.which !== 16) {
      if (
        (!e.target.className.includes("selector") &&
          $(".custom-dropdown .selector").hasClass("open")) ||
        (!e.target.className.includes("selector") && e.key == "Escape")
      ) {
        $(".custom-dropdown .selector").next().slideUp("fast");
        $(".custom-dropdown .selector").removeClass("open");
      }
    }
  });

  // Initial position
  function setTabsBlipInitialPosition() {
    var activeItem = $("nav.tray .tray-tabs .active").parent();
    if (activeItem.length) {
      $tabBlip.css({
        left: activeItem.offset().left - $("nav.tray .tray-tabs").offset().left,
        width: activeItem.outerWidth(),
      });
    }
  }

  // tray functionality
  function toggleTray() {
    // $(".tray").toggleClass("tray-open", "normal");
    // $(".tray").toggleClass("tray-closed", "normal");

    // Fix to prevent fadeout on page load. Needs more of a rework but fixes the issue for now.
    if($(".tray").hasClass('tray-closed')) {
      $(".tray").removeClass("tray-closed");
      $(".tray").removeClass("slide-out");
      $(".tray").addClass("tray-open");
      // $(".tray").fadeIn();
    } else {
      // $(".tray").toggleClass("tray-open");
      // $(".tray").toggleClass("tray-closed");
      // $(".tray").fadeOut("slow");
      $(".tray").removeClass("tray-open");
      $(".tray").addClass("slide-out");
      $(".tray").addClass("tray-closed");

    }

    setTabsBlipInitialPosition();

    $("body").toggleClass("noscroll");
  }

  $(".tray-toggle").on("click keydown", function (e) {
    if (e.which == 13 || e.which == 1) {
      e.preventDefault();

      toggleTray();
      // return false;
    }
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
  var hideSearchHistory = function () {
    $(".tray .saved-searches").hide();
  };
  $(".tray .search-input").on("focus", (e) => {
    $(".tray .saved-searches").show();
  });
  $(".tray .search-input").on("focusout", (e) => {
    setTimeout(() => {
      hideSearchHistory();
    }, 100);
  });

  // Init saved searches
  var checkSavedSearches = function () {
    if (localStorage.savedSearches) {
      var savedSearchesArray = JSON.parse(localStorage.savedSearches);
      console.log(savedSearchesArray);
      savedSearchesArray.forEach(function (item) {
        var div =
          "<div class='search-item'> " +
          item.term +
          " <button title='Remove this search term from history' class='clear-term flat no-icon'> <i class='icons8-delete'></i></button </div>";
        $(".tray .saved-searches").append($(div));
      });

      // On click of search item
      $(".tray .search-item").on("click", function (e) {
        console.log(e);
        var searchText = $(this).text().trim();
        $(".tray .search-input").val(searchText);
        $(".tray-search-bar>form").submit();
        hideSearchHistory();
      });

      // On click of clear search item
      $(".tray .clear-term").on("click", function (e) {
        console.log(e);
        e.preventDefault();
        var searchText = $(this).parent().text().trim();
        $(this).parent().remove();

        if (!$(".tray .saved-searches .search-item").length) {
          $(".tray .saved-searches").hide();
        } else {
          $(".tray .saved-searches").show();
        }

        var filtered = savedSearchesArray.filter(function (e) {
          return e.term !== searchText;
        });
        localStorage.setItem("savedSearches", JSON.stringify(filtered));
        console.log(filtered);
      });
    }
  };
  checkSavedSearches();

  // ****************************************
  // ****************************************
  // sidemenu tray

  // const SIDEMENU_TOGGLE_CLASS   = 'sidemenu-toggle';
  // const SIDEMENU_EXPANDER_CLASS = 'btn-expander';
  // const SIDEMENU_SUBMENU_CLASS  = 'has-submenu';

  // const SIDEMENU_SELECTED_ITEM_CLASS = 'active';
  // const SIDEMENU_EXPANDED_CLASS      = 'expanded';

  let horizontalMenuExpanded = false;

  var $blip = $(".menu-blip");

  function buildTray(index, item) {
    // console.log( 'nav item', $(this).parent().children('a').text() );
    // console.log( 'nav item', $(this).children('ul'));
    const nav = $(this).children('ul');
    // console.log($(this));

    let navClassString = $(this).children("a").html();
    let titleLink = $(this).children("a").attr("href");

    //push into traw div
    if(nav.length > 0) {
      nav
        .clone()
        .appendTo(".draw-nav")
        .addClass(navClassString)
        .attr("data-index", index);
      //add title
      $(`.draw-nav ul[data-index='${index}']`).prepend(
        `<h4 class="sub-draw-title"><a href="${titleLink}">${navClassString}</a></h4>`
      );
    } else {
      // console.log('no children');
      // $(`.draw-nav ul[data-index='${index}']`).prepend(
      //   `<h4 class="sub-draw-title"><a href="${titleLink}">${navClassString}</a></h4>`
      // );
    }
  }

  let openTimeout;
  let sidemenuExpanded = false;
  const $draw = $(".sidemenu-drawer");

  //! Sidemenu nav expand logic
  function expandTray(index, listItem) {
    $(listItem).on("mouseenter click keyup", (e) => {
      //promo hideshow logic
      // console.log($(this).attr("data-for"));
      var $navItemID = $(`#${$(this).attr("data-for")}`);
      // console.log($navItemID.length);
      $("[id^=draw]").hide();

      if ($navItemID.length) {
        $(".sidemenu-drawer").removeClass("no-promo");
        // console.warn(' promo....', $navItemID);
      } else {
        $(".sidemenu-drawer").addClass("no-promo");
        // console.warn('no promo....', $navItemID);
      }

      $navItemID.show();

      // If clicking on expander arrow
      if (
        (e.type == "click" || e.key == "Enter") &&
        $(e.target).hasClass("btn-expander")
      ) {
        if ($(e.target).parent().hasClass("active-menu-item")) {
          // If clicked parent is expanded
          sidemenuExpanded = false;
          $draw.removeClass("active");
          $(".nav-item-parent.active-menu-item").removeClass(
            "active-menu-item"
          );
          $(".sidemenu-homepage > ul > li").removeClass("expanded-draw");
        } else {
          $draw.removeClass("active");
          $(".nav-item-parent.active-menu-item").removeClass(
            "active-menu-item"
          );
          $(".sidemenu-homepage > ul > li").removeClass("expanded-draw");

          $(e.target).parent().addClass("active-menu-item");
          $draw.addClass("active");
          sidemenuExpanded = true;
        }
      } else if ($(listItem).hasClass("has-submenu")) {
        // Else we are hovering on the menu item
        if ($(listItem).parent().hasClass("expanded-draw")) {
          // console.log('has class button close tray');
          sidemenuExpanded = true;
          $draw.addClass("active");
          // Remove other ones
          if ($(listItem).hasClass("has-submenu")) {
            console.log("np tray print tray");
          }
        } else {
          //show tray
          if (sidemenuExpanded === false) {
            $draw.addClass("active");
            sidemenuExpanded = !sidemenuExpanded;
          }
          $(".sidemenu-homepage > ul > li").removeClass("expanded-draw");
          $(listItem).parent().addClass("expanded-draw");
        }

        // Hover trigger
        $(".nav-item-parent.active-menu-item").removeClass("active-menu-item");
        $(listItem).addClass("active-menu-item");

        let matchingNavGroup = $(`.draw-nav ul[data-index='${index}']`);
        $(".draw-nav > ul").removeClass("active-nav-group");
        matchingNavGroup.toggleClass("active-nav-group");
        // }
      } else if (!$(listItem).hasClass("has-submenu")) {
        //no children so close menu
        closeDraw();
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

      $button.on("click keyup", (e) => {
        if (e.type == "click" || e.key == "Enter") {
          // console.log($button);
          $button.parent("li").toggleClass("expanded");
          $button.parent("li").find(">ul").slideToggle("fast");
        }
      });
    });
  }

  // Close draw when clicking the X button
  $(".close-draw").on("click", (e) => {
    closeDraw();
  });

  function closeDraw(location) {
    let loc = location || "expanded-draw";
    $(".sidemenu-drawer").attr("tabIndex", -1);

    if ($(".sidemenu-banner-wrap").length > 0) {
      loc = "expanded-draw";
    } else {
      loc = "horizontal-drawer-expanded";
    }
    // console.log(loc);

    if (sidemenuExpanded) {
      sidemenuExpanded = !sidemenuExpanded;
      $(`.sidemenu-homepage .${loc}`).removeClass("expanded-draw");
      // Remove any active item classes
      $(".nav-item-parent.active-menu-item").removeClass("active-menu-item");

      // Remove blip
      $blip.css({
        height: 0,
      });
      $draw.removeClass("active");
    }
    // horizontal mega menu draw
    if (horizontalMenuExpanded) {
      horizontalMenuExpanded = !horizontalMenuExpanded;
      $(".sidemenu-drawer").removeClass(`${loc}`);
      $(".mega-menu-top-level > li").removeClass("expanded-nav");

      if ($(".mega-menu-top-level > li.expanded-nav").length) {
        $blip.css({
          left:
            $(".mega-menu-top-level > li.expanded-nav").offset().left -
            $("#mega-menu").offset().left,
          width: $(".mega-menu-top-level > li.expanded-nav").innerWidth(),
        });
      } else {
        $blip.css({
          width: 0,
        });
      }

      // $draw.toggleClass('active');
    }

    // On click OR mouseover of body, hide the tray if it's open
  }
  // ? ==== HOMEPAGE SIDE-MENU ONLY ====
  $("body").on("click", (e) => {
    const horizontalNavHeader = $("#mega_menu_block");

    let sidemenu = $(".sidemenu-homepage");
    // let  megamenu = $('.sidemenu-drawer');
    if (
      sidemenuExpanded &&
      !sidemenu.is(e.target) && // if the target of the click isn't the container...
      sidemenu.has(e.target).length === 0 &&
      !e.target.className.includes("close-draw") // and not clicking the close button...
    ) {
      // ... nor a descendant of the container
      closeDraw();
    }
    // closes menu if not clicking on header.. .should this be behaviour?
    if ($(".show-mega-menu-top").length) {
      if (
        horizontalMenuExpanded &&
        !horizontalNavHeader.is(e.target) &&
        horizontalNavHeader.has(e.target).length === 0
      ) {
        closeDraw();
      }
    }
  });

  function sidemenuTray() {
    const menu = $(".sidemenu-homepage");
    // console.log(menu);

    //build tray nav content
    const trayNavItems = $(".sidemenu-homepage > ul > .nav-item-parent ");

    const listItem = $(".sidemenu-homepage > ul > li:not(.sidemenu__label)");

    // console.log(trayNavItems);

    listItem.each(expandTray);

    trayNavItems.each(buildTray);

    expandDrawSubContent();

    closeDraw();
  }

  if ($(".sidemenu-homepage").length) {
    enquire.register(DESKTOP_AND_LARGER, () => {
      sidemenuTray();

      // Close sidemenu drawer when mouse leaves the content area.
      // Adds a small delay so accidental mouseouts don't immediately close it.
      let sidemenuLeaveTimeout;
      const $sidemenuDrawer = $(".sidemenu-drawer");
      const $sidemenuHomepage = $(".sidemenu-homepage");

      function scheduleCloseOnLeave() {
        clearTimeout(sidemenuLeaveTimeout);
        sidemenuLeaveTimeout = setTimeout(() => {
          if (sidemenuExpanded) {
            closeDraw();
          }
        }, 200);
      }

      function cancelScheduledClose() {
        clearTimeout(sidemenuLeaveTimeout);
      }

      // When the mouse leaves either the homepage menu or the drawer, schedule close
      $sidemenuHomepage.on("mouseleave", scheduleCloseOnLeave);
      $sidemenuDrawer.on("mouseleave", scheduleCloseOnLeave);

      // Cancel closing when mouse re-enters
      $sidemenuHomepage.on("mouseenter", cancelScheduledClose);
      $sidemenuDrawer.on("mouseenter", cancelScheduledClose);
    });
  }

  // **********
  // Horizontal Nav
  // **********

  function initHorizontalNav() {
    // console.log('hori nav go');
    let menuItems = $(
      "#hubv4 .show-mega-menu-top .mega-menu-top-level .nav-item-parent "
    );
    let menuItemsWithSub = $(
      "#hubv4 .show-mega-menu-top .mega-menu-top-level > .has-submenu"
    );

    let subMenuItems = $(
      "#hubv4 .show-mega-menu-top .mega-menu-top-level > .nav-item-parent "
    );

    // build sub menu for expand
    subMenuItems.each(function (index) {
      const $item = $(this);
      // console.log( $item, index );

      let titleLink = $item.children("a").attr("href");
      let titleText = $item.children("a").text();
      let titleHtml = $item.children("a").html();

      // console.log(titleLink, ' ', titleText);

      //push into draw div
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

    // ?EXPAND MENU ON HOVER
    menuItems.on("mouseenter", function(e) {
      let index = $(this).index() - 2;
      const $navItem = $(this);

      e.preventDefault();
      e.stopPropagation();

      var $navItemId = $("#" + $navItem.attr("data-for"));
      $("[id^=draw]").hide();

      if ($navItemId.length) {
        $(".sidemenu-drawer").removeClass("no-promo");
      } else {
        $(".sidemenu-drawer").addClass("no-promo");
      }
      $navItemId.show();

      // If menu is already open, don't delay expanding the menu
      if (horizontalMenuExpanded) {
        expandHorizontalMenu(index, $navItem, e.type);
      } else {
        openTimeout = setTimeout(function() {
          expandHorizontalMenu(index, $navItem, e.type);
        }, 200);
      }
    });

    // Separate focus handler
    menuItems.on("focus", "> a", function(e) {
      let index = $(this).parent().index() - 2;
      const $navItem = $(this).parent();

      // e.preventDefault();
      // e.stopPropagation();

      var $navItemId = $("#" + $navItem.attr("data-for"));
      $("[id^=draw]").hide();

      if ($navItemId.length) {
        $(".sidemenu-drawer").removeClass("no-promo");
      } else {
        $(".sidemenu-drawer").addClass("no-promo");
      }
      $navItemId.show();

      // Immediately expand menu on focus, no delay
      expandHorizontalMenu(index, $navItem, 'focus');
    });

    var expandHorizontalMenu = function (index, $navItem, eventType) {
      if ($navItem.hasClass("expanded-nav") && eventType == "click") {
        // If nav item is already expanded... close it
        horizontalMenuExpanded = !horizontalMenuExpanded;
        $navItem.removeClass("expanded-nav");
        $(".sidemenu-drawer .active-nav-group .sub-draw-title > a").attr(
          "tabIndex",
          -1
        );
        $(".sidemenu-drawer").removeClass("horizontal-drawer-expanded");
        $(".draw-nav > ul").removeClass("active-nav-group");

        // console.log(menuItems.find(">a"));
        // console.log('testing');

        menuItems.find(">a").attr("tabIndex", 0);
      } else {
        // Else if nav item is NOT expanded... open it
        if (horizontalMenuExpanded === false) {
          $(".sidemenu-drawer").addClass("horizontal-drawer-expanded");
          // Focus title of drawer once opened
          $(".sidemenu-drawer .active-nav-group .sub-draw-title > a").attr(
            "tabIndex",
            0
          );
          menuItems.find(">a").attr("tabIndex", 1);

          // $(".sidemenu-drawer").trigger("focus");

          horizontalMenuExpanded = !horizontalMenuExpanded;
        }

        menuItems.removeClass("expanded-nav");
        $navItem.addClass("expanded-nav");

        // HORIZONTAL MENU BLIP ADJUSTMENT
        $blip.css({
          left: $navItem.offset().left - $("#mega-menu").offset().left,
          width: $navItem.innerWidth(),
        });
      }

      // set active submenu to display
      let matchingNavGroup = $(` .draw-nav > ul[data-index='${index}']`);

      $(".draw-nav > ul").removeClass("active-nav-group");
      matchingNavGroup.toggleClass("active-nav-group");

      // Updated tab indexes of children
      $(".sidemenu-drawer .sub-draw-title > a").attr("tabIndex", 1);
      $(matchingNavGroup).find(".sub-draw-title > a").attr("tabIndex", 0);

      $navItem.find(">a").attr("tabIndex", 0);

      // console.log('horizontalMenuExpanded',horizontalMenuExpanded);
    };

    // Add keyboard navigation
    menuItems.on("keydown", function(e) {
      const $current = $(this);

      switch(e.keyCode) {
        case 37: // Left arrow
          e.preventDefault();
          $current.prev().find(">a").focus();
          break;
        case 39: // Right arrow
          e.preventDefault();
          $current.next().find(">a").focus();
          break;
        case 40: // Down arrow
          e.preventDefault();
          if (horizontalMenuExpanded) {
            // Focus first item in submenu
            $(".active-nav-group").find("a").first().focus();
          }
          break;
        case 27: // Escape
          e.preventDefault();
          closeDraw();
          break;
      }
    });

    // ?CLOSE ON MENU MOUSE OUT
    enquire.register(DESKTOP_AND_LARGER, () => {
      // Clear tabindex to avoid tabbing to invisible stuff
      if ($(".active-nav-group")) {
        $(".sidemenu-drawer .active-nav-group .sub-draw-title > a").attr(
          "tabIndex",
          -1
        );
      }
      // If banner nav is active
      if ($(".sidemenu-banner-wrap").length > 0) {
        $(".sidemenu-banner-wrap").on("mouseleave", function (e) {
          clearTimeout(openTimeout);
          // Hide menu if mouseout for x seconds
          openTimeout = setTimeout(function () {
            closeDraw();
          }, 300);
        });
        // If hover back in while timeout is active, cancel it so it doesn't hide
        $(".sidemenu-banner-wrap").on("mouseenter", function (e) {
          clearTimeout(openTimeout);
        });
      } else {
        $("#hubv4 #mega_menu_block").on("mouseleave", function (e) {
          clearTimeout(openTimeout);

          openTimeout = setTimeout(function () {
            if ($(".show-mega-menu-top").length && horizontalMenuExpanded) {
              closeDraw();
            }
          }, 300);
        });

        // If hover back in while timeout is active, cancel it so it doesn't hide
        $(".main-site-header, .gradient-line, #mega-nav").on(
          "mouseenter",
          function (e) {
            clearTimeout(openTimeout);
          }
        );
      }
    });

    // Set nav offset height for css variable
    const navHeight = $(".show-mega-menu-top .mega-sub-menu").height() + 6;
    // console.log(navHeight);
    document
      .querySelector(":root")
      .style.setProperty("--horizontal-nav-offset", `${navHeight}px`);

    closeDraw("horizontal-drawer-expanded");
    expandDrawSubContent();
  }

  if ($("#hubv4 .show-mega-menu-top").length) {
    // only run on desktop size
    enquire.register(DESKTOP_AND_LARGER, () => {
      console.log("Desktop activated ");
      // Only inti horizontal nav if it hasn't rendered yet, prevents duplication when resizing multiple times
      if ($(".sub-draw-title").length < 1) {
        initHorizontalNav();
      }
    });
  }
  // initHorizontalNav();

  // ?Blip movement logic

  $("#hubv4 #mega-menu > li:not(.sidemenu__label)").on(
    "mouseover click",
    function () {
      // If we are using a sidemenu
      if ($("#mega-menu").parent().hasClass("sidemenu-homepage")) {
        $blip.css({
          top:
            $(this).offset().top - $(this).parents("#mega-menu").offset().top,
          height: $(this).outerHeight(),
        });
      } else {
        // Else we are using horizontal menu
        $blip.css({
          left: $(this).offset().left - $("#mega-menu").offset().left,
          width: $(this).innerWidth(),
        });
      }
    }
  );

  // On mouse out of horizontal nav
  $("#hubv4 .main-site-header #mega-menu > li").on("mouseout", function () {
    var activeItem = $(".expanded-nav");
    // console.log('mouse out blip');
    // if (activeItem.length) {
    //   $blip.css({
    //     left: activeItem.offset().left - $("#mega-menu").offset().left,
    //     width: activeItem.innerWidth(),
    //   });
    // } else {
    //   $blip.css({
    //     width: 0,
    //   });
    // }

    if ($(".mega-menu-top-level > li.expanded-nav").length) {
      // console.log('this is active');
      $blip.css({
        left:
          $(".mega-menu-top-level > li.expanded-nav").offset().left -
          $("#mega-menu").offset().left,
        width: $(".mega-menu-top-level > li.expanded-nav").innerWidth(),
      });
    } else if (activeItem.length) {
      $blip.css({
        left: activeItem.offset().left - $("#mega-menu").offset().left,
        width: activeItem.innerWidth(),
      });
    } else {
      // console.log('not active');
      $blip.css({
        width: 0,
      });
    }

  });

  // ?Remove default icon injected on all role="button" elements
  $(".btn-expander").addClass("no-icon");

  // ?Temporary override of toolkit hiding
  // $("#hubv4 .sidemenu  ul > .has-submenu").css("display", "flex");

  var resizeTallBlip = function (el, hide) {
    if (hide) {
      $tallBlip.css({
        height: "0px",
      });
    } else {
      $tallBlip.css({
        top: el.offset().top - el.parents(".main-nav-list").offset().top,
        left: el.offset().left - $(".main-nav-list").offset().left,
        height: el.outerHeight(),
      });
    }
  };

  // ?TAB BLIP MOVEMENT LOGIC
  var $tabBlip = $("nav.tray .tray-tabs .blip");
  $("nav.tray .tray-tabs .tab").on("click keyup", function (e) {
    if (e.which == 13 || e.which == 1 || e.type == "click") {
      $("nav.tray .tray-tabs .tab").removeClass("active");
      $(this).addClass("active");

      // Hide notification is there is one
      $(".menu-notifcations").hide();
      if ($(this).find(".notification")) {
        $(this).find(".notification").hide();
      }

      if ($(this).hasClass("t-menu")) {
        $(".tray-main-nav").show();
        $(".tray-sub-menu").show();
        $(".saved-menu").hide();
      } else {
        $(".tray-main-nav").hide();
        $(".tray-sub-menu").hide();
        $(".saved-menu").show();
      }
    }
  });
  $("#hubv4 nav.tray .tray-tabs > div").on(
    "mouseover click keyup",
    function (e) {
      if (
        e.type == "click" ||
        e.type == "mouseover" ||
        (e.type == "keyup" && e.which == 13)
      ) {
        $tabBlip.css({
          left: $(this).offset().left - $("nav.tray .tray-tabs").offset().left,
          width: $(this).outerWidth(),
        });
      }
    }
  );

  $("#hubv4 nav.tray .tray-tabs").on("mouseout", function () {
    var activeItem = $("nav.tray .tray-tabs .active").parent();
    if (activeItem.length) {
      $tabBlip.css({
        left: activeItem.offset().left - $("nav.tray .tray-tabs").offset().left,
        width: activeItem.outerWidth(),
      });
    }
  });

  // ?TRAY MENU BLIP
  var $tallBlip = $("#hubv4 .main-nav-list .tall-blip");

  $("#hubv4 .main-nav-list > li ").on("mouseenter click", function () {
    resizeTallBlip($(this));
  });
  $("#hubv4 .main-nav-list").on("mouseleave", function () {
    var activeItem = $(".main-nav-list > li.active");
    if (!activeItem.length) {
      resizeTallBlip($(this), true);
    }
  });

  $("#hubv4 .tray-main-nav").on("mouseleave", function () {
    var activeItem = $(".main-nav-list > li.active");
    if (activeItem.length) {
      resizeTallBlip(activeItem);
    }
  });

  // ?MAIN NAV LIST ACCORDIONS
  $("#hubv4 .tray .main-nav-item ul li").each(function (e) {
    var $element = $(this);
    if ($(this).find("ul").length > 0) {
      $element.addClass("has-submenu");

      // hide menu by default
      $element.find(">ul").hide();
      $(
        '<span tabindex="0" class="btn-expander mf-heatmap-click no-icon" title="Toggle subpages" role="button"></span>'
      ).insertAfter($element.find(">a"));
    }
  });

  // Clone child menu into tray if child page
  if ($(".childMenu")) {
    var childMenuClone = $(".childMenu").clone();
    childMenuClone.appendTo(".menu-slide-container");

    // Open sidemenu by default
    // $(".tray #childPageMenu").show();
    $(".tray .sidemenu-toggle").toggleClass("expanded");
    // $(".tray .sidemenu").toggleClass("expanded");
    //   .next()
    //   .slideToggle("fast");

    // $(".tray .sidemenu-toggle").addClass("expanded")
    $(".tray .sidemenu-toggle > .btn-expander").on("click", function (e) {
      // e.preventDefault();
      // e.stopPropagation();
      $(this).parent().toggleClass("expanded");
      $(this).parent().next().slideToggle("fast");
    });
  }

  //! Mobile menu navigation
  // ? Hide child menu, show main menu
  $("#hubv4 .tray .mobile-menu-navigation button.main-menu-link").on(
    "click",
    function (e) {
      // $(".tray .childMenu").removeClass("slide-in");
      // $(".tray .childMenu").addClass("slide-out");
      // $(".main-nav-list").addClass("slide-in");

      $(".tray-main-nav").addClass("show-main-menu");
    }
  );
  // ? Hide main nav, show child mobile menu
  $("#hubv4 .tray .mobile-menu-navigation button.current-menu-link").on(
    "click",
    function (e) {
      $(".tray-main-nav").removeClass("show-main-menu");

      // $(".main-nav-list").hide();
      // $(".tray .childMenu").addClass("slide-in");
    }
  );

  // Open on initial load
  // if ($(".tray .main-nav-item > a.active")) {
  //   $(".tray .main-nav-item > a.active").parent().toggleClass("active");
  //   $(".tray .main-nav-item > a.active").parent().toggleClass("expanded");
  //   $(".tray .main-nav-item > a.active").parent().find(">ul").slideToggle();
  // }

  var expandItem = function (target) {
    target = $(target);
    // Close any items already open
    // Find any active/expanded children and close them
    target.parent().find(">ul .expanded > ul").slideUp("fast");
    target.parent().find(">ul .expanded").removeClass("expanded");
    // If top level item
    if (
      !target.parent().hasClass("expanded") &&
      target.parent().parent().data("element-name")
    ) {
      $(".tray ul[data-element-name='childMenu'] > .has-submenu.expanded")
        .removeClass("expanded")
        .find(">ul")
        .slideUp("fast");
    }

    target.parent().toggleClass("expanded");
    // target.parent().find(">a").toggleClass("active");

    if (target.parent().find(">a").hasClass("active")) {
      target.find("a").prop("disabled", false);
    } else {
      target.find("a").prop("disabled", true);
    }

    // Slide out main menu
    target.parent().find(">ul").animate({ height: "toggle" }, 200);
  };

  // ?EXPANDER LOGIC IN TRAY MOBILE MENU
  $(".tray .has-submenu > .btn-expander").on("click keyup", function (e) {
    if (e.which == 13 || e.which == 1) {
      expandItem(e.target);
    }
  });

  // ?INNER ACCORDION
  // $(".tray .nav-item-parent.has-submenu .btn-expander").on(
  //   "click keyup",
  //   function (e) {
  //     if (e.which == 13 || e.which == 1) {
  //       // If enter or left-click
  //       var activeItem = $(".main-nav-item.active");

  //       setTimeout(() => {
  //         resizeTallBlip(activeItem);
  //       }, 300);
  //       $(this).parent().find(">ul").slideToggle("fast");
  //       $(this).parent().toggleClass("active");
  //       $(this).parent().find(">a").toggleClass("active");
  //       $(this).parent().toggleClass("expanded");
  //     }
  //   }
  // );

  // Hint
  // if (
  //   localStorage.getItem("newMenuNotice") !== "true" ||
  //   !localStorage.getItem("newMenuNotice")
  // ) {
  //   setTimeout(() => {
  //     $(".hint").css("display", "flex").hide().fadeIn();
  //   }, 1500);
  // } else {
  // }

  // Clear
  $(".hint .acknowledgement").on("click", function () {
    localStorage.setItem("newMenuNotice", true);
    $(".hint").fadeOut();
  });

  if (window.location.search.includes("responsive=true")) {
    $(".tray").addClass("responsive-preview");
    toggleTray();
  }
  // Set initial position of tall blip (in tray)
  setTimeout(() => {
    var activeItem = $(".main-nav-list > li.active");
    if (activeItem.length) {
      resizeTallBlip(activeItem);
    }
  }, 500);
  // accesibility fix - tabbing currently doesn't go to expanded tray as it's outside the nav DIV
  // TODO make work with horizontal NAV --- Monty or Jake
  const tabLinks = document.querySelectorAll(
    "#mega-menu > li.has-submenu > .btn-expander"
  );

  // tabLinks.forEach((link, index) => {
  //   // console.log(link, index);
  //   let parentLink = link.previousSibling;
  //   // console.log('parent link___', parentLink);
  //   // handleTab(link, index)
  //   link.addEventListener("keydown", (event) =>
  //     handleTab(event, link, parentLink, index)
  //   );
  // });

  // function handleTab(e, link, parent, index) {
  //   let tabLink = document.querySelector(`.draw-nav [data-index="${index}"] a`);
  //   let allLinks = document.querySelectorAll(
  //     `.draw-nav [data-index="${index}"] a`
  //   );
  //   let lastLink = allLinks[allLinks.length - 1];
  //   let nextNavItem = document
  //     .querySelectorAll("#mega-menu > li.has-submenu")
  //     [index + 1].querySelector("a");

  //   // console.log('nextNavItem----------', nextNavItem);

  //   // console.log(e);

  //   // console.log('tab to---', tabLink);
  //   // console.log('last link---', lastLink);

  //   // Focus on open menu
  //   if (e.keyCode === 9 && !event.shiftKey) {
  //     e.preventDefault();
  //     tabLink.focus();
  //   }

  //   // Take you to next Nav item if last link
  //   lastLink.addEventListener("keydown", (event) => {
  //     if (e.keyCode === 9) {
  //       event.preventDefault();
  //       nextNavItem.focus();
  //     }
  //   });

  //   // Take you back to main nav if tab shit
  //   tabLink.addEventListener("keydown", (event) => {
  //     if (event.shiftKey && event.keyCode == 9) {
  //       event.preventDefault();
  //       link.focus();
  //     }
  //   });
  // }
}

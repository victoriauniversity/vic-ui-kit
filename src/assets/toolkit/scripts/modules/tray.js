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
  if ($("body#hubv4")) {
    $("body#hubv4 a").each(function () {
      var href = $(this).attr("href");
      if (href && href.includes("cms.wgtn.ac.nz")) {
        $(this).attr("href", href + "?SQ_DESIGN_NAME=v4&mode=dev");
      }
    });
  }

  $("body#hubv4").on("click keyup", (e) => {
    // Close tray if clicked away from or escpae buttons

    // If not enter key
    if (e.which !== 13) {
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
    var activeItem = $("nav.tray .tabs .active").parent();
    if (activeItem.length) {
      $tabBlip.css({
        left: activeItem.offset().left - $("nav.tray .tabs").offset().left,
        width: activeItem.outerWidth(),
      });
    }
  }

  // tray functionality
  function toggleTray() {
    $(".tray").toggleClass("tray-closed", "normal");
    $(".tray").toggleClass("tray-open", "normal");
    setTabsBlipInitialPosition();

    $("body").toggleClass("noscroll");
  }

  $("#hubv4 .tray-toggle").on("click keydown", function (e) {
    if (e.which == 13 || e.which == 1) {
      e.preventDefault();

      toggleTray();
      // return false;
    }
  });

  $("#hubv4 .expanded-draw").click((e) => {
    e.preventDefault();
    toggleTray();
  });
  $("#hubv4 .tray-close").click((e) => {
    e.preventDefault();

    toggleTray();
  });

  $("#hubv4 .search-toggle").click((e) => {
    e.preventDefault();
    toggleTray();
    setTimeout(() => {
      $(".tray .search-input").focus();
    }, 500);
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

  var $blip = $(".menu-blip");

  function buildTray(index, item) {
    // console.log( 'nav item', $(this).parent().children('a').text() );
    const nav = $(this);

    let navClassString = $(this).parent().children("a").html();
    let titleLink = $(this).parent().children("a").attr("href");

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

  let openTimeout;
  let sidemenuExpanded = false;
  const $draw = $(".sidemenu-drawer");

  //! Sidemenu expand logic
  function expandTray(index, listItem) {
    $(listItem).on("mouseenter click keyup", (e) => {
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
      } else {
        // Else we are hovering on the menu item
        if ($(listItem).parent().hasClass("expanded-draw")) {
          // console.log('has class button close tray');
          sidemenuExpanded = true;
          $draw.addClass("active");
          // Remove other ones
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
    if ($("#banner-nav").length > 0) {
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
      $blip.css({
        width: 0,
      });

      // $draw.toggleClass('active');
    }

    // On click OR mouseover of body, hide the tray if it's open
  }
  // ! ==== HOMEPAGE SIDE-MENU ONLY ====
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
    const trayNavItems = $(".sidemenu-homepage > ul > li > ul");

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

    // !EXPAND MENU ON HOVER
    menuItems.on("mouseenter click", function (e) {
      let index = $(this).index() - 2;
      console.log(
        "🚀 ~ file: tray.js ~ line 254 ~ menuItemsWithSub.on ~ index",
        index
      );

      const $navItem = $(this);

      e.preventDefault();
      e.stopPropagation();

      var $navItemId = $("#" + $navItem.attr("data-for"));
      $("[id^=draw]").hide();

      if ($navItemId) {
        $(".sidemenu-drawer").removeClass("no-promo");
      } else {
        $(".sidemenu-drawer").addClass("no-promo");
      }
      $navItemId.show();

      // If menu is already open, don't delay expanding the menu, else do!
      if (horizontalMenuExpanded || e.type == "click") {
        expandHorizontalMenu(index, $navItem, e.type);
      } else {
        openTimeout = setTimeout(function () {
          expandHorizontalMenu(index, $navItem, e.type);
        }, 200);
      }
    });
    var expandHorizontalMenu = function (index, $navItem, eventType) {
      if ($navItem.hasClass("expanded-nav") && eventType == "click") {
        // If nav item is already expanded... close it
        horizontalMenuExpanded = !horizontalMenuExpanded;
        $navItem.removeClass("expanded-nav");
        $(".sidemenu-drawer").removeClass("horizontal-drawer-expanded");
        $(".draw-nav > ul").removeClass("active-nav-group");
        // $blip.css({
        //   width: 0,
        // });
      } else {
        // Else if nav item is NOT expanded... open it
        if (horizontalMenuExpanded === false) {
          $(".sidemenu-drawer").addClass("horizontal-drawer-expanded");
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

      // console.log('horizontalMenuExpanded',horizontalMenuExpanded);
    };

    // !CLOSE ON MENU MOUSE OUT
    enquire.register(DESKTOP_AND_LARGER, () => {
      // Hide menu if mouseout for x seconds
      // If banner nav is active
      if ($("#banner-nav").length > 0) {
        $("#banner-nav").on("mouseleave", function (e) {
          clearTimeout(openTimeout);
          openTimeout = setTimeout(function () {
            closeDraw();
          }, 300);
        });
        // If hover back in while timeout is active, cancel it so it doesn't hide
        $("#banner-nav").on("mouseenter", function (e) {
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

  // Blip movement logic

  $("#hubv4 #mega-menu > li:not(.sidemenu__label)").on(
    "mouseover click",
    function () {
      // If we are using a sidemenu
      if ($("#mega-menu").parent().hasClass("sidemenu-homepage")) {
        $blip.css({
          top:
            $(this).offset().top - $(this).parents("#mega-menu").offset().top,
          height: $(this).innerHeight(),
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
    if (activeItem.length) {
      $blip.css({
        left: activeItem.offset().left - $("#mega-menu").offset().left,
        width: activeItem.innerWidth(),
      });
    } else {
      $blip.css({
        width: 0,
      });
    }
  });

  var notificationCount = 0;

  // !Listen to storage changes from other windows on same domain
  // window.addEventListener("storage", (e) => {
  //   // When local storage changes, dump the list to
  //   // the console.
  //   console.log(e);
  //   console.log(window.localStorage);
  //   if (e.key.includes("saved")) {
  //     console.log(e);
  //     checkSavedItems(e.key);
  //     notificationCount++;

  //     if (notificationCount > 0) {
  //       // Show main menu notification count
  //       if ($(".menu-notifcations").length) {
  //         $(".menu-notifcations").show();
  //       } else {
  //         $(".header-toggle .tray-toggle").append(
  //           "<div class='menu-notifcations'>" + notificationCount + "</div>"
  //         );
  //       }
  //       // Inner tab notification
  //       if ($(".t-saved .notification").length) {
  //         $(".t-saved .notification").show();
  //       } else {
  //         $(".t-saved span").append("<div class='notification'></div>");
  //       }

  //       // Show inner tab notifcation count
  //       $("nav.tray .tabs .notification").show();
  //       $("nav.tray .tabs .notification").text(notificationCount);
  //     }
  //   }
  // });

  // // !Listen to local storage on CURRENT PAGE
  // window.addEventListener(
  //   "localstorage",
  //   function (e) {
  //     if (e.detail.key.includes("saved")) {
  //       console.log(e.detail);
  //       // checkSavedItems(e.detail.key);
  //       notificationCount++;

  //       if (notificationCount > 0) {
  //         // Show main menu notification count
  //         if ($(".menu-notifcations").length) {
  //           $(".menu-notifcations").show();
  //         } else {
  //           $(".header-toggle .tray-toggle").append(
  //             "<div class='menu-notifcations'>" + notificationCount + "</div>"
  //           );
  //         }
  //         // Inner tab notification
  //         if ($(".t-saved .notification").length) {
  //           $(".t-saved .notification").show();
  //         } else {
  //           $(".t-saved span").append("<div class='notification'></div>");
  //         }

  //         // Show inner tab notifcation count
  //         $("nav.tray .tabs .notification").show();
  //         $("nav.tray .tabs .notification").text(notificationCount);
  //       }
  //     }

  //     // }
  //   },
  //   false
  // );

  // !Remove default icon injected on all role="button" elements
  $(".btn-expander").addClass("no-icon");

  // !Temporary override of toolkit hiding
  // $("#hubv4 .sidemenu  ul > .has-submenu").css("display", "flex");

  const formatAsDate = function (date, locale) {
    var arr = date.split("");
    var year = arr.slice(0, 4).join("");
    var month = arr.slice(4, 6).join("");
    var day = arr.slice(6, 8).join("");

    if (locale == "us") {
      var dateString = year + " " + month + " " + day;
      dateString = new Date(dateString);
      return dateString;
    } else {
      var dateString = year + " " + month + " " + day;
      dateString = new Date(dateString).toLocaleDateString("en-UK");
      return dateString;
    }
  };

  // !SAVED EVENTS LISTS
  // function checkSavedItems(item) {
  //   var nameMaps = {
  //     savedEvents: "events",
  //     savedScholarships: "scholarships",
  //     savedClubs: "clubs",
  //     savedPages: "pages",
  //     savedPrizes: "prizes",
  //   };
  //   if (item == "savedEvents") {
  //     var noResultsUrl = "https://cms.wgtn.ac.nz/events";
  //   } else if (item == "savedScholarships") {
  //     noResultsUrl = "https://cms.wgtn.ac.nz/scholarships/find-scholarships";
  //   } else if (item == "savedClubs") {
  //     noResultsUrl = "https://cms.wgtn.ac.nz/students/campus/clubs/directory";
  //   } else if (item == "savedPrizes") {
  //     noResultsUrl = "https://cms.wgtn.ac.nz/scholarships/annual-prizes";
  //   } else {
  //     noResultsUrl = "https://cms.wgtn.ac.nz/";
  //   }

  //   if (item) {
  //     if (nameMaps[item] !== undefined) {
  //       setTimeout(() => {
  //         if (localStorage[item]) {
  //           var items = JSON.parse(localStorage[item]);
  //         }

  //         if (items && items.length > 0) {
  //           var itemsLength = items.length;
  //         } else {
  //           itemsLength = 0;
  //         }

  //         if (items && items.length > 0) {
  //           // Update count in dropdown
  //           $(".custom-dropdown")
  //             .find("." + nameMaps[item] + " .count")
  //             .text("(" + items.length + ")");

  //           // Update count in accordion
  //           $("." + nameMaps[item] + "-list")
  //             .prev()
  //             .find(".count")
  //             .text(items.length);

  //           // Append accordion buttons
  //           $("." + nameMaps[item] + "-list").append(
  //             "<div class='accordion-buttons'></div>"
  //           );

  //           if (items.length > 0) {
  //             $("." + nameMaps[item] + "-list .accordion-buttons").append(
  //               "<a target='_blank' class='btn rounded no-icon secondary view-all' href=''>View all <i class='icons8-external-link'></i></a>"
  //             );
  //           }
  //           $("." + nameMaps[item] + "-list .accordion-buttons").append(
  //             "<a target='_blank' class='btn rounded no-icon primary add-more' href='" +
  //               noResultsUrl +
  //               "'>Add more <i class='icons8-external-link'></i></a>"
  //           );

  //           // Clear old list
  //           $("." + nameMaps[item] + "-list li").remove();

  //           var first5 = items.slice(0, 5);
  //           first5.forEach(function (e) {
  //             // If liveUrl exists we presume it follows the Funnelback structure of 'title' and 'liveUrl', e.g. for Events
  //             if (e.liveUrl) {
  //               // Format date
  //               if (nameMaps[item] == "events") {
  //                 if (
  //                   !$("." + nameMaps[item] + "-list li > a")
  //                     .text()
  //                     .includes(e.title)
  //                 ) {
  //                   $(
  //                     "<li> <a target='_blank' href='" +
  //                       e.liveUrl +
  //                       "'><span data-url='" +
  //                       e.liveUrl +
  //                       "' data-date='" +
  //                       e.metaData.O +
  //                       "' class='item-dates'>" +
  //                       formatAsDate(e.metaData.O, "uk") +
  //                       "</span>" +
  //                       e.title +
  //                       "</a> " +
  //                       "<button title='Remove this item from saved list' class='no-icon remove-item'><i class='icons8-close'></i></button></li>"
  //                   ).insertBefore(
  //                     $("." + nameMaps[item] + "-list").find(
  //                       ".accordion-buttons"
  //                     )
  //                   );
  //                 }
  //               } else {
  //                 if (
  //                   !$("." + nameMaps[item] + "-list li > a")
  //                     .text()
  //                     .includes(e.title)
  //                 ) {
  //                   $(
  //                     "<li><a target='_blank' href='" +
  //                       e.liveUrl +
  //                       "'>" +
  //                       e.title +
  //                       "</a></li>"
  //                   ).insertBefore(
  //                     $("." + nameMaps[item] + "-list").find(
  //                       ".accordion-buttons"
  //                     )
  //                   );
  //                 }
  //               }
  //             } else {
  //               $(
  //                 "<li><a target='_blank' href='" +
  //                   e.url +
  //                   "'>" +
  //                   e.name +
  //                   "</a></li>"
  //               ).insertBefore(
  //                 $("." + nameMaps[item] + "-list").find(".accordion-buttons")
  //               );
  //             }
  //           });
  //         }
  //         if (itemsLength == 0) {
  //           $("." + nameMaps[item] + "-list")
  //             .prev()
  //             .addClass("empty");
  //           $("." + nameMaps[item] + "-list").append(
  //             "<div class='empty-message'>Nothing here... <a target='_blank' href='" +
  //               noResultsUrl +
  //               "'>Add some!</a></div>"
  //           );
  //         } else {
  //           $("." + nameMaps[item] + "-list")
  //             .prev()
  //             .removeClass("empty");
  //           $("." + nameMaps[item] + "-list")
  //             .find(".empty-message")
  //             .hide();
  //         }
  //       }, 100);
  //     }
  //   }
  // }
  // checkSavedItems("savedEvents");
  // checkSavedItems("savedScholarships");
  // checkSavedItems("savedClubs");
  // checkSavedItems("savedPages");
  // checkSavedItems("savedPrizes");

  // // Trigger to open/close items in saved items
  // $(".group-title").on("click keyup", function (e) {
  //   if (e.which == 13 || e.which == 1) {
  //     $(this).toggleClass("active");
  //     if ($(this).hasClass("active")) {
  //       $(this).find("i").addClass("flipped");
  //     } else {
  //       $(this).find("i").removeClass("flipped");
  //     }
  //     $(this).next().slideToggle("fast");
  //   }
  // });

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

  // !TAB BLIP MOVEMENT LOGIC
  var $tabBlip = $("nav.tray .tabs .blip");
  $("nav.tray .tabs .tab").on("click keyup", function (e) {
    if (e.which == 13 || e.which == 1 || e.type == "click") {
      $("nav.tray .tabs .tab").removeClass("active");
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
  $("#hubv4 nav.tray .tabs > div").on("mouseover click keyup", function (e) {
    if (
      e.type == "click" ||
      e.type == "mouseover" ||
      (e.type == "keyup" && e.which == 13)
    ) {
      $tabBlip.css({
        left: $(this).offset().left - $("nav.tray .tabs").offset().left,
        width: $(this).outerWidth(),
      });
    }
  });

  $("#hubv4 nav.tray .tabs").on("mouseout", function () {
    var activeItem = $("nav.tray .tabs .active").parent();
    if (activeItem.length) {
      $tabBlip.css({
        left: activeItem.offset().left - $("nav.tray .tabs").offset().left,
        width: activeItem.outerWidth(),
      });
    }
  });

  // !TRAY MENU BLIP
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

  // !CUSTOM DROPDOWN
  $("#hubv4 .custom-dropdown .selector").on("click keyup", function (e) {
    if (e.which == 13 || e.which == 1) {
      // If enter or left-click
      $(this).next().slideToggle("fast");
      $(this).toggleClass("open");
    }
  });
  $("#hubv4 .custom-dropdown ul li").on("click keyup", function (e) {
    if (e.which == 13 || e.which == 1) {
      // If enter or left-click
      // Clear open class on selector
      if ($(".custom-dropdown .selector").hasClass("open")) {
        $(".custom-dropdown .selector").removeClass("open");
      }

      // Toggle active class
      $(".custom-dropdown ul li").removeClass("active");
      $(this).addClass("active");

      // Set text to value
      $(this).parent().prev().find(".selector-text").text($(this).data("name"));
      // Close list on click
      $(this).parent().slideToggle("fast");
      var text = $(this).data("name").toLowerCase();
      showSavedData(text);
    }
  });

  var showSavedData = function (e) {
    $(".no-results").slideUp();

    // Make titles visible
    $(".group-title").hide();
    $(".group-title").removeClass("active");

    $(".item-list").hide();
    var $toggler = $("." + e + "-title");
    $toggler.css("display", "flex");
    $toggler.toggleClass("active");
    if ($toggler.hasClass("active")) {
      $toggler.find("i").addClass("flipped");
    } else {
      $toggler.find("i").removeClass("flipped");
    }
    $toggler.next().slideToggle("fast");
  };

  // !MAIN NAV LIST ACCORDIONS
  $("#hubv4 .tray .main-nav-item ul li").each(function (e) {
    var $element = $(this);
    if ($(this).find("ul").length > 0) {
      $element.addClass("has-submenu");
      $(
        '<span tabindex="0" class="btn-expander mf-heatmap-click no-icon" title="Toggle subpages" role="button"></span>'
      ).insertAfter($element.find(">a"));
    }
  });
  // Open on initial load
  if ($(".tray .main-nav-item > a.active")) {
    $(".tray .main-nav-item > a.active").parent().toggleClass("active");
    $(".tray .main-nav-item > a.active").parent().toggleClass("expanded");
    $(".tray .main-nav-item > a.active").parent().find(">ul").slideToggle();
  }

  // On top level menu click
  $(".tray .main-nav-item > .btn-expander").on("click keyup", function (e) {
    if (e.which == 13 || e.which == 1) {
      $(this).parent().toggleClass("expanded");
      $(this).parent().find(">a").toggleClass("active");

      if ($(this).parent().find(">a").hasClass("active")) {
        $(this).find("a").prop("disabled", false);
      } else {
        $(this).find("a").prop("disabled", true);
      }

      // Find any active/expanded children and close them
      $(this).parent().find(">ul .active").removeClass("active");
      $(this).parent().find(">ul .expanded > ul").slideUp("fast");
      $(this).parent().find(">ul .expanded").removeClass("expanded");

      // Slide out main menu
      $(this)
        .parent()
        .find(">ul")
        .slideToggle("fast", function () {
          // Resize blip
          var activeItem = $(this).parent();
          if (activeItem.length) {
            resizeTallBlip(activeItem);
          }
        });
    }
  });

  // !INNER ACCORDION
  $(".tray .nav-item-parent.has-submenu .btn-expander").on(
    "click keyup",
    function (e) {
      if (e.which == 13 || e.which == 1) {
        // If enter or left-click
        var activeItem = $(".main-nav-item.active");

        setTimeout(() => {
          resizeTallBlip(activeItem);
        }, 300);
        $(this).parent().find(">ul").slideToggle("fast");
        $(this).parent().toggleClass("active");
        $(this).parent().find(">a").toggleClass("active");
        $(this).parent().toggleClass("expanded");
      }
    }
  );

  // Hint
  if (
    localStorage.getItem("newMenuNotice") !== "true" ||
    !localStorage.getItem("newMenuNotice")
  ) {
    setTimeout(() => {
      $(".hint").css("display", "flex").hide().fadeIn();
    }, 1500);
  } else {
  }

  // Clear
  $(".hint .acknowledgement").on("click", function () {
    localStorage.setItem("newMenuNotice", true);
    $(".hint").fadeOut();
  });

  if (window.location.search.includes("responsive=true")) {
    $(".tray").addClass("responsive-preview");
    toggleTray();
  }

  // setTimeout(() => {
  //   // Initial blip position
  //   var activeItem = $(".main-nav-list > li.active");
  //   if (activeItem.length) {
  //     $tallBlip.css({
  //       top:
  //         activeItem.offset().top -
  //         activeItem.parents(".main-nav-list").offset().top,
  //       height: activeItem.outerHeight(),
  //       left: activeItem.offset().left - $(".main-nav-list").offset().left,
  //     });
  //   }

  //   // Prune events
  //   var dateNow = new Date();
  //   $(".tray-content .events-list li ").each(function (e) {
  //     var eventExpiryMessage = $(
  //       "<div class='expired-text'>This event has expired</div>"
  //     );
  //     var $el = $(this).find("a span");
  //     if (dateNow > formatAsDate($el.attr("data-date"), "us")) {
  //       $el.append(eventExpiryMessage);
  //       $el.parent().attr("target", "");
  //       $el.parent().parent().addClass("expired");
  //     }
  //   });

  //   // TODO: Make pruning automatic, display message on open of event-list

  //   $(".tray-content .events-list li .remove-item").on("click", function () {
  //     var $el = $(this);
  //     var localObject = JSON.parse(localStorage.getItem("savedEvents"));

  //     // Return array of items where displayUrl !== clicked li href
  //     var filterdLocalObject = localObject.filter(function (item) {
  //       return item.displayUrl !== $el.prev().attr("href");
  //     });
  //     console.log(filterdLocalObject);
  //     $el.parent().slideUp();
  //     $el
  //       .parents(".item-list")
  //       .prev()
  //       .find(".count")
  //       .text(filterdLocalObject.length);
  //     localStorage.setItem("savedEvents", JSON.stringify(filterdLocalObject));
  //   });
  // }, 500);
}

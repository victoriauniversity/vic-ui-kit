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

    console.log(e.target.className, "clicked");
    if (
      e.target.className.includes("tray-open") ||
      (e.key == "Escape" && $(".tray-open").length)
    ) {
      e.preventDefault();
      toggleTray();
    }

    // Close dropdown if click away
    if (
      (!e.target.className.includes("selector") &&
        $(".custom-dropdown .selector").hasClass("open")) ||
      (!e.target.className.includes("selector") && e.key == "Escape")
    ) {
      $(".custom-dropdown .selector").next().slideUp();
      $(".custom-dropdown .selector").removeClass("open");
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

  function expandTray(index, listItem) {
    $(listItem).on("mouseenter click", (e) => {
      // console.log( e );
      if ($(listItem).parent().hasClass("expanded-draw")) {
        // console.log('has class button close tray');
        sidemeneuExpanded == true;
        $draw.addClass("active");
        // Remove other ones
      } else {
        //show tray
        if (sidemeneuExpanded === false) {
          $draw.addClass("active");
          sidemeneuExpanded = !sidemeneuExpanded;
        }
        $(".sidemenu-homepage > ul > li").removeClass("expanded-draw");
        $(listItem).parent().addClass("expanded-draw");
      }

      // Hover trigger
      $(".nav-item-parent.active-menu-item").removeClass("active-menu-item");
      $(listItem).addClass("active-menu-item");

      // console.log(index, listItem);
      let matchingNavGroup = $(`.draw-nav ul[data-index='${index}']`);
      $(".draw-nav > ul").removeClass("active-nav-group");
      matchingNavGroup.toggleClass("active-nav-group");
      // }
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
    console.log(sidemeneuExpanded);

    $(".close-draw").on("click", (e) => {
      if (sidemeneuExpanded) {
        sidemeneuExpanded = !sidemeneuExpanded;
        $(`.sidemenu-homepage .${loc}`).removeClass("expanded-draw");
        // Remove any active item classes
        $(".nav-item-parent.active-menu-item").removeClass("active-menu-item");

        // Remove blip
        $blip.css({
          height: "0px",
        });

        $draw.removeClass("active");
      }

      // horizontal mega menu draw
      if (horizontalMenuExpanded) {
        console.log(e);
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
        sidemenu.has(e.target).length === 0 &&
        !e.target.className.includes("close-draw") // and not clicking the close button...
      ) {
        // ... nor a descendant of the container
        sidemeneuExpanded = !sidemeneuExpanded;
        $(".sidemenu-homepage .expanded-draw").removeClass("expanded-draw");
        $draw.toggleClass("active");

        // Remove any active item classes
        $(".nav-item-parent.active-menu-item").removeClass("active-menu-item");

        // Remove blip
        $blip.css({
          height: "0px",
        });
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

    const listItem = $(".sidemenu-homepage > ul > li:not(.sidemenu__label)");

    // console.log(trayNavItems);

    listItem.each(expandTray);

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

    // !EXPAND MENU ON HOVER
    menuItems.on("mouseenter", function (e) {
      let index = $(this).index() - 2;
      console.log(
        "🚀 ~ file: tray.js ~ line 254 ~ menuItemsWithSub.on ~ index",
        index
      );

      e.preventDefault();
      e.stopPropagation();

      // console.log(e);

      const $navItem = $(this);
      // console.log( $(this).parent() );

      if ($navItem.hasClass("expanded-nav")) {
        // console.log('has class button close tray');
        horizontalMenuExpanded = !horizontalMenuExpanded;
        // $(".sidemenu-drawer").toggleClass("horizontal-drawer-expanded");
        // $navItem.removeClass("expanded-nav");
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
    // If we are using a sidemenu
    if ($("#mega-menu").parent().hasClass("sidemenu-homepage")) {
      $blip.css({
        top:
          $(this).offset().top - $(this).parents("#mega-menu").offset().top + 1,
        height: $(this).innerHeight(),
      });
    } else {
      // Else we are using horizontal menu
      $blip.css({
        left: $(this).offset().left - $("#mega-menu").offset().left + 1,
        width: $(this).outerWidth(),
      });
    }
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

  // Custom SAVED menu
  var fakeObject =
    '[{"rank":2,"score":735,"title":"Unemployment insurance: Smart idea? Or poor process and poor policy making?","collection":"vic-events-push","component":2,"collapsed":null,"liveUrl":"https://www.wgtn.ac.nz/events/2022/03/unemployment-insurance-smart-idea-or-poor-process-and-poor-policy-making","summary":"","cacheUrl":"/s/cache?collection=vic-events-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fevents%2F2022%2F03%2Funemployment-insurance-smart-idea-or-poor-process-and-poor-policy-making&profile=_default_preview","date":1646917200000,"fileSize":1679,"fileType":"xml","tier":1,"docNum":61,"exploreLink":null,"kmFromOrigin":null,"quickLinks":null,"displayUrl":"https://www.wgtn.ac.nz/events/2022/03/unemployment-insurance-smart-idea-or-poor-process-and-poor-policy-making","clickTrackingUrl":"","explain":null,"indexUrl":"https://www.wgtn.ac.nz/events/2022/03/unemployment-insurance-smart-idea-or-poor-process-and-poor-policy-making","gscopesSet":[],"documentVisibleToUser":true,"promoted":false,"diversified":false,"listMetadata":{"c":["Join this webinar to hear our experts share their insights and perspectives on the Government\'s proposed Social Unemployment Insurance scheme."],"d":["11Mar2022"],"eventSummary":["In Budget 2021, the New Zealand government announced a commitment to the development of a Social Unemployment Insurance scheme. Developed by a tripartite..."],"contactEmail":["madeleine.rashbrooke@vuw.ac.nz,madeleine.rashbrooke@vuw.ac.nz"],"endDate":["20220311"],"eventLocation":["Online (Zoom)"],"eventsTagCost":["free"],"url":["https%3A%2F%2Fwww.wgtn.ac.nz%2Fevents%2F2022%2F03%2Funemployment-insurance-smart-idea-or-poor-process-and-poor-policy-making"],"O":["20220311"],"eventBlurb":["null"],"eventsTagCategory":["General events"],"t":["Unemployment insurance: Smart idea? Or poor process and poor policy making?"],"eventOwner":["Responsive"],"assetId":["1992355"],"eventEndTime":["1:30pm"],"eventStartTime":["12:30pm"],"isApproved":["yes"],"isFeatured":["no"],"eventsTagOnline":["online"],"eventAudience":["General public"],"startDate":["20220311"],"statusCode":["16"]},"metaData":{"O":"20220311","c":"Join this webinar to hear our experts share their insights and perspectives on the Government\'s proposed Social Unemployment Insurance scheme.","eventsTagOnline":"online","eventBlurb":"null","eventStartTime":"12:30pm","endDate":"20220311","eventSummary":"In Budget 2021, the New Zealand government announced a commitment to the development of a Social Unemployment Insurance scheme. Developed by a tripartite...","url":"https%3A%2F%2Fwww.wgtn.ac.nz%2Fevents%2F2022%2F03%2Funemployment-insurance-smart-idea-or-poor-process-and-poor-policy-making","d":"11Mar2022","startDate":"20220311","eventsTagCost":"free","t":"Unemployment insurance: Smart idea? Or poor process and poor policy making?","eventLocation":"Online (Zoom)","eventsTagCategory":"General events","eventOwner":"Responsive","assetId":"1992355","eventAudience":"General public","isApproved":"yes","statusCode":"16","contactEmail":"madeleine.rashbrooke@vuw.ac.nz,madeleine.rashbrooke@vuw.ac.nz","eventEndTime":"1:30pm","isFeatured":"no"},"tags":[],"customData":{},"relatedDocuments":{},"uniqueId":"1992355R","favourited":true}]';

  $(".ls-trigger").click(function (e) {
    console.log(e);
    window.localStorage.setItem("savedEvents", fakeObject);
  });

  Storage.prototype.setItem = new Proxy(Storage.prototype.setItem, {
    apply(target, thisArg, argumentList) {
      const event = new CustomEvent("localstorage", {
        detail: {
          key: argumentList[0],
          oldValue: thisArg.getItem(argumentList[0]),
          newValue: argumentList[1],
        },
      });

      window.dispatchEvent(event);
      // checkSavedItems();
      return Reflect.apply(target, thisArg, argumentList);
    },
  });

  Storage.prototype.removeItem = new Proxy(Storage.prototype.removeItem, {
    apply(target, thisArg, argumentList) {
      const event = new CustomEvent("localstorage", {
        detail: {
          key: argumentList[0],
        },
      });
      window.dispatchEvent(event);
      return Reflect.apply(target, thisArg, argumentList);
    },
  });

  Storage.prototype.clear = new Proxy(Storage.prototype.clear, {
    apply(target, thisArg, argumentList) {
      const event = new CustomEvent("localstorage", {
        detail: {
          key: "__all__",
        },
      });
      window.dispatchEvent(event);
      return Reflect.apply(target, thisArg, argumentList);
    },
  });

  var notificationCount = 0;

  // !Listen to storage changes from other windows on same domain
  window.addEventListener("storage", (e) => {
    // When local storage changes, dump the list to
    // the console.
    console.log(e);
    console.log(window.localStorage);
    if (e.key.includes("saved")) {
      console.log(e);
      checkSavedItems(e.key);
      notificationCount++;

      if (notificationCount > 0) {
        // Show main menu notification count
        if ($(".menu-notifcations").length) {
          $(".menu-notifcations").show();
        } else {
          $(".header-toggle .tray-toggle").append(
            "<div class='menu-notifcations'>" + notificationCount + "</div>"
          );
        }
        // Inner tab notification
        if ($(".t-saved .notification").length) {
          $(".t-saved .notification").show();
        } else {
          $(".t-saved span").append("<div class='notification'></div>");
        }

        // Show inner tab notifcation count
        $(".tabs .notification").show();
        $(".tabs .notification").text(notificationCount);
      }
    }
  });

  // !Listen to local storage on CURRENT PAGE
  window.addEventListener(
    "localstorage",
    function (e) {
      if (e.detail.key.includes("saved")) {
        console.log(e.detail);
        checkSavedItems(e.detail.key);
        notificationCount++;

        if (notificationCount > 0) {
          // Show main menu notification count
          if ($(".menu-notifcations").length) {
            $(".menu-notifcations").show();
          } else {
            $(".header-toggle .tray-toggle").append(
              "<div class='menu-notifcations'>" + notificationCount + "</div>"
            );
          }
          // Inner tab notification
          if ($(".t-saved .notification").length) {
            $(".t-saved .notification").show();
          } else {
            $(".t-saved span").append("<div class='notification'></div>");
          }

          // Show inner tab notifcation count
          $(".tabs .notification").show();
          $(".tabs .notification").text(notificationCount);
        }
      }

      // }
    },
    false
  );

  // !Remove default icon injected on all role="button" elements
  $(".btn-expander").addClass("no-icon");

  // !Temporary override of toolkit hiding
  $(".sidemenu  ul > .has-submenu").css("display", "flex");
  // Window resize event
  // var windowWidth = $(window).width();
  // $(window).resize(function () {
  //   var windowWidth = $(window).width();
  // });

  // Append accordians
  $(".saved-items").append(
    "<div class='group-title trigger scholarships-title'><div><i class='icons8-graduation-scroll'></i><span>Scholarships (<span class='count'>" +
      0 +
      "</span>)</span></div><i class='icons8-expand-arrow'></i></div>"
  );
  $("<ul class='item-list scholarships-list'></ul>").insertAfter(
    ".scholarships-title"
  );

  $(".saved-items").append(
    "<div class='group-title trigger events-title'><div><i class='icons8-schedule'></i><span>Events (<span class='count'>" +
      0 +
      "</span>)</span></div> <i class='icons8-expand-arrow'></i></div>"
  );
  $("<ul class='item-list events-list'></ul>").insertAfter(".events-title");

  $(".saved-items").append(
    "<div class='group-title trigger clubs-title'><div><i class='icons8-theatre-mask'></i><span>Clubs (<span class='count'>" +
      0 +
      "</span>)</span></div> <i class='icons8-expand-arrow'></i></div>"
  );
  $("<ul class='item-list clubs-list'></ul>").insertAfter(".clubs-title");

  $(".saved-items").append(
    "<div class='group-title trigger pages-title'><div><i class='icons8-news'></i><span>Pages (<span class='count'>" +
      0 +
      "</span>)</span></div> <i class='icons8-expand-arrow'></i></div>"
  );
  $("<ul class='item-list pages-list'></ul>").insertAfter(".pages-title");

  // SAVED EVENTS LISTS
  function checkSavedItems(item) {
    var nameMaps = {
      savedEvents: "events",
      savedScholarships: "scholarships",
      savedClubs: "clubs",
      savedPages: "pages",
    };
    if (item == "savedEvents") {
      var noResultsUrl = "https://cms.wgtn.ac.nz/events";
    } else if (item == "savedScholarships") {
      noResultsUrl = "https://cms.wgtn.ac.nz/scholarships/find-scholarships";
    } else if (item == "savedClubs") {
      noResultsUrl = "https://cms.wgtn.ac.nz/students/campus/clubs/directory";
    }

    if (item) {
      if (nameMaps[item] !== undefined) {
        setTimeout(() => {
          if (localStorage[item]) {
            var items = JSON.parse(localStorage[item]);
          }

          if (items && items.length > 0) {
            var itemsLength = items.length;
          } else {
            itemsLength = 0;
          }

          if (items && items.length > 0) {
            $("." + nameMaps[item] + "-list")
              .prev()
              .find(".count")
              .text(items.length);

            var first5 = items.slice(0, 5);
            first5.forEach(function (e) {
              // If liveUrl exists we presume it follows the Funnelback structure of 'title' and 'liveUrl', e.g. for Events
              if (e.liveUrl) {
                if (nameMaps[item] == "events") {
                  $("." + nameMaps[item] + "-list").append(
                    "<li>  <a target='_blank' href='" +
                      e.liveUrl +
                      "'><span class='item-dates'>" +
                      moment(e.metaData.O).format("ddd DD MMM YYYY") +
                      "</span>" +
                      e.title +
                      "</a></li>"
                  );
                } else {
                  $("." + nameMaps[item] + "-list").append(
                    "<li><a target='_blank' href='" +
                      e.liveUrl +
                      "'>" +
                      e.title +
                      "</a></li>"
                  );
                }
              } else {
                $("." + nameMaps[item] + "-list").append(
                  "<li><a target='_blank' href='" +
                    e.url +
                    "'>" +
                    e.name +
                    "</a></li>"
                );
              }
            });

            if (
              $("." + nameMaps[item] + "-list").find(".accordion-buttons")
                .length
            ) {
              // Do not append
            } else {
              $("." + nameMaps[item] + "-list").append(
                "<div class='accordion-buttons'></div>"
              );

              if (items.length > 0) {
                $("." + nameMaps[item] + "-list .accordion-buttons").append(
                  "<a class='btn rounded no-icon secondary view-all' href='#'>View all <i class='icons8-external-link'></i></a>"
                );
              }
              $("." + nameMaps[item] + "-list .accordion-buttons").append(
                "<a class='btn rounded no-icon primary add-more' href='#'>Add more <i class='icons8-external-link'></i></a>"
              );
            }
          }
          if (itemsLength == 0) {
            $("." + nameMaps[item] + "-list")
              .prev()
              .addClass("empty");
            $("." + nameMaps[item] + "-list").append(
              "<div class='empty-message'>Nothing here... <a target='_blank' href='" +
                noResultsUrl +
                "'>Add some!</a></div>"
            );
          } else {
            $("." + nameMaps[item] + "-list")
              .prev()
              .removeClass("empty");
            $("." + nameMaps[item] + "-list")
              .find(".empty-message")
              .hide();
          }
        }, 100);
      }
    }
  }
  checkSavedItems("savedEvents");
  checkSavedItems("savedScholarships");
  checkSavedItems("savedClubs");
  checkSavedItems("savedPages");

  // Trigger to open/close items in saved items
  $(".group-title").on("click", function (e) {
    $(this).toggleClass("active");
    $(this).next().slideToggle("fast");
    $(this).find("i").toggleClass("flipped");
  });

  var resizeTallBlip = function (el, hide) {
    if (hide) {
      $tallBlip.css({
        top: 0,
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

  // var $sideMenuBlip = $("#mega-nav .sidemenu-homepage .sidemenu-blip");
  // var resizeSideMenuBlip = function (el, hide) {
  //   if (hide) {
  //     $sideMenuBlip.css({
  //       top: 0,
  //       height: "0px",
  //     });
  //   } else {
  //     $sideMenuBlip.css({
  //       top: el.offset().top - el.parents("#mega-nav").offset().top,
  //       left: el.offset().left - $("#mega-nav").offset().left,
  //       height: el.outerHeight(),
  //     });
  //   }
  // };

  // // Tabs
  // $("<div class='tabs'><div class='blip'></div><div class='tab t-menu active'>Menu</div><div class='tab t-saved'>Saved <div class='notification'>2</div></div><div class='tab'>Other</div></div>").insertAfter(".menu-container .tray-close")

  // !TAB BLIP MOVEMENT LOGIC
  var $tabBlip = $(".tabs .blip");
  $(".tabs .tab").click(function () {
    $(".tabs .tab").removeClass("active");
    $(this).addClass("active");

    // Hide notification is there is one
    $(".menu-notifcations").hide();
    if ($(this).find(".notification")) {
      $(this).find(".notification").hide();
      notificationCount = 0;
    }

    if ($(this).hasClass("t-menu")) {
      $(".tray-main-nav").show();
      $(".saved-header").hide();
      $(".saved-items").hide();
    } else {
      $(".tray-main-nav").hide();
      $(".saved-header").show();
      $(".saved-items").show();
    }
  });
  $(".tabs .tab-background").on("mouseover", function () {
    $tabBlip.css({
      left: $(this).offset().left - $(".tabs").offset().left,
      width: $(this).outerWidth(),
    });
  });

  // Initial position
  var activeItem = $(".tabs .tab.active").parent();
  if (activeItem.length) {
    $tabBlip.css({
      left: activeItem.offset().left - $(".tabs").offset().left,
      width: activeItem.outerWidth(),
    });
  }

  $(".tabs").on("mouseout", function () {
    var activeItem = $(".tabs .tab.active").parent();
    if (activeItem.length) {
      $tabBlip.css({
        left: activeItem.offset().left - $(".tabs").offset().left,
        width: activeItem.outerWidth(),
      });
    }
  });

  // !TRAY MENU BLIP
  var $tallBlip = $(".main-nav-list .tall-blip");

  $(".main-nav-list > li ").on("mouseenter", function () {
    resizeTallBlip($(this));
  });
  $(".main-nav-list").on("mouseleave", function () {
    var activeItem = $(".main-nav-list > li.active");
    if (!activeItem.length) {
      resizeTallBlip($(this), true);
    }
  });

  // Initial position
  var activeItem = $(".main-nav-list > li.active");
  if (activeItem.length) {
    $tallBlip.css({
      top:
        activeItem.offset().top -
        activeItem.parents(".main-nav-list").offset().top,
      height: activeItem.outerHeight(),
    });
  }

  $(".tray-main-nav").on("mouseleave", function () {
    var activeItem = $(".main-nav-list > li.active");
    if (activeItem.length) {
      resizeTallBlip(activeItem);
    }
  });

  // !CUSTOM DROPDOWN
  $(".custom-dropdown .selector").on("click", function (e) {
    $(this).next().slideToggle("fast");
    $(this).toggleClass("open");
  });
  $(".custom-dropdown ul li").on("click", function (e) {
    // Clear open class on selector
    if ($(".custom-dropdown .selector").hasClass("open")) {
      $(".custom-dropdown .selector").removeClass("open");
    }

    // Toggle active class
    $(".custom-dropdown ul li").removeClass("active");
    $(this).addClass("active");

    // Set text to value
    $(this).parent().prev().find(".selector-text").text($(this).text());
    // Close list on click
    $(this).parent().slideToggle("fast");
    var text = $(this).text().toLowerCase();
    showSavedData(text);
  });

  var showSavedData = function (e) {
    console.log(e);

    $(".no-results").slideUp();

    // Make titles visible
    $(".group-title").hide();
    $(".group-title").removeClass("active");

    $(".item-list").hide();
    $("." + e + "-title").css("display", "flex");
    $("." + e + "-title").click();
  };

  // !MAIN NAV LIST ACCORDIONS
  $(".tray .main-nav-item ul li").each(function (e) {
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
  $(".tray .main-nav-item > a, .tray .main-nav-item > .btn-expander").on(
    "click",
    function (e) {
      $(this).parent().toggleClass("expanded");
      $(this).parent().find(">a").toggleClass("active");

      // Find any active/expanded children and close them
      $(this).parent().find(">ul .active").removeClass("active");
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
  );

  // Inner accordion
  $(".tray .nav-item-parent.has-submenu .btn-expander").on(
    "click keypress",
    function (e) {
      // If enter or left-click
      var activeItem = $(".main-nav-item.active");

      setTimeout(() => {
        resizeTallBlip(activeItem);
      }, 300);

      if (e.which == 13 || e.which == 1) {
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
}

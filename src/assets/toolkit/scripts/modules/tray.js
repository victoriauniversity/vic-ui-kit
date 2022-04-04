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

  $(".ls-trigger").click(function (e) {
    console.log(e);
    window.localStorage.setItem(
      "savedScholarships",
      '[{"rank":1,"score":0,"title":"A K Elliot sadsdasdasd!","collection":"vic-schols-push","component":0,"collapsed":null,"liveUrl":"https://www.wgtn.ac.nz/scholarships/current/a-k-elliot-memorial-scholarship","summary":"1727054 https% 3A% 2F% 2Fwww.wgtn.ac.nz% 2Fscholarships% 2Fcurrent% 2Fa-k-elliot-memorial-scholarship 256.","cacheUrl":"/s/cache?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Fa-k-elliot-memorial-scholarship&profile=_default_preview","date":null,"fileSize":5565,"fileType":"xml","tier":1,"docNum":48,"exploreLink":null,"kmFromOrigin":null,"quickLinks":null,"displayUrl":"https://www.wgtn.ac.nz/scholarships/current/a-k-elliot-memorial-scholarship","clickTrackingUrl":"/s/redirect?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Fa-k-elliot-memorial-scholarship&auth=3phxo37ZFdx6vI4nWgWX9w&profile=_default_preview&rank=1&query=%21showall","explain":null,"indexUrl":"https://www.wgtn.ac.nz/scholarships/current/a-k-elliot-memorial-scholarship","gscopesSet":[],"documentVisibleToUser":true,"promoted":false,"diversified":false,"listMetadata":{"studyAreas":["Business"],"t":["A K Elliot Memorial Scholarship"],"contents":["Study Area(s): Business Subject Area(s): N/A --> Scholarship Level: Doctoral"," Master’s Research"," All postgraduate Closing Date(s): 1 November Tenure: One year Number offered: One Value: Approximately $5,000 (subject to funds available) Description This scholarship is to help students conduct research in the field of librarianship. History This scholarship arises from a bequest under the Will of Miss Agnes King Elliot, former President of the New Zealand Library Association, who died in 1982. Eligibility The scholarship is open to applicants who, in the year of tenure will be enrolled as Master\'s or PhD students undertaking a research degree in Information Studies, and intend to pursue a research topic in the field of Librarianship in New Zealand. Criteria Applicants must be intending to enrol in Master\'s by research or PhD degree in Information Studies at Victoria University of Wellington (preference will be given to a specialisation in Library Science (LIBR) or Archives and Records Management (ARCR). Applicants must be intending to pursue a research topic in the field of Librarianship in New Zealand. Application process <p>A completed online application must be submitted by 4.30 pm on the closing date. Late or incomplete applications will not be accepted. Any required supporting documentation (including references) must also be received by 4.30 pm on the closing date in order for the application to be considered.</p><p>Applications will normally open one month prior to the closing date. If no application link is provided below, check back again closer to the closing date. <a href=\\"https://cms.wgtn.ac.nz/scholarships/scholarships-office\\">Contact us</a> if you have any queries.</p> Scholarship specific documentation A brief description of the research topic to be undertaken Selection process The successful recipient will be selected by Head of School of Information Management in consultation with appropriate staff from the school. In making the award the panel may take into consideration academic and"],"level":["Doctoral"," Master’s Research"," All postgraduate"],"closing1":["2021-11-01"],"history":["This scholarship is open to applicants who, in the year of tenure will be enrolled as Masters or PhD students undertaking a research degree in Library and Information Studies, and intend to pursue a research topic in the field of Librarianship in New Zealand."],"subjectAreas":["Information Systems"],"value":["5000"],"tenure":["One year"]},"metaData":{"history":"This scholarship is open to applicants who, in the year of tenure will be enrolled as Masters or PhD students undertaking a research degree in Library and Information Studies, and intend to pursue a research topic in the field of Librarianship in New Zealand.","subjectAreas":"Information Systems","t":"A K Elliot Memorial Scholarship","tenure":"One year","level":"Doctoral; Master’s Research; All postgraduate","closing1":"2021-11-01","studyAreas":"Business","value":"5000","contents":"Study Area(s): Business Subject Area(s): N/A --> Scholarship Level: Doctoral; Master’s Research; All postgraduate Closing Date(s): 1 November Tenure: One year Number offered: One Value: Approximately $5,000 (subject to funds available) Description This scholarship is to help students conduct research in the field of librarianship. History This scholarship arises from a bequest under the Will of Miss Agnes King Elliot, former President of the New Zealand Library Association, who died in 1982. Eligibility The scholarship is open to applicants who, in the year of tenure will be enrolled as Master\'s or PhD students undertaking a research degree in Information Studies, and intend to pursue a research topic in the field of Librarianship in New Zealand. Criteria Applicants must be intending to enrol in Master\'s by research or PhD degree in Information Studies at Victoria University of Wellington (preference will be given to a specialisation in Library Science (LIBR) or Archives and Records Management (ARCR). Applicants must be intending to pursue a research topic in the field of Librarianship in New Zealand. Application process <p>A completed online application must be submitted by 4.30 pm on the closing date. Late or incomplete applications will not be accepted. Any required supporting documentation (including references) must also be received by 4.30 pm on the closing date in order for the application to be considered.</p><p>Applications will normally open one month prior to the closing date. If no application link is provided below, check back again closer to the closing date. <a href=\\"https://cms.wgtn.ac.nz/scholarships/scholarships-office\\">Contact us</a> if you have any queries.</p> Scholarship specific documentation A brief description of the research topic to be undertaken Selection process The successful recipient will be selected by Head of School of Information Management in consultation with appropriate staff from the school. In making the award the panel may take into consideration academic and"},"tags":[],"customData":{},"relatedDocuments":{},"favourited":"true","notice":"true"},{"rank":2,"score":0,"title":"ACC \\"Jonathan Nicholls\\" Scholarship","collection":"vic-schols-push","component":0,"collapsed":null,"liveUrl":"https://www.wgtn.ac.nz/scholarships/current/acc-jonathan-nicholls-scholarship","summary":"1727395 https% 3A% 2F% 2Fwww.wgtn.ac.nz% 2Fscholarships% 2Fcurrent% 2Facc-jonathan-nicholls-scholarship 256.","cacheUrl":"/s/cache?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Facc-jonathan-nicholls-scholarship&profile=_default_preview","date":null,"fileSize":7614,"fileType":"xml","tier":1,"docNum":140,"exploreLink":null,"kmFromOrigin":null,"quickLinks":null,"displayUrl":"https://www.wgtn.ac.nz/scholarships/current/acc-jonathan-nicholls-scholarship","clickTrackingUrl":"/s/redirect?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Facc-jonathan-nicholls-scholarship&auth=8tLSz%2FazWKSu0vNF1vtDww&profile=_default_preview&rank=2&query=%21showall","explain":null,"indexUrl":"https://www.wgtn.ac.nz/scholarships/current/acc-jonathan-nicholls-scholarship","gscopesSet":[],"documentVisibleToUser":true,"promoted":false,"diversified":false,"listMetadata":{"studyAreas":["Business"," Science"],"t":["ACC \\"Jonathan Nicholls\\" Scholarship"],"contents":["Study Area(s): Business"," Science Subject Area(s): N/A --> Scholarship Level: All postgraduate"," Returning students Closing Date(s): 31 October Tenure: One year Number offered: One Value: $5,000 (please see additional information) Description In honour of Jonathan Nicholls (ACC\'s Head of Actuarial Services who passed away in early 2015), ACC wishes to promote the actuarial profession in much the same way that Jonathan did. ACC is dedicated to supporting Actuarial Science students and others looking to pursue a career in the actuarial profession. ACC&rsquo","s actuarial team provides support to ACC and the Ministry of Social Development. This allows for a unique opportunity for any potential internship offered, as the successful candidate could be placed in either of the two agencies. As such, a successful student would have the chance to gain exposure to a variety of areas where actuarial skills can be applied, including a combination of traditional and non-traditional areas. History This scholarship is funded by ACC and has been established as a legacy for Jonathan Nicholls, the former Head of Actuarial Services at ACC, who was passionately committed to growing and developing the actuarial profession. The purpose of the scholarship is to promote, develop and grow students wishing to pursue a career as an Actuary. It is also an investment towards local talent to provide a student in Mathematics, Statistics, Economics, Finance or specifically Actuarial Science with financial support to complete their final year of study at Victoria University of Wellington. Eligibility This scholarship is offered to current students (undergraduate or postgraduate) at Victoria University of Wellington. The applicants are expected to have commitment to working in the actuarial profession, a good academic record, communication skills (ability to explain complex ideas clearly both verbally and in writing), motivation to achieve, committed to achieving agreed objectives and working in the actuarial profession and meeting the needs of our"],"level":["All postgraduate"," Returning students"],"closing1":["2021-10-31"],"history":["This scholarship is open to students currently studying (undergraduate or postgraduate) at Victoria University of Wellington. Applicants must be studying Actuarial Science, Economics, Finance, Mathematics, or Statistics. Preference will be given to applicants who are intending to finish their studies in the next year and have completed ACTS201."],"subjectAreas":["Actuarial Science"," Economics"," Finance"," Mathematics"," Statistics"],"value":["5000"],"tenure":["One year"]},"metaData":{"subjectAreas":"Actuarial Science; Economics; Finance; Mathematics; Statistics","history":"This scholarship is open to students currently studying (undergraduate or postgraduate) at Victoria University of Wellington. Applicants must be studying Actuarial Science, Economics, Finance, Mathematics, or Statistics. Preference will be given to applicants who are intending to finish their studies in the next year and have completed ACTS201.","tenure":"One year","t":"ACC \\"Jonathan Nicholls\\" Scholarship","closing1":"2021-10-31","studyAreas":"Business; Science","level":"All postgraduate; Returning students","value":"5000","contents":"Study Area(s): Business; Science Subject Area(s): N/A --> Scholarship Level: All postgraduate; Returning students Closing Date(s): 31 October Tenure: One year Number offered: One Value: $5,000 (please see additional information) Description In honour of Jonathan Nicholls (ACC\'s Head of Actuarial Services who passed away in early 2015), ACC wishes to promote the actuarial profession in much the same way that Jonathan did. ACC is dedicated to supporting Actuarial Science students and others looking to pursue a career in the actuarial profession. ACC&rsquo;s actuarial team provides support to ACC and the Ministry of Social Development. This allows for a unique opportunity for any potential internship offered, as the successful candidate could be placed in either of the two agencies. As such, a successful student would have the chance to gain exposure to a variety of areas where actuarial skills can be applied, including a combination of traditional and non-traditional areas. History This scholarship is funded by ACC and has been established as a legacy for Jonathan Nicholls, the former Head of Actuarial Services at ACC, who was passionately committed to growing and developing the actuarial profession. The purpose of the scholarship is to promote, develop and grow students wishing to pursue a career as an Actuary. It is also an investment towards local talent to provide a student in Mathematics, Statistics, Economics, Finance or specifically Actuarial Science with financial support to complete their final year of study at Victoria University of Wellington. Eligibility This scholarship is offered to current students (undergraduate or postgraduate) at Victoria University of Wellington. The applicants are expected to have commitment to working in the actuarial profession, a good academic record, communication skills (ability to explain complex ideas clearly both verbally and in writing), motivation to achieve, committed to achieving agreed objectives and working in the actuarial profession and meeting the needs of our"},"tags":[],"customData":{},"relatedDocuments":{},"favourited":"true","notice":"false"},{"rank":3,"score":0,"title":"Ahunuku Māori Summer Research Scholarship 2021-2022","collection":"vic-schols-push","component":1,"collapsed":null,"liveUrl":"https://www.wgtn.ac.nz/scholarships/current/ahunuku-maori-summer-research-scholarship-2020-2021","summary":"1886794 https% 3A% 2F% 2Fwww.wgtn.ac.nz% 2Fscholarships% 2Fcurrent% 2Fahunuku-maori-summer-research-scholarship-2020-2021 256.","cacheUrl":"/s/cache?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Fahunuku-maori-summer-research-scholarship-2020-2021&profile=_default_preview","date":null,"fileSize":8313,"fileType":"xml","tier":1,"docNum":112,"exploreLink":null,"kmFromOrigin":null,"quickLinks":null,"displayUrl":"https://www.wgtn.ac.nz/scholarships/current/ahunuku-maori-summer-research-scholarship-2020-2021","clickTrackingUrl":"/s/redirect?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Fahunuku-maori-summer-research-scholarship-2020-2021&auth=TCV3AvGOkTVV80%2BjDpYtQw&profile=_default_preview&rank=3&query=%21showall","explain":null,"indexUrl":"https://www.wgtn.ac.nz/scholarships/current/ahunuku-maori-summer-research-scholarship-2020-2021","gscopesSet":[],"documentVisibleToUser":true,"promoted":false,"diversified":false,"listMetadata":{"studyAreas":["Science"],"t":["Ahunuku Māori Summer Research Scholarship 2021-2022"],"contents":["Study area(s): Science Subject Area(s): N/A --> Scholarship level: Returning students"," Honours"," Master\'s by coursework Closing date(s): 20 September 2021 Award for: Māori Value: $6,000 Description The Ahunuku Māori Summer Research Scholarship 2021-2022 is available through GNS Science, Te Pū Ao over the summer. Selected scholars are expected to contribute a minimum of 400 hours to the project between November 2021 and February 2022. All projects must be completed by the start of Trimester 1, 2022. Each scholarship will have a value of $6,000, paid in four equal instalments. Eligibility and conditions Applicants must be Māori, or of Māori descent. Applicants will be selected on the basis of academic merit, expertise in the research area, and recommendations from GNS staff associated with the project. Applicants must have completed at least two years of their undergraduate degree and are currently enrolled at any Australian or New Zealand University in an undergraduate, Honours, or first year of a Masters\' degree. Selected applicants must comply with the standard Summer Research Scholarship conditions . Students enrolled in a PhD or Masters by Thesis programs are not eligible. Application process Applications for the 2021-2022 Ahunuku Māori Summer Scholarships will be open from 6 September 2021 and close 20 September 2021 at 4.30 pm (New Zealand time zone). To apply for any of the following projects, an online application must be submitted by 4.30 pm on the closing date. When applying, please note the corresponding scholarship code for each project. Late or incomplete applications will not be accepted. Any required supporting documentation (including references) must also be received by 4.30 pm on the closing date in order for the application to be considered. For further details on the projects or for any questions about the scholarship, please contact summer-research@vuw.ac.nz. 2021-2022 Project details Scholarship project code: 900 - Development of a new calibration to reconstruct past air and water"],"level":["Returning students"," Honours"," Master\'s by coursework"],"closing1":["2021-09-20"],"subjectAreas":["Nursing"],"category":["Māori"],"value":["$6,000"]},"metaData":{"level":"Returning students; Honours; Master\'s by coursework","value":"$6,000","subjectAreas":"Nursing","studyAreas":"Science","closing1":"2021-09-20","t":"Ahunuku Māori Summer Research Scholarship 2021-2022","category":"Māori","contents":"Study area(s): Science Subject Area(s): N/A --> Scholarship level: Returning students; Honours; Master\'s by coursework Closing date(s): 20 September 2021 Award for: Māori Value: $6,000 Description The Ahunuku Māori Summer Research Scholarship 2021-2022 is available through GNS Science, Te Pū Ao over the summer. Selected scholars are expected to contribute a minimum of 400 hours to the project between November 2021 and February 2022. All projects must be completed by the start of Trimester 1, 2022. Each scholarship will have a value of $6,000, paid in four equal instalments. Eligibility and conditions Applicants must be Māori, or of Māori descent. Applicants will be selected on the basis of academic merit, expertise in the research area, and recommendations from GNS staff associated with the project. Applicants must have completed at least two years of their undergraduate degree and are currently enrolled at any Australian or New Zealand University in an undergraduate, Honours, or first year of a Masters\' degree. Selected applicants must comply with the standard Summer Research Scholarship conditions . Students enrolled in a PhD or Masters by Thesis programs are not eligible. Application process Applications for the 2021-2022 Ahunuku Māori Summer Scholarships will be open from 6 September 2021 and close 20 September 2021 at 4.30 pm (New Zealand time zone). To apply for any of the following projects, an online application must be submitted by 4.30 pm on the closing date. When applying, please note the corresponding scholarship code for each project. Late or incomplete applications will not be accepted. Any required supporting documentation (including references) must also be received by 4.30 pm on the closing date in order for the application to be considered. For further details on the projects or for any questions about the scholarship, please contact summer-research@vuw.ac.nz. 2021-2022 Project details Scholarship project code: 900 - Development of a new calibration to reconstruct past air and water"},"tags":[],"customData":{},"relatedDocuments":{},"favourited":"true","notice":"false"},{"rank":5,"score":0,"title":"Alastair Whitelaw Undergraduate Scholarship in History","collection":"vic-schols-push","component":6,"collapsed":null,"liveUrl":"https://www.wgtn.ac.nz/scholarships/current/alastair-whitelaw-undergraduate-scholarship-in-history","summary":"1982276 https% 3A% 2F% 2Fwww.wgtn.ac.nz% 2Fscholarships% 2Fcurrent% 2Falastair-whitelaw-undergraduate-scholarship-in-history 256.","cacheUrl":"/s/cache?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Falastair-whitelaw-undergraduate-scholarship-in-history&profile=_default_preview","date":null,"fileSize":5880,"fileType":"xml","tier":1,"docNum":6,"exploreLink":null,"kmFromOrigin":null,"quickLinks":null,"displayUrl":"https://www.wgtn.ac.nz/scholarships/current/alastair-whitelaw-undergraduate-scholarship-in-history","clickTrackingUrl":"/s/redirect?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Falastair-whitelaw-undergraduate-scholarship-in-history&auth=oDILcipOUZqSHUq83hlpSA&profile=_default_preview&rank=5&query=%21showall","explain":null,"indexUrl":"https://www.wgtn.ac.nz/scholarships/current/alastair-whitelaw-undergraduate-scholarship-in-history","gscopesSet":[],"documentVisibleToUser":true,"promoted":false,"diversified":false,"listMetadata":{"studyAreas":["Humanities"],"t":["Alastair Whitelaw Undergraduate Scholarship in History"],"contents":["Study area(s): Humanities Subject Area(s): N/A --> Scholarship level: Returning students Closing date(s): 30 April Tenure: 1 year Award for: Māori"," Pasifika Number offered: One Value: $3,000 Description This Scholarship arises from a bequest under the Will of Alastair Whitelaw, who died in 2015. Teaching and history were both his lifelong passion. He graduated from Victoria University of Wellington in 1955. He went on to complete an MA at Oxford and had a long career as a secondary school teacher. He taught history at both St Kentigern&rsquo","s and King&rsquo","s College in Auckland where he was also a Boarding Housemaster. This Scholarship is designed to encourage and support&nbsp","Māori or Pasifika&nbsp","students to pursue study in History at Victoria University of Wellington-Te Herenga Waka. History This scholarship is to support a Māori or Pasifika student studying in 300 level in History. Eligibility Applicants for this scholarship must be enrolled, or be intending to enrol in&nbsp","300 level&nbsp","in History at Victoria University of Wellington - Te Herenga Waka. Selection will be based on academic merit. Criteria Applicants must be of Māori or Pasifika descent. Applicants must be currently enrolled or intending to enrol in&nbsp","300 level&nbsp","&nbsp","in History at Victoria University of Wellington. Applicants must be majoring in History. Application Process <p>A completed online application must be submitted by 4.30 pm on the closing date. Late or incomplete applications will not be accepted. Any required supporting documentation (including references) must also be received by 4.30 pm on the closing date in order for the application to be considered.</p><p>Applications will normally open one month prior to the closing date. If no application link is provided below, check back again closer to the closing date. <a href=\\"https://cms.wgtn.ac.nz/scholarships/scholarships-office\\">Contact us</a> if you have any queries.</p> Apply online Scholarship specific documentation A personal statement outlining the desired"],"level":["Returning students"],"closing1":["2022-04-30"],"history":["This Scholarship arises from a bequest under the Will of Alastair Whitelaw, who died in 2015. Teaching and history were both his lifelong passion. He graduated from Victoria University of Wellington in 1955. He went on to complete an MA at Oxford and had a long career as a secondary school teacher. He taught history at both St Kentigern’s and..."],"subjectAreas":["History"],"category":["Māori"," Pasifika"],"tenure":["1 year"]},"metaData":{"studyAreas":"Humanities","category":"Māori; Pasifika","subjectAreas":"History","closing1":"2022-04-30","tenure":"1 year","history":"This Scholarship arises from a bequest under the Will of Alastair Whitelaw, who died in 2015. Teaching and history were both his lifelong passion. He graduated from Victoria University of Wellington in 1955. He went on to complete an MA at Oxford and had a long career as a secondary school teacher. He taught history at both St Kentigern’s and...","contents":"Study area(s): Humanities Subject Area(s): N/A --> Scholarship level: Returning students Closing date(s): 30 April Tenure: 1 year Award for: Māori; Pasifika Number offered: One Value: $3,000 Description This Scholarship arises from a bequest under the Will of Alastair Whitelaw, who died in 2015. Teaching and history were both his lifelong passion. He graduated from Victoria University of Wellington in 1955. He went on to complete an MA at Oxford and had a long career as a secondary school teacher. He taught history at both St Kentigern&rsquo;s and King&rsquo;s College in Auckland where he was also a Boarding Housemaster. This Scholarship is designed to encourage and support&nbsp;Māori or Pasifika&nbsp;students to pursue study in History at Victoria University of Wellington-Te Herenga Waka. History This scholarship is to support a Māori or Pasifika student studying in 300 level in History. Eligibility Applicants for this scholarship must be enrolled, or be intending to enrol in&nbsp;300 level&nbsp;in History at Victoria University of Wellington - Te Herenga Waka. Selection will be based on academic merit. Criteria Applicants must be of Māori or Pasifika descent. Applicants must be currently enrolled or intending to enrol in&nbsp;300 level&nbsp;&nbsp;in History at Victoria University of Wellington. Applicants must be majoring in History. Application Process <p>A completed online application must be submitted by 4.30 pm on the closing date. Late or incomplete applications will not be accepted. Any required supporting documentation (including references) must also be received by 4.30 pm on the closing date in order for the application to be considered.</p><p>Applications will normally open one month prior to the closing date. If no application link is provided below, check back again closer to the closing date. <a href=\\"https://cms.wgtn.ac.nz/scholarships/scholarships-office\\">Contact us</a> if you have any queries.</p> Apply online Scholarship specific documentation A personal statement outlining the desired","level":"Returning students","t":"Alastair Whitelaw Undergraduate Scholarship in History"},"tags":[],"customData":{},"relatedDocuments":{},"favourited":"true","notice":"true"}]'
    );
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

            // Append accordion buttons
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
                  "<a target='_blank' class='btn rounded no-icon secondary view-all' href=''>View all <i class='icons8-external-link'></i></a>"
                );
              }
              $("." + nameMaps[item] + "-list .accordion-buttons").append(
                "<a target='_blank' class='btn rounded no-icon primary add-more' href='" +
                  noResultsUrl +
                  "'>Add more <i class='icons8-external-link'></i></a>"
              );
            }

            // Clear old list
            $("." + nameMaps[item] + "-list li").remove();

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
                  if (
                    !$("." + nameMaps[item] + "-list li > a")
                      .text()
                      .includes(e.title)
                  ) {
                    // If the accordion buttons exist, insert BEFORE
                    if (
                      $("." + nameMaps[item] + "-list").find(
                        ".accordion-buttons"
                      )
                    ) {
                      $(
                        "<li><a target='_blank' href='" +
                          e.liveUrl +
                          "'>" +
                          e.title +
                          "</a></li>"
                      ).insertBefore(
                        $("." + nameMaps[item] + "-list").find(
                          ".accordion-buttons"
                        )
                      );
                    } else {
                      // else append to list
                      $("." + nameMaps[item] + "-list").append(
                        "<li><a target='_blank' href='" +
                          e.liveUrl +
                          "'>" +
                          e.title +
                          "</a></li>"
                      );
                    }
                  }
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

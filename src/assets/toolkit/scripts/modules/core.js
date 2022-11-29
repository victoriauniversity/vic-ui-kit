// Import other standalone libraries
import UrlManager from "./urls";
import LazyLoader from "./lazyloader";

const envConfig = require("../env.conf.json");

/**
 * A collection of shareable lightweight libraries and functions
 * requiring no external dependencies, reusable across multiple
 * templates and environments. Can be also use as a lightweight
 * alternative to the beefy `toolkit.js`.
 */

/* Hide levy info on courses page */
function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
// Hide link for bots in case bot-version of page gets cached, e.g. on /events
if (document.getElementById("clickLinks")) {
  if (
    !navigator.userAgent.match(/baidu|bing|msn|teoma|slurp|yandex|funnelback/i)
  ) {
    document.getElementById("clickLinks").style.display = "none";
  }
}
let searchParams = new URLSearchParams(window.location.search);

function hideCourseLevies() {
  if (window.location.pathname.includes("/courses/")) {
    // searchParams.has('leviesTest')
    // console.log('is courses', window.location.pathname.includes('/courses/'));

    // console.log('hide levies');
    // console.log( searchParams.has('leviesTest')  );
    // $('.fees-est').hide();

    // let assLevy = document.querySelector('.fees-est .cost-items > div:nth-child(3)');
    // let servLevy = document.querySelector('.fees-est .cost-items > div:nth-child(4)');
    // let totalLevy = document.querySelector('.cost-items > div:nth-child(6)');

    $(".clear-cart-wrap")
      .first()
      .before(
        '<p style="margin-top: .5rem; font-size: .9rem;" class="levy-text"></p>'
      );

    let feeLocation = document.querySelector("#fees-type");
    function updateLocation() {
      // console.log(feeLocation.value);

      feeLocation.addEventListener("change", function (e) {
        setLevyText();
      });
    }

    function removeLevies() {
      let assLevy = document.querySelector(
        ".fees-est .cost-items > div:nth-child(3)"
      );
      let servLevy = document.querySelector(
        ".fees-est .cost-items > div:nth-child(4)"
      );
      let totalLevy = document.querySelector(".cost-items > div:last-child");

      assLevy ? assLevy.remove() : null;
      servLevy ? servLevy.remove() : null;
      totalLevy ? totalLevy.remove() : null;
    }

    removeLevies();

    document.querySelector(".fees-est").addEventListener(
      "DOMNodeInserted",
      function (event) {
        feeLocation = document.querySelector("#fees-type");
        // console.log('content change', event.target);
        if (
          document.querySelector(".fees-est .cost-items > div:nth-child(3)")
        ) {
          removeLevies();
          updateLocation();
        }
      },
      false
    );

    updateLocation();

    function setLevyText() {
      if (feeLocation.value == "domestic") {
        let levyText = `You will also pay an annual <a href="https://www.wgtn.ac.nz/students/money/fees/student-services-levy-faqs">Student Services Levy</a>.`;
        $(".levy-text").html(levyText);
      } else {
        let levyText = `You will also pay an annual <a href="https://www.wgtn.ac.nz/students/money/fees/student-services-levy-faqs">Student Services Levy</a>.`;
        $(".levy-text").html(levyText);
      }
    }

    setLevyText();
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  // Your code to run since DOM is loaded and ready

  waitForElm(".course-item-list").then(function () {
    // console.log('hide');
    hideCourseLevies();
  });

  waitForElm(".site-header").then(function () {
    // Remove Blackboard link if it's still there (cache)
    if (
      document.location.pathname.split("/")[1] == "courses" ||
      document.location.pathname.split("/")[1] == "explore"
    ) {
      setTimeout(() => {
        var target = $("header ul[role=menubar] > li").filter(function (i, el) {
          return $(el).find(">a").text() == "Blackboard";
        });

        if (target[0]) {
          target.remove();
        }
      }, 100);
    }
  });
  // Else normal page (not t&p apps)
  if (
    document.location.pathname.split("/")[1] !== "courses" &&
    document.location.pathname.split("/")[1] !== "explore"
  ) {
    var target = $("header .menu-bar > a").filter(function (i, el) {
      return $(el).text() == "Blackboard";
    });
    if (target[0]) {
      target.remove();
    }
  }
});

// Check toolbar for mode=dev and apply class
if (
  document.location.href.includes("SQ_DESIGN_NAME=v4") ||
  document.location.href.includes("local.wgtn") ||
  document.location.href.includes("assets/git_bridge/0009/1778031/dist")
) {
  $("body").attr("id", "hubv4");
}

/* END Hide levy info on courses page */

export function initToolbarUrlListeners() {
  UrlManager.onLoadWhenQueryExists("toolbar", () => {
    if (window.toolkitToolbarLoader)
      window.toolkitToolbarLoader("https://www.wgtn.ac.nz/api/toolbar/staff");
  });

  UrlManager.onLoadWhenQueryExists("mytools", () => {
    if (window.toolkitToolbarLoader)
      document.location.href = "https://puaha.wgtn.ac.nz/signin";
  });
}

// eslint-disable-next-line import/prefer-default-export
export function initToolbarLoader(extraDependenciesList) {
  const WINDOW_NAMESPACE_TOOLBAR_LOADER = "toolkitToolbarLoader",
    WINDOW_NAMESPACE_TOOLBAR = "toolkitToolbar",
    minifiedString = envConfig.name === "production" ? ".min" : "",
    URL_SCRIPT_TOOLBAR = `//${envConfig.server.host}${
      envConfig.name === "development" ? `:${envConfig.server.port}` : ""
    }/toolkit.toolbar${minifiedString}.js`;

  // Public API endpoint
  window[WINDOW_NAMESPACE_TOOLBAR_LOADER] = (configObjectOrUrl) => {
    // 1) Assemble dependencies
    const configEndpointUrl =
      typeof configObjectOrUrl === "string" ? configObjectOrUrl : null;
    let configObject =
      typeof configObjectOrUrl === "object" ? configObjectOrUrl : undefined;

    const toolbarDependenciesList = [
      { url: URL_SCRIPT_TOOLBAR, namespace: WINDOW_NAMESPACE_TOOLBAR },
    ];

    if (extraDependenciesList && extraDependenciesList.length > 0) {
      extraDependenciesList.forEach((extraDependency) =>
        toolbarDependenciesList.push(extraDependency)
      );
    }

    if (!configObject && configEndpointUrl) {
      // Config & data model's URL is available - add it to the dependencies
      toolbarDependenciesList.push({
        url: configEndpointUrl,
        onSuccess: (responseObject) => {
          configObject = responseObject;
        },
      });
    } else if (!configObject) {
      // Nor config & data model object -or- RESTful API is available
      console.error(
        "A toolbar requires valid configuration and model object or URL (%s) to the RESTful API endpoint that would return this object. Toolbar dialog will not be opened.",
        configEndpointUrl,
        configObject
      );
      return;
    }

    //TODO: 2) Turn on full screen loading service

    // 3) Load all dependencies asynchronously (skip if already available yet)
    LazyLoader(toolbarDependenciesList, (errors) => {
      // TODO: 4) Turn off full screen loading service

      // All dependencies *MUST BE* loaded, otherwise skip the initialisation
      if (!errors) {
        // 5A) Init and open
        const toolbarManager = window[WINDOW_NAMESPACE_TOOLBAR];

        if (toolbarManager) {
          try {
            const toolbarInstance = toolbarManager.initToolbar(configObject);
            toolbarInstance.show();
          } catch (err) {
            console.error(err);
          }
        } else {
          console.error(
            `Toolbar library is not available on the global scope (window.${WINDOW_NAMESPACE_TOOLBAR}) - the toolbar dialog will not be initialised and opened.`
          );
        }
      } else {
        // 5B) Report errors
        console.error(
          "Unable to lazy load all the dependencies required to initialise and open the Toolbar dialog.",
          errors
        );
      }
    });
  };
}

// Expose to the global scope
window.toolkitCore = {
  initToolbarUrlListeners,
  initToolbarLoader,
};

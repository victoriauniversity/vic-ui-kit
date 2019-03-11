# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).





## [Unreleased]



### Added


- **Updated logos** - New logo format.
- **Tooltip UI** - Can be automatically or dynamically initialised, used as a part of `toolkit` library or standalone. Can be triggered 'on hover' or 'on click'.
- **Basic configuration for unit testing and snapshotting** - Can be run through `npm run test`.
- **Template block with image** - Container template to display an image with text and title.
- **Template Pattern to display multiple videos** - Container template to display a grid of youtube videos with image title and description.
- **Class for tall banner** - Added for engagement hub. Class tall for people banners.
- **Intranet Search** - Styles for intranet search landing page and results.
- **Hooks (JS) to execute any code dependent on scripts or libraries that load later** - Enables us to componentise and couple scripts with the related UI (HTML and CSS).



### Enhanced

- **PDF tag's colour aligned with colour of the red generic tag**
- **PG/UG switcher - Automatically loads the content of the tab that is selected when the page is rendered**
- **Updates all 3rd party build & deployment libraries to their latest versions**
- **Hub mega menu expand Icon** - Expand icon changed to down caret.



## Production release: [v0.10.6] - 2019-03-12

### Added

- **Alphabet pagination** - added pagination modifier to function as alphabet navigation.


## Production release: [v0.10.5] - 2018-08-25

### Enhanced

- **Interaction and business logic for popups has been turned into standalone library**
- **Build & Deployment 3rd party libraries updated to their latest versions**
- **The JS partially refactored to the latest coding standard (~ 30%)**

## Production release: [v0.10.4] - 2018-07-19

### Fixed

- **HOTFIX IE and Safari bug where body content and footer was collapsing**

- **HOTFIX If the parameter is not supplied to the tracking's custom track method, ignore it**


## Production release: [v0.10.3] - 2018-07-19

### Enhanced

- **Post grad degrees and quals search filter** - New method in studyareas.js to filter by search on school homepage switcher.


## Production release: [v0.10.2] - 2018-06-26


### Added

- **Staff contact card prototypes**


### Enhanced

- **Tracking API extended by allowing for extra custom data** - Extra custom data can be pushed into Google Tag Manager using API or data attribute `data-gtm-vars` (JSON string format).


## Production release: [v0.10.1] - 2018-06-14

### Enhanced

- **Google tag manager tracking added for Research hub Megamenu** - Code and tracking events added for menu expand and links clicked.


## Production release: [v0.10.0] - 2018-06-06


### Added

- **ESLint and SassLint - Static code analysis for CSS and JS** - To improve consistency, styles, add error checking, reduce debugging times etc.
- **New component: Expandable sidebar menu** - New version of the menu for desktop and mobile that allows to 'expand' submenus by clicking on the expanding button. Implements GTM tracking to compare normal link clicks with expandable button clicks.
- **New component: Tiles** - clickable area for list of important things. Has 3 variations - one for short lists and large tiles, longer list with smaller tiles and strip tiles.
- **New header** - Lighter version of the original header (e.g. for top level section, such as Research).
- **`Go to top` button** - Shows on mobile devices, when the 'snappy' version of header is available.
- **New component: Mega menu** - Two-dimensional submenu used in main content.
- **Various testing prototypes** - New hubs for the IA project: Study, Experience, Research and About.
- **Favicons and desktop icons for all modern devices** - Including Windows Metro, high resolution smartphones, Android and iOS.
- **Mobile logo for the new header on mobile devices**



### Fixed

- **Stage and production code deployment** - Code is now properly processed (especially minification and compression) and exported to the stage and production environments.
- **Behaviour of the auto-collapsing header strip now more consistent** - Fully reviewed and refactored styles and scripts. The behaviour logic was vastly simplified to avoid unexpected issues.
- **Header's snappy behaviour on mobile redesigned** - Snaps to the top when scrolling up, hides when scrolling down more consistently.
- **Mobile menu does not disappear when scrolling** - Dark overlay added, user now needs to either click on the darkened background outside of the mobile menu or cross icon to close the menu.
- **Responsive breakpoints now scale linearly** - Gaps in between breakpoints resolved by using decimal points for em units and pixel precision for image breakpoints.
- **Full-size content banner no longer bleeds out over the content's inner boundaries**
- **Margins and paddings in small UI elements** - Missing spacing, double spacing, random values and other similar issues fixed in various UI elements.
- **Pagination - the 'Next' button is now placed above the page numbers** - instead of below.
- **(IE only) Removes underlines from under the icons that are used inside hyperlinks**
- **Background images scale, crop and centre properly on newer browsers**



### Enhanced

- **Updated all the packages and 3rd party libraries to the latest stable releases** - Most important ones were Gulp, webpack and SASS (required rewriting building and deployment process due to resulting incompabilities).
- **Series of typographical improvements** - The vertical flow improved by increased spacing between headings and other content. Victoria font kerning decreased to improve readability, line heights and vertical spacing between content elements made more consistent.
- **Featured researcher widget, staff listing and staff detail structure and styles redesigned and merged** - Made the structure more reusable, e.g. a single staff card template can now be used in the staff list, in the ride hand sidebar, on the staff profile or completely on it's own within any content page. Also allows us to display non-staff profiles without any inline styles.
- **`Bourbon-neat` SASS library repurposed for grid layouts only**
- **Top-level layout improvements** - Layout positioning changed from tables to flex with left floating fall-backs. All the main layout building blocks updated to the latest standards. Columns in the three-column layout now resize based on the perceived importance.
- **Shadows made more consistent and stronger**
- **New header - Alignment of menu items improved** - Search icon moved to the right side on the desktop devices.
- **`Admin edit` button redesigned and moved into the toolkit** - Look more consistent with some other global buttons (e.g. 'go to top' button). Using external styles instead of inline styles (improved reusability).
- **Long breadcrumb items are enabled and ellipsised on mobile** - Breadcrumbs are no longer hidden on the mobile devices. Long items are shortened by adding ellipsis (...).
- **Page abstract made bold** - Consistent with bold heading, increases importance.
- **Date of publishing (news, events) changed to `subtitle`** - As a result, it is now grey and bold.
- **Reviewed and refactored old inline javascripts found on Faculty and School Squiz templates** - Scripts were removed from the Squiz and their refactored versions were added to the `toolkit.js` bundle. Improves re-usability, maintainability and performance. Includes: Staff's taught courses listing displayer, new top menu highlighter, email decoding utility, 'edit' button, admin-only warning notification messages.
- **Increases vertical spacing around `<hr>` content separator, adds border**
- **Visited links are now purple** - Accessibility improvement, helps with navigation.
- **Footer links - Underline decoration added** - to make them consistent with other website links.
- **Styles were completely re-structured and divided into core + project-based parts** - 'Core' introduces utility-first SCSS variables, mixins and functions that can be re-used for all University's digital projects without being too restrictive with regards to used classes or total amount of imported code. Core part heavily documented, a lot of generic styles made more consistent, including typography, sizing, animations, borders, .
- **Completely rewritten building and deployment process** - Single Gulp file broken down into multiple isolated task files, deprecated code replaced with modern one, better environment configuration and separation, building times in development environment singificantly reduced.
- **Documentation** - Updating example components, adding API description for GTM tracking library, cleaning up prototypes, examples and unused components.
- **Toolkit's script bundle broken down to independent JS plugins** - Standalone plugins can be now used on any website without the main toolkit.js included. Added `toolkit.tracking.js` which provides API extending Google Tag Manager event tracking.
- **Font size in the ride hand column and pop ups increased to the standard size** - Improves readability and consistency.
- **Colours of the file badges adjusted and softened**
- Updated the UI Kit documentation to be less Faculty and Site site specific.
- News/Events pagination - improved floating of the pagination on all devices. Also Improved colour of pagination buttons.
- Improved base button styles - now includes an arrow icon by default.
- Improved form styling.
- Improved the lists presentation in the Components section.
- Grouped the components better in the UI Kit Components section.



### Removed

- **Dependency on `Bourbon` SASS library** - Some of the dependencies moved into our own core library.
- **Unused 3rd party libraries** - Review done and obsolete or unused libraries were cleaned up (e.g. Velocity.js).
- **Removes jQuery from the toolkit's scripts** - Allows us to use `toolkit.js` bundle (and any other standalone toolkit plugins) on most of the old templates with old jQuery included without running into initialisation or version conflicts.





## Production release: [v0.9.4] - 2017-01-30

### Added

- Victoria's logo - green and black coloured versions. Standard, high and extra high quality versions of all colour combinations.
- Events listing now allow an inline image.


### Fixed

- Replaces Fabricator's favicon by Victoria's one.





## Production release: [v0.9.3] - 2016-11-28

### Added

- Support for Yarn package manager.


### Enhanced

- 1/3 video promo box - class `.outside` added to <figure> puts the video description ouside of the video so the video image is not covered by it. 
- Renames the repository and updates all the references.


### Fixed

- Top menu bar - Menu links aligned on the right are now clickable on smaller resolutions (eg. tablets, smaller desktops).
- Small version of the Victoria logo is no longer missing on the mobile devices.





## Production release: [v0.9.2] - 2016-11-07

### Added

- News overview - `.portrait` version of the image when width-to-height ratio is portrait-like.
- Automatic wrapping and support for Vimeo and Google Maps embeds (both full size and inlined).
- 4 different notification messages - error, warning, information and successful.
- Tags for filtering.
- Adds icons to the content tabbed bar on the homepage.
- Breadcrumbs navigation for desktop and tablet devices.
- Simple gallery for media with captions. Can be used by wrapping media items (= figures with class `media` applied to them) into ```<section class="gallery"> ... </section>```.
- Full width study area blocks stretch to full width even view without an image.
- Adds better social icons for: YouTube, Twitter, LinkedIN, Facebook and Instagram.


### Fixed

- Alignment, spacing and margins in news articles were improved.
- Staff listing - if there is no department in the introduction, do not use delimiting dot. 
- Homepage, introduction block - simplified and optimised, delimiting line is now separating two columns correctly (without gaps).
- Mobile devices - users are now able to perform click actions on the top 2/3 of the screen.
- Content tabbed bar arrow works for all display sizes on IE11+. 
- Tables, highlight and promo boxes are being properly cleared when there are preceded by a floated element.


### Enhanced

- Structure, flexibility and customisation options of the library (eg. header and footer all fully customisable for every single template page).
- Homepage banner - improved responsive behavior, added hovering animation.
- Alignment and styling of the tabbed content bar on the homepage.
- Full width study area block is now floating properly: call-to-action button is positioned after description on desktop and after subjects on mobile.
- Footer is now 'sticky' on desktop devices - if there's a very little content, the footer sticks to the bottom of the page.
- Side menu - Adds icon and decreases font size of the 'back' button, improves alignment and positioning of the nested elements.





## Production release: [v0.9.1] - 2016-10-13

### Added 

- Link to the audio file can be specified through class `.link-audio`.
- Staff listing and staff profiles now have contact icons.
- Quotes blocks (citation and source or author) - you can now use ```<figure class="quote full"> ... </figure>``` for important citations (eg. at the beginning or end of an article) or ```<figure class="quote"> ... </figure>``` for standard quoting.
- Quotes (just a citation) - ```<blockquote class="quote"> ... </blockquote>```


### Fixed

- `List of links` made more flexible: Adds constant left padding for multiple lines, allows for non-link elements (such as descriptions or authors), improves the quality of the bullet point-like strip line.
- Improves the `positioning of icons by default` (at beginning of the element instead of its end).
- Fixes margins of `document labels` when placed inside formatted paragraph. Label must be *always* placed on the end of an element (compared to list of links where label is always on the start of the element).
- Fixed series of UI issues in Global navigation bar and mobile menu. 


### Enhanced 

- Staff profile, detail - vertical alignment of the job description was adjusted.
- Staff profile, detail, currently taught courses - Spacing between elements increased.
- Staff listing made more responsive.





## Production release: v0.9.0 - 2016-10-12


### Added

- Icons can now be used as following inside lists, buttons and links:
```html
<span class="icon-heart"></span>
``` 
- List of all available icons added to the library's `Overview` page.
- Classes `.link-external`, `.link-more` and `.link-download` can be used for standard links or listed links (on <a> element) to simplify adding specific icon to the element.
- Name of the site (faculty/school) can be wrapped in ```<span class="large"></span>``` to make the font size larger (eg. when the site's name is very short).
- New icons of `quotes` and `music note`.
- After a page load, YouTube iframes now automatically get wrapped in div `embed` that makes the video responsive.
- Adds line separator and light grey background to the promo boxes that were missing it.
- Adds icons into the footer and events listing.


### Enhanced

- Better icons in sidebar menu and decreased padding from the edges, currently active item made more visible.


### Removed

- Duplicate font icon files.


### Fixed

- Removes the fixed height of the main content column to avoid vertical overflow issues on the homepage.
- Main layout columns do no longer overflow when elements (eg. tables) inside calculate their width incorrectly.





[Unreleased]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.10.6...dev

[v0.10.6]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.10.5...v0.10.6
[v0.10.5]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.10.4...v0.10.5
[v0.10.4]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.10.3...v0.10.4
[v0.10.3]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.10.2...v0.10.3
[v0.10.2]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.10.1...v0.10.2
[v0.10.1]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.10.0...v0.10.1
[v0.10.0]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.9.4...v0.10.0
[v0.9.4]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.9.3...v0.9.4
[v0.9.3]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.9.2...v0.9.3
[v0.9.2]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.9.1...v0.9.2
[v0.9.1]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.9.0...v0.9.1





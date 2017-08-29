# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).





## [Unreleased]
## Pre-release: [v0.10.0] - 2017-08-29

### Added

- New 'tiles' component - clickable area for list of important things. Has 3 variations - one for short lists and large tiles, longer list with smaller tiles and strip tiles.
- Prototypes - New hubs for the IA project; Study, Experience, Research and About.
- 

### Enhanced

- Updated the UI Kit documentation to be less Faculty and Site site specific.
- News/Events pagination - improved floating of the pagination on all devices. Also Improved colour of pagination buttons.
- Improve base button styles - now includes an icon by default
- Improved form styling
- Imporved the lists presentation in the Components section.
- Group the components better in the UI Kit Components section.

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





[Unreleased]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.9.4...dev

[v0.9.4]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.9.3...v0.9.4
[v0.9.3]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.9.2...v0.9.3
[v0.9.2]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.9.1...v0.9.2
[v0.9.1]: https://github.com/victoriauniversity/vic-ui-kit/compare/v0.9.0...v0.9.1


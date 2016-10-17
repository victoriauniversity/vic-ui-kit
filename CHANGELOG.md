# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).





## [Unreleased]


### Added 

- News overview - `.portrait` version of the image when width-to-height ratio is portrait-like.
- Automatic wrapping and support for Vimeo and Google Maps embeds (both full size and inlined).
- 4 different notification messages - error, warning, information and successful.
- Tags for filtering.



### Fixed

- Alignment, spacing and margins in news articles were improved.
- Staff listing - if there is no department in the introduction, do not use delimiting dot. 



### Enhanced

- Structure, flexibility and customisation options of the library (eg. header and footer all fully customisable for every single template page).






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





[Unreleased]: https://github.com/victoriauniversity/vuw-styleguide/compare/v0.9.1...develop

[v0.9.1]: https://github.com/victoriauniversity/vuw-styleguide/compare/v0.9.0...v0.9.1

<img style="max-width: 20rem; float: right;" src="https://upload.wikimedia.org/wikipedia/en/8/86/Vuw-logo.png">

# Victoria UI Kit

[![GitHub stable release](https://img.shields.io/github/release/victoriauniversity/vuw-styleguide.svg?label=last%20stable%20release)]() 
[![Build Status](https://travis-ci.org/victoriauniversity/vuw-styleguide.svg)](https://travis-ci.org/victoriauniversity/vuw-styleguide) ([Changelog](https://github.com/victoriauniversity/vuw-styleguide/blob/develop/CHANGELOG.md)) &mdash; [Project at GitHub](https://github.com/victoriauniversity/vuw-styleguide)


**Victoria UI Kit is a style guide and UI pattern library providing base CSS, JavaScript and HTML markup required to build websites and applications affiliated with [Victoria University of Wellington](www.victoria.ac.nz)**.

By building new web projects on top of this library, developers can quickly reuse out of the box layouts and UI components, gaining following advantages:

 * Saving a lot of development time by not 'reinventing the wheel'
 * Using code that has been extensively tested and conforms to the front end best practices
 * Consistent 'Victoria look' (brand colours, paddings, typography, fonts and many more)
 * New features, improvements and bug fixes with simple update (can be fully automated)





<a name="start"></a>
## Quick Start


To include Victoria's UI styles in your project, copy-paste the following code snippet into the ```<head>``` element in your project:

```html
<link rel="stylesheet" type="text/css" href="https://github.com/victoriauniversity/vuw-styleguide/blob/gh-pages/assets/toolkit/styles/toolkit.css">
```


If you wish to use complex dynamic components that **require JavaScript** to work properly (see [Components](/components.html)), include jQuery and Victoria's UI Scripts library just before the closing ```</body``` tag:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js" integrity="sha384-3ceskX3iaEnIogmQchP8opvBy3Mi7Ce34nWjpBIwVTHfGYWQS9jwHDVRnpKKHJg7" crossorigin="anonymous"></script>
<script src="https://github.com/victoriauniversity/vuw-styleguide/blob/gh-pages/assets/toolkit/scripts/toolkit.js"></script>
```

<div class="flash-message info">
  <p>
  In the foreseeable future, all JS and CSS files should be versioned and served from by CDN. 
  </p>
</div>





## Next Steps

If you plan to **build new application and override or extend Victoria UI's code base**, it is highly recommended to understand and follow basic architectural principles first. In that case, start by reading through [Architecture & Layout](/architecture-layout.html).

In case you are **only maintaining** already built application based on Victoria UI, explore all available [Components](/components.html) and see how they can be best used in [Examples](/examples.html).

<div class="flash-message warning">
  <p>
  If your web application extends Victoria UI code base and adds new components or alters existing ones, you need to follow its documentation to learn about all the differences.
  </p>
</div>





<a name="contribution"></a>
## How to contribute

Even though the Victoria UI library is mostly maintained by the [Web Team], any form of contribution is highly appreciated.

To report a bug, request a feature or simply discuss your ideas, please either: 
 * submit a ticket in [project's GitHub repository](https://github.com/victoriauniversity/vuw-styleguide/issues), or
 * directly contribute to the code base by [creating a pull request](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project) into project's [develop branch](https://github.com/victoriauniversity/vuw-styleguide/tree/develop).





<a name="support"></a>
## Support and contact

For any urgent inquiries, contact [Nathan Irwin](http://www.victoria.ac.nz/search?q=Nathan+Irwin&site=people_search_collection) or other members of the [Web Team].













[Web Team]: http://www.victoria.ac.nz/search?q=web+developer&site=people_search_collection

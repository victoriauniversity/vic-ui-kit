<a name="architecture"></a>
# Architecture

Learn what architectural design principles does the Victoria UI Kit follow. Its understanding is crucial to be able to build advanced , 


## Versioning

Project adheres to [Semantic Versioning](http://semver.org/). All releases and pre-releases are tagged in GitHub and changes summarised in [project's changelog](https://github.com/victoriauniversity/vic-ui-kit/blob/develop/CHANGELOG.md).

<div class="flash-message success">
  <p>
    <strong>PRO TIP:</strong> If you are including the library through a package manager (Bower, npm etc.), it is safe to assume that minor releases will not introduce any breaking changes - whenever a minor version is released, you can let your package manager auto-update the library. 
  </p>
</div>





## Styles


### SASS, SCSS



### Bourbon and Neat frameworks



### ITCSS Architecture

Victoria UI Styles follows **Inverted Triangle Cascading StyleSheets** (ITCSS) architecture - a set of principles and practices by which developers should group and order their CSS in order to keep the styles scalable, terse, logical, and manageable.

Simply said, ITCSS is building styles in layers from the lowest to highest specificity (~ from most generic rules to least generic rules). 

As the specificity of every layer is gradually increasing, styles in every layer can easily build on top of the styles from all the layers before them (top to bottom): 

<img src="http://technotif.com/wp-content/uploads/2015/04/Manage-Large-CSS-Projects-With-ITCSS.jpg">

This leads to a cleaner and more maintainable stylesheets:

<img src="https://willianjusten.com.br/assets/img/itcss/itcss.png">

#### Theming

Theming is handled by completely by SCSS. There is no body class to apply a theme, you must load a different css file. Follow these steps to declare a new theme:

1. Create a new master file in the root styles folder with the filename: `toolkit.[your-theme-name].scss`
<div class="flash-message info">
  <p>The gulp task manager will only compile a scss with this naming convention</p>
</div>

2. Copy/Paste the structure from toolkit.scss into your new master file.
<div class="flash-message info">
  <p>toolkit.scss imports a set of indexes for the partials. If you need to add a new component, add it to the index file in it's respective folder.</p>
</div>

3. Create an override scss file in the _00-themes folder with the same name as your theme: `_overrides.[your-theme-name].scss`
<div class="flash-message info">
  <p>This file should only contain variable declarations. Unfortunately color variables like $brand-green set in 0-core need to be declared here aswell due to load order and the way that 0-core is currently set up.</p>
</div>

4. To see you theme in action, add `theme: [your-theme-name]` at the top of a material file so fabricator/handlerbars can load the new css.
<div class="flash-message info">
  <p>------<br/>
  theme: [your-theme-name]<br/>
  ------</p>
</div>




#### Layers and structure

The library separates the styles into following layers, each represented by similarly named folders (ordered from most generic to least generic):

 - **THEME OVERRIDES** - Variables which override defaults declared in the following files.
 - **SETTINGS** - Configs, brand colors, spacing units, variables.
 - **TOOLS** - Library's custom mixins, 3rd party mixins.
 - **GENERIC** - Generic definitions, eg. resets, normalisations, imports of external styles and fonts. 
 - **ELEMENTS (BASE)** - Non-specific elements (= without classes or IDs), eg. body, h1, p ...
 - **OBJECTS** - Simple atomic design patterns (= using classes only), eg. buttons, icons,...
 - **COMPONENTS** - More complex designs (using classes only), eg. header, footer, searchbar...
 - **TRUMPS** - Most specific, mostly overrides (usage of !important and IDs).

<div class="flash-message warning">
  <p>
    By not following ITCSS structure when extending or overriding the Victoria UI Styles, your code can become hardly maintainable as your project grows. ITCSS keeps the <a href="https://en.wikipedia.org/wiki/Separation_of_concerns">separation of concerns</a> high.
  </p>
</div>



#### Learn more about ITCSS

- [Manage large CSS projects with ITCSS (YouTube - 14:43)](https://www.youtube.com/watch?v=hz76JIU_xB0)
- [Harry Roberts - Managing CSS Projects with ITCSS, 1:13:51](https://www.youtube.com/watch?v=1OKZOV-iLj4)
 




## Scripts






<a name="layout"></a>
# Layout

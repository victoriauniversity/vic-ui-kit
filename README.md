[![GitHub stable release](https://img.shields.io/github/release/victoriauniversity/vic-ui-kit.svg?label=last%20stable%20release)]() 
[ ![Codeship Status for victoriauniversity/vic-ui-kit](https://app.codeship.com/projects/6f8cf750-81fe-0134-4879-1e33cd15468d/status)](https://app.codeship.com/projects/182365)

([Changelog](https://github.com/victoriauniversity/vic-ui-kit/blob/master/CHANGELOG.md)) &mdash; [Full Documentation](https://static.victoria.ac.nz/)


# Victoria UI Kit

**Victoria UI Kit is a style guide and UI pattern library providing base CSS, JavaScript and HTML markup required to build websites and applications affiliated with [Victoria University of Wellington](https://www.victoria.ac.nz)**.

By building new web projects on top of this library, developers can quickly reuse out of the box layouts and UI components, gaining following advantages:

 * Saving a lot of development time by not 'reinventing the wheel'
 * Using code that has been extensively tested and conforms to the front end best practices
 * Consistent 'Victoria look' (brand colours, paddings, typography, fonts and many more)
 * New features, improvements and bug fixes with simple update (can be automated)





## Quick Start 

To use the UI Kit in your project(s), [read the Style Guide](https://static.victoria.ac.nz/#start).





## Development and Contributions

If you want to contribute to the project by adding new features, enhancing existing ones or fixing bugs, it is good to do few things first:

* Read through the [documentation](https://static.victoria.ac.nz/) - focus on sections [Architecture & Layout](https://static.victoria.ac.nz/architecture-layout.html) to understand how is the library built and [Components](https://static.victoria.ac.nz/architecture-layout.html) to know what's already included.
* If you're not sure how to contribute to a GitHub project, familiarise yourself with [how it works](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project) first.



1. Fork off from [dev branch](https://github.com/victoriauniversity/vic-ui-kit/tree/dev).
2. To run the project on a local machine, execute the following command in the root directory of your fork: 
    ```shell
    npm start
    ``` 
    This command will build the code, spawn a simple web server and automatically open the Style Guide in your default browser. Javascript, styles and templates are being 'watched' so any changes will instantly rebuild the project and live reload the browser.

3. Hack your feature/enhancement/fix.
4. Test your changes in all supported browsers.
5. Before pushing your branch  run ``` gulp build-bridge --prod ``` This will rebuild the dist folder which we now use directly in squiz to serve the UIKIT via a gitbridge. 
6. Create a pull request into the [dev branch](https://github.com/victoriauniversity/vic-ui-kit/tree/dev).
7. Your pull request will be reviewed and tested - if everything is OK, it will be added to a next production release. 
8. Feel good!





## Supported browsers

 * Internet Explorer 10+
 * Safari 9+ (OS X and iOS only)
 * Chrome 44+
 * Firefox 42+
 * Opera 39+ (desktop only)





## Requirements and dependencies

 * jQuery 3.1+
 * *(only contributing developers)* Node.js 5+ and npm 3+. Is currently broken using Node > 11. Recommend installing ```n``` and switching to node 11:
 ``` shell
npm install -g n
sudo n 11
```
 * *(only contributing developers)* Git 2+

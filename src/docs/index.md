<img style="max-width: 20rem; float: right;" src="https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Victoria_University_of_Wellington_logo.svg/2560px-Victoria_University_of_Wellington_logo.svg.png">

# Victoria UI Kit

[ ![Codeship Status for victoriauniversity/vic-ui-kit](https://app.codeship.com/projects/6f8cf750-81fe-0134-4879-1e33cd15468d/status)](https://app.codeship.com/projects/182365)


**Victoria UI Kit is a style guide and UI pattern library providing base CSS, JavaScript and HTML markup required to build websites and applications on the main Victoria Web channel**.



<div class="flash-message error">

  If you wish to use this UI Kit you need to contact [Nathan Irwin](https://www.wgtn.ac.nz/search?q=Nathan+Irwin&site=people_search_collection) or other members of the [Web Team].

  This isn't a supported self service UI package.

</div>

If you require branding for your applcation please see our application [Brand guide](http://toolkit.wgtn.ac.nz/digital-brand)


<a name="start"></a>
## Quick Start


To include Victoria's UI styles in your project, copy-paste the following code snippet into the ```<head>``` element in your project:

```html
<link rel="stylesheet" type="text/css" href="https://www.wgtn.ac.nz/__data/assets/git_bridge/0005/1778018/dist/toolkit.min.css">
```


If you wish to use complex dynamic components that **require JavaScript** to work properly (see [Components](/components.html)), include and Victoria's UI Scripts library just before the closing ```</body>``` tag:

```html
<script src="https://www.wgtn.ac.nz/__data/assets/git_bridge/0005/1778018/dist/toolkit.min.js"></script>
```

It is recommend to hotlink the libraries from CDN as shown above. However, if you wish to bundle them with your project, you can [Download any given release](https://github.com/victoriauniversity/victoria-ui-releases/releases) or even use a package manager, such as NPM or Yarn:

```shell
yarn add https://github.com/victoriauniversity/victoria-ui-releases.git#releases --save
```



<a name="contribution"></a>
## How to contribute

Even though the Victoria UI library is maintained by the [Web Team], any form of contribution is highly appreciated.

To report a bug, request a feature or simply discuss your ideas, please either: 
 * submit a ticket in [project's GitHub repository](https://github.com/victoriauniversity/vic-ui-kit/issues), or
 * directly contribute to the code base by [creating a pull request](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project) into project's [dev branch](https://github.com/victoriauniversity/vic-ui-kit/tree/dev).





<a name="support"></a>
## Support and contact

For any urgent inquiries, contact [Nathan Irwin](https://www.wgtn.ac.nz/search?q=Nathan+Irwin&site=people_search_collection) or other members of the [Web Team].








[Web Team]: https://www.wgtn.ac.nz/search?q=web+team&site=people_search_collection

export default {
  title: 'Components/Nav/GlobalNav',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The main global top-navigation layout block. Handles structural media query breakpoints for desktop navigation links, responsive mobile menus, embedded site search routing inputs, and Transformicons (`.tcon`) animated toggle triggers.',
      },
    },
  },
  // Setting up interactive control variables
  argTypes: {
    searchPlaceholder: { control: 'text', name: 'Search Placeholder' },
    searchActionUrl: { control: 'text', name: 'Form Submit URL (action)' },
    simulateMobileView: { 
      control: 'boolean', 
      name: 'Simulate Mobile Classes',
      description: 'Forces layout shifts into mobile topology structures for debugging inside standard viewports.'
    },
    menuActiveState: {
      control: 'boolean',
      name: 'Menu Active Class',
      description: 'Toggles structural framework state classes directly on the container layer.'
    }
  },
  args: {
    searchPlaceholder: 'Search Victoria for…',
    searchActionUrl: '//wgtn.ac.nz/search',
    simulateMobileView: false,
    menuActiveState: false,
  },
  render: (args) => {
    // Structural state calculations
    const viewClasses = [
      'global',
      args.simulateMobileView ? '-mobile-forced' : '',
      args.menuActiveState ? 'nav-is-open' : ''
    ].filter(Boolean).join(' ');

    return `
      <!-- Wrapped in an explicit boundary resetting box to isolate global style injections -->
      <div class="navigation-wrapper-sandbox" style="width: 100%; font-family: sans-serif;">
        
        <div class="${viewClasses}" id="global-nav">

          <div class="menu-toggle horisontal-links">
            <a href="javascript:void(0);"><div class="logo-mini">&nbsp;</div></a>
            <a href="javascript:void(0);" class="js-toggle-global-nav" role="button" aria-label="Toggle Navigation">
              <span class="tcon tcon-menu--xcross" aria-label="toggle menu" style="float:right;">
                <span class="tcon-menu__lines" aria-hidden="true"></span>
                <span class="tcon-visuallyhidden">toggle menu</span>
              </span>
            </a>
          </div>

          <div class="menu">
            <nav>
              <div class="search">
                <form method="get" action="${args.searchActionUrl}">
                  <div role="search">
                    <a href="javascript:void(0);" class="js-toggle-global-search hide-on-mobile">
                      <span class="tcon tcon-search--xcross" aria-label="toggle search">
                        <span class="tcon-search__item" aria-hidden="true"></span>
                        <span class="tcon-visuallyhidden">toggle search</span>
                      </span>
                    </a>
                    <label class="input-wrapper -icon-search" id="global-search">
                      <input type="text" autocomplete="off" name="q" placeholder="${args.searchPlaceholder}" required style="padding: 6px 12px; font-size: 14px;">
                      <input type="submit" value="Go" style="padding: 6px 12px; cursor: pointer;">
                    </label>
                  </div>
                </form>

                <div class="horisontal-links align-center hide-on-desktop" style="margin-top: 15px; display: flex; gap: 15px; justify-content: center;">
                  <a href="#" style="text-decoration: none; color: #333;"><span class="icon-home"></span> Home</a>
                  <a href="#" style="text-decoration: none; color: #333;"><span class="icon-phone"></span> Contact</a>
                </div>
              </div>

              <div id="menu" style="display: flex; gap: 20px; align-items: center; margin-top: 15px; flex-wrap: wrap;">
                <a href="#" class="home" style="text-decoration: none; color: #333;">
                  <span class="icon-home"></span>
                  <span class="hide-on-desktop">Victoria's main site</span>
                </a>
                <a href="#" style="text-decoration: none; color: #333;">Future students</a>
                <a href="#" style="text-decoration: none; color: #333;">International students</a>
                <a href="#" style="text-decoration: none; color: #333;">Current students</a>
                <a href="#" style="text-decoration: none; color: #333;">Research</a>
                <a href="#" style="text-decoration: none; color: #333;">About Victoria</a>
              </div>

            </nav>
          </div>

        </div>

      </div>
    `;
  },
  decorators: [
    (Story, context) => {
      setTimeout(() => {
        const root = document.getElementById(context.id) || document.body;
        
        // Target structural nodes
        const navToggle = root.querySelector('.js-toggle-global-nav');
        const searchToggle = root.querySelector('.js-toggle-global-search');
        const globalNavContainer = root.querySelector('#global-nav');

        if (!globalNavContainer) return;

        // 1. Interactive Mobile Navigation Trigger Logic
        const handleNavToggle = (e) => {
          e.preventDefault();
          
          // Toggle framework visual state classes
          globalNavContainer.classList.toggle('nav-expanded');
          
          // Toggle inner transformicon animation states (.tcon-transform)
          const menuIcon = navToggle.querySelector('.tcon');
          menuIcon?.classList.toggle('tcon-transform');
          
          console.log('[Layout Loop]: Global mobile navigation display state toggled.');
        };

        // 2. Interactive Global Desktop Search Input Box Toggle Logic
        const handleSearchToggle = (e) => {
          e.preventDefault();
          
          const searchContainer = globalNavContainer.querySelector('.search');
          searchContainer?.classList.toggle('search-input-active');
          
          const searchIcon = searchToggle.querySelector('.tcon');
          searchIcon?.classList.toggle('tcon-transform');
          
          console.log('[Search Loop]: Desktop global search overlay animation toggled.');
        };

        // Bind events cleanly to freshly painted DOM canvas nodes
        navToggle?.addEventListener('click', handleNavToggle);
        searchToggle?.addEventListener('click', handleSearchToggle);

      }, 0);

      return Story();
    },
  ],
};

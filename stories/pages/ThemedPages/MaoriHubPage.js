/**
 * Assembles the full Māori Hub gateway page ecosystem matching metadata themes.
 * @param {Object} args - Parameter object containing page properties.
 * @returns {string} Fully rendered HTML output.
 */
export function createMaoriHubPage({
  theme = 'red',
  heading = 'The Living Pa',
  navColor = 'white',
  logoColor = 'green'
} = {}) {
  return `
<!-- Page Shell Context Theme Marker Hook -->
<div class="theme-${theme} layout-nav-update-maori-context" data-nav-color="${navColor}" data-logo-color="${logoColor}">

  <!-- 1. Hub Banner Side Menu Wrap -->
  <div class="sidemenu-banner-wrap centraliser" id="banner-nav">
    <div class="hub-banner-sidemenu reset-formatting">
      <a href="#" target="_blank" rel="noopener noreferrer">
        <figure class="bottom-left">
          <div class="banner-image">
            
          </div>
          <div class="banner-body">
            <div class="banner-title">
              <h1>Māori at the University</h1>
            </div>
            <div class="banner-text">
              <p>The Māori community at Te Herenga Waka—Victoria University of Wellington supports all its students to achieve success. Find out about your whānau on campus and how they can help.</p>
            </div>
          </div>
        </figure>
      </a>
    </div>
  </div>

  <!-- 2. Tall Strip Banner -->
  <div class="promo-panel strip-banner tall">
    <figure class="photo">
      <img alt="The Living Pā rendering footprint" src="https://cms.wgtn.ac.nz/?a=1741970">
      <figcaption>
        <div>
          <div class="block formatting">
            <h1>${heading}</h1>
            <p>Mō te āpōpō—For tomorrow</p>
          </div>
        </div>
      </figcaption>
    </figure>
  </div>

  <!-- 3. Central Introduction Tier & Video Promo -->
  <div class="sector">
    <div class="centraliser">
      <div class="homepage-intro block formatting">
        <div class="intro-text">
          <p>Nau mai ki te Paepae Rauemi.</p>
          <p>He wāhi rapu rauemi whakaako kua hangaia mai e Te Kura Māori ki Akopai.</p>
          <p>This resource platform houses a range of teaching resources and iwi stories that have been created to support kura and schools across Aotearoa. You will find e-books developed for the <a href="#" title="Tuia Mātauranga" class="link-external">Tuia Mātauranga Project</a> funded by the Ministry of Education.</p>
          <p>We have been privileged to work with iwi across the country to develop and share their stories with Aotearoa. Ka nui te mihi!</p>
          <p>You will also find an interactive flipchart download. This resource, <a href="#" title="He Manu Tuhituhi" class="link-external">He Manu Tuhituhi—he ara pāhekoheko</a>, was originally developed by Aronui Ltd.</p>
          <p>Be sure to visit our Taupanga | App suite to download your free desktop app version of KURA, KURA ENGLISH and PUNA.</p>
          <p>These game-based language Apps are a great way to learn the language!</p>
        </div>
        <div class="links-wrap">
          <div class="button-links">
            <a href="#" class="button large">Mātou</a>
          </div>
        </div>
      </div>

      <!-- Text Video Promo Panel Wrap -->
      <div class="text-promo-panel video">
        <div class="block centraliser">
          <figure class="media featured">
            <a href="#">
              <img alt="Kauwhata reo logo asset" src="https://cms.wgtn.ac.nz/__data/assets/image/0011/1789094/kauwhata-reo.png">
              <figcaption class="outside">
                <h4>Visit the newly developed Ministry of Education resource hub <i class="icon-triangle-right">→</i></h4>
              </figcaption>
            </a>
          </figure>
        </div>
      </div>
    </div>
  </div>

  <!-- 4. Secondary Strip Banner -->
  <div class="promo-panel strip-banner">
    <figure class="photo">
      <img alt="Students standing in front of brick wall" src="https://cms.wgtn.ac.nz/?a=1866013">
      <figcaption>
        <div>
          <div class="block formatting">
            <h1>Māori at the University</h1>
            <p>The Māori community at Te Herenga Waka—Victoria University of Wellington supports all its students to achieve success. Find out about your whānau on campus and how they can help.</p>
          </div>
        </div>
      </figcaption>
    </figure>
  </div>

  <!-- 5. Main Content Panel Structural Layout -->
  <div class="layout">
    <div class="content-panel">
      <main>
        
        <!-- Alternating Card Variant A (Image Left) -->
        <div class="promo-panel">
          <div class="block formatting centraliser">
            <figure class=" ">
              <img alt="A boy, a girl, and an older woman sitting outside a marae chatting and laughing." src="https://cms.wgtn.ac.nz/__data/assets/image/0005/1861331/varieties/ls_medium.jpg">
              <figcaption>
                <h1>Mō mātou | About us</h1>
                <p>See what the University can offer you and discover the first steps for you and your whānau on the university journey.</p>
                <a title="Mō mātou | About us button" href="#" class="button flat-border large">Mō mātou | About us</a>
              </figcaption>
            </figure>
          </div>
        </div>

        <!-- Alternating Card Variant B (Image Right via flipped source parameters) -->
        <div class="promo-panel">
          <div class="block formatting centraliser">
            <figure class=" ">
              <figcaption>
                <h1>Tautoko | Māori support</h1>
                <p>University is not a solo journey. Get connected with people who are there to help you succeed through the ups and downs of study. He toa takitini.</p>
                <a title="Tautoko | Māori support button" href="#" class="button flat-border large">Tautoko | Māori support</a>
              </figcaption>
              <img alt="3 boys and 1 girl sitting at a table in the Hub with marae mockup layout." src="https://cms.wgtn.ac.nz/__data/assets/image/0007/1861342/varieties/ls_medium.jpg">
            </figure>
          </div>
        </div>

        <!-- 6. Left Text Panel Block Variant Overlay -->
        <div class="promo-panel">
          <figure class="photo left-text-panel">
            <img alt="Pittosporum frond detail" src="https://cms.wgtn.ac.nz/__data/assets/image/0008/1864466/living-building-challenge.jpg">
            <figcaption>
              <div class="block formatting">
                <h2>The Living Pā</h2>
                <p>The Living Pā represents a fundamental shift in the way we live and work, and the way we care for the natural world around us.</p>
                <a href="#" class="button primary large">Find out more</a>
              </div>
            </figcaption>
          </figure>
        </div>

      </main>
    </div>
  </div>

</div>
  `.trim();
}

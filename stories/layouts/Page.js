const createHeader = ({ onLogin, onLogout, onCreateAccount, user }) => {
  const headerElement = document.createElement('header');
  
  const div = document.createElement('div');
  div.className = 'storybook-header';

  // Logotip i zagolovok
  const logoWrapper = document.createElement('div');
  logoWrapper.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://w3.org">
      <g fill="none" fillRule="evenodd">
        <path d="M10 0h12v32H10z" fill="#FFF" />
        <path d="M0 0h12v32H0z" fill="#91BAF8" />
        <path d="M20 0h12v32H20z" fill="#4A90E2" />
      </g>
    </svg>
    <h1>Acme</h1>
  `;
  div.appendChild(logoWrapper);

  // Blok avtorizacii (Zavisit od sostoyaniya user)
  const buttonsWrapper = document.createElement('div');
  if (user) {
    buttonsWrapper.innerHTML = `
      <span class="welcome">Welcome, <b>${user.name}</b>!</span>
      <button class="storybook-button storybook-button--small btn-logout">Log out</button>
    `;
    buttonsWrapper.querySelector('.btn-logout').addEventListener('click', onLogout);
  } else {
    buttonsWrapper.innerHTML = `
      <button class="storybook-button storybook-button--small btn-login">Log in</button>
      <button class="storybook-button storybook-button--small storybook-button--primary btn-register">Sign up</button>
    `;
    buttonsWrapper.querySelector('.btn-login').addEventListener('click', onLogin);
    buttonsWrapper.querySelector('.btn-register').addEventListener('click', onCreateAccount);
  }
  
  div.appendChild(buttonsWrapper);
  headerElement.appendChild(div);
  return headerElement;
};

// Glavnaya funkciya stranici
export const createPage = () => {
  const article = document.createElement('article');
  let user = null;

  // Funkciya dlya pere-rendera tolko shapki pri klike na knopki
  const rerenderHeader = () => {
    const currentHeader = article.firstChild;
    if (currentHeader) {
      article.replaceChild(createHeaderElement(), currentHeader);
    }
  };

  const onLogin = () => {
    user = { name: 'Jane Doe' };
    rerenderHeader();
  };

  const onLogout = () => {
    user = null;
    rerenderHeader();
  };

  const onCreateAccount = () => {
    user = { name: 'Jane Doe' };
    rerenderHeader();
  };

  const createHeaderElement = () => {
    return createHeader({ onLogin, onLogout, onCreateAccount, user });
  };

  // 1. Dobavlyaem pervonachal'nuyu shapku
  const header = createHeaderElement();
  article.appendChild(header);

  // 2. Dobavlyaem osnovnoy kontent stranici (ispravlen i zakryt shablonnoy strokoy)
  const sectionHTML = `
  <section class="storybook-page">
<div class="f-item-group" id="promo-strip-banner">

	<div class="f-item-heading-group" data-f-toggle="labels">
		<h2 class="f-item-heading">Promo Strip Banner</h2>
		<div class="f-item-controls">
			<span class="f-control f-icon" data-f-toggle-control="notes" title="Toggle Notes">
				<svg>
					<use xlink:href="#f-icon-notes" />
				</svg>
			</span>
			<span class="f-control f-icon" data-f-toggle-control="code" title="Toggle Code">
				<svg>
					<use xlink:href="#f-icon-code" />
				</svg>
			</span>
		</div>
	</div><div class="f-item-notes" data-f-toggle="notes">
	<p>Full width intro strip banner with photo background. To be used on top level hub pages.</p>

</div>
<div class="f-item-preview">
	<div class="promo-panel strip-banner">

	<figure class=" photo">


		<img alt="Wellington waterfront" src="https://www.wgtn.ac.nz/__data/assets/image/0009/929007/aerial_2000x800.jpg">

		<figcaption>

			<div>
				<div class="block formatting">
					<h1>Research at Victoria</h1>
					<p>Victoria is New Zealand’s No 1-ranked university for research quality. Our staff and students are committed to research excellence and helping to improve economic, social and environmental wellbeing.</p>
				</div>
				<!-- <div class="block formatting"> -->
				<!-- </div> -->
			</div>

		</figcaption>



	</figure>
</div>
</div>
  </section>
  `;

  // Vstavlyaem kontent posle shapki
  article.insertAdjacentHTML('beforeend', sectionHTML);

  return article;
};

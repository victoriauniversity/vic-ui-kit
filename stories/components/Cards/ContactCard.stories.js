export default {
  title: 'Components/Cards/ContactCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Contact information card featuring an embedded Google Maps panel. Nested inside `.centraliser` and `.block.formatting` layout wrappers for structural grid alignment and typography rules.',
      },
    },
  },
  // Setting up interactive control variables
  argTypes: {
    mainHeading: { control: 'text', name: 'Main Heading' },
    facultyTitle: { control: 'text', name: 'Department Title' },
    description: { control: 'text', name: 'Description Text' },
    phoneNumber: { control: 'text', name: 'Phone Display Label' },
    phoneTel: { control: 'text', name: 'Phone Anchor href (tel:)' },
    emailText: { control: 'text', name: 'Email Display Label' },
    emailHref: { control: 'text', name: 'Email Address' },
    mapEmbedUrl: { control: 'text', name: 'Google Maps Source Link (iframe src)' },
  },
};

export const ContactCard = {
  args: {
    mainHeading: 'Contact us',
    facultyTitle: 'Faculty of Graduate Research',
    description: 'Victoria’s research output is used at community, national and international levels. Our academic and business partnerships have global impacts in many fields.',
    phoneNumber: '+64 4 463 5350',
    phoneTel: 'tel:+6444635350',
    emailText: 'Email the Faculty of Graduate Research',
    emailHref: 'info@wgtn.ac.nz',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.9997526443713!2d174.76632835202034!3d-41.28710984827861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d38b02bfa4a862f%3A0x986dc301d1faba16!2s10+Kelburn+Parade%2C+Kelburn%2C+Wellington+6012!5e0!3m2!1sen!2snz!4v1511900346423',
  },
  render: (args) => `
    <div class="centraliser">
      <div class="block formatting">
        <div class="card-panel">
          <section class="contact-card">
            <h2>${args.mainHeading}</h2>
            <div class="contact-card-details">
              <div class="contact-title">
                <h3>${args.facultyTitle}</h3>
                <p>${args.description}</p>
              </div>

              <address class="contact-info">
                <ul>
                  <li>
                    <span class="icon-phone"></span>
                    <a href="${args.phoneTel}" title="Call to general enquiries">${args.phoneNumber}</a>
                  </li>
                  <li>
                    <span class="icon-mail"></span>
                    <a href="mailto:${args.emailHref}" title="Send an email to ${args.emailHref}">${args.emailText}</a>
                  </li>
                </ul>
              </address>
            </div>

            <!-- map iframe -->
            <iframe 
              src="${args.mapEmbedUrl}"
              width="100%" 
              height="150" 
              frameborder="0" 
              style="border:0" 
              allowfullscreen>
            </iframe>
          </section>
        </div>
      </div>
    </div>
  `,
};

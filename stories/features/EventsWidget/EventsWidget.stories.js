export default {
  title: 'Features/Events/Events Widget',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Events Widget
This component displays an aggregated list of upcoming university schedules, guest sessions, and archived events.

#### Jira Reference Tasks
* [WIP-1707: [TA] - Events Widget](https://victoriauniversity.atlassian.net/browse/WIP-1707)
* [WIP-1706: [TA] - Event Listing Pages (MVP)](https://victoriauniversity.atlassian.net/browse/WIP-1706)
* [WIP-2082: [TA] - events item full column width (+HP)(MVP)](https://victoriauniversity.atlassian.net/browse/WIP-2082)

#### Structured Data Schema Engine
Following the [Schema.org Event specifications](https://schema.org/Event), inline \`ld+json\` blocks are appended directly underneath the respective layout entities. 

* **Validation Rules:** Recommended by [Google Developer Guides](https://developers.google.com/search/docs/guides/intro-structured-data#testing-and-publishing-your-markup) because it doesn't pollute content markup.
* **Testing:** Validate generated metadata patterns with the [Google Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool/u/0/).
        `,
      },
    },
  },
};

// Raw HTML Template string straight from project requirements
const widgetMarkup = `
<section class="articles-container block">
    <header>
        <a href="#" title="" class="link-more">All events</a>
        <h2>Upcoming events</h2>
    </header>

    <ul class="events">
        <li>
            <article>
                <p class="margin-notes">
                    <time class="highlight-strip">
                        <span>in a month</span>
                        <span class="date">17–18 October 2016</span>
                        <span class="time">from 9.00 am</span>
                    </time>
                </p>
                <div class="summary formatting">
                    <h3><a href="#" title="See event details">New Historians Conference 2016</a></h3>

                    <p>The History Programme invites current postgraduates and recent graduates to its annual New Historians Conference. Now in its 11th year, the conference brings together researchers from local, national and regional institutions and organisations.</p>

                    <p class="meta venue"><span class="icon-pin"></span>Alan Macdiarmid Lecture Theatre 105</p>
                    <p class="meta fees"><span class="icon-ticket"></span>The registration fee is $25, with an optional conference dinner at approx. $28-$35 per head.</p>
                </div>
            </article>

            <script type="application/ld+json">
            {
              "@context": "http://schema.org/",
              "@type": "Event",
              "name": "New Historians Conference 2016",
              "startDate": "2016-10-17T09:00",
              "endDate": "2016-10-18",
              "isAccessibleForFree": false,
              "offers": [
                {
                  "@type": "Offer",
                  "price": "25.00",
                  "priceCurrency": "NZD"
                }
              ],
              "description": "The History Programme invites current postgraduates and recent graduates to its annual New Historians Conference. Now in its 11th year, the conference brings together researchers from local, national and regional institutions and organisations.",
              "location": {
                "@type": "Place",
                "name": "Alan Macdiarmid Lecture Theatre 105",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Wellington"
                },
                "hasMap": "https://www.wgtn.ac.nz/about/explore-victoria/campuses/kelburn/kelburn-campus-map.pdf"
              },
              "url": "https://www.wgtn.ac.nz/events/event-123-details"
            }
            </script>
        </li>

        <li>
            <article>
                <p class="margin-notes">
                    <time class="highlight-strip">
                        <span>in two months</span>
                        <span class="date">16–18 November 2016</span>
                        <span class="time">5:30pm</span>
                    </time>
                </p>
                <div class="summary formatting">
                    <h3><a href="#" title="See event details">The New Zealand Polymath - Colenso and his contemporaries</a></h3>

                    <p>The History Programme invites current postgraduates and recent graduates to its annual New Historians Conference. Now in its 11th year, the conference brings together researchers from local, national and regional institutions and organisations.</p>

                    <p class="meta venue"><span class="icon-pin"></span>Alan Macdiarmid Lecture Theatre 105</p>
                    <p class="meta fees"><span class="icon-ticket"></span>The registration fee is $25, with an optional conference dinner at approx. $28-$35 per head.</p>
                </div>
            </article>
        </li>

        <li>
            <article>
                <p class="margin-notes">
                    <time class="highlight-strip">
                        <span>archived</span>
                        <span class="date">7 - 15 February 2015</span>
                    </time>
                </p>
                <div class="summary formatting">
                    <h3><a href="#" title="See event details">NZSQ: Adam Summer School 2015</a></h3>

                    <figure class="media inline">
                      <img title="" src="https://www.wgtn.ac.nz/__data/assets/image/0006/1524696/varieties/ls_medium.jpg" alt="Victoria health researchers Professor Kevin Dew and Dr Kirsten Smiler">
                    </figure>

                    <p>The 2015 Adam Summer School is presented by the New Zealand String Quartet, quartet in residence at Te Kōkī New Zealand School of Music, Victoria University of Wellington.</p>

                    <p class="meta venue"><span class="icon-pin"></span>Nelson</p>
                    <p class="meta fees"><span class="icon-ticket"></span>Free (with registration)</p>
                </div>
            </article>
        </li>

        <li>
            <article>
                <p class="margin-notes">
                    <time class="highlight-strip">
                        <span>Guest session</span>
                        <span class="date">4 March 2016</span>
                        <span class="time">11am - 12pm</span>
                    </time>
                </p>
                <div class="summary formatting">
                    <h3><a href="#" title="See event details">The Juilliard Experience – Ara Guzelimian</a></h3>

                    <figure class="media inline">
                      <img title="" src="https://www.wgtn.ac.nz/__data/assets/image/0006/1524696/varieties/ls_medium.jpg" alt="The Juilliard Experience – Ara Guzelimian poster">
                    </figure>

                    <p>Ara Guzelimian, Provost and Dean of The Juilliard School, presents a session designed to give us a taste of studying at one of the world’s leading music, dance and drama institutions in the heart of a vibrant city.</p>

                    <p class="meta venue"><span class="icon-pin"></span>Adam Concert room, Wellington</p>
                    <p class="meta fees"><span class="icon-ticket"></span>Free</p>
                </div>
            </article>
        </li>
    </ul>
</section>
`;

// 1. Primary Default View Story
export const DefaultWidget = {
  render: () => widgetMarkup,
};

// 2. Full Column Width Responsive Variant Story (WIP-2082 configuration check)
export const FullColumnWidthView = {
  parameters: {
    docs: {
      story: "Simulates the [WIP-2082] full column width presentation variant when mapped to container wrappers on a homepage layout context.",
    },
  },
  render: () => `
    <div class="homepage-layout-wrapper" style="width: 100%; max-width: 1200px; padding: 10px;">
      ${widgetMarkup}
    </div>
  `,
};

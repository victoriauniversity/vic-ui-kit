import { renderCardStack } from '../../components/CardStack/CardStack.js';
import { createPagination } from '../../components/Navigation/Pagination.js';

export default {
  title: 'Features/Search/Search Content',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Search Bar Component
Search bar widget. For use on high level hub pages.
        `,
      },
    },
  },
};

export const DefaultSearchBar = {
    render: () => `
        <div class="p-search">
            <div class="p-search__main">
                ${renderCardStack(
                    {
                        classModifier: '',
                        title: 'Advanced Software Engineering',
                        code: 'SWEN 301',
                        year: '2026',
                        trimesters: 'Trimester 1, Trimester 2',
                        intro: 'Core techniques and infrastructure workflows for contemporary systems deployment.',
                        innerHtml: '<p>This course addresses advanced components of structural analysis, requirements engineering, and automated testing frameworks inside standard web sandboxes.</p>',
                        meta: false,
                    },
                )}
                ${createPagination({
                    currentPage: 1,
                    totalPages: 50,
                    baseUrl: 'https://cms.wgtn.ac.nz/staff/new-search/search'
                })}
            </div>
            <div class="p-search__aside">
                <article class="data-sidebar data-downloads">
                    <div id="search_facets">
                        <h2>Limit search to</h2>

                        <ul class="toggle_block active facet_links">
                            <li class="tag"><a href="https://cms.wgtn.ac.nz/staff/new-search/search?query=Degree requirements&amp;gscope1=3&amp;gn=Library">Library</a></li>
                            <li class="tag"><a href="https://cms.wgtn.ac.nz/staff/new-search/search?query=Degree requirements&amp;gscope1=2&amp;gn=ITS">ITS</a></li>
                            <li class="tag"><a href="https://cms.wgtn.ac.nz/staff/new-search/search?query=Degree requirements&amp;gscope1=1&amp;gn=Documents">Documents</a></li>
                        </ul>
                    </div>
                </article>

                <article class="data-sidebar data-downloads">
                    <div id="search_facets">
                        <h2>Narrow your search</h2>

                        <h3 class="toggle">File type</h3>

                        <ul class="toggle_block active facet_links">
                            <li class="tag"><a href="https://cms.wgtn.ac.nz/staff/new-search/search?query=Degree requirements&amp;filter1=f.File type|f:doc">doc (16)</a></li>
                            <li class="tag"><a href="https://cms.wgtn.ac.nz/staff/new-search/search?query=Degree requirements&amp;filter1=f.File type|f:docx">docx (65)</a></li>
                            <li class="tag"><a href="https://cms.wgtn.ac.nz/staff/new-search/search?query=Degree requirements&amp;filter1=f.File type|f:pdf">pdf (400)</a></li>
                            <li class="tag"><a href="https://cms.wgtn.ac.nz/staff/new-search/search?query=Degree requirements&amp;filter1=f.File type|f:pptx">pptx (1)</a></li>
                            <li class="tag"><a href="https://cms.wgtn.ac.nz/staff/new-search/search?query=Degree requirements&amp;filter1=f.File type|f:xlsm">xlsm (2)</a></li>
                            <li class="tag"><a href="https://cms.wgtn.ac.nz/staff/new-search/search?query=Degree requirements&amp;filter1=f.File type|f:xlsx">xlsx (13)</a></li>
                        </ul>
                    </div>
                </article>
            </div>
        </div>
    `
}
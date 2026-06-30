/**
 * Creates a video promotional layout card component with built-in sandbox CSS styles.
 * Includes explicit styles for the layout container, video overlay badge, and text captions.
 * @returns {string} HTML string literal with structural CSS styles.
 */
export function createVideoPromo() {
  return `
    <style>
        /* Scope component styling rules inside sandbox ecosystem */
        .f-item-preview:after {
            clear: both;
        }
        .f-item-preview:before, .f-item-preview:after {
            display: table;
            content: ' ';
        }
        .f-item-preview-one-third {
            width: 33%;
            margin: auto;
        }
    </style>

    <div class="f-item-preview">
        <div class="f-item-preview-one-third">

            <figure class="media featured">
                <a data-lity="" href="https://www.youtube.com/watch?v=6nD-kAsV-rk" target="_blank">
                    <img alt="Wellington waterfront" src="https://www.wgtn.ac.nz/__data/assets/image/0011/366851/varieties/ls_small.jpg">
                    <figcaption>
                        <h4>Business in the best capital <i class="icon-right-dir"></i></h4>
                    </figcaption>
                </a>
            </figure>

        </div>
    </div>
  `;
}


/* global localStorage */
/* global $ */

// 3rd party libs
import MicroModal from 'micromodal';

// Standalone libraries
import UrlManager from './urls';
import FilteringFactory from './filtering';

// Helpers
import { hasProp } from '../utils/helpers';





// API interface
const toolbarApi = window.toolkitToolbar || {};


/**
 * A module providing popup dialogs with tools.
 *
 * @requires jQuery - external jQuery 1.8+
 * @requires localStorage - global localStorage
 */
( function ToolbarManager() {

  if ( window.toolkitToolbar ) { // Available already - do not initialise again!
    return;
  }

  window.toolkitToolbar = toolbarApi; // Import for a global access


  /** @constant */

  // Default copy
  const TEXTS = {
      TITLE:                         'Toolbar',
      BUTTON_CLOSE_TITLE:            'Close the toolbar',
      SEARCH_OK_LABEL:               'Ok',
      SEARCH_INPUT_PLACEHOLDER:      'Search for a tool...',
      SEARCH_INPUT_ARIA_LABEL:       'Type to filter out tools:',
      TITLE_FAVOURITES:              'My favourite',
      TITLE_DEFAULTS:                'Tools and applications',
      BUTTON_FAVOURITE_REMOVE_TITLE: 'Remove from favourites',
      BUTTON_FAVOURITE_ADD_TITLE:    'Add to favourites',
    },

    LOCAL_STORAGE_POSTFIX = 'favourites',

    CLASS_BLOCK_FAVOURITES = 'group-favourite',
    CLASS_BLOCK_DEFAULTS = 'group-others',

    ICON_DEFAULT = {
      colour:    null,
      className: 'layout',
    },

    TEMPLATE_ICON_SSO = '<span class="microtag" title="Supports Single-Sign-on functionality"><svg class="logo-icon key"><use xlink:href="#icon-key"></use></svg></span>',
    TEMPLATE_TOOLBARS_CONTAINER = '<div id="tb" class="toolbars-container"></div>',

    SELECTOR_TOOLBAR_CONTENT = '.dialog-content .centraliser',

    SVG_ICONS = `
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <symbol id="icon-key" viewBox="0 0 25 32">
        <title>key</title>
        <path d="M24.768 7.616q0.64 3.712-0.896 6.88t-4.8 3.744q-2.112 0.384-4.16 0.064l-3.776 6.208-2.24 0.384-3.328 5.312q-0.448 0.896-1.472 1.024l-2.432 0.448q-0.384 0.128-0.704-0.128t-0.384-0.704l-0.512-3.136q-0.256-0.96 0.384-1.792l8.256-12.352q-0.768-1.6-1.216-3.84-0.576-3.392 1.696-5.984t5.92-3.232q3.392-0.64 6.24 1.44t3.424 5.664zM20.736 10.048q0.96-1.408 0.672-3.104t-1.632-2.656q-1.344-1.024-2.944-0.704t-2.56 1.728q-0.256 0.384-0.384 0.736t-0.032 0.64 0.16 0.512 0.416 0.544 0.576 0.48 0.704 0.512 0.736 0.544q0.192 0.128 0.704 0.512t0.736 0.512 0.608 0.384 0.608 0.256 0.544-0.032 0.576-0.256 0.512-0.608z"></path>
      </symbol>
      <symbol id="icon-outlook" viewBox="0 0 34 32">
        <title>OfficeCore10_32x_24x_20x_16x_01-22-2019</title>

        <g id="STYLE_COLOR" data-name="STYLE = COLOR">
          <path d="M28.59554,2H11.404A1.404,1.404,0,0,0,10,3.40407L10,5l9.69,3L29.99961,5v-1.596A1.40405,1.40405,0,0,0,28.59554,2Z" fill="#0364b8"/>
          <path d="M31.6499,17.40548A11.34148,11.34148,0,0,0,32,16.00043a.66592.66592,0,0,0-.33331-.57679v-.00048l-.01282-.00727-.004-.00225L20.81213,9.2395a1.49877,1.49877,0,0,0-.14532-.08276V9.15668a1.5003,1.5003,0,0,0-1.33331,0l-.00006.00006a1.49088,1.49088,0,0,0-.14527.08276L8.3504,15.41364l-.004.00225-.01275.00727v.00048a.666.666,0,0,0-.33331.57679,11.34354,11.34354,0,0,0,.35009,1.405l11.49171,8.405Z" fill="#0a2767"/>
          <polygon points="24 5 17 5 14.979 8 17 11 24 17 30 17 30 11 24 5" fill="#28a8ea"/>
          <rect x="10" y="5" width="6.99985" height="5.99999" fill="#0078d4"/>
          <rect x="23.99969" y="5" width="5.99992" height="5.99997" fill="#50d9ff"/>
          <polygon points="24 17 17 11 10 11 10 17 17 23 27.832 24.768 24 17" fill="#0364b8"/>
          <line x1="10.03118" y1="5.00001" x2="29.99961" y2="5" fill="none"/>
          <rect x="16.99971" y="11" width="7.00001" height="5.99999" fill="#0078d4"/>
          <rect x="10" y="17" width="6.99978" height="6" fill="#064a8c"/>
          <rect x="23.99973" y="17" width="5.99992" height="6" fill="#0078d4"/>
          <path d="M20.19093,25.21763,8.39736,16.61718,8.8915,15.748s10.745,6.12012,10.90905,6.21191a.5285.5285,0,0,0,.4209-.0122c.15332-.08643,10.93249-6.23,10.93249-6.23l.49609.86914Z" fill="#0a2767" opacity="0.5"/>
          <path d="M31.66669,16.57678v.00049l-.01325.00757-.00335.00189-10.838,6.1742a1.49672,1.49672,0,0,1-1.46045.09118L23.12632,27.913,31.38037,29.71l-.0003.00446A1.49756,1.49756,0,0,0,32,28.5V16.00006A.666.666,0,0,1,31.66669,16.57678Z" fill="#1490df"/>
          <path d="M32,28.5v-.738l-9.98291-5.68756-1.205.68647a1.49685,1.49685,0,0,1-1.46045.09118L23.12634,27.913l8.254,1.79694-.0003.00446A1.49756,1.49756,0,0,0,32,28.5Z" opacity="0.05"/>
          <path d="M31.95,28.88342,21.00708,22.64984l-.19495.11109a1.49685,1.49685,0,0,1-1.46045.09118L23.12634,27.913l8.254,1.79694-.0003.00446A1.50132,1.50132,0,0,0,31.95,28.88342Z" opacity="0.1"/>
          <path d="M8.35,16.59v-.01H8.34l-.03-.02A.65068.65068,0,0,1,8,16V28.5A1.498,1.498,0,0,0,9.5,30h21a1.50264,1.50264,0,0,0,.37-.05.63693.63693,0,0,0,.18-.06.14177.14177,0,0,0,.06-.02,1.04752,1.04752,0,0,0,.23-.13c.02-.01.03-.01.04-.03Z" fill="#28a8ea"/>
          <path d="M18,24.66663V8.33331A1.33727,1.33727,0,0,0,16.66663,7h-6.6355v4h.00006v3.456l-1.68085.95759-.004.00225-.01281.00727v.00048a.66591.66591,0,0,0-.33332.57679l.00019.00421L8,16.001V26h8.66663A1.33732,1.33732,0,0,0,18,24.66663Z" opacity="0.1"/>
          <path d="M17,25.66663V9.33331A1.33727,1.33727,0,0,0,15.66663,8h-5.6355v3h.00006v3.456l-1.68085.95759-.004.00225-.01281.00727v.00048a.66591.66591,0,0,0-.33332.57679l.00019.00421L8,16.001V27h7.66663A1.33732,1.33732,0,0,0,17,25.66663Z" opacity="0.2"/>
          <path d="M17,23.66663V9.33331A1.33727,1.33727,0,0,0,15.66663,8h-5.6355v3h.00006v3.456l-1.68085.95759-.004.00225-.01281.00727v.00048a.66591.66591,0,0,0-.33332.57679l.00019.00421L8,16.001V25h7.66663A1.33732,1.33732,0,0,0,17,23.66663Z" opacity="0.2"/>
          <path d="M16,23.66663V9.33331A1.33727,1.33727,0,0,0,14.66663,8h-4.6355v3h.00006v3.456l-1.68085.95759-.004.00225-.01281.00727v.00048a.66591.66591,0,0,0-.33332.57679l.00019.00421L8,16.001V25h6.66663A1.33732,1.33732,0,0,0,16,23.66663Z" opacity="0.2"/>
          <path id="Back_Plate" data-name="Back Plate" d="M1.33348,8H14.66668A1.33332,1.33332,0,0,1,16,9.33332V22.66666A1.33333,1.33333,0,0,1,14.66667,24H1.33347A1.33332,1.33332,0,0,1,.00015,22.66667V9.33333A1.33333,1.33333,0,0,1,1.33348,8Z" fill="#0078d4"/>
          <path d="M3.86661,13.468a4.18142,4.18142,0,0,1,1.64192-1.8139A4.9652,4.9652,0,0,1,8.11808,11a4.61691,4.61691,0,0,1,2.414.62036,4.13906,4.13906,0,0,1,1.59809,1.733,5.59694,5.59694,0,0,1,.55967,2.54889,5.90136,5.90136,0,0,1-.57653,2.66689A4.239,4.239,0,0,1,10.468,20.36277,4.79917,4.79917,0,0,1,7.963,21a4.72864,4.72864,0,0,1-2.46794-.62711,4.20422,4.20422,0,0,1-1.61833-1.73635A5.4589,5.4589,0,0,1,3.31031,16.118,6.05522,6.05522,0,0,1,3.86661,13.468Zm1.74981,4.25826a2.71627,2.71627,0,0,0,.92379,1.19352,2.41142,2.41142,0,0,0,1.443.43493A2.533,2.533,0,0,0,9.524,18.90627a2.60284,2.60284,0,0,0,.89682-1.1969,4.62569,4.62569,0,0,0,.28658-1.66554,5.06271,5.06271,0,0,0-.26972-1.68578,2.6687,2.6687,0,0,0-.86648-1.24073,2.3873,2.3873,0,0,0-1.52729-.472,2.493,2.493,0,0,0-1.47672.4383,2.741,2.741,0,0,0-.944,1.20364,4.77582,4.77582,0,0,0-.00674,3.439Z" fill="#fff"/>
          <rect x="0.00002" width="32" height="32" fill="none"/>
        </g>
      </symbol>
      <symbol id="icon-onedrive" viewBox="0 0 40 32">
        <title>OfficeCore10_32x_24x_20x_16x_01-22-2019</title><g id="STYLE_COLOR" data-name="STYLE = COLOR">
        <path d="M12.20245,11.19292l.00031-.0011,6.71765,4.02379,4.00293-1.68451.00018.00068A6.4768,6.4768,0,0,1,25.5,13c.14764,0,.29358.0067.43878.01639a10.00075,10.00075,0,0,0-18.041-3.01381C7.932,10.00215,7.9657,10,8,10A7.96073,7.96073,0,0,1,12.20245,11.19292Z" fill="#0364b8"/><path d="M12.20276,11.19182l-.00031.0011A7.96073,7.96073,0,0,0,8,10c-.0343,0-.06805.00215-.10223.00258A7.99676,7.99676,0,0,0,1.43732,22.57277l5.924-2.49292,2.63342-1.10819,5.86353-2.46746,3.06213-1.28859Z" fill="#0078d4"/><path d="M25.93878,13.01639C25.79358,13.0067,25.64764,13,25.5,13a6.4768,6.4768,0,0,0-2.57648.53178l-.00018-.00068-4.00293,1.68451,1.16077.69528L23.88611,18.19l1.66009.99438,5.67633,3.40007a6.5002,6.5002,0,0,0-5.28375-9.56805Z" fill="#1490df"/><path d="M25.5462,19.18437,23.88611,18.19l-3.80493-2.2791-1.16077-.69528L15.85828,16.5042,9.99475,18.97166,7.36133,20.07985l-5.924,2.49292A7.98889,7.98889,0,0,0,8,26H25.5a6.49837,6.49837,0,0,0,5.72253-3.41556Z" fill="#28a8ea"/></g>
        </symbol>
      <symbol id="icon-yammer" viewBox="0 0 37 32">
        <title>OfficeCore10_32x_24x_20x_16x_01-22-2019</title><g id="STYLE_COLOR" data-name="STYLE = COLOR"><path d="M11.55018,9.71687a.4163.4163,0,0,1-.05679-.49349.41.41,0,0,1,.06324-.08307L20.085.59887a.83408.83408,0,0,1,1.20252.02354,22.62072,22.62072,0,0,1,5.2527,9.54509l0,.00006L21.37806,16,13.701,13.596a9.25859,9.25859,0,0,0-2.15081-3.87913Z" fill="#28a8ea"/><path d="M30.62719,9.96175A.832.832,0,0,0,29.60149,9.35L13.69967,13.59747a9.37875,9.37875,0,0,1,.00309,4.8345l5.30344,6.60672L26.555,21.88657l3.04229.81775a.832.832,0,0,0,1.02687-.611A26.868,26.868,0,0,0,30.62719,9.96175Z" fill="#0078d4"/><path d="M13.70282,18.43177a9.26173,9.26173,0,0,1-2.1295,3.87451.417.417,0,0,0,.00614.58365l8.525,8.51191a.8335.8335,0,0,0,1.19983-.02262,22.54982,22.54982,0,0,0,5.2509-9.49281Z" fill="#0358a7"/><path d="M18,24.66663V8.33331A1.33727,1.33727,0,0,0,16.66663,7h-2.994l-2.116,2.11926a.40811.40811,0,0,0-.06323.08307.41622.41622,0,0,0,.05676.49347A9.25873,9.25873,0,0,1,13.701,13.575l.00336.00018-.0047.00129a9.38226,9.38226,0,0,1,.00311,4.83447,9.21967,9.21967,0,0,1-.41467,1.20862,9.27745,9.27745,0,0,1-1.71479,2.66571.417.417,0,0,0,.00617.58368L14.71539,26h1.95124A1.33732,1.33732,0,0,0,18,24.66663Z" opacity="0.1"/><path d="M17,25.66663V9.33331A1.33727,1.33727,0,0,0,15.66663,8H12.67419L11.55664,9.11926a.40811.40811,0,0,0-.06323.08307.41622.41622,0,0,0,.05676.49347A9.25873,9.25873,0,0,1,13.701,13.575l.00336.00018-.0047.00129a9.38226,9.38226,0,0,1,.00311,4.83447,9.21967,9.21967,0,0,1-.41467,1.20862,9.27745,9.27745,0,0,1-1.71479,2.66571.417.417,0,0,0,.00617.58368l4.13617,4.12982A1.33727,1.33727,0,0,0,17,25.66663Z" opacity="0.2"/><path d="M17,23.66663V9.33331A1.33727,1.33727,0,0,0,15.66663,8H12.67419L11.55664,9.11926a.40811.40811,0,0,0-.06323.08307.41622.41622,0,0,0,.05676.49347A9.25873,9.25873,0,0,1,13.701,13.575l.00336.00018-.0047.00129a9.38226,9.38226,0,0,1,.00311,4.83447,9.21967,9.21967,0,0,1-.41467,1.20862,9.27745,9.27745,0,0,1-1.71479,2.66571.417.417,0,0,0,.00617.58368L13.71387,25h1.95276A1.33732,1.33732,0,0,0,17,23.66663Z" opacity="0.2"/><path d="M16,23.66663V9.33331A1.33727,1.33727,0,0,0,14.66663,8H12.67419L11.55664,9.11926a.40811.40811,0,0,0-.06323.08307.41622.41622,0,0,0,.05676.49347A9.25873,9.25873,0,0,1,13.701,13.575l.00336.00018-.0047.00129a9.38226,9.38226,0,0,1,.00311,4.83447,9.21967,9.21967,0,0,1-.41467,1.20862,9.27745,9.27745,0,0,1-1.71479,2.66571.417.417,0,0,0,.00617.58368L13.71387,25h.95276A1.33732,1.33732,0,0,0,16,23.66663Z" opacity="0.2"/><path id="Back_Plate" data-name="Back Plate" d="M1.33333,8H14.66669A1.33334,1.33334,0,0,1,16,9.33334V22.66666A1.33333,1.33333,0,0,1,14.6667,24H1.33334A1.33334,1.33334,0,0,1,0,22.66666V9.33333A1.33333,1.33333,0,0,1,1.33333,8Z" fill="#0078d4"/><path d="M7.82588,15.26778a3.361,3.361,0,0,1,.22316.59972H8.07a2.84446,2.84446,0,0,1,.21617-.58577l2.02264-3.8095A.88924.88924,0,0,1,11.09417,11h0a.88924.88924,0,0,1,.771,1.33223L9.06682,17.20292a.88915.88915,0,0,0-.1182.443v2.46485A.88924.88924,0,0,1,8.05938,21H7.8783a.88924.88924,0,0,1-.88924-.88924V17.675a.88928.88928,0,0,0-.11285-.43356L4.12945,12.3228A.88924.88924,0,0,1,4.90583,11h.1748a.88923.88923,0,0,1,.79012.48126Z" fill="#fff"/><rect width="32" height="32" fill="none"/></g>
      </symbol>
      <symbol id="icon-forms" viewBox="0 0 32 32">
          <title>forms</title>
          <path d="M12 12.192l-3.424 0.064v2.912h3.424v2.24l-3.424-0.064v4.608l-1.696-0.128v-11.648l5.12-0.224v2.24zM27.488 16.864h-5.088v1.696h5.088v-1.696zM27.488 21.952h-5.088v1.696h5.088v-1.696zM28.32 4.96h-8.48v22.080h8.48q0.736-0.032 1.216-0.512t0.512-1.184v-18.688q-0.032-0.704-0.512-1.184t-1.216-0.512zM28.352 24.512h-6.816v-3.424h6.816v3.424zM28.352 19.392h-6.816v-3.392h6.816v3.392zM28.352 14.304h-6.816v-6.816h5.28l-0.64 0.864h-3.776v5.088h5.088v-2.208l0.864-1.088v4.16zM29.152 7.744l-3.808 4.864-2.336-2.656q-0.096-0.128 0.032-0.256l0.608-0.544q0.128-0.096 0.224 0.032l1.472 1.664 2.912-3.808q0.128-0.128 0.224-0.032l0.64 0.48q0.128 0.096 0.032 0.256zM1.952 5.312v21.472l16.384 2.816v-27.2z"></path>
      </symbol>
      <symbol id="icon-sharepoint" viewBox="0 0 33 32">
          <title>OfficeCore10_32x_24x_20x_16x_01-22-2019</title>
          <g id="STYLE_COLOR" data-name="STYLE = COLOR"><circle cx="14.99964" cy="9.5" r="9.5" fill="#036c70"/><circle cx="23.87464" cy="17.875" r="8.125" fill="#1a9ba1"/><circle cx="15.99964" cy="25.5" r="6.5" fill="#37c6d0"/><path d="M16.66663,7H5.83276a9.50556,9.50556,0,0,0,9.16687,12c.27729,0,.55164-.01263.82288-.03589l.00537.03815A6.50007,6.50007,0,0,0,9.49963,25.5q0,.25231.019.5h7.148A1.33732,1.33732,0,0,0,18,24.66663V8.33331A1.33727,1.33727,0,0,0,16.66663,7Z" opacity="0.1"/><path d="M15.66663,8H5.61792a9.50509,9.50509,0,0,0,9.38171,11c.27729,0,.55164-.01263.82288-.03589l.00537.03815A6.50459,6.50459,0,0,0,9.67389,27h5.99274A1.33732,1.33732,0,0,0,17,25.66663V9.33331A1.33727,1.33727,0,0,0,15.66663,8Z" opacity="0.2"/><path d="M15.66663,8H5.61792a9.50509,9.50509,0,0,0,9.38171,11c.27729,0,.55164-.01263.82288-.03589l.00537.03815A6.50063,6.50063,0,0,0,9.51868,25h6.148A1.33732,1.33732,0,0,0,17,23.66663V9.33331A1.33727,1.33727,0,0,0,15.66663,8Z" opacity="0.2"/><path d="M14.66663,8H5.61792a9.50509,9.50509,0,0,0,9.38171,11c.27729,0,.55164-.01263.82288-.03589l.00537.03815A6.50063,6.50063,0,0,0,9.51868,25h5.148A1.33732,1.33732,0,0,0,16,23.66663V9.33331A1.33727,1.33727,0,0,0,14.66663,8Z" opacity="0.2"/><path id="Back_Plate" data-name="Back Plate" d="M1.33333,8H14.66669A1.33334,1.33334,0,0,1,16,9.33334V22.66666A1.33333,1.33333,0,0,1,14.6667,24H1.33334A1.33334,1.33334,0,0,1,0,22.66666V9.33333A1.33333,1.33333,0,0,1,1.33333,8Z" fill="#03787c"/><path d="M5.67039,15.82457a2.64535,2.64535,0,0,1-.82266-.86964A2.36142,2.36142,0,0,1,4.561,13.76466a2.29061,2.29061,0,0,1,.5327-1.5409,3.14167,3.14167,0,0,1,1.416-.92359A5.98158,5.98158,0,0,1,8.44506,11a7.35414,7.35414,0,0,1,2.54889.35738v1.80041a3.98617,3.98617,0,0,0-1.15307-.472,5.59553,5.59553,0,0,0-1.34862-.16183,2.92625,2.92625,0,0,0-1.38581.29321A.91071.91071,0,0,0,6.557,13.65a.84355.84355,0,0,0,.23275.59013,2.12174,2.12174,0,0,0,.62689.44831q.3948.19576,1.17678.51922a1.23212,1.23212,0,0,1,.16857.06743,9.69661,9.69661,0,0,1,1.48348.73173,2.654,2.654,0,0,1,.87661.88313,2.55808,2.55808,0,0,1,.31692,1.33187,2.48083,2.48083,0,0,1-.499,1.60485,2.78893,2.78893,0,0,1-1.33513.89683A6.04879,6.04879,0,0,1,7.70332,21a10.0284,10.0284,0,0,1-1.72275-.14161,5.91231,5.91231,0,0,1-1.3993-.40458V18.55226a4.50013,4.50013,0,0,0,1.41605.67431,5.51323,5.51323,0,0,0,1.55765.24949,2.68013,2.68013,0,0,0,1.41257-.3.94723.94723,0,0,0,.4755-.84636.90389.90389,0,0,0-.26625-.64734,2.70416,2.70416,0,0,0-.73521-.51248Q7.973,16.934,7.056,16.54956A7.85955,7.85955,0,0,1,5.67039,15.82457Z" fill="#fff"/><rect x="0.00003" width="32" height="32" fill="none"/>
          </g>
      </symbol>
      <symbol id="icon-wordonline" viewBox="0 0 32 32">
          <title>OfficeCore10_32x_24x_20x_16x_01-22-2019</title>
          <g id="STYLE_COLOR" data-name="STYLE = COLOR"><path d="M30.66665,2H9.33327A1.33332,1.33332,0,0,0,8,3.33331V9l12,3.5L32,9V3.33331A1.33333,1.33333,0,0,0,30.66665,2Z" fill="#41a5ee"/><polygon points="32 9 8 9 8 16 20 19.5 32 16 32 9" fill="#2b7cd3"/><polygon points="32 16 8 16 8 23 20 26.5 32 23 32 16" fill="#185abd"/><path d="M32,23H8v5.66666A1.33334,1.33334,0,0,0,9.33334,30H30.6667A1.33334,1.33334,0,0,0,32,28.66666Z" fill="#103f91"/><path d="M16.66665,7H8V26h8.66663A1.33732,1.33732,0,0,0,18,24.66663V8.33331A1.33727,1.33727,0,0,0,16.66665,7Z" opacity="0.1"/><path d="M15.66665,8H8V27h7.66663A1.33732,1.33732,0,0,0,17,25.66663V9.33331A1.33727,1.33727,0,0,0,15.66665,8Z" opacity="0.2"/><path d="M15.66665,8H8V25h7.66663A1.33732,1.33732,0,0,0,17,23.66663V9.33331A1.33727,1.33727,0,0,0,15.66665,8Z" opacity="0.2"/><path d="M14.66665,8H8V25h6.66663A1.33732,1.33732,0,0,0,16,23.66663V9.33331A1.33727,1.33727,0,0,0,14.66665,8Z" opacity="0.2"/><path id="Back_Plate" data-name="Back Plate" d="M1.33329,8H14.66666A1.33333,1.33333,0,0,1,16,9.33333V22.66666A1.33334,1.33334,0,0,1,14.66665,24H1.3333A1.33334,1.33334,0,0,1,0,22.66666V9.33333A1.33333,1.33333,0,0,1,1.33329,8Z" fill="#185abd"/><path id="Letter" d="M11.95,21h-1.8l-2.1-6.9L5.85,21H4.05l-2-10h1.8l1.4,7,2.1-6.8h1.5l2,6.8,1.4-7h1.7Z" fill="#fff"/><rect x="-0.00004" width="32" height="32" fill="none"/></g>
      </symbol>
      <symbol id="icon-office365" viewBox="0 0 25.434 30.364">
          <path id="Path_6" data-name="Path 6" d="M2.979,6.923,19.327.826l9.075,2.6.011,25.184-9.137,2.581L3.27,25.333,19.276,27.3V5.734L8.526,8.152,8.536,23,2.979,25.176Z" transform="translate(-2.979 -0.826)" fill="#ea3c01"/>
      </symbol>
    </defs>
  </svg>`;



  /** PRIVATE MODULE MEMBERS */


  /** List of active toolbar instances */
  const toolbarsList = [];

  let containerElement;





  /** PRIVATE MODULE FUNCTIONS */


  function getInitialisedToolbar( id ) {
    for ( let i = 0; i < toolbarsList.length; i += 1 ) {
      if ( toolbarsList[i].getId() === id ) return toolbarsList[i];
    }

    return null;
  }


  function getFavouritesListFromStorage( storageKey ) {
    const localStorageJsonString = localStorage.getItem( storageKey );

    if ( localStorageJsonString ) {
      const favouriteToolsIds = JSON.parse( localStorageJsonString ) || [];

      // Presets exist - don't use defaults
      return favouriteToolsIds;
    }

    return null;
  }




  function saveFavouritesListToStorage( storageKey, favouriteToolsList ) {
    // Serialise the favourited tools and save to the local storage
    localStorage.setItem( storageKey, JSON.stringify( favouriteToolsList.map( tool => tool.id )));
  }





  // HTML TEMPLATE BUILDERS



  /**
   * Compiles HTML for a button to make an item (not) favourite.
   *
   * @param {boolean} isActive
   *
   * @return {string} HTML template string.
   */
  function buildFavouriteButton( isActive ) {
    return `<a href="javascript:;" title="${isActive ? TEXTS.BUTTON_FAVOURITE_REMOVE_TITLE : TEXTS.BUTTON_FAVOURITE_ADD_TITLE}" class="btn-options toggle-favourite"><span class="icon-star"></span></a>`;
  }



  /**
   * Compiles HTML for a button to make an item (not) favourite.
   *
   * @param {Object} iconData
   * @param {boolean} hasSso - Show 'Single Sign On' (SSO) icon?
   *
   * @return {string} HTML template string.
   */
  function buildToolIcon( iconData, hasSso ) {
    const icon = iconData || ICON_DEFAULT;

    if ( icon.customHtml ) {
      // SVG-based icon
      return `
        ${hasSso ? '<span class="logo-wrapper">' : ''}
          ${icon.customHtml}${hasSso ? TEMPLATE_ICON_SSO : ''}
        ${hasSso ? '</span>' : ''}`;
    }

    // Font-icon based
    return `
      <span class="icon-${icon.className}${icon.colour ? ` colour-${icon.colour}` : ''}">
        ${hasSso ? TEMPLATE_ICON_SSO : ''}
      </span>`;
  }



  /**
   * Compiles HTML template for a list of tool items (<li>).
   *
   * @param {Array<Tool>} toolsList
   * @param {boolean} hasFavouriteButton
   *
   * @return {string} HTML template string.
   */
  function buildToolsListItems( toolsList, hasFavouriteButton ) {
    return toolsList.map( tool => `
      <li class="tile" id="${tool.id}">
        ${hasFavouriteButton ? buildFavouriteButton( tool.isFavourited ) : ''}
        <h3>
          <a target="_blank" rel="noopener" href="${tool.url}" tabindex="0" title="${tool.description || tool.name}">
            ${buildToolIcon( tool.icon, tool.hasSso )}
            <span class="title"><span></span>${tool.name}</span>
          </a>
        </h3>
      </li>` ).join( '' );
  }



  /**
   * Compiles HTML template for a group of tools.
   *
   * @param {string} groupClassName
   * @param {Array<Tools>} toolsList
   * @param {boolean} hasFavouriteButton
   * @param {string|null} headerContentHtml - Ommited content results in
   *    excluded header
   *
   * @return {string} HTML template string.
   */
  function buildToolGroupTemplate(
    groupClassName,
    toolsList,
    hasFavouriteButton,
    headerContentHtml
  ) {
    if ( toolsList.length < 1 ) return '';

    return `
      <section class="block ${groupClassName}">
        ${headerContentHtml ? `<header><h2>${headerContentHtml}</h2></header>` : ''}
        <ul class="flex-grid">
          ${buildToolsListItems( toolsList, hasFavouriteButton )}
        </ul>
      </section>`;
  }



  /**
   * Compiles HTML template for a notification panel with info/warning/error
   * message.
   *
   * @param {Object} notificationObject
   *
   * @return {string} HTML template string.
   */
  function buildNotificationTemplate( notificationObject ) {
    return `
    <div class="formatting block">
      <section class="flash-message ${notificationObject.type}">
        <h2>${notificationObject.title}</h2>
        ${( notificationObject.content ) ? `<p>${notificationObject.content}</p>` : ''}
      </section>
    </div>`;
  }



  /**
   * @param {string} id - Toolbar instance identifier.
   *
   * @return {string} - HTML template.
   */
  function buildSearchTemplate( id ) {
    return `
    <form class="filter" action="javascript:;" role="search">
      <label for="${id}-filter-query"><span class="icon-search"></span></label>
      <input id="${id}-filter-query" aria-label="${TEXTS.SEARCH_INPUT_ARIA_LABEL}" autocomplete="off" incremental="incremental" autocorrect="off" type="search" name="filter-query" placeholder="${TEXTS.SEARCH_INPUT_PLACEHOLDER}" tabindex="0">
      <input id="filter-submit" class="btn" type="submit" value="${TEXTS.SEARCH_OK_LABEL}">
    </form>`;
  }



  /**
   * @param {string} id - Toolbar instance identifier.
   * @param {Object} config
   * @param {Object} content - Object with custom content elements.
   *
   * @return {string} - HTML template.
   */
  function buildDialogTemplate( id, config, content ) {
    return `
      <div id="${id}" class="toolbar dialog-container" aria-hidden="true">
        <section class="dialog" role="dialog" aria-modal="true" aria-labelledby="${id}-title">
          <header>
            <div class="centraliser block">
              <div class="header">
                <h1 id="${id}-title">${( hasProp( content, 'title' )) ? content.title : TEXTS.TITLE}</h1>
                <a href="javascript:;" title="${TEXTS.BUTTON_CLOSE_TITLE}" class="btn-close" aria-label="Close modal" data-micromodal-close tabindex="-1" ></a>

                ${( config.showSearch ) ? buildSearchTemplate( id ) : ''}
                ${( hasProp( content, 'headerHtml' )) ? content.headerHtml : ''}
              </div>
            </div>
          </header>

          <div class="dialog-content">
            <div class="centraliser"></div>
          </div>

          <footer>
            <div class="centraliser block">
              <div class="links">
                ${( hasProp( content, 'footerHtml' )) ? content.footerHtml : ''}
              </div>
            </div>
          </footer>

        </section>
      </div>`;
  }





  /** INLINE CLASSES. */


  /**
   * Defines behaviour and UI of a Toolbar popup dialog.
   *
   * @typedef {Class} Toolbar
   */
  class Toolbar {

    /**
     * @param {string} id - Unique identifier of this Toolbar instance
     * @param {Object} config - Options to turn features on/off.
     * @param {Object} content - Custom content blocks that can be injected.
     * @param {Object} data - Main data model with tools.
     *
     * @memberof Toolbar
     */
    constructor({
      id,
      config,
      content,
      data,
    }) {
      this.id = id;
      this.config = config;
      this.content = content;
      this.data = data;

      this._STORAGE_KEY = `${this.id}.${LOCAL_STORAGE_POSTFIX}`;

      this._init();
      this._bindEvents();
    }





    /** PUBLIC METHODS */



    /** Removes the toolbar and cleans up. */
    destroy() {
      // Remove this instance from the list of toolbar instances
      const toolbarInstanceIndex = toolbarsList.indexOf( this );
      if ( toolbarInstanceIndex > -1 ) {
        toolbarsList.splice( toolbarInstanceIndex, 1 );
        // TODO: + Unbind all events
      }

      // Remove element from DOM
      this.toolbarElement.remove();
    }


    getId() {
      return this.id;
    }


    show() {
      MicroModal.show( this.id, this._MODAL_CONFIG );
      this.render();
    }


    // eslint-disable-next-line class-methods-use-this
    close() {
      MicroModal.close();
    }





    /** PRIVATE FUNCTIONS */



    _init() {
      toolbarsList.push( this );

      this.toolbarElement = $( buildDialogTemplate( this.id, this.config, this.content ));

      // Add the element into the Toolbar container
      containerElement.append( this.toolbarElement );

      this.toolbarContentElement = this.toolbarElement.find( SELECTOR_TOOLBAR_CONTENT );

      this._normaliseToolData();

      // Rebuild list of favourites from local storage, if available and
      // enabled in config
      if ( this.config.showFavourites ) {
        const favouritesIdsList = getFavouritesListFromStorage( this._STORAGE_KEY );
        this.setFavouritesFromIds( favouritesIdsList );
      }

      this.showNotificationIfExists();

      // Create filtering services, if searching is enabled in config
      if ( this.config.showSearch ) {
        this.filterators = [
          FilteringFactory( `#${this.id} .group-favourite .flex-grid`, '.tile', [ this._titleBasedFilteringRule.bind( this ) ]),
          FilteringFactory( `#${this.id} .group-others .flex-grid`, '.tile', [ this._titleBasedFilteringRule.bind( this ) ]),
        ];
        document.querySelector( `#${this.id}-filter-query` ).addEventListener( 'input', this._searchingHandler.bind( this ));
      }

      this._MODAL_CONFIG = {
        onShow:        this._onShowHandler.bind( this ),
        onClose:       this._onCloseHandler.bind( this ),
        disableFocus:  true,
        disableScroll: true,
        // debugMode:   true,
      };
    }



    _onShowHandler() {
      UrlManager.updateSearchParam( this.id, true );
      $( `#${this.id}-filter-query` ).focus(); // Autofocus to the search
    }



    _onCloseHandler() {
      // Remove the query from the URL
      UrlManager.updateSearchParam( this.id );

      // Reset filter
      const filteringInputElement = document.getElementById( `${this.id}-filter-query` );

      if ( filteringInputElement != null && filteringInputElement.value && filteringInputElement.value !== '' ) {
        filteringInputElement.value = null;
        this.filterators.forEach( filterator => filterator.filter());
      }

      // IE11 scrolling reversal hack
      const bodyElement = document.querySelector( 'body' );

      bodyElement.style.overflow = 'auto';
      bodyElement.style.overflow = 'initial';
      bodyElement.style.height = 'auto';
      bodyElement.style.height = 'initial';
    }



    /** Perform filtering based on the input value. */
    _searchingHandler( event ) {
      this._searchValue = event.target.value.toLowerCase();
      this.filterators.forEach( filterator => filterator.filter());
    }



    _titleBasedFilteringRule( element ) {
      if ( !this._searchValue ) return true;

      const itemTitle = element.querySelector( '.title' ).textContent.toLowerCase().trim();

      return ( itemTitle.indexOf( this._searchValue ) !== -1 );
    }



    _bindEvents() {
      // Correct search box highlighting
      const filterQueryElement = $( `#${this.id}-filter-query` ),
        filterContainer = this.toolbarElement.find( '.filter' );

      filterQueryElement.bind( 'focus', () => filterContainer.addClass( 'group-focused' ));
      filterQueryElement.bind( 'focusout', () => filterContainer.removeClass( 'group-focused' ));

      if ( this.config.showFavourites ) {
        this.toolbarElement.find( '.dialog-content' ).bind( 'click', ( event ) => {
          if ( event.target && event.target.classList.length ) {
            if ( event.target.classList.contains( 'toggle-favourite' )) {
              this._toggleFavouriteTool( event );
            }
          }
        });
      }
    }



    _toggleFavouriteTool( event ) {
      const toolId = $( event.target ).parents( '.tile' )[0].id,
        tool = this._getToolById( toolId );


      if ( !tool ) return;

      if ( tool.isFavourited ) {
        // Unfavourite
        this.moveFavouritesToDefaults( this.data.favourites.indexOf( tool ));
      } else {
        // Favourite
        this.moveDefaultsToFavourites( this.data.defaults.indexOf( tool ));
      }

      // Save changes & render
      saveFavouritesListToStorage( this._STORAGE_KEY, this.data.favourites );
      this.render();
    }



    _getToolById( toolId ) {
      for ( let i = 0; i < this.data.favourites.length; i += 1 ) {
        if ( this.data.favourites[i].id === toolId ) return this.data.favourites[i];
      }
      for ( let i = 0; i < this.data.defaults.length; i += 1 ) {
        if ( this.data.defaults[i].id === toolId ) return this.data.defaults[i];
      }

      return null;
    }



    _normaliseToolData() {
      const getNormaliser = ( isFavourited ) => {
        return function normalise( tool ) {
          tool.id = `${this.id}.${tool.id}`;
          tool.isFavourited = isFavourited;
        };
      };

      this.data.favourites.forEach( getNormaliser( true ).bind( this ));
      this.data.defaults.forEach( getNormaliser( false ).bind( this ));
    }



    render() {
      // Remove all the originally added groups
      this.toolbarElement.find( `
        .${CLASS_BLOCK_FAVOURITES},
        .${CLASS_BLOCK_DEFAULTS}` )
        .remove();

      // (Re-)render and restablish all functions
      this.renderTools();
      if ( this.filterators ) this.filterators.forEach( filterator => filterator.refresh());
    }



    renderTools() {
      const contentBlockTemplates = [
        buildToolGroupTemplate(
          CLASS_BLOCK_FAVOURITES,
          this.data.favourites,
          this.config.showFavourites,
          `<span class="icon-star"></span>${TEXTS.TITLE_FAVOURITES}`
        ),
        buildToolGroupTemplate(
          CLASS_BLOCK_DEFAULTS,
          this.data.defaults,
          this.config.showFavourites,
          ( this.config.showFavourites ) ? `<span class="icon-layout"></span>${TEXTS.TITLE_DEFAULTS}` : null
        ),
      ];
      const newContentBlocks = $( contentBlockTemplates.join( '' ));
      this.toolbarContentElement.append( newContentBlocks );
    }





    showNotificationIfExists() {
      if ( this.content.notification ) {
        this.toolbarContentElement.prepend( buildNotificationTemplate( this.content.notification ));
      }
    }



    moveDefaultsToFavourites( toolIndexInDefaults ) {
      this.data.defaults[toolIndexInDefaults].isFavourited = true;
      this.data.favourites.push( this.data.defaults.splice( toolIndexInDefaults, 1 )[0]);
    }



    moveFavouritesToDefaults( toolIndexInFavourites ) {
      this.data.favourites[toolIndexInFavourites].isFavourited = false;
      this.data.defaults.push( this.data.favourites.splice( toolIndexInFavourites, 1 )[0]);
    }



    setFavouritesFromIds( favouritesIdsList ) {
      if ( !favouritesIdsList ) return;

      const { favourites, defaults } = this.data;

      // A) Update favourites
      for ( let i = 0; i < favourites.length; i += 1 ) {
        const currentFavourite = favourites[i];

        if ( favouritesIdsList.indexOf( currentFavourite.id ) === -1 ) {
          // Move to non-favourites
          this.moveFavouritesToDefaults( i );
          i -= 1;
        }
      }

      // B) Update non-favourites
      for ( let i = 0; i < defaults.length; i += 1 ) {
        const currentDefault = defaults[i];

        if ( favouritesIdsList.indexOf( currentDefault.id ) > -1 ) {
          this.moveDefaultsToFavourites( i );
          i -= 1;
        }
      }
    }

  }



  /** PUBLIC MODULE METHODS. */


  /**
   * Creates, initialises and returns {Toolbar} instance based on given data and
   * configuration model `modelObject`.
   *
   * @param {Object} modelObject -
   *    Model including data, content and configuration options for the Toolbar.
   *
   * @return {Toolbar}
   */
  function initToolbar( modelObject ) {
    if ( !modelObject ) {
      console.error( 'To initialise a new Toolbar dialog, you need to provide valid model Object.', modelObject );
      return undefined;
    }

    // If a toolbar with this particular ID is already initialised -> return it
    // instead of making new one.
    if ( hasProp( modelObject, 'id' ) && getInitialisedToolbar( modelObject.id )) {
      return getInitialisedToolbar( modelObject.id );
    }

    return new Toolbar( modelObject );
  }



  /**
   * Retrieves all existing initialised Toolbar dialogs.
   *
   * @return {Array<Toolbar>}
   */
  function getAllToolbars() {
    return toolbarsList;
  }



  /**
   * Removes all the Toolbar dialogs safely to prevent memory leaks.
   *
   * @returns {boolean}
   */
  function destroyAllToolbars() {
    while ( toolbarsList.length ) {
      toolbarsList[0].destroy();
    }

    return true;
  }




  /** MODULE INITIALISATIONS. */


  /**
   * Check for external dependencies and report/auto-import if any are missing.
   */
  function areDependenciesAvailable() {
    return hasProp( window, 'jQuery' );
  }


  /** @constructor */
  function constructor() {
    containerElement = $( TEMPLATE_TOOLBARS_CONTAINER );
    $( 'body' ).prepend( containerElement );
    $( 'body' ).prepend( $( SVG_ICONS ));
  }


  /** Initialisations after the DOM becomes ready. */
  function initOnDomReady() {}


  ( function init() {
    if ( !areDependenciesAvailable()) {
      console.error( '`jQuery` is not available in the global scope (window.jQuery). The Toolbar dialogs cannot be initialised.' );
      return;
    }

    // Populate public API interface
    toolbarApi.initToolbar = initToolbar;
    toolbarApi.getAllToolbars = getAllToolbars;
    toolbarApi.destroyAllToolbars = destroyAllToolbars;

    constructor();
    initOnDomReady();
  }());



}());


// Make API available for Modular JS codebases
export default toolbarApi;

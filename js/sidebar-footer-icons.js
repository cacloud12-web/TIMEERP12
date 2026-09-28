/**
 * Sidebar footer icons — match reference: trash, WhatsApp, logout (outline on teal).
 */
(function (global) {
  'use strict';

  var SVG_FOOTER_TRASH =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M9 5h6"/>' +
      '<path d="M10 5V4h4v1"/>' +
      '<path d="M4.5 7.5h15"/>' +
      '<path d="M7 7.5l.9 12.2a1 1 0 0 0 1 .9h6.2a1 1 0 0 0 1-.9L17 7.5"/>' +
    '</svg>';

  /* Chat bubble outline + telephone handset silhouette */
  var SVG_FOOTER_WHATSAPP =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M12 3.2c-4.75 0-8.6 3.58-8.6 8 0 1.55.5 3 1.4 4.2L3.4 20.6l5-1.32A8.9 8.9 0 0 0 12 20.4c4.75 0 8.6-3.58 8.6-8S16.75 3.2 12 3.2z"/>' +
      '<path class="sidebar-footer-fill" d="M14.85 13.95c-.2-.1-1.15-.57-1.33-.63-.18-.07-.31-.1-.44.1-.13.2-.5.63-.61.76-.11.13-.23.15-.42.05-.2-.1-.82-.3-1.57-.97-.58-.52-.97-1.16-1.08-1.36-.12-.2-.01-.3.08-.4.09-.09.2-.23.3-.34.1-.11.13-.2.2-.33.07-.13.03-.24-.02-.34-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33h-.37c-.13 0-.34.05-.52.24-.17.2-.67.65-.67 1.6s.69 1.85.78 1.98c.1.13 1.35 2.06 3.28 2.89.46.2.82.31 1.1.4.46.15.88.13 1.21.08.37-.06 1.13-.46 1.29-.9.16-.45.16-.83.11-.91-.04-.08-.18-.13-.38-.23z"/>' +
    '</svg>';

  var SVG_FOOTER_LOGOUT =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M12 4a8 8 0 1 0 0 16"/>' +
      '<path d="M12 12h8"/>' +
      '<path d="M17.5 9l3 3-3 3"/>' +
    '</svg>';

  global.SidebarFooterIcons = {
    trash: SVG_FOOTER_TRASH,
    whatsapp: SVG_FOOTER_WHATSAPP,
    logout: SVG_FOOTER_LOGOUT,
    html: function (root) {
      root = root || '';
      return (
        '<button type="button" class="sidebar__footer-btn" id="sidebarTrashBtn" aria-label="Trash" title="Trash">' +
          SVG_FOOTER_TRASH +
        '</button>' +
        '<a class="sidebar__footer-btn" href="' + root + 'whatsapp_chat.html" id="sidebarWhatsAppBtn" aria-label="WhatsApp" title="WhatsApp">' +
          SVG_FOOTER_WHATSAPP +
        '</a>' +
        '<button type="button" class="sidebar__footer-btn" id="sidebarLogoutBtn" aria-label="Logout" title="Logout">' +
          SVG_FOOTER_LOGOUT +
        '</button>'
      );
    },
    apply: function (scope) {
      var root = scope || document;
      var trash = root.querySelector ? root.querySelector('#sidebarTrashBtn') : null;
      var whatsapp = root.querySelector ? root.querySelector('#sidebarWhatsAppBtn') : null;
      var logout = root.querySelector ? root.querySelector('#sidebarLogoutBtn') : null;
      if (trash) trash.innerHTML = SVG_FOOTER_TRASH;
      if (whatsapp) whatsapp.innerHTML = SVG_FOOTER_WHATSAPP;
      if (logout) logout.innerHTML = SVG_FOOTER_LOGOUT;
    }
  };
})(typeof window !== 'undefined' ? window : this);

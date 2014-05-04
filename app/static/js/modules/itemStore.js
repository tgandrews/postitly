(function ($, window, undefined){
  var itemStore = {
    create: function (domElement) {
      var item = this.createItemFromElement(domElement);
      $.ajax({
        type: "POST",
        url: "/notes",
        data: item,
        dataType: "json"
      });
    },
    update: function (domElement) {
      var item = this.createItemFromElement(domElement);
      $.ajax({
        type: "PUT",
        url: "/notes/" + item.id,
        data: item,
        dataType: "json"
      });
    },
    createItemFromElement: function (domElement) {
      var span = domElement.getElementsByTagName('span')[0];
      var itemText = span.textContent;
      var itemId = domElement.getAttribute('data-id');
      var itemType = domElement.classList.contains('img') ? 'img' : 'txt';
      var itemLeft = domElement.style.left.replace('px','');
      var itemTop = domElement.style.top.replace('px','');
      var desktopRegex = /\/desktop\/(\d)/;
      var matches = desktopRegex.exec(window.location.pathname) || [];
      var itemDesktop = matches[1] || 1;

      return { id: itemId, left: itemLeft, top: itemTop, text: itemText, type: itemType, desktop: itemDesktop };
    }
  };

  if (window.postitly === undefined) {
    window.postitly = {};
  }
  window.postitly.itemStore = itemStore;
})($, window);

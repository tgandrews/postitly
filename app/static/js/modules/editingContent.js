(function ($, window, undefined) {
  var editingContent = {
    setup: function () {
      var items = document.querySelectorAll('.draggable-canvas');
      for (var i = 0;  i < items.length; ++i) {
        var item = items[i];
        this.makeEditable(item);
      }
    },
    makeEditable: function (item) {
      item.setAttribute('contenteditable', 'true');
      item.addEventListener('blur', editingContent.onBlur);
    },
    onBlur: function () {
      var item = window.postitly.itemStore.createItemFromElement(this);
      if (item.type === 'img') {
        this.style.backgroundImage = "url('" + item.text + "')";
        this.classList.add('img-added');
      }
      window.postitly.itemStore.update(this);
    }
  }

  if (window.postitly === undefined) {
    window.postitly = {};
  };
  window.postitly.editingContent = function () {
    editingContent.setup();
  };
  window.postitly.editingContentHelper = {
    makeEditable: function (item) {
      editingContent.makeEditable(item)
    }
  }
})($, window);

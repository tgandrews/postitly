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
      item.addEventListener('click', editingContent.onClick);
    },
    onBlur: function () {
      var item = window.postitly.itemStore.createItemFromElement(this);
      var text = item.text;
      if (item.type === 'img' && text.indexOf('http') === 0) {
        this.style.backgroundImage = "url('" + text + "')";
        this.classList.add('img-added');
      }
      window.postitly.itemStore.update(this);
    },
    onClick: function () {
      this.focus();
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

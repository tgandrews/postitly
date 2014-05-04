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
      // Cannot make editable something if it is display none
      if (!item.classList.contains('img-added')) {
        var span = item.querySelector('span');
        span.setAttribute('contenteditable', 'true');
        span.addEventListener('blur', editingContent.onBlur);
        item.addEventListener('click', editingContent.onClick);
      }
    },
    onBlur: function () {
      var itemElement = this.parentElement.parentElement;
      itemElement.classList.remove('focus');

      var item = window.postitly.itemStore.createItemFromElement(itemElement);
      var text = item.text;
      if (item.type === 'img' && text.indexOf('http') === 0) {
        itemElement.style.backgroundImage = "url('" + text + "')";
        itemElement.classList.add('img-added');
        this.removeAttribute('contenteditable')
      }
      window.postitly.itemStore.update(itemElement);
    },
    onClick: function () {
      if (!this.classList.contains('img-added')) {
        this.querySelector('span').focus();
        this.classList.add('focus');
      }
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

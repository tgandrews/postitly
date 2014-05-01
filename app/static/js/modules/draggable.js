(function ($, window, undefined) {
  var canvasDraggableOptions = { containment: 'parent' };

  var canvasDrop =  function (event, ui) {
    var $this = $(this);
    var $item, item;
    var position = { left: ui.position.left, top: ui.position.top };
    var updatingExisting = $this.has(ui.draggable).length === 1;
    if (updatingExisting) {
      $item = ui.draggable;
      item = $item.get(0);
    }
    else {
      var $item = $(ui.draggable).clone();
      $item.draggable(canvasDraggableOptions);

      $item.removeClass('draggable-source');
      $item.addClass('draggable-canvas');
      $item.css('position', 'absolute');

      var itemId = (new Date()).getTime();
      $item.attr('data-id', itemId)

      item = $item.get(0);
      window.postitly.editingContentHelper.makeEditable(item);
      $this.append(item);

      position.left = position.left - 200;
    }

    $item.css('left', position.left);
    $item.css('top', position.top);

    if (updatingExisting) {
      window.postitly.itemStore.update(item);
    }
    else {
      window.postitly.itemStore.create(item)
    }
  };

  if (window.postitly === undefined) {
    window.postitly = {};
  }
  window.postitly.draggable = function () {
    $('.draggable-source').draggable({ helper: 'clone'});
    $('.draggable-canvas').draggable(canvasDraggableOptions);


    $('#canvas').droppable({
      drop: canvasDrop
    });
  };
})($, window)

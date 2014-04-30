(function ($, window, undefined) {
  var canvasDraggableOptions = { continment: 'parent' };

  var canvasDrop =  function (event, ui) {
    var $this = $(this);
    var $item;
    var position = { left: ui.position.left, top: ui.position.top };

    if ($this.has(ui.draggable).length === 1) {
      $item = $(ui.draggable);
    }
    else {
      var $item = $(ui.draggable).clone();
      $item.draggable(canvasDraggableOptions);

      $item.removeClass('draggable-source');
      $item.addClass('draggable-canvas');
      $item.css('position', 'absolute');

      $item.attr('contentEditable', 'true');

      $this.append($item.get(0));

      position.left = position.left - 200;
    }

    $item.css('left', position.left);
    $item.css('top', position.top);
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
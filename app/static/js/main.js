$('.draggable-source').draggable({ helper: 'clone'});
$('.draggable-canvas').draggable();

$('#canvas').droppable({
  drop: function (event, ui) {
    var $this = $(this);
    var $item;
    var position = { left: ui.position.left, top: ui.position.top };

    if ($this.has(ui.draggable).length === 1) {
      $item = $(ui.draggable);
    }
    else {
      var $item = $(ui.draggable).clone();
      $item.draggable();

      $item.removeClass('draggable-source');
      $item.addClass('draggable-canvas');
      $item.css('position', 'absolute');
      $this.append($item.get(0));

      position.left = position.left - 200;
    }

    $item.css('left', position.left);
    $item.css('top', position.top);

    console.log(event, ui, $this);
  }
})

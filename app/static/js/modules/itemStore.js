(function ($, window, undefined){
  var itemStore = {
    create: function (item) {
      var data = {
        id: item.id,
        left: item.position.left,
        top: item.position.top,
        type: item.type,
        text: item.text
      };
      $.ajax({
        type: "POST",
        url: "/notes",
        data: data,
        dataType: "json",
        success: function () {
          console.log('Success!');
        }
      });
    }
  };

  if (window.postitly === undefined) {
    window.postitly = {};
  }
  window.postitly.itemStore = itemStore;
})($, window);

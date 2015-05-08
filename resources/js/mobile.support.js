$(window).on('load', function (e) {
  "use strict";
  $('body').addClass('finish');
});

$(document).ready(function () {
  "use strict";
  alert($(window).width());
  var targetWith = 640,
      scale = $(window).width() / targetWith;
  if (scale !== 1) {
    $('meta[name=viewport]').attr({
      'content': 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no, target-densitydpi=high-dpi, minimal-ui'
    });
  }
});
$(document).on('click', '#nav .menu', function () {
  "use strict";
  if ($(this).parent().hasClass('collapse')) {
    $(this).parent().removeClass('collapse');
  } else {
    $(this).parent().addClass('collapse');
  }
});
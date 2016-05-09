function AnimateOnChangeDirective($animate, $timeout) {
  'ngInject';

  return function(scope, elem, attr) {
    scope.$watch(attr.animateOnChange, function(nv, ov) {

      if (nv != ov) {
        let degree = '°C';
        var html = nv + degree;
        if (nv < ov) {
          var html = nv + degree + ' <i class="fa fa-caret-down"</i>';
        } else {
          var html = nv + degree + ' <i class="fa fa-caret-up"</i>';
        }

        var c = attr.animationClass;
        elem.html(html);
        $animate.addClass(elem, c).then(function() {
          $timeout(function() {
            $animate.removeClass(elem, c);
            elem.html(nv + degree);
          });
        });
      }
    });
  };
}

export default {
  name: 'animateOnChange',
  fn: AnimateOnChangeDirective
};

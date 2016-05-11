function AnimateOnChangeDirective($animate, $timeout) {
  'ngInject';

  return function(scope, elem, attr) {
    scope.$watch(attr.animateOnChange, function(nv, ov) {

      if (nv != ov) {
        let postfix = attr.postfix;
        let icon = attr.icon;
        let leftIcon = '';
        if (icon) {
          let leftIcon = '<i class="fa fa-' + icon + '"></i> ';
        }

        var html = leftIcon + nv + postfix;

        if (attr.direction) {
          if (nv < ov) {
            var html = leftIcon + nv + postfix + ' <i class="fa fa-caret-down"></i>';
          } else {
            var html = leftIcon + nv + postfix + ' <i class="fa fa-caret-up"></i>';
          }
        }


        var c = attr.animationClass;
        elem.html(html);
        $animate.addClass(elem, c).then(function() {
          $timeout(function() {
            $animate.removeClass(elem, c);
            elem.html(leftIcon + nv + postfix);
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

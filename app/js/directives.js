'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('formatPhone', [
    function() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, elem, attrs, ctrl, ngModel) {
                elem.add(phoneNumber).on('keyup', function() {
                   var origVal = elem.val().replace(/[^\w\s]/gi, '');
                   if(origVal.length === 10) {
                     var str = origVal.replace(/(.{3})/g,"$1-");
                     var phone = str.slice(0, -2) + str.slice(-1);
                     jQuery("#phoneNumber").val(phone);
                   }
                });
            }
        };
    }
])
    .directive('myApp.stripeForm', ['$log', function($log) {
      return function(scope, elem, attrs) {
        var form =  document.createElement("form");
        form.action = "charge";
        form.method = "POST";
        var script =  document.createElement("script");
        script.src = "https://checkout.stripe.com/checkout.js";
        script.className = "stripe-button";
        script.setAttribute("data-key", "sk_test_NiYxCU5I0d8nCligrf3TLgKp");
        script.setAttribute("data-image", "square-image.png");
        script.setAttribute("data-name", "Demo Site");
        script.setAttribute("data-description", "2 widgets ($20.00)");
        script.setAttribute("data-amount", "2000");

        form.appendChild(script);

        elem.append(angular.element(form));
      };
}]);


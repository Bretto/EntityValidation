(function () {
    "use strict";

    var module = angular.module('ValidationModule');

    module.config(function (ValidatorsConfigProvider) {
        var config = {};
        // add custom validators...
        config.required = function (value) {
            return !!value;
        };

        ValidatorsConfigProvider.config = config;
    });

})();





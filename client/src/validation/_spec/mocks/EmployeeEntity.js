(function(){
    "use strict";

    var module = angular.module('ValidationModule');

    module.factory('EmployeeEntity', function (EntityValidation) {

        function EmployeeEntity() {
            var vFn = EntityValidation.validators;

            this.id = [
                {vFn: vFn.isInt, msg: 'field must be a number'}
            ];
            this.nom = [
                {vFn: vFn.isAlpha, msg: 'field must be a string'},
                {vFn: vFn.isLength, args: {min: 5, max: 10}, msg: 'field must be between 5 and 10'}
            ];
            this.prenom = [
                {vFn: vFn.isAlpha, msg: 'field must be a string'}
            ];
            this.email = [
                {vFn: vFn.isEmail, msg: 'field must be an email'}
            ];
        }

        EmployeeEntity.new = function(data){

            var instance = new EmployeeEntity();
            EntityValidation.call(instance, data);

            return instance;
        };

        return EmployeeEntity;
    });
})();





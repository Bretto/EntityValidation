(function () {
    "use strict";


    var module = angular.module('AppModule', [
        'ValidationModule'
    ]);

    module.controller('AppCtrl', function ($scope, EmployeeEntity) {
        console.log('AppCtrl');

        var data = {
            "id": 1,
            "nom": "Coffin",
            "prenom": "Brett",
            "email": "This is not an email"
        };

        $scope.editEmployee = EmployeeEntity.new(data);
    });


    module.factory('EmployeeEntity', function (EntityValidation) {

        function EmployeeEntity() {
            var vFn = EntityValidation.validators;

            this.id = [
                {vFn: vFn.required, msg: 'field is required'},
                {vFn: vFn.isInt, msg: 'field must be a number'}
            ];
            this.nom = [
                {vFn: vFn.required, msg: 'field is required'},
                {vFn: vFn.isAlpha, msg: 'field must be a string'},
                {vFn: vFn.isLength, args: {min: 5, max: 10}, msg: 'field must be between 5 and 10'}
            ];
            this.prenom = [
                {vFn: vFn.required, msg: 'field is required'},
                {vFn: vFn.isAlpha, msg: 'field must be a string'}
            ];
            this.email = [
                {vFn: vFn.isEmail, msg: 'field must be an email'}
            ];
        }

        EmployeeEntity.new = function (data) {

            var instance = new EmployeeEntity();
            EntityValidation.call(instance, data);

            return instance;
        };

        return EmployeeEntity;
    });


})();


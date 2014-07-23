(function () {
    "use strict";

    var module = angular.module('ValidationModule', [])

    module.factory('EntityValidation', function (Validators) {

        function EntityValidation(data) {

            this.originalProperties = getOriginalProperties.call(this);

            this.getValidations = getValidations;
            this.setPropertiesValue =  setPropertiesValue;
            this.getOriginalValue = getOriginalValue;
            this.validate = validate;
            this.cancelChanges = cancelChanges;
            this.isModified = isModified;
            this.getCurrentValues = getCurrentValues;
            this.validateAll = validateAll;

            init.call(this, data);
        }

        EntityValidation.validators = Validators;

        function init(data){

            this.validations = this.getValidations();
            this.setPropertiesValue(data);
            this.originalValues = this.getOriginalValue();
            this.validateAll();
        }

        function getOriginalProperties() {
            var propertyNames = Object.getOwnPropertyNames(this);
            var originalProperties = {};
            _.forEach(propertyNames, function (propertyName) {
                originalProperties[propertyName] = propertyName;
            }, this);
            return originalProperties;
        }


        function getValidations() {
            var validations = {};
            _.forEach(this.originalProperties, function (propertyName) {
                //TODO create a Validator Class to check integrity and dinamic replacement of valiables in the msg string
                validations[propertyName] = this[propertyName];
            }, this);
            return validations;
        }

        function setPropertiesValue(data) {
            data = data || {};
            _.forEach(this.originalProperties, function (propertyName) {
                this[propertyName] = data[propertyName];
            }, this);
        }

        function getOriginalValue() {
            var originalValues = {};
            _.forEach(this.originalProperties, function (propertyName) {
                originalValues[propertyName] = this[propertyName];
            }, this);
            return originalValues;
        }

        function validateAll() {
            _.forEach(this.originalProperties, function (propertyName) {
                 this.validate(propertyName);
            }, this);
        }


        function validate(propertyName) {
            var value = (this[propertyName])? this[propertyName]: '';
            this.errors = this.errors || {};
            this.errors[propertyName] = '';

            var validationFns = this.validations[propertyName];
            _.forEach(validationFns, function(validation) {
                var args = validation.args || {};
                var params = _.values(args);
                params.unshift(value);
                if (!validation.vFn.apply(this, params)) {
                    var currentMsg = this.errors[propertyName];
                    var newMsg = validation.msg;
                    this.errors[propertyName] = (!!currentMsg) ? currentMsg + ', ' + newMsg : newMsg;
                }
            }, this);
        }

        function isModified(){
            var isModified = !_.isEqual(this.getCurrentValues(), this.originalValues);
            return isModified;
        }

        function cancelChanges() {
            this.setPropertiesValue(this.originalValues);
            this.validateAll();
        }

        function getCurrentValues() {
            var objValues = {};
            for (var propertyName in this.originalProperties) {
                objValues[propertyName] = this[propertyName];
            }
            return objValues;
        }

        return EntityValidation;

    });


    module.directive('entityForm', function () {

        function controller($scope, $element, $attrs) {

            this.getEntity = function(){
                return $scope.entity;
            };
        }

        return {
            restrict: 'E',
            scope: {
                entity: '='
            },
            controller: controller
        };
    });

    module.directive('entityField', function () {

        function link(scope, element, attrs, entityController) {

            scope.$watch(function(){ return entityController.getEntity(); }, function(value){
                scope.entity = value;
            });
        }

        return {
            restrict: 'E',
            replace: true,
            require: '^entityForm',
            scope: {
                label: '@',
                propertyName: '@'
            },
            templateUrl: 'src/validation/entity-field.html',
            link: link
        };
    });


})();

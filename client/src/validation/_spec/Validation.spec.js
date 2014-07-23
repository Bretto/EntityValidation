describe('Validation', function () {

//    Template to run async tests
//    beforeEach(inject(function ($injector) {
//        var $timeout = $injector.get('$timeout');
//        var done = false;
//
//        function doAsync() {
//            $timeout(function () {
//                done = true;
//            }, 1000);
//            $timeout.flush();
//        }
//
//        runs(doAsync);
//        waitsFor(function () {
//            return done;
//        });
//    }));

    var EmployeeEntity,
        EntityValidation,
        employeeEntity,
        vFn,
        originalProperties,
        data,
        validations,
        $compile,
        $rootScope,
        $controller
        ;

    beforeEach(module('ValidationModule'));
    beforeEach(module('TemplatesModule'));
    beforeEach(inject(function (_EmployeeEntity_, _EntityValidation_, _$compile_, _$rootScope_, _$controller_, $injector) {

        EmployeeEntity = _EmployeeEntity_;
        EntityValidation = _EntityValidation_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        vFn = EntityValidation.validators;
        originalProperties = {id: 'id', nom: 'nom', prenom: 'prenom', email: 'email'};
        data = {id: 1, nom: 'Coffin', prenom: 'Brett', email: 'separ8@gmail.com'};

        validations = [
            {vFn: vFn.isInt, msg: 'field must be a number'},
            {vFn: vFn.isAlpha, msg: 'field must be a string'},
            {vFn: vFn.isLength, args: {min: 5, max: 10}, msg: 'field must be between 5 and 10'},
            {vFn: vFn.isAlpha, msg: 'field must be a string'},
            {vFn: vFn.isEmail, msg: 'field must be an email'}
        ];

        employeeEntity = EmployeeEntity.new(data);
    }));

    describe('EntityValidation', function () {

        describe('originalProperties', function () {
            it('should be equal to data', function () {
                expect(employeeEntity.originalProperties).toEqual(originalProperties);
            });
        });

        describe('originalValues', function () {
            it('should be equal to data', function () {
                expect(employeeEntity.originalValues).toEqual(data);
            });
        });

        describe('validations', function () {
            it('should be equal to validations', function () {
                expect(employeeEntity.originalValues).toEqual(data);
            });
        });

    });

    describe('Validation Directives', function () {

        var entityFormElem;
        var entityFieldElem;
        beforeEach(inject(function ($injector) {
            var $timeout = $injector.get('$timeout');

            $rootScope.myEntity = employeeEntity;
            entityFormElem = angular.element(
                    '<entity-form entity="myEntity">' +
                    '<entity-field label="Nom" property-name="nom"></entity-field>' +
                    '</entity-form>');

            $compile(entityFormElem)($rootScope);
            $rootScope.$digest();
            entityFieldElem = entityFormElem.find('.ng-isolate-scope');

        }));


        describe('EntityForm', function () {

            describe('getEntity()', function () {
                it('should be defined', function () {
                    expect(entityFormElem.controller('entityForm').getEntity).toBeDefined();
                });

                it('should be equal to employeeEntity', function () {
                    expect(entityFormElem.controller('entityForm').getEntity()).toBe(employeeEntity);
                });
            });
        });

        describe('EntityField', function () {

            describe('label', function () {
                it('should be equal to "Nom"', function () {
                    expect(entityFieldElem.isolateScope().label).toBe('Nom');
                });
            });

            describe('propertyName', function () {
                it('should be equal to "nom"', function () {
                    expect(entityFieldElem.isolateScope().label).toBe('Nom');
                });
            });

            describe('entity', function () {
                it('should be equal to employeeEntity', function () {
                    expect(entityFieldElem.isolateScope().entity).toBe(employeeEntity);
                });
            });
        });


    });


});

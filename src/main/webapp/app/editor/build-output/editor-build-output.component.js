/**
 * Created by Josias Montag on 20/10/16.
 */
(function () {
    'use strict';

    angular
        .module('exerciseApplicationApp')
        .component('editorBuildOutput', {
            bindings: {
                participation: '<',
                isBuilding: '<',
            },
            templateUrl: 'app/editor/build-output/editor-build-output.html',
            controller: EditorBuildOutputController
        });

    EditorBuildOutputController.$inject = ['Participation', 'Repository', '$scope' ,'$timeout'];

    function EditorBuildOutputController(Participation, Repository, $scope, $timeout) {
        var vm = this;

        vm.buildLogs = [];

        vm.$onInit = function () {

        };

        vm.$onChanges = function (changes) {
            if (changes.isBuilding && changes.isBuilding.currentValue === false) {
                getBuildLogs();
            }
        };


        function getBuildLogs() {
            Repository.buildlogs({
                participationId: vm.participation.id
            }, function (buildLogs) {
                vm.buildLogs = buildLogs;
                $(".buildoutput").scrollTop($(".buildoutput")[0].scrollHeight);
            });
        }





    }
})();

import angular from 'angular';

require('angular-animate');
require('angular-ui-bootstrap');
require('ui-navbar');
require('angular-fontawesome');
require('spin.js');
require('angular-spinner');
require('wu');
require('angular-chart.js');
require('lodash');
require('lodash-math');
require('angular-breadcrumb');
require('../../node_modules/ng-stomp/dist/ng-stomp.standalone.min.js');
require('angularjs-slider');
require('angular-xeditable');
require('angular-ui-switch');
require('../../node_modules/angular-toasty/dist/angular-toasty.js');
require('chart.js');
require('angular-chart.js');

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';
import 'angular-ui-router';
import 'angular-resource';
import 'angular-spring-data-rest';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';

// create and bootstrap application
const requires = [
  'ui.router',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives',
  'ngResource',
  'spring-data-rest',
  'ngAnimate',
  'ui.bootstrap',
  'picardy.fontawesome',
  'angularSpinner',
  'chart.js',
  'ncy-angular-breadcrumb',
  'ngStomp',
  'rzModule',
  'xeditable',
  'uiSwitch',
  'angular-toasty',
  'chart.js'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});

function OnRun($rootScope, AppSettings, $animate, editableOptions) {
  'ngInject';

  // $animate.enabled(true);
  editableOptions.theme = 'bs3';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';

    if ( toState.title ) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;
  });

}

export default OnRun;

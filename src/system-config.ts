// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'moment': 'vendor/moment',
  'angular2-jwt': 'vendor/angular2-jwt',
  'ng2-bs3-modal': 'vendor/ng2-bs3-modal'
};

/** User packages configuration. */
const packages: any = {
  'moment': { format: 'cjs', main: 'moment.js' },
  'angular2-jwt': { main: 'angular2-jwt.js' },
  'ng2-bs3-modal': { defaultExtension: 'js', main: 'ng2-bs3-modal.js' }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/header',
  'app/footer',
  'app/side-menu',
  'app/dashboard',
  'app/dataViews',
  'app/services',
  'app/user-mgmt',
  'app/pipes',
  'app/transactions',
  'app/profile',
  'app/about',
  'app/shared/components',
  'app/shared/hat-models',
  'app/shared/interfaces',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });

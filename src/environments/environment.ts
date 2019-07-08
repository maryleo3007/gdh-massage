// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    //desarrollo gdh.masajes
    // apiKey: "AIzaSyBm7Wdm4BYbt6QuiDBMfsYXIfI3ZC158zU",
    // authDomain: "gdh-masajes-produccion.firebaseapp.com",
    // databaseURL: "https://gdh-masajes-produccion.firebaseio.com",
    // projectId: "gdh-masajes-produccion",
    // storageBucket: "gdh-masajes-produccion.appspot.com",
    // messagingSenderId: "497018884063"
    //nueva url masajes
    apiKey: "AIzaSyBp4GPYTdYOhjYbXH8STLKnHN50YsXXSfw",
    authDomain: "mi-bienestar-masajes.firebaseapp.com",
    databaseURL: "https://mi-bienestar-masajes.firebaseio.com",
    projectId: "mi-bienestar-masajes",
    storageBucket: "mi-bienestar-masajes.appspot.com",
    messagingSenderId: "425586986224"

  }
};
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  CarServiceApiBaseUrl: "https://localhost:44340/api",
  RegistrationConfig: {
    textMinLength: 4,
    textMaxLength: 20,
    experienceMinValue: 0,
    experienceMaxValue: 60
  },
  GoogleMap: {
    defaultLat: 48.3794,
    defaultLng: 31.1656,
    defaultZoom: 6
  }
};

/*
 * @Descripttion:
 * @version:
 * @Author: huangyueshi
 * @Date: 2020-07-08 17:09:40
 * @LastEditors: huangyueshi
 * @LastEditTime: 2020-09-07 17:40:40
 */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  garnetOthersLoginUrl:
  'http://localhost:4200/#/login?callbackUrl=http://localhost:4000/#/login',
  // garnetOthersLoginUrl:
  //   'http://192.168.108.51:12305/#/login?callbackUrl=http://localhost:4000/#/login',
  garnetApiUrl: 'http://192.168.108.51:12305',
  server_url: '/garnet/v3.0'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

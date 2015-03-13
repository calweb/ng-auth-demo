# Angular Auth Demo with Satellizer

This is a simple demo MEAN application that is intended to demonstrate the use of authentication with [Satellizer](https://github.com/sahat/satellizer) with a small nodejs/express backend, but focusing more on the AngularJS side of things.


#### [Obtaining Oauth Keys](https://github.com/sahat/satellizer#obtaining-oauth-keys)

Please refer to Satellizer's Documentation to learn how to configure and obtain oauth keys.

#### Angular Modules




### Running Locally

### Deploying to Heroku

- heroku create appName
- heroku addons:add mongolab
- heroku push origin master 


### Directory Structure

``` javascript
|- app                                  // public folder (angularjs files)
|  |- vendor/                           // bower components
|  |- stylesheets/
|  |- auth/                             // auth feature
|  | |- directives
|  | | |- passwordMatch.js
|  | | |- passwordStrength.js
|  | |- views/
|  | | |- login.html
|  | | |- signup.html
|  | |- auth.login.js
|  | |- auth.logout.js
|  | |- auth.module.js
|  | |- auth.signup.js
|  |- posts/                            // posts feature
|  | |- views/
|  | | |- create.html
|  | | |- edit.html
|  | | |- list.html
|  | | |- show.html
|  | |- posts.js
|  | |- postsController.js
|  | |- postsServices.js
|  |- home/                            // home feature
|  | |- views/
|  | | |- home.html
|  | | |- navbar.html
|  | |- navbar.js
|  |- profile/                        // profile feature
|  | |- views/
|  | | |- profile.html
|  | |- profile.accountService.js
|  | |- profile.controller.js
|  | |- profile.module.js
|  |- app.js                         // main angular application module
|  |- index.html
|- routes
|  |- apiCrud.js
|  |- auth.js
|  |- helpers.js
|  |- profile.js
|- entities
|  |- User.js
|- .bowerrc                           // tells bower where to install dependencies
|- .gitignore
|- config.js                        // All the server side environment secrets
|- server.js                       // main nodejs app file
|- bower.json
|- package.json
|- Procfile

```

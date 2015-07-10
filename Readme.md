# Angular Auth Demo with Satellizer

This is a simple demo MEAN application that is intended to demonstrate the use of authentication with [Satellizer](https://github.com/sahat/satellizer) with a small nodejs/express backend, but focusing more on the AngularJS side of things.


#### [Obtaining Oauth Keys](https://github.com/sahat/satellizer#obtaining-oauth-keys)

Please refer to Satellizer's Documentation to learn how to configure and obtain oauth keys.

#### Angular Modules




### Running Locally
- In terminal you need to start mongo => mongod
- If you get the following error when typing mongod `ERROR: dbpath (/data/db) does not exist.` then run the following
```bash
$ sudo mkdir -p /data/db
$ sudo chmod 0755 /data/db
$ sudo chown $USER /data/db
```

- `gulp serve-dev` // starts up the server, opens browser and starts livereload

### Deploying to Heroku

You'll need the [heroku cli toolbelt](https://toolbelt.heroku.com/) to perform the following commands.

```bash
$ heroku create appName
$ heroku addons:add mongolab
$ git push heroku master
```

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

# Agemos

## How to build the project

### Development mode:

+ run npm install
+ run bower update
+ install gulp-cli globally if not installed (with command: npm install -g gulp-cli)
+ run gulp
+ run node_modules\\.bin\nodemon server\server.js (to start up dev-server)
+ open localhost:8000 in browser

P.S. http://localhost:8000/#/event-emitter  - the address for emitting login/logout events


### Production mode
+ Create a build folder for distribution (please follow steps from development mode for that)
+ Serve the build folder with an apache or any other web server
    + copy content of build folder in /var/www/html/
    + add line FallbackResource /html/index.html in apache2.conf

<!--### TODO AGL specifics-->
<!--+ Edit app/shared/services/afm-main.ts to match AGL binding-->
<!--+ Edit app/shared/services/agl-identity.ts to match AGL Identity binding-->
<!--+ Edit app/auth/auth.service.ts to match AGL Identity binding-->


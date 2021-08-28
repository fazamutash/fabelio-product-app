engine:
node version 10.14.0
npm version 6.14.8

prerequisite:
you have postgres installed on your local

note:
you need run it with two terminal.
The first one is for backend running on port 5000.
The second one is for frontend running on port 3000.

steps:
go to config folder
create a file like config.example.json and name it to config.json
update database configuration under development object on config.json

Terminal 1:
npm install
sequelize db:migrate
sequelize db:seed:all
npm start

Terminal 2:
cd client
npm install 
npm start

To run the test:
npm run test


deploy to heroku:
make sure you have pgsql addons enabled
to do this:
heroku addons:create heroku-postgresql:hobby-dev -a application-name

and then set PGSSLMODE to be require
heroku config:set PGSSLMODE=require

push to heroku
git push heroku master
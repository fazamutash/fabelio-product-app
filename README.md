# fabelio-product-app

**engine**:

node version 10.14.0

npm version 6.14.8

  

**prerequisite**:
you have postgres installed on your local

  

**note**:

you need run it with two terminal.

The first is for backend running on port 5000.

The second is for frontend running on port 3000.

  

**steps**:

go to config folder

create a file like `config.example.json` and name it to `config.json`

update database configuration under development object on `config.json`

  

**Terminal 1**:
```sh
npm install
sequelize db:migrate
sequelize db:seed:all
npm start
```
  

**Terminal 2**:

```sh
cd client
npm install
npm start
```

  

**To run the test**:

```sh
npm run test
```

  
  

**deploy to heroku**:
make sure you have pgsql addons enabled

to do this:
```sh
heroku addons:create heroku-postgresql:hobby-dev -a application-name
```

  

and then set PGSSLMODE to be require

```sh
heroku config:set PGSSLMODE=require
```

  

push to heroku

```sh
git push heroku master
```


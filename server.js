const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/sigin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'LSDQ',
        database: 'frecog'
    }
});

// db.select('*').from('users').then(data =>{
//     console.log(data);
// });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '1',
            name: 'A',
            email: 'a@gmail.com',
            password: '*',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'B',
            email: 'b@gmail.com',
            password: '**',
            entries: 0,
            joined: new Date()
        },
        {
            id: '3',
            name: 'C',
            email: 'c@gmail.com',
            password: '***',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '1',
            hash: '',
            email: 'a@gmail.com'
        }
    ]
}

app.get('/', (req, res) => { res.send(database.users) })

app.post('/signin', (req,res)=> {signin.handelSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=> {register.handelRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res)=> {profile.handelProfile(req,res,db)})

app.put('/image', (req,res) => {image.handelImage(req,res,db)})

app.post('/imageurl', (req,res) => {image.handelApiCall(req,res)})

const PORT = process.env.PORT
app.listen(800, () => {
    console.log('app is running on port 800 😋')
})
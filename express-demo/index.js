const express = require('express');
const Joi = require('joi');
const { error } = require('joi/lib/types/lazy');
const log = require('./logger');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const config = require('config');

console.log(`the value of the env is ${process.env.NODE_ENV}`);
console.log(app.get('env'));

console.log(`application password is ${config.get('mail.password')}`);

//confuguration 
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'))
app.use(log);
app.use(helmet());
app.use(morgan('tiny'));
app.use((req, res, next) => {
    console.log('Authenticating...');
    next();
})



const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' },

];

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

app.get('/api/courses', (req, res) => {
    console.log(`inside the value ${req}`);
    res.send(courses);

})

app.get('/api/courses/:id', (req, res) => {
    const schema ={
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);
    console.log(`the value of the result from validation is ${result}`);
    if (!req.body.name || req.body.name.length < 3) res.status(400).send("Name is required and should be minimum 3 characters");
    const course = courses.find(p => p.id === parseInt(req.params.id));
      if (!course) res.status(404).send("Course with the given id is not found");
    res.send(course);

})

app.post('/api/courses', (req, res) => {
    const schema ={
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);
    console.log(result);
    if (result.error) res.status(400).send(result.error.details[0].message);
       const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);

    res.send(course);

})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on ${port}.........`))

const express = require('express');

const app = express();
app.use(express.json);

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
    {id: 4, name: 'course4'},
];
app.get('/', (req, res) => {    
    res.send('Hello World');
    res.end;
}
);

app.get('/api/courses', (req, res) => {
    console.log(`inside the value ${req}`);
    res.send(courses);
    res.end;
})

app.get('/api/courses/:id', (req, res) => {
    console.log(`inside the value ${req}`);
    const course = courses.find(p=> p.id === parseInt(req.params.id));
    if(!course) res.status(404).send("Course with the given id is not found");
    res.send(course);
    res.end;
})

app.post('/api/courses', (req,res)=>{
    console.log(`inside the value ${req}`);
    const course ={
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    
    res.send(course);
    res.end;
})

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on ${port}.........`))

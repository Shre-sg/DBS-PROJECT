const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json());   //for post

const courses = [
    {id: 1, name: 'maths1'},
    {id: 2, name: 'maths2'},
    {id: 3, name: 'maths3'},
];

app.get('/', (req, res)=> {
  res.send('Hello World');
});

app.get('/api',(req, res)=> {
    res.send([1,2,30]);
});

// app.get('/api/:year/:month',(req, res) => {
//     //res.send(req.params);  //will givw month ans year which is object of re.paramas
//     //res.send(req.params.year);   //will give year
//     res.send(req.params.month);  //wll give mnoth
// });

app.get('/api/courses', (req, res) =>{
    res.send(courses);   
});



app.post('/api/courses', (req,res) => {

    //for joi easy error or validation type
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required(),
    // });

    // const { error } = schema.validate(req.body);
    
    
    // if (error) {
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }
    const {error} = Valcourse(req.body);
    if (error) {
       res.status(400).send(error.details[0].message);
       return;
    }


    //same thing in the above 
    // if(!req.body.name || req.body.name.length <3) {
    //     res.status(400).send('name is required and moer than 3 lenght');
    //     return; 
    // };

    const course = {
        id: courses.length +1,
        name: req.body.name    
    };

    courses.push(course);
    res.send(course);

});


app.get('/api/courses/:id',(req, res) => {
    
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) {
        res.status(404).send('the course doesn\'t exist');
    } else {
        res.json(course);
    }
});



app.put('/api/courses/:id', (req,res) => {
    
    //find 
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('the course doesn\'t exist');
        return;
    }

    
    //valdidate
    // const schema = Joi.object({
    //      name: Joi.string().min(3).required(),
    // });
    // const { error } = schema.validate(req.body);  
    
    const {error} = Valcourse(req.body);
    if (error) {
       res.status(400).send(error.details[0].message);
       return;
    }

    //update 
    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id', (req,res) => {
    //look for course if not send 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('the course doesn\'t exist');  //easy way

    //delele & retun the deldeted course
    const index = courses.indexOf(course);
    courses.splice(index,1); //removes one obj @ index 

    res.send(course);

    
});


//create a joi func to make our work easier
function Valcourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return { error } = schema.validate(course);

}

//this is usefull when you work with company as they will give you the their own port addrs
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening to PORT'));


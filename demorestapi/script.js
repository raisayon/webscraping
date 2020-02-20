const express = require('express'); //Import Express
const Joi = require('joi'); //Import Joi
const app = express(); //Create express application
app.use(express.json()); //used the json file

const incomestatement = [
    {id:1,year:'2020'},
	{id:2,year:'2019'},
	{id:3,year:'2018'}
	
	
]

//Read request handlers
//Display the message when the URL consist of'/'
app.get('/' , (req, res) => {
	res.send('Welcome to sayon Rest Api!');
	
});

//Display the List of Customers when URL consists of api income statement
app.get('/api/incomestatement', (req,res)=> {
	res.send(incomestatement);
});

//Display the list of Customers when URL consists of api customers
app.get('/api/incomestatement/:id', (req, res) => {
	const incomestatementd = incomestatement.find(c => c.id === parseInt(req.params.id));  

    if (!incomestatement) res.status(404).send('<h2>Error</h2>')
    res.send(incomestatementd);

});

//Create Request Handler
//CREATE NEW incomestatement information
app.post('/api/incomestatement', (req, res)=> {
	const {error} = validateincomestatement(req.body);
	if (error){
		res.status(400).send(error.details[0].message)
		return;
	}
	//Increment the income statement id
	const incomestatementd = {
		id:incomestatement.length + 1,
		year:rq.body.year
	};
	incomestatement.push(incomestatementd);
	res.send(incomestatementd);
});

//Update Request handlers
//Update Existing Incomestatement Information
app.put('/api/incomestatement/:id', (req,res) => {
	const incomestatementd = incomestatement.find(c=> c.id === parseInt(req.params.id));
	if (!incomestatementd) res.status(404).send('<h2 style="font-family: Malgun Gothic; color:darkred;">Not Found!! </h2>')
	
    const { error } = validateincomestatement(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}
	
	incomestatementd.year = req.body.year
	res.send(incomestatement);
});
	
//Delete Request Handler
//
	
//Validate Information
function validateincomestatement(incomestatement) {
	const schema = {
		year : Joi.string().min(3).required()
	};
	return Joi.validate(incomestatement, schema);


//Port Environment variable
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port $(port)..'));
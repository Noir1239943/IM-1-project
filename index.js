const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userController = require('./user/user');

const app = express();

// Enable open CORS handling so local frontend paths can hit endpoints safely
app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(bodyParser.json());

// Main App API Routes
app.post('/usersave', userController.saveUser);
app.post('/userlogin', userController.loginUser);

app.listen(3006, () => {
    console.log('Server is running on port 3006');
});
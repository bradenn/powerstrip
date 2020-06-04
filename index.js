const env = require('./env/env');

const express = require('express');
let bodyParser = require('body-parser')
let cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', require('./routes/'));

app.use((data, req, res, next) => {
    if (res.headersSent) {
        return next(data)
    }
    res.status(data.status || 500);
    res.json({success: data.success, status: data.status, message: data.message, data: data.object});
});

const port = env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));
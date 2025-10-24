// External Modules
const express = require('express');
require("@dotenvx/dotenvx").config(); // with dotenvx now we can encrypt .env files

// Local Modules


const app = express();


//middleware
app.use(express.json());



// Server Start
const PORT = process.env.PORT;
app.listen(PORT || 1000, () => {
    console.log(`server is running...`);
})
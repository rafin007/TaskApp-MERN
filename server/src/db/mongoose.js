const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://arefin123:arefin123@arefin-er3iu.mongodb.net/task-app?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
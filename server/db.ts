import * as mongoose from 'mongoose';

class DataBase {
    private dburl = 'mongodb://127.0.0.1/apiPessoa';
    private dbconnection;

    constructor() {}

    createConnection() {
        mongoose.connect(this.dburl);
        this.logger(this.dburl)
    }

    logger(url) {
        this.dbconnection = mongoose.connection;
        this.dbconnection.on('connected', () => console.log('mongoose connected...'));
        this.dbconnection.on('error', error => console.error.bind(console, 'connection error' + error));
    }
}

export default DataBase;
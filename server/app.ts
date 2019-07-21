import * as express from 'express';
import * as bodyparser from 'body-parser';

import database from './db';
import controller from './controller';

class App {
    public app: express.Application;
    private databse: database;
    private controller: controller;
    constructor() {
        this.app = express();
        this.middleware()
        this.databse = new database();
        this.databse.createConnection();
        this.controller = new controller();
        this.routes();
    }

    middleware() {
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({extended: true}));
    }

    routes() {
        this.app.route('/').get((req,res) => {
            return res.status(200).json({"result": "hello world"});
        })
        this.app.route('/api/pessoas').get((req, res) => {
            return this.controller.select(req, res);
        })
        this.app.route('/api/pessoas/:id').get((req,res) => {
            return this.controller.selectOne(req, res);
        })
        this.app.route('/api/pessoas/:id').delete((req,res) => {
            return this.controller.delete(req, res);
        })
        this.app.route('/api/pessoas/:id').put((req,res) => {
            return this.controller.update(req, res);
        })
        this.app.route('/api/pessoas').post((req,res) => {
            return this.controller.insert(req, res);
        })
    }
}

export default new App();
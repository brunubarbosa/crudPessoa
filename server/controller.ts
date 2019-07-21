import model from './model';


class Controller {
    constructor() {
    }
    getPessoa() {
        return model.find({})
    }

    select(req, res) {
        this.getPessoa()
        .then(pessoas => res.status(200).json({'result': pessoas}))
        .catch(err => res.status(400).json({result: err}))
    }

    getPessoaById(id) {
        return model.find(id);
    }

    selectOne(req, res) {
        const id = { _id: req.params.id }
        this.getPessoaById(id)
        .then(pessoas => res.status(200).json({'result': pessoas}))
        .catch(err => res.status(400).json({result: err}))
    }
    deleteById(id) {
        return model.deleteOne(id);
    }

    delete(req, res) {
        const id = { _id: req.params.id }
        this.deleteById(id)
        .then(pessoas => res.status(200).json({'result': pessoas}))
        .catch(err => res.status(400).json({result: err}))
    }
    updatePessoa(id, data) {
        return model.findOneAndUpdate(id, data);
    }
    
    update(req, res) {
        const id = { _id: req.params.id }
        const pessoa = req.body;
        this.updatePessoa(id, pessoa)
        .then(pessoas => res.status(200).json({'result': pessoas}))
        .catch(err => res.status(400).json({result: err}))
    }
    async createPessoa(data) {
        let teste = new model(data)
        model.create(teste)
        .then((data)=>{
            return data
        }).catch((err)=>{
        })
        return;
    }
    
    insert(req, res) {
        const pessoa = req.body;
        this.createPessoa(pessoa)
        .then(pessoas => res.status(200).json({'result': pessoas}))
        .catch(err => res.status(400).json({result: err}))
    }
}

export default Controller;
import Profissao from '../model/Profissao';

class ProfissaoCtrl {

    static findAll(req, res, next) {
        Profissao.findAll()
            .then(data => {
                res.json(data);
            }, error => next(error));
    }

    static findByNomeProfissao(req, res, next) {
        console.log(req.params.texto);
        Profissao.findByNomeProfissao(req.params.texto)
            .then(data => {
                res.json(data);
            }, error => next(error));
    }

    static create(req, res, next) {
        console.log(req.body)
        Profissao.create(req.body).then((data) => {
            res.json(data);
        }, (err) => {
            next(err);
        });
    }
    
    static update(req, res, next) {
        Profissao.updateProfissao(req.body).then((obj) => {
            res.send(obj);
        }, (err) => {
            next(err)
        });
    }

    static delete(req, res, next) {
        Profissao.deleteProfissao(req.params.id)
            .then(data => res.send(data), error => next(error));
    }

    static findById(req, res, next) {
        Profissao.findById(req.params.id)
            .then(data => res.send(data), error => next(error));
    }
}

export default ProfissaoCtrl;
import * as express from 'express';
import ProfissaoCtrl from '../controllers/ProfissaoCtrl';

var router = express.Router();

router.get('/profissao', ProfissaoCtrl.findAll);
router.post('/profissao', ProfissaoCtrl.create);
router.put('/profissao', ProfissaoCtrl.update);
router.delete('/profissao/:id', ProfissaoCtrl.delete);
router.get('/profissao/busca/:texto', ProfissaoCtrl.findByNomeProfissao);
router.get('/profissao/:id', ProfissaoCtrl.findById);

export = router;    
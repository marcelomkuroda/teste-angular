import {
    ProfissaoModel,
    IProfissao,
    IProfissaoModel
} from './definitions/Profissao';

class Profissao {

    static create(Profissao: IProfissao): any {
        return new Promise<IProfissaoModel>((resolve, reject) => {
            ProfissaoModel.create(Profissao, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static updateProfissao(obj): Promise<IProfissaoModel> {
        return new Promise<IProfissaoModel>((resolve, reject) => {
            ProfissaoModel.findByIdAndUpdate(obj.id, {
                nome: obj.nome,
                sobrenome: obj.sobrenome,
                sexo: obj.sexo,
                data: obj.data,
                cidade: obj.cidade,
                estado: obj.estado,
                areaFormacao: obj.areaFormacao,
                profissao: obj.profissao,
                email: obj.email
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static deleteProfissao(id): Promise<IProfissaoModel> {
        return new Promise<IProfissaoModel>((resolve, reject) => {
            ProfissaoModel.findByIdAndUpdate(id, {
                isDeleted: true
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    static findByNomeProfissao(busca): Promise<Array<IProfissaoModel>> {
        return new Promise<Array<IProfissaoModel>>((resolve, reject) => {
            ProfissaoModel.find(
                {
                    isDeleted: false,
                    $or: [
                        { nome: new RegExp(busca, "i") },
                        { sobrenome: new RegExp(busca, "i") },
                        { profissao: new RegExp(busca, "i") }
                    ],
                }, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
        });
    }

    static findAll(): Promise<Array<IProfissaoModel>> {
        return new Promise<Array<IProfissaoModel>>((resolve, reject) => {
            ProfissaoModel.find(
                {
                    isDeleted: false
                }, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
        });
    }

    static findById(id): Promise<IProfissaoModel> {
        return new Promise<IProfissaoModel>((resolve, reject) => {
            ProfissaoModel.findOne(
                {
                    _id: id,
                    isDeleted: false
                }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }



}
export default Profissao;
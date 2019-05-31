import { IDefault, Inject } from './IDefault';
import * as mongoose from 'mongoose';

export interface IProfissao extends IDefault {
    id?: string;
    nome?: string;
    sobrenome?: string;
    email?: string;
    sexo?: string;
    data?: string;
    cidade?: string;
    estado?: string;
    areaFormacao?: string;
    profissao?: string;
}

export interface IProfissaoModel extends IProfissao, mongoose.Document { }
let schema = {
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    email: { type: String, required: true },
    sexo: { type: String, required: true },
    data: { type: String, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    areaFormacao: { type: String, required: true },
    profissao: { type: String, required: true }
};


Inject(schema);
export const ProfissaoMasterSchema = new mongoose.Schema(schema);
export const ProfissaoModel = mongoose.model<IProfissaoModel>('Profissao', ProfissaoMasterSchema, 'Profissao', false);
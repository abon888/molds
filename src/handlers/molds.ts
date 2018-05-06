
import * as Sequelize from 'sequelize';
import { Application, Request, Response, NextFunction, Router } from "express";

const Op = Sequelize.Op;

let PathsMapping: any;
let Mold: any;

export class MoldsHandler{

  constructor(){
    PathsMapping = require('@BASELIB/js_paths_mapping').PathsMapping;
    Mold = PathsMapping.pmRequire('@APP_MODELS/mold').default;
  }

  async getMold(moldId: string): Promise<any>{
    return await Mold.findById(moldId);
  }

  async getMolds(): Promise<any>{
    return await Mold.findAll();
  }

  async updateMold(mold_id: string, update: any): Promise<any>{
    return await Mold.update( update, { where: {mold_id: mold_id } } );
  }

  async createMold(mold: any): Promise<any>{
    return await Mold.create({ mold_id: mold.mold_id, description: mold.description });
  }

}


import { Application, Request, Response, NextFunction, Router } from "express";
let PathsMapping: any;

export class Routes {

  private moldsHandler;

  constructor(app: Application) {
    PathsMapping = require('@BASELIB/js_paths_mapping').PathsMapping;
    this._initHandlers();

    app.route("/api/molds/:id").get( async (req: Request, res: Response, next: NextFunction ) => {
      if( req.params.id ){
        res.json( await this.moldsHandler.getMold( req.params.id ) );
      } else{
        res.json( { Message: "ERROR: Must supply mold id in the request." } );
      }
    } );

    app.route("/api/molds/query").get( async (req: Request, res: Response, next: NextFunction ) => {
      res.json( await this.moldsHandler.getMold( req.query.mold_id ) );
    } );

    app.route("/api/molds").get( async (req: Request, res: Response, next: NextFunction ) => {
      res.json( await this.moldsHandler.getMolds() );
    } );

    app.route("/api/molds/update/:id").post( async (req: Request, res: Response, next: NextFunction ) =>{
      res.json( await this.moldsHandler.updateMold( req.params.id, req.body) );
    });

    app.route("/api/molds/create").post( async (req: Request, res: Response, next: NextFunction ) =>{
      res.json( await this.moldsHandler.createMold( req.body) );
    });

  }

  private _initHandlers(): void{
    let MoldsHandler = PathsMapping.pmRequire( '@MS_HANDLERS/molds' ).MoldsHandler;
    this.moldsHandler = new MoldsHandler();
  }

}

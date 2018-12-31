import IRepository from "./IRepository";
import { Model } from "mongoose";
import { Typegoose } from 'typegoose';


export default class GenericRepository<T extends Typegoose> implements IRepository<T>{

  private _model: Model<any>;

  constructor(model: Model<any>) {
    this._model = model;
  }

  public static create<T extends Typegoose>(c: new () => T): GenericRepository<T> {
    const model = new c().getModelForClass(c);
    return new GenericRepository<T>(model);
  }

  insert(item: T): Promise<T> {
    return this._model.create(item);
  }

  update(predicate: any, item: T): Promise<T> {
    return this._model.findByIdAndUpdate(predicate, { $set: item }, { new: true }).exec();
  }

  delete(predicate: any): Promise<T> {
    return this._model.findByIdAndDelete(predicate).exec();
  }

  find(predicate: any): Promise<T[]> {
    return this._model.find(predicate).exec();
  }

  findOne(predicate: any): Promise<T> {
    return this._model.findOne(predicate).exec();
  }

  findById(id: string): Promise<T> {
    return this._model.findById(id).exec();
  }

}
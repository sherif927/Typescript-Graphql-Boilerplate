import { Document } from "mongoose";

export default interface IRepository<T> {
  insert(item: T): Promise<T>;
  update(predicate: any, item: T): Promise<T>;
  delete(predicate: any): Promise<T>;
  find(predicate: any): Promise<T[]>;
  findById(id: string): Promise<T>;
  findOne(predicate: any): Promise<T>;
}
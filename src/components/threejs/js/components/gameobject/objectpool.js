import { Object3D } from "three"

// static object manager
export default class ObjectPool {
  constructor () {
    this.pool = []
    this.getPool.bind(this)
    this.addToPool.bind(this)
    // TODO: implement efficient searching and sorting algorithms for handling large amounts of objects
  }
  getPool () {
    return (this.pool)// return a refrence
  }
  addToPool (object) {
    this.pool.push(object)
  }
}
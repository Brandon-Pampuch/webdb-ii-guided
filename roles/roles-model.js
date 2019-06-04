const knex = require('knex')
const router = require('express').Router();

const roles = require('./roles-model')

const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/db.db3' // from the 
    },
    useNullAsDefault: true,  // required only for sqlite 3
    debug:true,
  }


module.exports ={
    find,
    findById,
    add,
    update,
    remove
}


function find() {
    return db('roles')

}
function findById(id) {
    return db('roles').where({ id })
    .first()
  
}
function add() {
   

}
function update(id,changes) {
    return null

}
function remove(ids) {
    return null

}
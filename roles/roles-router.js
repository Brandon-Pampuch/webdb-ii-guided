const knex = require('knex')


const router = require('express').Router();

//install knex and driver

//configure knex

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/db.db3' // from the 
  },
  useNullAsDefault: true,  // required only for sqlite 3
  debug:true,
}

const db = knex(knexConfig);

router.get('/', (req, res) => {
  // get the roles from the database
  db('roles')
  .then(roles => {
    res.status(200).json(roles)
  })
  .catch(error => {
    res.status(500).json(error)
  })
})


router.get('/:id', (req, res) => {
  db('roles').where({id: req.params.id})
  .first()  //sends only the first data back
  .then(roles =>{
    if(roles ===  undefined){
      res.status(404).json({message: 'record not found'})
    }
    res.status(200).json(roles)
  })
  .catch(error =>{
    res.status(500)
  })
});

router.post('/', (req, res) => {
  db('roles').insert(req.body,'id')
  .then(ids =>{
    res.status(201).json(ids)
  })
  
  .catch(error => {
    res.status(500).json(error)
  })
});

router.put('/:id', (req, res) => {
  const changes = req.body
  db('roles').where({id: req.params.id}).update(changes)
  .then(count => { // get number of changes back
    if (count > 0){
      res.status(200).json({message: "updated"})
    }
    res.status(404).json({message:"not updated"})
  })
    .catch(error => {
      res.status(500).json(error)
    
    })
})

router.delete('/:id', (req, res) => {
  db('roles').where({id: req.params.id})
  .where({id: req.params.id})
  .del()
  .then(count => { // get number of changes back
    if (count > 0){
      res.status(200).json({message: "updated"})
    }
    res.status(404).json({message:"not updated"})
  })
    .catch(error => {
      res.status(500).json(error)
    
    })
});

module.exports = router;

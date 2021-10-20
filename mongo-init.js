db.createUser({
  user: 'apitect',
  pwd: 'apitect42',
  roles: [
    {
      role: 'readWrite',
      db: 'apitect'
    }
  ]
})

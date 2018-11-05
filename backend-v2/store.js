module.exports = {
  createUser: function(creds) {
    console.log(`Add user ${creds.username} with password ${creds.password}`)
    return Promise.resolve()
  }
}

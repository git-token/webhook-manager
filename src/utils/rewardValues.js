module.exports = {
  "commit_comment": {
    // Reward commit comment based on length up to 100 characters;
    // Each character would be worth ≈ 1 token
    // payload::comment::body.length
  },
  "create": {
    // payload::ref_type
    "repository": 1000, 
    "branch": 500, // e.g. creation of a feature branch
    "tag": 1000 // creation of a release tag
  },
  "delete": {
    // payload::ref_type
    "branch": 0,
    "tag": 0
  },
  "fork": 5000,
  "gollum": 50,
  "installation": {
    "created": 
  }
}

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TourcardSchema = new Schema({
  id:       { type: Number,  },
  name:     { type: String,  },
  address:  { type: String,  },
  city:     { type: String,  },
  state:    { type: String,  },
  zip:      { type: String,  },
  website:  { type: String,  },
  phone:    { type: String,  },
  time:     { type: String,  },
  distance: { type: String,  },
  sat:      { type: String,  },
  sun:      { type: String,  },
  coords:   { type: String,  },

  year:     { type: String,  },
  stamped:  { type: String,  },
  whenVisited: { type: String,  },
  association: { type: String,  }
});

const myDB = mongoose.connection.useDb('harley');

module.exports = myDB.model('Tourcard', TourcardSchema, 'tourcard');

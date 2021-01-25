const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SlushSchema = new Schema({
  id:       { type: Number,  },
  timestamp:     { type: String,  },
  confirmed:  { type: String,  },
  unconfirmed:     { type: String,  },
  hashrate:    { type: String,  },
  hashrate_yesterday:      { type: String,  }
});

const myDB = mongoose.connection.useDb('bitcoin');

module.exports = myDB.model('Slush', SlushSchema, 'slushpool');

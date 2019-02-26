'use strict';

const dynamoose = require('dynamoose');

var Schema = dynamoose.Schema;

var schemaDefinition = {
  year: {
    type: String
  },
  monthly_data: {
    type: [Object]
  }
};

var ticketSchema = new Schema(schemaDefinition);

var Ticket = dynamoose.model('tickets', ticketSchema, { create:true, update: true });
exports.Ticket = Ticket;
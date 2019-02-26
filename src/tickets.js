'use strict';

const fs = require('fs');
const Ticket = require('../models/ticket').Ticket;

module.exports.batchPutToTickets = async (_event, _context) => {
  fs.readFile('ticket_size.json', 'utf-8', async (err, data) => {
    if (err) {
      return;
    }
    var tickets = JSON.parse(data);
    var response = await Ticket.batchPut(tickets).then((_tickets) => {
      if (_tickets.count == 0) {
        var error = {
          status: {
            code: err.code,
            error: err.name,
            message: err.message
          }
        };
        return error;
      }
      console.log('Records inserted successfully!');
    });
    return response;
  });
};

module.exports.getYealyTicketInfo = async (event, _context) => {
  
  var year = event.path.year

  var ticket = await Ticket.query({year: year}).exec()
  .then((ticket) => {
    if (ticket.count == 0) {
      var error = {
        status: {
          code: 204,
          error: 'No Content',
          message: 'Nothing to show'
        }
      };
      return error;
    }
    var success = {
      data: {
        result: ticket
      },
      status: {
        code: 200,
        error: '',
          message: 'OK'
      }
    };
    return success;
  });
  return ticket;
};
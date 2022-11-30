import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketTypeRequest from './lib/TicketTypeRequest.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';




const ticketTypeRequests = [];
//
var ticket_No_CHILD = 0;
var ticket_No_ADULT = 0;
var ticket_No_INFANT = 0;
var ticket_No_TOTAL = 0;
var decision_adult_no = 0;
//
var ticket_No_CHILD_ = 0;
var ticket_No_ADULT_ = 0;
var ticket_No_INFANT_ = 0;

//
var ticket_cost_CHILD = 0;
var ticket_cost_ADULT = 0;
var ticket_cost_INFANT = 0;
var ticket_cost_TOTAL = 0;
//
const ticket_cost_CHILD_rate = 10;
const ticket_cost_ADULT_rate = 20;
const ticket_cost_INFANT_rate = 0;


export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
ticketSorting(ticketHistoryobj)
{
  //
  ticket_No_ADULT = ticketHistoryobj[0];
  ticket_No_CHILD = ticketHistoryobj[1];
  ticket_No_INFANT = ticketHistoryobj[2];
//
const ticketTypeRequest_ADULT = new TicketTypeRequest('ADULT',ticketHistoryobj[0] );
const ticketTypeRequest_CHILD = new TicketTypeRequest('CHILD',ticketHistoryobj[1]);
const ticketTypeRequest_INFANT = new TicketTypeRequest('INFANT',ticketHistoryobj[2]);
//
ticketTypeRequests.push(ticketTypeRequest_ADULT );
ticketTypeRequests.push(ticketTypeRequest_CHILD );
ticketTypeRequests.push(ticketTypeRequest_INFANT );

//console.log(ticketTypeRequest_ADULT);

return ticketTypeRequests;

}

  purchaseTickets(accountId, ...ticketTypeRequests) 
  {
      
   

    for (const arg of ticketTypeRequests) 
    {
      //console.log(arg.getTicketType());
      //console.log(arg.getNoOfTickets());
   // 
           

      if (arg.getTicketType()=="ADULT");
      {
       
        ticket_No_ADULT_ =  Number(arg.getNoOfTickets()); 
        console.log("ticket_No_ADULT within for loop" + ticket_No_ADULT);
      }
      
      if (arg.getTicketType()=="CHILD");
      {
        ticket_No_CHILD_ = Number(arg.getNoOfTickets());
        
      }

      if (arg.getTicketType()=="INFANT");
      {
        ticket_No_INFANT_ = Number(arg.getNoOfTickets());
      
      }
      console.log("ticket_No_ADULT outside for loop" + ticket_No_ADULT);
    
    }

         
    // throws InvalidPurchaseException
    const  InvalidPurchaseExceptionObj = new InvalidPurchaseException;  
    try {
      decision_adult_no = InvalidPurchaseExceptionObj.validateTicket(ticket_No_ADULT, ticket_No_CHILD , ticket_No_INFANT);
    } catch (err) {
      console.log(err.message); // Oops
      console.log(err.name); // ValidationError
    }
    //Computation
    ticket_cost_ADULT =  ticket_No_ADULT * ticket_cost_ADULT_rate;
    console.log("ticket_No_ADULT" + ticket_No_ADULT);
    console.log("ticket_cost_ADULT"+ ticket_cost_ADULT);

    ticket_cost_CHILD = ticket_No_CHILD  * ticket_cost_CHILD_rate;
    ticket_cost_INFANT = ticket_No_INFANT * ticket_cost_INFANT_rate;

    ticket_No_TOTAL  = decision_adult_no + ticket_No_CHILD + ticket_No_INFANT;
    ticket_cost_TOTAL = ticket_cost_ADULT + ticket_cost_CHILD + ticket_cost_INFANT;
    

    //console.log(ticket_cost_ADULT);
     // PURCHASE TICKET 
   const TicketPaymentServiceObj = new TicketPaymentService(accountId,ticket_cost_TOTAL);
   // SELECT SEAT
   const SeatReservationServiceObj = new SeatReservationService(accountId,ticket_cost_TOTAL);
   //
   return "Tickets Cost Breakdown:  Adult =  £" +  ticket_cost_ADULT + ";  Child =  £" +  ticket_cost_CHILD +  "; Infant =  £" + ticket_cost_INFANT;
   
  }
}

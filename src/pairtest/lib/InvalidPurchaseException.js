var valid_ADULT_ticket_no = 0;

export default class InvalidPurchaseException extends Error 

{
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }

  validateTicket(vadult_no, vchild_no, vinfant_no)
{ 
  // USE SWITCH ---DEFUALT - ALL TICKETS ARE VALID

  if (vadult_no == 0)
  {
    // No single Adult is involved even ticket were bought for Children and infants
    throw new ValidationError("All Ticket considered Invalid");  
  }
  
  if (vadult_no < vinfant_no)
  {
     // Every infant must have an adult assigned to take care of it
    throw new ValidationError("Only Adult =  " + adult + "Tickets" + " are valid") ; 
    valid_ADULT_ticket_no = vinfant_no; 

  }
  else 
  {
    valid_ADULT_ticket_no = vadult_no;
  }
  
  return valid_ADULT_ticket_no;
 
  }

}

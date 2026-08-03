package com.Bus.TicketReservation.Exception;

public	class SeatUnavailableException extends RuntimeException	{
    public	SeatUnavailableException(String	message)
    {
        super(message);
    }
}

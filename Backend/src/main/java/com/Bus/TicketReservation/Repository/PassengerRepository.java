package com.Bus.TicketReservation.Repository;

import com.Bus.TicketReservation.Entity.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassengerRepository extends JpaRepository<Passenger,Long>
{
    Passenger findByName(String username);

    Passenger findByMobileNumber(String mobileNumber);
}

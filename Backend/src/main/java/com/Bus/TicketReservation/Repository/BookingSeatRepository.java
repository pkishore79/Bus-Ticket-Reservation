package com.Bus.TicketReservation.Repository;

import com.Bus.TicketReservation.Entity.BookingSeat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingSeatRepository extends JpaRepository<BookingSeat,Long> {


    List<BookingSeat> findBySeatBusBusIdAndTravelDate(
            Long busId,
            LocalDate date
    );

    List<BookingSeat> findByBookingBookingId(long bookingId);
}
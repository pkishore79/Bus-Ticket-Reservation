package com.Bus.TicketReservation.Repository;

import com.Bus.TicketReservation.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByUserId(long userId);

    List<Booking> findByPassengerPassengerId(Long passengerId);
}

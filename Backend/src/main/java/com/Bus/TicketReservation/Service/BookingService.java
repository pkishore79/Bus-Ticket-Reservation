package com.Bus.TicketReservation.Service;

import com.Bus.TicketReservation.DTO.BookingRequestFormDTO;
import com.Bus.TicketReservation.DTO.BookingResponseDTO;
import com.Bus.TicketReservation.Entity.*;
import com.Bus.TicketReservation.Exception.ResourceNotFoundException;
import com.Bus.TicketReservation.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository repo;

    @Autowired
    private PassengerRepository passrepo;

    @Autowired
    private BusRepository busrepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private SeatRepository seatRepo;

    @Autowired
    private BookingSeatRepository bookingSeatRepo;

    public List<BookingResponseDTO> getBookings() {

        List<BookingResponseDTO> list = new ArrayList<>();

        for(Booking booking : repo.findAll()) {
            list.add(new BookingResponseDTO(booking));
        }

        return list;
    }

    public BookingResponseDTO getBooking(long id) {

        Booking booking = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found for id " + id));

        return new BookingResponseDTO(booking);
    }

    public BookingResponseDTO book(BookingRequestFormDTO dto) {

        Passenger passenger = new Passenger();

        passenger.setName(dto.getPassengerName());
        passenger.setAge(dto.getAge());
        passenger.setGender(dto.getGender());
        passenger.setMobileNumber(dto.getMobileNumber());
        passenger.setEmail(dto.getEmail());

        Passenger savedPassenger = passrepo.save(passenger);

        Bus bus = busrepo.findById(dto.getBusId())
                .orElseThrow(() -> new ResourceNotFoundException("Bus not found"));

        User user = userRepo.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Booking booking = new Booking();

        booking.setBus(bus);
        booking.setPassenger(savedPassenger);
        booking.setDateOfTravel(dto.getTravelDate());
        booking.setSeatsBooked(dto.getSeatIds().size());
        booking.setStatus("Confirmed");
        booking.setUser(user);
        booking.setBookingDate(LocalDate.now());

        Booking savedBooking = repo.save(booking);

        List<BookingSeat> bookingSeats = new ArrayList<>();

        for(Long seatId : dto.getSeatIds()) {

            Seat seat = seatRepo.findById(seatId)
                    .orElseThrow(() -> new ResourceNotFoundException("Seat not found"));

            seat.setAvailable(false);
            seatRepo.save(seat);

            BookingSeat bookingSeat = new BookingSeat();

            bookingSeat.setBooking(savedBooking);
            bookingSeat.setSeat(seat);
            bookingSeat.setTravelDate(dto.getTravelDate());

            bookingSeats.add(bookingSeat);
        }

        bookingSeatRepo.saveAll(bookingSeats);

        return new BookingResponseDTO(savedBooking);
    }

    public String cancel(long bookingId) {

        Booking booking = repo.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if(booking.getStatus().equals("Cancelled")) {
            return "Booking already cancelled";
        }

        booking.setStatus("Cancelled");

        List<BookingSeat> bookingSeats =
                bookingSeatRepo.findByBookingBookingId(bookingId);

        for(BookingSeat bs : bookingSeats) {

            Seat seat = bs.getSeat();

            seat.setAvailable(true);

            seatRepo.save(seat);
        }

        bookingSeatRepo.deleteAll(bookingSeats);

        repo.save(booking);

        return "Booking cancelled successfully";
    }

    public List<BookingResponseDTO> getBookingsByUser(long userId) {

        return repo.findByUserId(userId)
                .stream()
                .map(BookingResponseDTO::new)
                .toList();
    }
}
package com.vedavoice.controller;

import com.vedavoice.model.Appointment;
import com.vedavoice.repository.AppointmentRepository;
import com.vedavoice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Appointment>> getAppointments(
            @AuthenticationPrincipal UserDetails principal) {
        return userRepository.findByEmail(principal.getUsername())
                .map(user -> {
                    List<Appointment> appts;
                    if (user.getRole() == com.vedavoice.model.User.Role.DOCTOR) {
                        appts = appointmentRepository.findByDoctorId(user.getId());
                    } else {
                        appts = appointmentRepository.findByPatientId(user.getId());
                    }
                    return ResponseEntity.ok(appts);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long id,
            @AuthenticationPrincipal UserDetails principal) {
        return appointmentRepository.findById(id)
                .map(appt -> {
                    String currentUserEmail = principal.getUsername();
                    boolean isPatient = appt.getPatient().getEmail().equals(currentUserEmail);
                    boolean isDoctor = appt.getDoctor().getEmail().equals(currentUserEmail);
                    boolean isAdmin = principal.getAuthorities().stream()
                            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
                    if (!isPatient && !isDoctor && !isAdmin) {
                        return ResponseEntity.<Void>status(403).build();
                    }
                    appt.setStatus(Appointment.Status.CANCELLED);
                    appointmentRepository.save(appt);
                    return ResponseEntity.<Void>ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

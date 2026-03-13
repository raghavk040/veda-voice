package com.vedavoice.controller;

import com.vedavoice.model.HealthRecord;
import com.vedavoice.repository.HealthRecordRepository;
import com.vedavoice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/health-records")
@RequiredArgsConstructor
public class HealthRecordController {

    private final HealthRecordRepository healthRecordRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<HealthRecord>> getHealthRecords(
            @AuthenticationPrincipal UserDetails principal) {
        return userRepository.findByEmail(principal.getUsername())
                .map(user -> ResponseEntity.ok(
                        healthRecordRepository.findByPatientId(user.getId())))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHealthRecord(@PathVariable Long id,
            @AuthenticationPrincipal UserDetails principal) {
        return healthRecordRepository.findById(id)
                .map(record -> {
                    String currentUserEmail = principal.getUsername();
                    boolean isOwner = record.getPatient().getEmail().equals(currentUserEmail);
                    boolean isAdmin = principal.getAuthorities().stream()
                            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
                    if (!isOwner && !isAdmin) {
                        return ResponseEntity.<Void>status(403).build();
                    }
                    healthRecordRepository.deleteById(id);
                    return ResponseEntity.<Void>noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

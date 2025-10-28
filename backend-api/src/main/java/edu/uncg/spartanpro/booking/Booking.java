package edu.uncg.spartanpro.booking;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking 

{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") private Long id;

    @Column(name = "student_id",  nullable = false) private Long studentId;
    @Column(name = "provider_id", nullable = false) private Long providerId;
    @Column(name = "slot_id",     nullable = false) private Long slotId;

    @Column(name = "status", nullable = false) private String status;
    @Column(name = "created_at", nullable = false) private LocalDateTime createdAt;

    @PrePersist
    void onCreate()
     {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (status == null) status = "pending";
    }

    public Long getId()
     { return id; }
    public Long getStudentId() 
    { return studentId; }
    public void setStudentId(Long studentId)
     { this.studentId = studentId; }
    public Long getProviderId() 
    { return providerId; }
    public void setProviderId(Long providerId)
     { this.providerId = providerId; }
    public Long getSlotId()
     { return slotId; }
    public void setSlotId(Long slotId)
     { this.slotId = slotId; }
    public String getStatus() 
    { return status; }
    public void setStatus(String status) 
    { this.status = status; }
    public LocalDateTime getCreatedAt() 
    { return createdAt; }
}

package edu.uncg.spartanpro.review;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review
 {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id") private Long id;

    @Column(name = "booking_id",  nullable = false) private Long bookingId;
    @Column(name = "student_id",  nullable = false) private Long studentId;
    @Column(name = "provider_id", nullable = false) private Long providerId;

    @Column(name = "rating", nullable = false) private int rating;
    @Column(name = "comment") private String comment;

    @Column(name = "created_at", nullable = false) private LocalDateTime createdAt;
    @Column(name = "tutor_response") private String tutorResponse; 
    @Column(name = "tutor_response_date") private LocalDateTime tutorResponseDate;

    @PrePersist
    void onCreate()
    
    { if (createdAt == null) createdAt = LocalDateTime.now(); }

    public Long getId()
     { return id; }
    public Long getBookingId() 
    { return bookingId; }
    public void setBookingId(Long bookingId)
     { this.bookingId = bookingId; }
    public Long getStudentId()
     { return studentId; }
    public void setStudentId(Long studentId) 
    { this.studentId = studentId; }
    public Long getProviderId() 
    { return providerId; }
    public void setProviderId(Long providerId)
     { this.providerId = providerId; }
    public int getRating()
     { return rating; }
    public void setRating(int rating)
     { this.rating = rating; }
    public String getComment() 
    { return comment; }
    public void setComment(String comment) 
    { this.comment = comment; }
    public LocalDateTime getCreatedAt() 
    { return createdAt; }
    public String getTutorResponse()
     { return tutorResponse; }
    public void setTutorResponse(String tutorResponse) 
    { this.tutorResponse = tutorResponse; }
    public LocalDateTime getTutorResponseDate()
     { return tutorResponseDate; }
    public void setTutorResponseDate(LocalDateTime tutorResponseDate) { this.tutorResponseDate = tutorResponseDate; }
}

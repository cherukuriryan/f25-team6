package edu.uncg.spartanpro.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import edu.uncg.spartanpro.student.Student;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Column(name = "booking_id")
    private Long bookingId;

    
    @Column(name = "comment", length = 255)
    private String comment;

    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "provider_id", nullable = false)
    @JsonIgnoreProperties({"services", "reviews"})
    private Provider provider;

    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnoreProperties({"password"})
    private Student student;

    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "service_id")
    @JsonIgnoreProperties({"provider", "reviews"})
    private TutorService service;

    
    @Column(name = "rating", nullable = false)
    private int rating;

    
    @Column(name = "provider_reply", columnDefinition = "TEXT")
    private String providerReply;

    
    @Column(name = "reply_date")
    private LocalDateTime replyDate;

    
    @Column(name = "tutor_response", length = 255)
    private String tutorResponse;

    
    @Column(name = "tutor_response_date")
    private LocalDateTime tutorResponseDate;

    // ============= LIFECYCLE =============

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    // ============= GETTERS/SETTERS =============

    public Long getId() { return id; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Provider getProvider() { return provider; }
    public void setProvider(Provider provider) { this.provider = provider; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public TutorService getService() { return service; }
    public void setService(TutorService service) { this.service = service; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getProviderReply() { return providerReply; }
    public void setProviderReply(String providerReply) { this.providerReply = providerReply; }

    public LocalDateTime getReplyDate() { return replyDate; }
    public void setReplyDate(LocalDateTime replyDate) { this.replyDate = replyDate; }

    public String getTutorResponse() { return tutorResponse; }
    public void setTutorResponse(String tutorResponse) { this.tutorResponse = tutorResponse; }

    public LocalDateTime getTutorResponseDate() { return tutorResponseDate; }
    public void setTutorResponseDate(LocalDateTime tutorResponseDate) { this.tutorResponseDate = tutorResponseDate; }
}

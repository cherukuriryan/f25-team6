package edu.uncg.spartanpro.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int rating;
    private String comment;
    private String providerReply;
    private LocalDateTime replyDate;

    @ManyToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "provider_id")
@JsonIgnoreProperties({"services", "reviews"})


    private Provider provider;

    @ManyToOne
    @JoinColumn(name = "service_id")
    @JsonIgnoreProperties({"provider", "reviews"})
    private TutorService service;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public String getProviderReply() { return providerReply; }
    public void setProviderReply(String providerReply) { this.providerReply = providerReply; }

    public LocalDateTime getReplyDate() { return replyDate; }
    public void setReplyDate(LocalDateTime replyDate) { this.replyDate = replyDate;}

    public Provider getProvider() { return provider; }
    public void setProvider(Provider provider) { this.provider = provider; }
}


Version 1  
Prepared by Jesus Garcia-Medina and Ryan Cherukuri  
SpartanPro  
Oct 20, 2025  

---

## Table of Contents
* [Revision History](#revision-history)
* 1 [Product Overview](#1-product-overview)
* 2 [Use Cases](#2-use-cases)
  * 2.1 [Use Case Model](#21-use-case-model)
  * 2.2 [Use Case Descriptions](#22-use-case-descriptions)
    * 2.2.1 [Actor: Student](#221-actor-student)
    * 2.2.2 [Actor: Tutor](#222-actor-tutor)
* 3 [UML Class Diagram](#3-uml-class-diagram)
* 4 [Database Schema](#4-database-schema)

---

## Revision History
| Name | Date | Reason For Changes | Version |
|------|------|--------------------|---------|
| Jesus Garcia-Medina | 10/20/2025 | Initial design draft | 1 |
| Ryan Cherukuri | 10/20/2025 | Added Diagrams | 1.1 |

---

## 1. Product Overview
SpartanPro is a web-based tutoring platform that connects students with qualified tutors across various subjects, allowing them to search, book, and manage tutoring sessions in one place. Tutors can manage their profiles, set their availability, and track reviews, while administrators ensure quality and handle reports or technical issues.  
The goal of SpartanPro is to make academic support accessible and efficient for all students, while providing tutors with tools to manage their schedules and improve their teaching experience.

---

## 2. Use Cases

### 2.1 Use Case Model
*(Diagram placeholder — `use-case.png` in this same folder)*  

---

### 2.2 Use Case Descriptions

#### 2.2.1 Actor: Student
##### 2.2.1.1 Sign Up
A student creates an account using their UNCG email, name, and password. Emails must be unique.  
##### 2.2.1.2 Log In
A student logs in with their credentials to access their personalized dashboard.  
##### 2.2.1.3 Search Tutors
Students can browse tutors by subject, course, or availability. Search results display tutor profiles with their ratings. 
##### 2.2.1.4 Book Session
Students select a tutor and time slot, then confirm a session booking. Once confirmed, it appears on their dashboard.  
##### 2.2.1.5 Leave Review
After a session, students can rate the tutor and leave feedback on their learning experience.

---

#### 2.2.2 Actor: Tutor
##### 2.2.2.1 Sign Up
A tutor creates a profile using their UNCG email, name, password, and subject expertise.  
##### 2.2.2.2 Log In
A tutor signs in to access their dashboard, manage session requests, and view their schedule.  
##### 2.2.2.3 Update Availability
Tutors can modify available time slots so students can book sessions accordingly.  
##### 2.2.2.4 Accept or Decline Requests
Tutors review session requests and either approve or decline them.  
##### 2.2.2.5 View Reviews
Tutors can view and reply to feedback and ratings from students after completed sessions.

---

## 3. UML Class Diagram
*(Diagram placeholder — `class-diagram.png` in this same folder)*  

---

## 4. Database Schema
*(Diagram placeholder — `schema.png` in this same folder)*  



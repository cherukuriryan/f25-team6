# Software Requirements Specification
## For SpartanPro

Version 0.1  
Prepared by Ryan Cherukuri and Jesus Garcia-Medina  
CSC340 
9/17/2025

Table of Contents
=================
* [Revision History](#revision-history)
* 1 [Introduction](#1-introduction)
  * 1.1 [Document Purpose](#11-document-purpose)
  * 1.2 [Product Scope](#12-product-scope)
  * 1.3 [Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
  * 1.4 [References](#14-references)
  * 1.5 [Document Overview](#15-document-overview)
* 2 [Product Overview](#2-product-overview)
  * 2.1 [Product Functions](#21-product-functions)
  * 2.2 [Product Constraints](#22-product-constraints)
  * 2.3 [User Characteristics](#23-user-characteristics)
  * 2.4 [Assumptions and Dependencies](#24-assumptions-and-dependencies)
* 3 [Requirements](#3-requirements)
  * 3.1 [Functional Requirements](#31-functional-requirements)
    * 3.1.1 [User Interfaces](#311-user-interfaces)
    * 3.1.2 [Hardware Interfaces](#312-hardware-interfaces)
    * 3.1.3 [Software Interfaces](#313-software-interfaces)
  * 3.2 [Non-Functional Requirements](#32-non-functional-requirements)
    * 3.2.1 [Performance](#321-performance)
    * 3.2.2 [Security](#322-security)
    * 3.2.3 [Reliability](#323-reliability)
    * 3.2.4 [Availability](#324-availability)
    * 3.2.5 [Compliance](#325-compliance)
    * 3.2.6 [Cost](#326-cost)
    * 3.2.7 [Deadline](#327-deadline)

## Revision History
| Name  | Date    |          Reason For Changes             | Version   |
| ----  | ------- | ----------------------------------------| --------- |
| Ryan  | 12/10    | Implemented better functionality       |   4.0     |
| Jesus | 12/10    |Completed tutor portion and tested code |    4.0       |
|       |         |                                         |           |

## 1. Introduction

### 1.1 Document Purpose
This Software Requirements Document (SRD) outlines both the client and developer perspectives for the SpartanPro application.

From the client side, the requirements highlight how the system will appear and function for its users, including the roles and needs of the different types of individuals who will interact with it.

From the developer side, the requirements focus on the technical foundation of the system, providing detailed specifications related to functionality, data management, performance expectations, and other critical aspects necessary for building and maintaining the platform.


### 1.2 Product Scope
The purpose of the SpartanPro application is to connect students with qualified tutors and to provide a reliable, user-friendly platform for scheduling, communication, and learning support.
The system is a web-based application designed to simplify session booking and tutor management. It will manage user data and ensures smooth interactions between tutors and students. SpartanPro aims to deliver a seamless learning experience, promote academic success, and foster meaningful connections between students and tutors.

### 1.3 Definitions, Acronyms and Abbreviations         

SpartanPro will be developed using Java, a programming language which will be used to build the backend services. An Application Programming Interface (API) will be implemented to manage communication between the backend and frontend of the system. The frontend will rely on HTML to structure the web application and its content, while CSS will be used to style and improve the visual design. JavaScript will add interactivity and enhance the user experience by working alongside HTML and CSS. Development will be carried out in Visual Studio Code (VS Code), an integrated development environment (IDE) that will serve as the primary workspace for creating and testing SpartanPro.

### 1.4 References
[github.com](https://github.com/)
[bootstrap.com](https://getbootstrap.com/)

### 1.5 Document Overview
The first section serves as an overall introduction, giving any reader a clear understanding of the document’s purpose.
The second section highlights the product itself, describing its main features and providing details most relevant to customers and business stakeholders.
The third section defines the product’s requirements and development constraints, with special emphasis on the needs of the development team.

## 2. Product Overview
SpartanPro is a web-based tutoring platform designed to connect students with qualified tutors across a variety of subjects. Students can create accounts, search for tutors based expertise, book sessions, and provide feedback on their learning experience. Tutors are able to manage their profiles, set teaching subjects/classes, and track student reviews. The system supports multiple user roles including students and tutors, each with dedicated tools and services to ensure a seamless and support focused environment.

### 2.1 Product Functions
SpartanPro allows tutors to create and customize their profiles, including subject expertise and availability. They can manage their profile and update their availability in real time.
Students can search for tutors, book tutoring sessions, communicate through the platform, and write reviews within the web application


### 2.2 Product Constraints
The SpartanPro system will be implemented as a web application accessible through modern browsers such as Chrome, Edge, or Firefox. Development will be carried out using Java for the backend and standard web technologies (HTML, CSS, and JavaScript) for the frontend. Since this has a deadline of December, the scope is limited to essential features, and some advanced functions may be scaled back to meet the deadline. Long-term scalability and optimization are not primary concerns.
  
### 2.3 User Characteristics
SpartanPro is designed for non-technical users; anyone comfortable using a modern web browser should be able to navigate the site with minimal guidance.

### 2.4 Assumptions and Dependencies
The SpartanPro application will be developed as a web-based system, assumed to run on browsers with a stable internet connection. Development will use Java for the backend and standard web technologies (HTML, CSS, and JavaScript) for the frontend, with all work completed in VS Code. The project depends on GitHub for version control and may use a simple email service, possibly UNCG SSO for notifications and login, if time allows. 

## 3. Requirements

### 3.1 Functional Requirements 
FR1: The system shall allow students (customers) to create an account with a unique identifier assigned at the time of registration.

FR2: The system shall allow students to browse through the list of available tutors by subject.

FR3: The system shall allow students to book tutoring sessions with their chosen tutor.

FR4: Students will be able to modify their own profiles, including personal information and subjects.

FR5: The system shall allow students to leave ratings and reviews for tutors based on their learning experience.

FR-P1: The system shall allow providers to create and edit a tutor profile with subject expertise and availability.

FR-P2: The system shall allow providers to accept or reject session requests.

FR-P3: The system shall allow providers to view and respond to student reviews.

FR-P4: The system shall notify providers when a booking request is made.

#### 3.1.1 User interfaces
Web pages using HTML, CSS, and JavaScript designed for ease of use.

#### 3.1.2 Hardware interfaces
The SpartanPro application will run on any device that supports a modern web browser. No special hardware is required beyond standard internet connectivity.

#### 3.1.3 Software interfaces
The SpartanPro system will be developed using Java JDK 21 for the backend runtime. On the client side, the application will run in a browser runtime using HTML, CSS, and JavaScript to render the user interface and handle interactions.

### 3.2 Non Functional Requirements 

#### 3.2.1 Performance
- NFR1: The SpartanPro system will consume less than 100 MB of memory during normal operation.  
- NFR2: A student user will be able to search and view tutor profiles in less than 10 seconds.  
- NFR3: A tutor (provider) will be able to update availability and profile information in less than 10 seconds. 

#### 3.2.2 Security
- NFR4: The system will only be accessible to authorized users with a valid username and password.  
- NFR5: All data transmitted between client and server will be encrypted using HTTPS.  

#### 3.2.3 Reliability
- NFR6: The system will provide at least 95% uptime during the academic semester.  

#### 3.2.4 Availability
- NFR7: SpartanPro will be available 24/7 

#### 3.2.5 Compliance
- NFR8: The system will comply with UNCG’s IT security and privacy policies.  

#### 3.2.6 Cost
- NFR9: The expected monetary cost for SpartanPro development is $0, as it is a course project

#### 3.2.7 Deadline
- NFR10: The final product must be delivered and ready for demonstration by December 2025.  

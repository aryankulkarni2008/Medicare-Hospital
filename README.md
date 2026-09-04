# MediCare Hospital Management System

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application designed to streamline hospital operations, patient management, doctor scheduling, appointment workflows, and administrative oversight. 

MediCare functions as a unified Single Page Application (SPA) driven by a main landing page entry point, offering tailored, role-based dashboards for Patients, Doctors, and Administrators.

---

## Project Overview

MediCare provides a centralized, digital healthcare ecosystem connecting patients with healthcare providers while giving hospital administration complete control over system workflows.

### Key Highlights
* **Unified Single Application Architecture:** Built as a single React/Vite frontend entry point that dynamically routes users across Landing Page, Authentication, and Module Dashboards.
* **Real-Data Integration:** Fully integrated with MongoDB Atlas. Patient and Doctor records are stored and fetched dynamically without reliance on mock/demo data.
* **Role-Based Access & Dashboards:** Distinct, dedicated dashboards for Patients, Doctors, and Hospital Administrators.
* **Admin-Controlled Doctor Onboarding:** Doctor registration requires explicit approval from an Administrator before account activation and login access.
* **Dynamic Doctor Availability:** Doctors manage their available working days and appointment slots, which immediately sync to patient-facing booking views.
* **Dynamic UI Avatars:** Standardized profile visuals generated dynamically using doctor initials (e.g., *Sachin Mahajan* $\rightarrow$ **SM**, *Rahul Sharma* $\rightarrow$ **RS**) across all dashboards.

---

## Application Navigation Flow

MediCare follows a streamlined entry and navigation flow from a single frontend deployment:
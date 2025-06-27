# Course Management System (NestJS)

A **Course Management System API** built using **NestJS**, **TypeORM**, and **MySQL** that supports **Admin**, **Instructor**, and **Student** roles. It allows user registration, course creation, approval flow, student enrollments, and progress tracking.

---

## Features

### Authentication
- JWT-based login & registration
- Role-based access control: `admin`, `instructor`, `student`

### Admin
- View all users
- Activate/Deactivate users
- View all courses (approved/pending) with instructor info
- Approve/Reject courses submitted by instructors
- Create new student accounts

### Instructor
- Create new courses (default status: pending)
- View/update/delete own courses
- Get course enrollment stats (approved, pending, total students)

### Student
- View and update profile
- Browse approved courses
- Enroll in approved courses
- View enrolled courses and course contents
- Mark course contents as completed (video/pdf)
- Track progress

---

## Tech Stack

- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: MySQL
- **ORM**: TypeORM
- **Authentication**: JWT
- **Validation**: class-validator

---

## Installation

```bash
# 1. Clone the repo
git clone https://github.com/git-mahad/Course-Management-System.git
cd Course-Management-System

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env
# then edit .env with your MySQL credentials

# 4. Start MySQL locally or via Docker (recommended)

# 5. Run the project
npm run start:dev

```
## Folder Strucutre

``` bash
src/
├── auth/
├── admin/
├── student/
├── course/
├── course-content/
├── enrollment/
├── instructor/
├── progress/
├── student/

```
<!-- ## API Endpoints -->

## Stay in touch

- [LinkedIn – Mahad](https://linkedin.com/in/mahad-dev)
- Feel free to raise issues or contribute!

## Contribution is appreciated
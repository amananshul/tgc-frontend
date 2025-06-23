# Backend Setup Guide for TGC App

## Overview

This guide covers different backend options for The Gig Community (TGC) app, from simple to advanced solutions.

## Option 1: Supabase (Recommended for MVP)

Supabase is a Firebase alternative with PostgreSQL, real-time subscriptions, and built-in authentication.

### Setup Steps

1. **Create Supabase Project**
   ```bash
   # Visit https://supabase.com and create a new project
   # Note down your project URL and anon key
   ```

2. **Install Supabase Client**
   ```bash
   npm install @supabase/supabase-js
   ```

3. **Environment Variables**
   Create `.env` file:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Database Schema**
   ```sql
   -- Users table (extends Supabase auth.users)
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users ON DELETE CASCADE,
     name TEXT,
     age INTEGER,
     location TEXT,
     bio TEXT,
     avatar_url TEXT,
     karma_points INTEGER DEFAULT 0,
     level TEXT DEFAULT 'Beginner',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     PRIMARY KEY (id)
   );

   -- Skills table
   CREATE TABLE skills (
     id SERIAL PRIMARY KEY,
     name TEXT UNIQUE NOT NULL,
     category TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- User skills junction table
   CREATE TABLE user_skills (
     user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
     skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
     proficiency_level TEXT DEFAULT 'beginner',
     PRIMARY KEY (user_id, skill_id)
   );

   -- Events/Gigs table
   CREATE TABLE events (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     type TEXT NOT NULL, -- 'event', 'gig', 'class'
     organizer_id UUID REFERENCES profiles(id),
     date_time TIMESTAMP WITH TIME ZONE,
     location TEXT,
     is_online BOOLEAN DEFAULT FALSE,
     fee DECIMAL(10,2),
     payout DECIMAL(10,2),
     karma_reward INTEGER DEFAULT 0,
     max_participants INTEGER,
     current_participants INTEGER DEFAULT 0,
     status TEXT DEFAULT 'active', -- 'active', 'cancelled', 'completed'
     image_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Event participants
   CREATE TABLE event_participants (
     event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
     user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
     status TEXT DEFAULT 'registered', -- 'registered', 'attended', 'cancelled'
     joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     PRIMARY KEY (event_id, user_id)
   );

   -- Courses table
   CREATE TABLE courses (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     instructor_id UUID REFERENCES profiles(id),
     duration TEXT,
     category TEXT,
     is_live BOOLEAN DEFAULT FALSE,
     image_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- User course progress
   CREATE TABLE course_progress (
     user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
     course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
     progress_percentage INTEGER DEFAULT 0,
     completed_at TIMESTAMP WITH TIME ZONE,
     PRIMARY KEY (user_id, course_id)
   );

   -- Community posts
   CREATE TABLE posts (
     id SERIAL PRIMARY KEY,
     author_id UUID REFERENCES profiles(id),
     content TEXT NOT NULL,
     image_url TEXT,
     likes_count INTEGER DEFAULT 0,
     comments_count INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE events ENABLE ROW LEVEL SECURITY;
   ALTER TABLE event_participants ENABLE ROW LEVEL SECURITY;
   ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
   ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

   -- RLS Policies
   CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
   CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

   CREATE POLICY "Users can view all events" ON events FOR SELECT USING (true);
   CREATE POLICY "Users can create events" ON events FOR INSERT WITH CHECK (auth.uid() = organizer_id);
   CREATE POLICY "Users can update own events" ON events FOR UPDATE USING (auth.uid() = organizer_id);
   ```

## Option 2: Firebase (Google's Backend-as-a-Service)

### Setup Steps

1. **Install Firebase**
   ```bash
   npm install firebase
   ```

2. **Firebase Configuration**
   ```typescript
   // lib/firebase.ts
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';
   import { getStorage } from 'firebase/storage';

   const firebaseConfig = {
     // Your config
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   export const storage = getStorage(app);
   ```

3. **Firestore Collections Structure**
   ```
   users/{userId}
   events/{eventId}
   courses/{courseId}
   posts/{postId}
   skills/{skillId}
   ```

## Option 3: Custom Node.js Backend

For more control and custom business logic.

### Tech Stack
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **File Storage**: AWS S3 or Cloudinary
- **Real-time**: Socket.io

### Setup Steps

1. **Initialize Backend Project**
   ```bash
   mkdir tgc-backend
   cd tgc-backend
   npm init -y
   npm install express prisma @prisma/client bcryptjs jsonwebtoken cors dotenv
   npm install -D @types/node @types/express typescript ts-node nodemon
   ```

2. **Database Schema (Prisma)**
   ```prisma
   // prisma/schema.prisma
   generator client {
     provider = "prisma-client-js"
   }

   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   model User {
     id          String   @id @default(cuid())
     email       String   @unique
     name        String?
     age         Int?
     location    String?
     bio         String?
     avatarUrl   String?
     karmaPoints Int      @default(0)
     level       String   @default("Beginner")
     createdAt   DateTime @default(now())
     updatedAt   DateTime @updatedAt

     // Relations
     organizedEvents Event[] @relation("EventOrganizer")
     participatedEvents EventParticipant[]
     posts       Post[]
     skills      UserSkill[]
     courseProgress CourseProgress[]

     @@map("users")
   }

   model Event {
     id                  String   @id @default(cuid())
     title               String
     description         String?
     type                String   // 'event', 'gig', 'class'
     organizerId         String
     dateTime            DateTime
     location            String?
     isOnline            Boolean  @default(false)
     fee                 Decimal?
     payout              Decimal?
     karmaReward         Int      @default(0)
     maxParticipants     Int?
     currentParticipants Int      @default(0)
     status              String   @default("active")
     imageUrl            String?
     createdAt           DateTime @default(now())

     // Relations
     organizer     User @relation("EventOrganizer", fields: [organizerId], references: [id])
     participants  EventParticipant[]

     @@map("events")
   }

   model EventParticipant {
     eventId   String
     userId    String
     status    String   @default("registered")
     joinedAt  DateTime @default(now())

     // Relations
     event User @relation(fields: [eventId], references: [id])
     user  User @relation(fields: [userId], references: [id])

     @@id([eventId, userId])
     @@map("event_participants")
   }
   ```

3. **API Routes Structure**
   ```
   /api/auth/login
   /api/auth/register
   /api/auth/profile
   /api/events
   /api/events/:id
   /api/courses
   /api/users/:id
   /api/posts
   ```

## Option 4: Serverless with Vercel/Netlify Functions

For a serverless approach with API routes.

### Setup with Vercel

1. **API Routes Structure**
   ```
   api/
   ├── auth/
   │   ├── login.ts
   │   └── register.ts
   ├── events/
   │   ├── index.ts
   │   └── [id].ts
   └── users/
       └── [id].ts
   ```

2. **Example API Route**
   ```typescript
   // api/events/index.ts
   import { NextApiRequest, NextApiResponse } from 'next';
   import { PrismaClient } from '@prisma/client';

   const prisma = new PrismaClient();

   export default async function handler(req: NextApiRequest, res: NextApiResponse) {
     if (req.method === 'GET') {
       const events = await prisma.event.findMany({
         include: {
           organizer: true,
           participants: true
         }
       });
       res.json(events);
     } else if (req.method === 'POST') {
       const event = await prisma.event.create({
         data: req.body
       });
       res.json(event);
     }
   }
   ```

## Recommended Architecture for TGC

### For MVP (Minimum Viable Product)
**Supabase** - Quick setup, built-in auth, real-time features, and PostgreSQL database.

### For Production Scale
**Custom Node.js Backend** with:
- Express.js for API
- PostgreSQL with Prisma
- Redis for caching
- AWS S3 for file storage
- Socket.io for real-time features

## Key Features to Implement

### Authentication
- Email/Phone signup
- Social login (Google, Apple)
- JWT token management
- Password reset

### Core APIs
- User management
- Event/Gig CRUD operations
- Course management
- Karma point system
- Search and filtering
- Real-time notifications

### File Upload
- Profile pictures
- Event banners
- Course materials

### Payment Integration
- Stripe for web payments
- RevenueCat for mobile subscriptions
- Payout management for gig workers

### Real-time Features
- Live chat
- Event updates
- Notifications

## Next Steps

1. Choose your backend option based on your needs
2. Set up the database schema
3. Implement authentication
4. Create API endpoints for core features
5. Add real-time functionality
6. Implement payment processing
7. Add push notifications

Would you like me to help you implement any specific backend option or feature?
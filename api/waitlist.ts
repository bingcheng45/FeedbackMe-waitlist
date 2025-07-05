import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { insertWaitlistSchema } from '../shared/schema';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Validate request body
    const validatedData = insertWaitlistSchema.parse(req.body);
    
    // Check if email already exists
    const existingRegistration = await storage.getWaitlistRegistrationByEmail(validatedData.email);
    if (existingRegistration) {
      const position = await storage.getWaitlistPosition(validatedData.email);
      return res.status(200).json({ 
        message: "You have already been added to the waitlist",
        position: position,
        alreadyRegistered: true
      });
    }

    // Create waitlist registration
    const registration = await storage.createWaitlistRegistration(validatedData);
    
    // Get the position of the newly created registration
    const position = await storage.getWaitlistPosition(validatedData.email);
    
    res.status(201).json({ 
      message: "Successfully joined the waitlist!",
      id: registration.id,
      position: position
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: "Invalid input data",
        errors: error.errors 
      });
    }
    
    console.error("Error creating waitlist registration:", error);
    res.status(500).json({ 
      message: "Internal server error. Please try again later." 
    });
  }
} 
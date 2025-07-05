import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist registration endpoint
  app.post("/api/waitlist", async (req, res) => {
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
  });

  const httpServer = createServer(app);
  return httpServer;
}

import { users, waitlistRegistrations, type User, type InsertUser, type WaitlistRegistration, type InsertWaitlist } from "@shared/schema";
import { db } from "./db";
import { eq, lt, count } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createWaitlistRegistration(registration: InsertWaitlist): Promise<WaitlistRegistration>;
  getWaitlistRegistrationByEmail(email: string): Promise<WaitlistRegistration | undefined>;
  getWaitlistPosition(email: string): Promise<number | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createWaitlistRegistration(registration: InsertWaitlist): Promise<WaitlistRegistration> {
    const [waitlistReg] = await db
      .insert(waitlistRegistrations)
      .values(registration)
      .returning();
    return waitlistReg;
  }

  async getWaitlistRegistrationByEmail(email: string): Promise<WaitlistRegistration | undefined> {
    const [registration] = await db
      .select()
      .from(waitlistRegistrations)
      .where(eq(waitlistRegistrations.email, email));
    return registration || undefined;
  }

  async getWaitlistPosition(email: string): Promise<number | undefined> {
    const registration = await this.getWaitlistRegistrationByEmail(email);
    if (!registration) {
      return undefined;
    }

    // Count how many registrations have lower IDs (were created before)
    const [{ count: beforeCount }] = await db
      .select({ count: count() })
      .from(waitlistRegistrations)
      .where(lt(waitlistRegistrations.id, registration.id));
    
    return beforeCount + 1; // Position is 1-based
  }
}

export const storage = new DatabaseStorage();

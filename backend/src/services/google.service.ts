import { OAuth2Client } from 'google-auth-library';
import * as userRepository from '../repositories/user.repository';

// Service Layer: Contains business logic for Google authentication

// Create client with Google client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Data shape
export interface GoogleUserData {
  googleId: string;
  email: string;
  name: string;
  picture?: string;
}

export async function verifyGoogleToken(token: string): Promise<GoogleUserData | null> {
  try {
    // Verify using Google auth the given token if it matches the token and the app's ID
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Get the payload - if nothing is there that means token is invalid
    const payload = ticket.getPayload();
    if (!payload) {
      return null;
    }

    return {
      googleId: payload.sub,       // 'sub' is Google unique user ID
      email: payload.email!,       // User email
      name: payload.name!,         // User full name
      picture: payload.picture,    // Profile picture URL
    };
  } catch (error) {
    // Failure case
    console.error('Google token verification failed:', error);
    return null;
  }
}

export async function findAndCreateGoogleUser(googleData: GoogleUserData) {
  // Try to find by Google ID (returning Google user)
  let user = await userRepository.findByGoogleId(googleData.googleId);

  if (user) {
    return user;
  }

  // If not, try to find by email (existing user, first Google login)
  user = await userRepository.findByEmail(googleData.email);

  if (user) {
    // If found, link Google account to existing user
    user = await userRepository.updateById(user.id, {
      googleId: googleData.googleId,
      avatar: googleData.picture,
    });
    return user!;
  }

  // If not found, that means it's the first time - create new user
  user = await userRepository.create({
    email: googleData.email,
    name: googleData.name,
    googleId: googleData.googleId,
    avatar: googleData.picture,
    password: null,
    role: 'USER',
  });

  return user;
}

// src/api.ts

// Base URL for the API (adjust as needed, using Vite env variable for flexibility)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

// Utility function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // Adjust based on your auth setup
  if (!token) throw new Error('No authentication token found');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Import interfaces from types.ts
import {
  ListeningSectionRequest,
  ListeningSectionResponse,
  SpeakingSectionRequest,
  SpeakingSectionResponse,
  WritingSectionRequest,
  WritingSectionResponse,
  ReadingSectionRequest,
  ReadingSectionResponse,
} from '../types/types';

// Register a new user
export async function register(userData: { username: string; email: string; password: string }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Registration failed');
  }

  return response.json(); // Returns { token: string, user: { id: string, username: string, email: string } }
}

// Log in an existing user
export async function login(credentials: { email: string; password: string }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json(); // Returns { token: string, user: { id: string, username: string, email: string } }
}

// API request functions
export async function createListeningSection(
  data: ListeningSectionRequest,
  audioFiles: File[],
  photoFiles: File[] = []
): Promise<ListeningSectionResponse> {
  const formData = new FormData();

  // Append section data without files
  formData.append('sectionData', JSON.stringify(data));

  // Append audio and photo files
  audioFiles.forEach((file, index) => {
    formData.append(`audioFiles[${index}]`, file);
  });
  photoFiles.forEach((file, index) => {
    formData.append(`photoFiles[${index}]`, file);
  });

  const response = await fetch(`${BASE_URL}/listening`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to create listening section: ${response.statusText}`);
  }

  return response.json();
}

export async function createSpeakingSection(
  data: SpeakingSectionRequest,
  task2Audio: File,
  task3Audio: File,
  task4Audio: File
): Promise<SpeakingSectionResponse> {
  const formData = new FormData();

  // Append section data without files
  formData.append('sectionData', JSON.stringify(data));

  // Append audio files
  formData.append('task2Audio', task2Audio);
  formData.append('task3Audio', task3Audio);
  formData.append('task4Audio', task4Audio);

  const response = await fetch(`${BASE_URL}/speaking`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to create speaking section: ${response.statusText}`);
  }

  return response.json();
}

export async function createWritingSection(
  data: WritingSectionRequest,
  task1Audio: File
): Promise<WritingSectionResponse> {
  const formData = new FormData();

  // Append section data without files
  formData.append('sectionData', JSON.stringify(data));

  // Append audio file
  formData.append('task1Audio', task1Audio);

  const response = await fetch(`${BASE_URL}/writing`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to create writing section: ${response.statusText}`);
  }

  return response.json();
}

export async function createReadingSection(
  data: ReadingSectionRequest
): Promise<ReadingSectionResponse> {
  const response = await fetch(`${BASE_URL}/reading`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to create reading section: ${response.statusText}`);
  }

  return response.json();
}
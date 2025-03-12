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
  photoFiles: File[] = [],
  questionSnippetFiles: { audioIdx: number; questionIdx: number; file: File }[] = []
): Promise<ListeningSectionResponse> {
  const formData = new FormData();

  formData.append('sectionData', JSON.stringify(data));
  audioFiles.forEach((file, index) => {
    formData.append(`audioFiles[${index}]`, file);
  });
  photoFiles.forEach((file, index) => {
    formData.append(`photoFiles[${index}]`, file);
  });
  questionSnippetFiles.forEach(({ audioIdx, questionIdx, file }) => {
    formData.append(`questionSnippetFiles[${audioIdx}][${questionIdx}]`, file);
  });

  const response = await fetch(`${BASE_URL}/listening`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to create: ${response.statusText}`);
  }

  return response.json();
}

/** Fetch listening section data */
export async function getListeningSection(sectionId: string): Promise<ListeningSectionResponse> {
  const response = await fetch(`${BASE_URL}/listening/${sectionId}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch listening section');
  }
  return response.json();
}

/** Submit user answers */
export async function submitListeningAnswers(sectionId: string, answers: Record<string, any>) {
  const response = await fetch(`${BASE_URL}/listening/${sectionId}/submit`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ answers }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to submit answers');
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

// Get reading section data by test ID
export async function getReadingSection(testId: string | number): Promise<ReadingSectionResponse> {
  const response = await fetch(`${BASE_URL}/reading/${testId}`, {
    method: 'GET',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to get reading section: ${response.statusText}`);
  }

  return response.json();
}

// Interface for the reading section submission response
interface ReadingSubmissionResponse {
  success: boolean;
  score?: number;
  feedback?: string;
  correctAnswers?: Record<string, any>;
}

// Submit answers for a complete reading section
export async function submitReadingAnswers(
  testId: string | number, 
  passageAnswers: Record<string, Record<string, string[]>>
): Promise<ReadingSubmissionResponse> {
  const response = await fetch(`${BASE_URL}/reading/${testId}/submit`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers: passageAnswers }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to submit reading answers: ${response.statusText}`);
  }

  return response.json();
}
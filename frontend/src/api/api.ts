// Base URL for the API (adjust as needed)
const BASE_URL = 'http://localhost:5000/';

// Utility function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); 
  if (!token) throw new Error('No authentication token found');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Type definitions for request and response data
interface ListeningSectionRequest {
  title: string;
  audios: {
    title: string;
    audioFile: File;
    photoFile?: File;
    questions: {
      type: string;
      prompt: string;
      details: any;
    }[];
  }[];
}

interface ListeningSectionResponse {
  id: number;
  title: string;
  audios: {
    id: number;
    title: string;
    audioUrl: string;
    photoUrl: string | null;
    questions: {
      type: string;
      prompt: string;
      details: any;
    }[];
  }[];
}

interface SpeakingSectionRequest {
  title: string;
  task1: { prompt: string };
  task2: { passage: string; audioFile: File; prompt: string };
  task3: { passage: string; audioFile: File; prompt: string };
  task4: { audioFile: File; prompt: string };
}

interface SpeakingSectionResponse {
  id: number;
  title: string;
  task1: { prompt: string };
  task2: { passage: string; audioUrl: string; prompt: string };
  task3: { passage: string; audioUrl: string; prompt: string };
  task4: { audioUrl: string; prompt: string };
}

interface WritingSectionRequest {
  title: string;
  task1: { passage: string; audioFile: File; prompt: string };
  task2: { passage: string; prompt: string };
}

interface WritingSectionResponse {
  id: number;
  title: string;
  task1: { passage: string; audioUrl: string; prompt: string };
  task2: { passage: string; prompt: string };
}

interface ReadingSectionRequest {
  title: string;
  passages: {
    content: string;
    questions: {
      type: string;
      prompt: string;
      details: any;
    }[];
  }[];
}

interface ReadingSectionResponse {
  id: number;
  title: string;
  passages: {
    id: number;
    content: string;
    questions: {
      type: string;
      prompt: string;
      details: any;
    }[];
  }[];
}

// API request functions
export async function createListeningSection(data: ListeningSectionRequest): Promise<ListeningSectionResponse> {
  const formData = new FormData();
  
  // Prepare section data without files
  const sectionData = {
    title: data.title,
    audios: data.audios.map(audio => ({
      title: audio.title,
      questions: audio.questions,
    })),
  };
  formData.append('sectionData', JSON.stringify(sectionData));

  // Append audio and photo files
  data.audios.forEach((audio, index) => {
    formData.append(`audioFiles[${index}]`, audio.audioFile);
    if (audio.photoFile) {
      formData.append(`photoFiles[${index}]`, audio.photoFile);
    }
  });

  const response = await fetch(`${BASE_URL}/listening`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to create listening section: ${response.statusText}`);
  }

  return response.json();
}

export async function createSpeakingSection(data: SpeakingSectionRequest): Promise<SpeakingSectionResponse> {
  const formData = new FormData();
  
  // Prepare section data without files
  const sectionData = {
    title: data.title,
    task1: data.task1,
    task2: { passage: data.task2.passage, prompt: data.task2.prompt },
    task3: { passage: data.task3.passage, prompt: data.task3.prompt },
    task4: { prompt: data.task4.prompt },
  };
  formData.append('sectionData', JSON.stringify(sectionData));

  // Append audio files
  formData.append('task2Audio', data.task2.audioFile);
  formData.append('task3Audio', data.task3.audioFile);
  formData.append('task4Audio', data.task4.audioFile);

  const response = await fetch(`${BASE_URL}/speaking`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to create speaking section: ${response.statusText}`);
  }

  return response.json();
}

export async function createWritingSection(data: WritingSectionRequest): Promise<WritingSectionResponse> {
  const formData = new FormData();
  
  // Prepare section data without files
  const sectionData = {
    title: data.title,
    task1: { passage: data.task1.passage, prompt: data.task1.prompt },
    task2: data.task2,
  };
  formData.append('sectionData', JSON.stringify(sectionData));

  // Append audio file
  formData.append('task1Audio', data.task1.audioFile);

  const response = await fetch(`${BASE_URL}/writing`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to create writing section: ${response.statusText}`);
  }

  return response.json();
}

export async function createReadingSection(data: ReadingSectionRequest): Promise<ReadingSectionResponse> {
  const response = await fetch(`${BASE_URL}/reading`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create reading section: ${response.statusText}`);
  }

  return response.json();
}
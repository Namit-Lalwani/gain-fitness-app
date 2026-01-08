const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('gain_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Auth endpoints
  async register(userData: {
    email: string;
    password: string;
    name: string;
    age?: number;
    weight?: number;
    height?: number;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    activityLevel?: 'SEDENTARY' | 'LIGHTLY_ACTIVE' | 'MODERATELY_ACTIVE' | 'VERY_ACTIVE' | 'EXTREMELY_ACTIVE';
  }) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return this.handleResponse(response);
  }

  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await this.handleResponse(response);
    if (data.data?.token) {
      localStorage.setItem('gain_token', data.data.token);
    }
    return data;
  }

  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateProfile(userData: Partial<{
    name: string;
    age: number;
    weight: number;
    height: number;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    activityLevel: 'SEDENTARY' | 'LIGHTLY_ACTIVE' | 'MODERATELY_ACTIVE' | 'VERY_ACTIVE' | 'EXTREMELY_ACTIVE';
  }>) {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return this.handleResponse(response);
  }

  // Workout endpoints
  async getWorkouts(page = 1, limit = 10) {
    const response = await fetch(`${API_BASE_URL}/workouts?page=${page}&limit=${limit}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getWorkout(id: string) {
    const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async createWorkout(workoutData: {
    date: string;
    duration: number;
    notes?: string;
    exercises: Array<{
      exerciseId: string;
      order: number;
      notes?: string;
      sets: Array<{
        setNumber: number;
        reps: number;
        weight: number;
        rpe?: number;
        rir?: number;
        restTime?: number;
      }>;
    }>;
  }) {
    const response = await fetch(`${API_BASE_URL}/workouts`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(workoutData),
    });
    return this.handleResponse(response);
  }

  // Exercise endpoints
  async getExercises(params?: {
    page?: number;
    limit?: number;
    category?: string;
    muscleGroup?: string;
    search?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.category) searchParams.append('category', params.category);
    if (params?.muscleGroup) searchParams.append('muscleGroup', params.muscleGroup);
    if (params?.search) searchParams.append('search', params.search);

    const response = await fetch(`${API_BASE_URL}/exercises?${searchParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getExerciseCategories() {
    const response = await fetch(`${API_BASE_URL}/exercises/categories/list`);
    return this.handleResponse(response);
  }

  async getMuscleGroups() {
    const response = await fetch(`${API_BASE_URL}/exercises/muscle-groups/list`);
    return this.handleResponse(response);
  }

  // Body measurements endpoints
  async getMeasurements(page = 1, limit = 20) {
    const response = await fetch(`${API_BASE_URL}/body/measurements?page=${page}&limit=${limit}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async createMeasurement(measurementData: {
    date: string;
    weight?: number;
    bodyFat?: number;
    chest?: number;
    waist?: number;
    hips?: number;
    biceps?: number;
    thighs?: number;
    calves?: number;
    notes?: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/body/measurements`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(measurementData),
    });
    return this.handleResponse(response);
  }

  async getBodyTrends(days = 90) {
    const response = await fetch(`${API_BASE_URL}/body/trends?days=${days}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Analytics endpoints
  async getProgress(days = 30) {
    const response = await fetch(`${API_BASE_URL}/analytics/progress?days=${days}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getFatigue(days = 7) {
    const response = await fetch(`${API_BASE_URL}/analytics/fatigue?days=${days}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // AI endpoints
  async getWorkoutSuggestion(params?: { focusArea?: string; duration?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.focusArea) searchParams.append('focusArea', params.focusArea);
    if (params?.duration) searchParams.append('duration', params.duration.toString());

    const response = await fetch(`${API_BASE_URL}/ai/workout-suggestion?${searchParams}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getProgressionPlan(exerciseId: string) {
    const response = await fetch(`${API_BASE_URL}/ai/progression-plan?exerciseId=${exerciseId}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async getReadinessScore() {
    const response = await fetch(`${API_BASE_URL}/ai/readiness-score`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Utility methods
  logout() {
    localStorage.removeItem('gain_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('gain_token');
  }
}

export const apiService = new ApiService();

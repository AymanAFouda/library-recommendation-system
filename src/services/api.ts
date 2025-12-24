import { Book, ReadingList, Review, BookRecommendation } from '@/types';
import { mockBooks, mockReadingLists } from './mockData';
import { fetchAuthSession } from 'aws-amplify/auth';


/**
 * ============================================================================
 * API SERVICE LAYER - BACKEND COMMUNICATION
 * ============================================================================
 *
 * ⚠️ IMPORTANT: This file currently uses MOCK DATA for all API calls.
 *
 * TO IMPLEMENT AWS BACKEND:
 * Follow the step-by-step guide in IMPLEMENTATION_GUIDE.md
 *
 * Quick Reference:
 * - Week 2: Implement Books API (getBooks, getBook, createBook, etc.)
 * - Week 2: Implement Reading Lists API
 * - Week 3: Add Cognito authentication headers
 * - Week 4: Implement AI recommendations with Bedrock
 *
 * ============================================================================
 * IMPLEMENTATION CHECKLIST:
 * ============================================================================
 *
 * [ ] Week 1: Set up AWS account and first Lambda function
 * [ ] Week 2: Create DynamoDB tables (Books, ReadingLists)
 * [ ] Week 2: Deploy Lambda functions for Books API
 * [ ] Week 2: Deploy Lambda functions for Reading Lists API
 * [ ] Week 2: Set VITE_API_BASE_URL in .env file
 * [ ] Week 3: Set up Cognito User Pool
 * [ ] Week 3: Install aws-amplify: npm install aws-amplify
 * [ ] Week 3: Configure Amplify in src/main.tsx
 * [ ] Week 3: Update AuthContext with Cognito functions
 * [ ] Week 3: Implement getAuthHeaders() function below
 * [ ] Week 3: Add Cognito authorizer to API Gateway
 * [ ] Week 4: Deploy Bedrock recommendations Lambda
 * [ ] Week 4: Update getRecommendations() function
 * [ ] Week 4: Remove all mock data returns
 * [ ] Week 4: Delete src/services/mockData.ts
 *
 * ============================================================================
 */

// TODO: Uncomment this after deploying API Gateway (Week 2, Day 4)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


async function getAuthHeaders() {
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    console.log("Token: ", token);
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  } catch {
    return {
      'Content-Type': 'application/json'
    };
  }
}

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(`${API_BASE_URL}/books`);
  if (!response.ok) throw new Error('Failed to fetch books');
  const { body } = await response.json() as {body: string};
  return JSON.parse(body);
}

export async function getBook(id: string): Promise<Book | null> {
  const response = await fetch(`${API_BASE_URL}/books/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Failed to fetch book');
  return response.json();
}

/**
 * Create a new book (admin only)
 *
 * TODO: Replace with real API call in Week 2, Day 5-7
 *
 * Implementation steps:
 * 1. Deploy Lambda function: library-create-book
 * 2. Create API Gateway endpoint: POST /books
 * 3. Add Cognito authorizer (Week 3)
 * 4. Replace mock code below with:
 *
 * const headers = await getAuthHeaders();
 * const response = await fetch(`${API_BASE_URL}/books`, {
 *   method: 'POST',
 *   headers,
 *   body: JSON.stringify(book)
 * });
 * if (!response.ok) throw new Error('Failed to create book');
 * return response.json();
 *
 * Note: This endpoint requires admin role in Cognito
 */
export async function createBook(book: Omit<Book, 'id'>): Promise<Book> {
  // TODO: Remove this mock implementation after deploying Lambda
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBook: Book = {
        ...book,
        id: Date.now().toString(),
      };
      resolve(newBook);
    }, 500);
  });
}

/**
 * Update an existing book (admin only)
 * TODO: Replace with PUT /books/:id API call
 */
export async function updateBook(id: string, book: Partial<Book>): Promise<Book> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingBook = mockBooks.find((b) => b.id === id);
      const updatedBook: Book = {
        ...existingBook!,
        ...book,
        id,
      };
      resolve(updatedBook);
    }, 500);
  });
}

/**
 * Delete a book (admin only)
 * TODO: Replace with DELETE /books/:id API call
 */
export async function deleteBook(): Promise<void> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  });
}

//This function had an error so I used ChatGPT to fix it
export async function getRecommendations(query: string): Promise<BookRecommendation[]> {
  const authHeaders = await getAuthHeaders();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
  };

  const response = await fetch(`${API_BASE_URL}/recommendations`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query }),
  });

  console.log("Response: ",response);

  if (!response.ok) throw new Error('Failed to get recommendations');
  const data = await response.json();
  console.log("Recommendations: ", data)
  return data.recommendations;
}

export async function getReadingLists(): Promise<ReadingList[]> {
  const authHeaders = await getAuthHeaders();

  // Build headers object with only string values
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
  };

  const response = await fetch(`${API_BASE_URL}/reading-lists`, { headers });

  if (!response.ok) throw new Error('Failed to fetch reading lists');
  return response.json();
}

export async function createReadingList(
  list: Omit<ReadingList, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ReadingList> {
  const authHeaders = await getAuthHeaders();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
  };

  const response = await fetch(`${API_BASE_URL}/reading-lists`, {
    method: 'POST',
    headers,
    body: JSON.stringify(list)
  });
  if (!response.ok) throw new Error('Failed to create reading list');
  return response.json();
}

/**
 * Update a reading list
 * TODO: Replace with PUT /reading-lists/:id API call
 */
export async function updateReadingList(
  id: string,
  list: Partial<ReadingList>
): Promise<ReadingList> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingList = mockReadingLists.find((l) => l.id === id);
      const updatedList: ReadingList = {
        ...existingList!,
        ...list,
        id,
        updatedAt: new Date().toISOString(),
      };
      resolve(updatedList);
    }, 500);
  });
}

/**
 * Delete a reading list
 * TODO: Replace with DELETE /reading-lists/:id API call
 */
export async function deleteReadingList(): Promise<void> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  });
}

/**
 * Get reviews for a book
 * TODO: Replace with GET /books/:id/reviews API call
 */
export async function getReviews(bookId: string): Promise<Review[]> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockReviews: Review[] = [
        {
          id: '1',
          bookId,
          userId: '1',
          rating: 5,
          comment: 'Absolutely loved this book! A must-read.',
          createdAt: '2024-11-01T10:00:00Z',
        },
      ];
      resolve(mockReviews);
    }, 500);
  });
}

/**
 * Create a new review
 * TODO: Replace with POST /books/:bookId/reviews API call
 */
export async function createReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReview: Review = {
        ...review,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      resolve(newReview);
    }, 500);
  });
}

/**
 * Error handling utilities
 */

import toast from 'react-hot-toast';

export function handleApiError(error: unknown): void {
  let message = 'An unexpected error occurred';

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }

  toast.error(message);
  console.error('API Error:', error);
}

export function showSuccess(message: string): void {
  toast.success(message)
  console.log('Success:', message);
}

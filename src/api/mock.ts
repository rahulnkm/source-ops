// src/api/mock.ts

export const login = (username: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(username === 'admin' && password === 'password');
      }, 1000);
    });
  };
  
  // Add more mock API functions as needed for other components
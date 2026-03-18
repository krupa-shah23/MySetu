export const authService = {
  login: async (email, password) => {
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Accept any non-empty credentials for mock or the demo user specifically
    if (email && password) {
      const demoUser = {
        name: "Alex Sterling",
        email: email === "alex@mysetu.demo" ? email : "user@example.com",
        role: "Senior Software Engineer",
        did: "did:mysetu:94a2b8x1"
      };
      
      const token = "mock.jwt.token." + Date.now();
      
      localStorage.setItem('mysetuUser', JSON.stringify(demoUser));
      localStorage.setItem('authToken', token);
      
      return { user: demoUser, token };
    }
    throw new Error('Invalid credentials');
  },

  signup: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (userData.email && userData.password && userData.name) {
      const newUser = {
        name: userData.name,
        email: userData.email,
        role: "New User",
        did: "did:mysetu:new" + Date.now()
      };
      
      const token = "mock.jwt.token." + Date.now();
      
      localStorage.setItem('mysetuUser', JSON.stringify(newUser));
      localStorage.setItem('authToken', token);
      
      return { user: newUser, token };
    }
    throw new Error('All fields are required');
  },

  logout: () => {
    ['token', 'authToken', 'user', 'mysetuUser', 'mysetuSession'].forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('mysetuUser');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

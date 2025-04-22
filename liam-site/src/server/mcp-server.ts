import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { portfolioData } from './data/portfolio-data.js';

// Define the MCP server
const app = express();
const PORT = process.env.PORT || 3001;

// Configure middleware
app.use(cors());
app.use(express.json());

// Define route handlers
const generateHandler = (req: Request, res: Response): void => {
  try {
    // Extract prompt from request
    const { prompt } = req.body;
    
    // Process the prompt based on the requested action
    if (!prompt) {
      res.status(400).json({ error: 'No prompt provided' });
      return;
    }
    
    // Log received prompt for debugging
    console.log('Received prompt:', prompt);
    
    // Handle different types of requests based on the prompt content
    if (prompt.toLowerCase().includes('projects') || prompt.toLowerCase().includes('portfolio')) {
      res.json({ 
        response: { 
          content: JSON.stringify(portfolioData.projects),
          metadata: { source: 'portfolio-data', type: 'projects' }
        } 
      });
      return;
    } else if (prompt.toLowerCase().includes('about') || prompt.toLowerCase().includes('bio')) {
      res.json({ 
        response: { 
          content: JSON.stringify(portfolioData.about),
          metadata: { source: 'portfolio-data', type: 'about' }
        } 
      });
      return;
    } else if (prompt.toLowerCase().includes('contact')) {
      res.json({ 
        response: { 
          content: JSON.stringify(portfolioData.contact),
          metadata: { source: 'portfolio-data', type: 'contact' }
        } 
      });
      return;
    } else if (prompt.toLowerCase().includes('laboratory') || prompt.toLowerCase().includes('experiments')) {
      res.json({ 
        response: { 
          content: JSON.stringify(portfolioData.laboratory),
          metadata: { source: 'portfolio-data', type: 'laboratory' }
        } 
      });
      return;
    }
    
    // Default response if no specific content is requested
    res.json({ 
      response: { 
        content: "Welcome to Liam's Portfolio MCP Server. You can request information about projects, bio, laboratory experiments, or contact details.",
        metadata: { source: 'mcp-server', type: 'help' }
      } 
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const healthHandler = (_req: Request, res: Response): void => {
  res.status(200).send('MCP Server is running');
};

// Register routes
app.post('/mcp/v1/generate', generateHandler);
app.get('/health', healthHandler);

// Start the server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`MCP Server running on http://localhost:${PORT}`);
  });
};

// Export for use in other files
export { app, startServer };
#!/usr/bin/env python3
import requests
import json
import unittest
import os
import sys
from dotenv import load_dotenv

# Load environment variables from frontend/.env
load_dotenv("frontend/.env")

# Get the backend URL from environment variables
BACKEND_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BACKEND_URL:
    print("Error: REACT_APP_BACKEND_URL not found in environment variables")
    sys.exit(1)

print(f"Using backend URL: {BACKEND_URL}")

class PortfolioAPITest(unittest.TestCase):
    """Test suite for Portfolio API endpoints"""

    def setUp(self):
        """Set up test environment"""
        self.api_url = f"{BACKEND_URL}/api"
        self.test_contact = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "API Test Message",
            "message": "This is a test message from the API test suite."
        }

    def test_health_check(self):
        """Test the health check endpoint"""
        print("\n--- Testing Health Check Endpoint ---")
        response = requests.get(f"{self.api_url}/health")
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "healthy")
        print("✅ Health check endpoint is working correctly")

    def test_get_portfolio(self):
        """Test the GET /portfolio endpoint"""
        print("\n--- Testing GET Portfolio Endpoint ---")
        response = requests.get(f"{self.api_url}/portfolio")
        
        print(f"Status Code: {response.status_code}")
        
        self.assertEqual(response.status_code, 200)
        
        data = response.json()
        # Verify portfolio structure
        self.assertIn("id", data)
        self.assertIn("personal", data)
        self.assertIn("skills", data)
        
        # Verify personal info structure
        personal = data["personal"]
        self.assertIn("name", personal)
        self.assertIn("title", personal)
        self.assertIn("bio", personal)
        self.assertIn("email", personal)
        
        # Verify skills structure
        skills = data["skills"]
        self.assertIn("frontend", skills)
        self.assertIn("tools", skills)
        self.assertIn("learning", skills)
        
        print("Portfolio data:")
        print(f"Name: {personal['name']}")
        print(f"Title: {personal['title']}")
        print(f"Frontend Skills: {', '.join(skills['frontend'])}")
        
        print("✅ GET /portfolio endpoint is working correctly")

    def test_get_projects(self):
        """Test the GET /projects endpoint"""
        print("\n--- Testing GET Projects Endpoint ---")
        response = requests.get(f"{self.api_url}/projects")
        
        print(f"Status Code: {response.status_code}")
        
        self.assertEqual(response.status_code, 200)
        
        projects = response.json()
        self.assertIsInstance(projects, list)
        
        if projects:
            # Verify project structure for the first project
            project = projects[0]
            self.assertIn("id", project)
            self.assertIn("title", project)
            self.assertIn("description", project)
            self.assertIn("technologies", project)
            self.assertIn("github", project)
            self.assertIn("live", project)
            self.assertIn("status", project)
            
            print(f"Found {len(projects)} projects")
            print("Sample project:")
            print(f"Title: {project['title']}")
            print(f"Description: {project['description']}")
            print(f"Technologies: {', '.join(project['technologies'])}")
            print(f"Status: {project['status']}")
        else:
            print("No projects found in the database")
            
        print("✅ GET /projects endpoint is working correctly")

    def test_post_contact(self):
        """Test the POST /contact endpoint"""
        print("\n--- Testing POST Contact Endpoint ---")
        response = requests.post(
            f"{self.api_url}/contact",
            json=self.test_contact
        )
        
        print(f"Status Code: {response.status_code}")
        
        self.assertEqual(response.status_code, 200)
        
        data = response.json()
        self.assertIn("id", data)
        self.assertEqual(data["name"], self.test_contact["name"])
        self.assertEqual(data["email"], self.test_contact["email"])
        self.assertEqual(data["subject"], self.test_contact["subject"])
        self.assertEqual(data["message"], self.test_contact["message"])
        self.assertFalse(data["is_read"])
        
        print("Contact message created:")
        print(f"ID: {data['id']}")
        print(f"Name: {data['name']}")
        print(f"Email: {data['email']}")
        print(f"Subject: {data['subject']}")
        
        # Verify the message was saved by retrieving it
        print("\n--- Verifying Contact Message Was Saved ---")
        verify_response = requests.get(f"{self.api_url}/contact")
        
        self.assertEqual(verify_response.status_code, 200)
        
        messages = verify_response.json()
        self.assertIsInstance(messages, list)
        
        # Find our test message
        test_message = None
        for message in messages:
            if message["id"] == data["id"]:
                test_message = message
                break
                
        self.assertIsNotNone(test_message, "Test message not found in database")
        self.assertEqual(test_message["name"], self.test_contact["name"])
        self.assertEqual(test_message["email"], self.test_contact["email"])
        
        print("✅ POST /contact endpoint is working correctly")
        print("✅ Contact message was successfully saved to the database")

    def test_error_handling(self):
        """Test error handling for invalid requests"""
        print("\n--- Testing Error Handling ---")
        
        # Test invalid endpoint
        print("Testing invalid endpoint...")
        response = requests.get(f"{self.api_url}/invalid-endpoint")
        print(f"Status Code: {response.status_code}")
        self.assertNotEqual(response.status_code, 200)
        
        # Test invalid project ID
        print("Testing invalid project ID...")
        response = requests.get(f"{self.api_url}/projects/invalid-id")
        print(f"Status Code: {response.status_code}")
        self.assertEqual(response.status_code, 404)
        
        # Test invalid contact message format
        print("Testing invalid contact message format...")
        invalid_contact = {
            "name": "Test User",
            # Missing required fields
        }
        response = requests.post(f"{self.api_url}/contact", json=invalid_contact)
        print(f"Status Code: {response.status_code}")
        self.assertNotEqual(response.status_code, 200)
        
        print("✅ Error handling is working correctly")

    def test_database_initialization(self):
        """Verify database initialization worked correctly"""
        print("\n--- Verifying Database Initialization ---")
        
        # Check portfolio data exists
        portfolio_response = requests.get(f"{self.api_url}/portfolio")
        self.assertEqual(portfolio_response.status_code, 200)
        
        # Check projects data exists
        projects_response = requests.get(f"{self.api_url}/projects")
        self.assertEqual(projects_response.status_code, 200)
        projects = projects_response.json()
        
        # Verify we have the default projects
        self.assertGreaterEqual(len(projects), 1, "No default projects found in database")
        
        print(f"Found {len(projects)} projects in the database")
        print("✅ Database initialization is working correctly")


if __name__ == "__main__":
    print(f"Starting Portfolio API Tests against {BACKEND_URL}")
    unittest.main(argv=['first-arg-is-ignored'], exit=False)
# PDF Upload to Google Drive App

## Overview

This is a simple frontend web app that allows users to submit their **name**, **phone number**, and a **PDF file**.  
The uploaded PDF is automatically stored in your **Google Drive**, and an **email notification** is sent to "Owner of web app" with the Drive link.

## Services Used

### 1. Google Drive
- Stores uploaded PDF files.  
- Files are automatically made shareable so you can access them via link.

### 2. Google Apps Script
- Acts as a mini-backend for receiving the uploaded PDF and saving it to Google Drive.  
- Handles Base64 decoding and file creation in Drive.

### 3. EmailJS
- Sends email notifications with the user details and the Google Drive link.  
- Works completely on the frontend, no backend required.

### 4. Browser Frontend (HTML + JS)
- Collects user data (name, phone, PDF) via a form.  
- Converts the PDF to Base64 and posts it to the Google Apps Script.  
- Sends an email via EmailJS.

---

## How the App Works

### Step 1: User Fills the Form and submits
- User enters their **name** and **phone number**.  
- User selects a **PDF file** to upload.

### Step 2: PDF gets Uploaded to Google Drive
- The PDF is converted to **Base64** in the browser.  
- JavaScript sends a **POST request** to the Google Apps Script Web App URL.  
- **Google Apps Script**:
  - Decodes the Base64 into a Blob.  
  - Creates a new file in your Google Drive folder.  
  - Makes the file shareable and returns the **file link**.

### Step 3: Email Notification is sent to Owner of Web App
- JavaScript receives the Google Drive link from Apps Script.  
- Uses **EmailJS** to send an email to your address containing:
  - User’s name  
  - User’s phone  
  - Google Drive link to the uploaded PDF

### Step 4: Success
- User sees a success alert:

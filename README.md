# Device Management System - Frontend

A modern, responsive web application for managing and tracking mobile devices. Built with visual excellence and user experience in mind.

### Repository Links
- **Frontend**: [https://github.com/denisdenis05/DeviceManagementFrontend](https://github.com/denisdenis05/DeviceManagementFrontend)
- **Backend**: [https://github.com/denisdenis05/DeviceManagementBackend](https://github.com/denisdenis05/DeviceManagementBackend)

---

## Technical Stack

- **Framework**: Angular 18.0 +
- **Language**: TypeScript
- **State management**: RxJS
- **Forms**: Reactive Forms with custom validation
- **Styling**: Vanilla CSS

---

## Technical Approach

The frontend uses Angular's latest features to provide a smooth, reactive interface. My approach focuses on modularity, performance, and clear data flow:

1. **Standalone Architecture**: I use Angular standalone components throughout the app. This reduces boilerplate and improves load times by loading only the code needed for each view.
2. **Feature-Based Structure**: I organized the project into logical feature folders (e.g., Auth, Devices). This makes it easy to locate and maintain the UI for specific parts of the system.
3. **Core Layer**: Shared functionality like API services, shared models, and application constants are centralized in the Core folder, ensuring consistency across the entire project.

### Key Implementation Steps
- **Intelligent Device Assistant**: I built an integrated chat assistant (Mini-Chat) that provides a conversational interface to the device inventory. It uses a RAG approach to answer questions and provide information about any device in the system.
- **Interactive Device Cards**: When the AI assistant mentions a device, the frontend automatically extracts the ID and renders an interactive card. This allows me to view details, edit, assign, or delete devices directly within the chat conversation.
- **Reactive Search Engine**: I built the search feature with RxJS and used a 300ms debounce. This ensures that the backend is only queried when the user finishes typing, keeping the UI fast and the server load low.
- **Dynamic Routing**: I implemented a routing system that handles everything from the main device list to specific detail views and edit forms.
- **Form Validation**: The Create and Edit forms include real-time validation (like Duplicate Name checks and required field indicators) to help users avoid mistakes before they submit.
- **Auth Flow**: I integrated a full Authentication system, including login and registration pages that work seamlessly with the backend's JWT security.

---

## How to Run

### 1. Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed, then run:
```bash
npm install
```

### 2. Connect to the Backend
The app communicates with the backend API at `http://localhost:5000`. If your backend has a different address, you can update the `ApplicationConstants.ApiBaseUrl` in the `src/app/core/constants/` directory.

### 3. Run the Development Server
```bash
npm run start
```
Navigate to `http://localhost:4200/` to see the live application.

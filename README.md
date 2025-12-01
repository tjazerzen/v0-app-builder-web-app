# V0 AI App Builder & Analyzer

This is a Next.js web application that provides a custom interface for Vercel's v0 Platform API. It allows you to generate web applications from natural language prompts and then uses a second AI to analyze the changes made by the v0 model.

## Core Features

- **Dynamic App Generation:** Build web applications from a single text prompt.
- **Iterative Refinement:** Use follow-up prompts to modify and improve the generated application.
- **AI-Powered Ambiguity Analysis:** After each follow-up, the application uses an OpenAI model to analyze the difference between the "before" and "after" code, highlighting what changes the v0 AI inferred or generated without explicit user instructions.
- **Live Preview:** Instantly see a live, interactive demo of your generated application within an iframe.
- **Decoupled Architecture:** The application uses two separate server-side API routes to securely handle communication with the v0 API and the OpenAI API, bypassing client-side CORS issues and protecting API keys.

## How to Get Started

### Prerequisites

- Node.js (v18 or later)
- `pnpm` (or another package manager like `npm` or `yarn`)
- A Vercel account with a **v0 API Key**
- An OpenAI account with an **OpenAI API Key**

### Setup

1.  **Clone the Repository**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-directory>
    ```

2.  **Install Dependencies**
    ```bash
    pnpm install
    ```

3.  **Set Up Environment Variables**
    Create a file named `.env` in the root of your project and add your secret keys.
    ```env
    V0_API_KEY=your_v0_api_key_here
    OPENAI_API_KEY=your_openai_api_key_here
    ```

4.  **Run the Development Server**
    ```bash
    pnpm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How to Use

1.  **Initial Prompt:** Enter a description of the app you want to build (e.g., "a landing page for a coffee shop") and click "Build".
2.  **Follow-up Prompt:** Once the initial app is generated, a new input field will appear. Use this to refine your app (e.g., "add a gallery of images").
3.  **View Analysis:** After the app is updated, a card will appear at the bottom displaying the AI's analysis of the changes it made based on its own inferences.

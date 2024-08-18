# Customer Support Email Generator

![Next.js](https://img.shields.io/badge/Next.js-v13.4-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.3-green)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.2-orange)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)

A responsive, AI-powered application that generates customer support emails based on user input. Built using Next.js, TypeScript, and Tailwind CSS, and powered by Hugging Face's API for AI-driven text generation.

## 🚀 Demo

Check out the live demo [here](https://cseg.charlessunday.com).

## 🛠️ Features

- **Dynamic Email Generation**: Automatically generates professional emails tailored to various customer support scenarios such as Technical Problems, Billing Inquiries, Account Management, and Product Information.
- **Responsive Design**: Ensures optimal viewing on any device with a clean and modern UI powered by Tailwind CSS.
- **AI-Powered**: Utilizes Hugging Face’s Inference API for generating intelligent email responses based on the selected issue type and user-provided details.
- **TypeScript for Safety**: Type-safe codebase with TypeScript ensuring reliability and scalability.
- **Deployed on Vercel**: Seamless CI/CD pipeline with automatic deployments on Vercel.

## 📦 Technologies Used

- **[Next.js](https://nextjs.org/)**: A React framework for server-rendered applications with built-in support for routing, code-splitting, and more.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for building custom designs without leaving your HTML.
- **[TypeScript](https://www.typescriptlang.org/)**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **[Hugging Face API](https://huggingface.co/)**: A leading provider of AI models and APIs for text generation, natural language processing, and more.
- **[Vercel](https://vercel.com/)**: A platform for frontend frameworks and static sites, built to integrate with headless content, commerce, or databases.

## 💻 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js v16+ and npm
- A Hugging Face API key ([sign up here](https://huggingface.co/join))

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/customer-support-email-generator.git
   cd customer-support-email-generator

2. Install Dependencies:
   ```bash
   npm install
   ```
3. Environment Variables:

   Create a .env.local file in the root of your project and add your Hugging         Face API key:
   ```bash
   NEXT_PUBLIC_HUGGINGFACE_API_KEY=your-huggingface-api-key
   ```
4. Run the Development Server:
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 to view the application in the browser.

## 📚 Project Structure

```bash
├── /app                   # Contains the main application files
│   ├── /page.tsx          # Main page with the form and logic
│   ├── /layout.tsx        # Layout component
│   └── /globals.css       # Global styles using Tailwind CSS
├── /public                # Static files
├── /node_modules          # Dependencies
├── .env.local             # Environment variables
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## ✨ Features & Enhancements

- **Customizable Templates**: Easily add or modify email templates to suit different use cases.
- **Error Handling**: Robust error handling for API requests and form validation.
- **Future Enhancements**:
  - **Authentication**: Add user authentication for personalized support and email history tracking.
  - **Multi-language Support**: Extend AI capabilities to generate emails in multiple languages.

## 🤝 Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m 'Add YourFeature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

If you have any questions or suggestions, feel free to reach out:

- GitHub: [@imcharlessunday](https://github.com/imcharlessunday)
- Contact: [charlessunday.com/contact](https://charlessunday.com/contact)


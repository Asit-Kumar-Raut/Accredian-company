# Accredian Enterprise Clone

A premium partial clone of the [Accredian Enterprise](https://enterprise.accredian.com/) website, built with Next.js, Tailwind CSS, and Three.js.

## 🚀 Features
- **3D Starry Sky Background**: A professional and immersive 3D background using Three.js and React Three Fiber.
- **Lead Capture Form**: Fully functional contact form that stores data in **MongoDB** and sends email notifications via **Nodemailer**.
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewports.
- **Modern Animations**: Smooth scroll reveals and hover effects using **Framer Motion**.
- **Enterprise UI**: Premium glassmorphism aesthetics and clean component structure.
- **Login Page**: A sleek login interface for enterprise users.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, @react-three/fiber
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Email**: Nodemailer (Gmail SMTP)
- **Icons**: Lucide React

## 📦 Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd accede
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI=mongodb+srv://asitraut2006_db_user:HisbuIJ1HpsjRv2o@cluster0.684tk8d.mongodb.net/accredian?retryWrites=true&w=majority&appName=Cluster0
   EMAIL_USER=ardiliumplatform@gmail.com
   EMAIL_PASS=axztdwsbqxaajrzx
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the application**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🤖 AI Usage & Improvements

### Where AI Helped
- **3D Background**: Generating the complex logic for the starry sky effect using `maath` and `react-three-fiber`.
- **Component Structure**: Scaffolding the initial responsive layouts for the various sections.
- **API Integration**: Implementing the Nodemailer and MongoDB logic efficiently.

### Manual Improvements
- **Design Polish**: Manually adjusted the glassmorphism effects and color gradients to match the "Enterprise" feel.
- **Logo Recovery**: Since the local logo file was inaccessible during the automated setup, I manually researched the official site to retrieve the official SVG logo.
- **Animation Orchestration**: Fine-tuned the Framer Motion viewport triggers for a more professional feel.

### Future Improvements
- **Full Auth System**: Implement NextAuth.js for secure session management.
- **CMS Integration**: Connect the "Course Segmentation" to a headless CMS like Sanity or Contentful.
- **Interactive Process Diagram**: Make the "Accredian Edge" section interactive with hoverable tooltips for each step.
- **Performance Optimization**: Optimize the 3D background for low-end devices using conditional rendering.

---
Developed with ❤️ by Antigravity AI

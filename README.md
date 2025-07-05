# 📝 Form Template Builder

A dynamic form template builder that allows users to design customizable templates with real-time preview and local persistence. Users can generate forms from saved templates, submit data, and store responses — all within a sleek and intuitive interface.

---

## 🌐 Live Demo

👉 [Try it here](https://form-template-builder.netlify.app)

## 🌐 Demo Video
[Watch Demo Video](https://drive.google.com/file/d/1alVEar_RdpLamkuFUBsKDG9jVpVniYDp/view?usp=sharing)

## 🚀 Features

---

### 🧱 Builder

- Create and manage **up to 5 templates**
- Add **multiple sections** with custom titles
- Drag-and-drop fields **within a section**
- Field types supported:
  - 🔠 **Label** (H1, H2, H3)
  - ✍️ **Text**
  - 🔢 **Number**
  - ✅ **Boolean** (Checkbox/Toggle)
  - 🔽 **Enum** (Dropdown)
- Real-time preview panel
- Basic data type validation
- LocalStorage-based template saving
- Delete individual fields
- Rearrangement via drag-and-drop

### 🧾 Form

- Render forms from saved templates
- Dynamic field rendering
- Validate input based on field type
- Save form responses to **localStorage**

---

## 🖥️ Tech Stack

| Category           | Technology                               |
| ------------------ | ---------------------------------------- |
| Frontend Framework | React                                    |
| Styling            | Tailwind CSS                             |
| State Management   | Context API _(opted over Redux/Zustand)_ |
| Drag & Drop        | HTML drag-and-drop                       |
| Icons              | Lucide                                   |
| Persistence        | localStorage                             |
| Deployment         | Netlify                                  |

---

## 💡 Why Context API?

This project uses Context API for global state instead of Redux/Zustand to keep things lightweight and avoid boilerplate, given the limited scope of the assignment.

---

## 📁 Folder Structure

src/
│
├── assets/ 
│
├── components/
│ ├── builder/ # Core builder UI
│ │ ├── Builder.jsx
│ │ ├── FieldCard.jsx
│ │ └── SectionEditor.jsx
│ │
│ ├── preview/ # Live preview elements
│ │ ├── ColorPallete.jsx
│ │ └── TemplatePreview.jsx
│ │
│ └── ui/ # Shared/reusable UI components
│ ├── CreateTemplateModal.jsx
│ ├── Navbar.jsx
│ ├── Sidebar.jsx
│ └── Toolbox.jsx
│
├── context/
│ └── TemplateContext.jsx 
│
├── pages/ 
│ ├── MainSection.jsx
│ ├── PreviewPage.jsx
│ └── SavedTemplates.jsx
│
├── App.jsx 
├── App.css 
├── index.css 
└── main.jsx 

## Instructions to run the project

git clone https://github.com/Shru-03/FormBuilder.git
cd form-template-builder
npm install
npm run dev

## 🪪 License

This project is for evaluation purposes only and not intended for commercial use.

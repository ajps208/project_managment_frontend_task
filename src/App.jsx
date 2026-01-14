import React, { useEffect, useState } from "react";
import { initialProjects } from "./data/Demoproject";
import { Dashboard } from "./components/Dashboard";
import { ProjectForm } from "./components/ProjectForm";
import { ProjectDetails } from "./components/ProjectDetails";
import Header from "./components/Header";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  // Theme (dark / light)
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Load projects from localStorage (if exists) else use demo data
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  // UI control states
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // Create new project
  const handleCreateProject = (project) => {
    setProjects((prev) => [...prev, project]);
    setCurrentView("dashboard");
  };

  // Update existing project
  const handleUpdateProject = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    setSelectedProject(updatedProject);
    setCurrentView("details");
  };

  // Open project details
  const handleProjectClick = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedProject(project);
    setCurrentView("details");
  };

  // Delete a project
  const handleDeleteProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    setCurrentView("dashboard");
  };

  // Go to edit screen
  const handleEditClick = () => {
    setEditingProject(selectedProject);
    setCurrentView("edit");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900"
      }`}
    >
      {/* Top Header */}
      <Header
        currentView={currentView}
        onCreate={() => setCurrentView("create")}
      />

      <main className="max-w-7xl mx-auto px-4 py-4">
        {/* Dashboard */}
        {currentView === "dashboard" && (
          <Dashboard
            projects={projects}
            onProjectClick={handleProjectClick}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {/* Create Project */}
        {currentView === "create" && (
          <ProjectForm
            onSave={handleCreateProject}
            onCancel={() => setCurrentView("dashboard")}
          />
        )}

        {/* Edit Project */}
        {currentView === "edit" && (
          <ProjectForm
            project={editingProject}
            onSave={handleUpdateProject}
            onCancel={() => setCurrentView("details")}
          />
        )}

        {/* Project Details */}
        {currentView === "details" && selectedProject && (
          <ProjectDetails
            project={selectedProject}
            onBack={() => setCurrentView("dashboard")}
            onEdit={handleEditClick}
            onUpdateProject={handleUpdateProject}
          />
        )}
      </main>
    </div>
  );
}

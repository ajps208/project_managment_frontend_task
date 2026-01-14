import {
  Schedule,
  CheckCircle,
  BarChart,
  Assignment,
  Search,
  FilterList,
  Sort,
  Delete,
} from "@mui/icons-material";
import { calculateCompletion, formatDate } from "../helper/helpers";
import { ProjectStatusCard } from "./ProjectStatusCard";
import { useMemo, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const Dashboard = ({ projects, onProjectClick, onDeleteProject }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Filter and sort states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Apply filters and sorting to projects
  const filteredProjects = useMemo(() => {
    // Filter projects based on search and filters
    let filtered = projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;
      const matchesPriority =
        priorityFilter === "All" || project.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });

    // Sort projects
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "dueDate") {
        return new Date(a.endDate) - new Date(b.endDate);
      } else if (sortBy === "priority") {
        const priorityOrder = { High: 0, Medium: 1, Low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

    return filtered;
  }, [projects, searchQuery, statusFilter, priorityFilter, sortBy]);

  // Handle project deletion
  const handleDelete = (e, project) => {
    e.stopPropagation(); 
    if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
      onDeleteProject(project.id);
    }
  };

  // Calculate dashboard statistics
  const totalProjects = projects.length;
  const inProgress = projects.filter((p) => p.status === "In Progress").length;
  const completed = projects.filter((p) => p.status === "Completed").length;
  const totalTasks = projects.reduce((sum, p) => sum + (p.tasks?.length || 0), 0);

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        theme === "dark" ? "text-gray-100" : "text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Project Dashboard</h1>
          <p>Manage and track all your projects in one place</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ProjectStatusCard
            title="Total Projects"
            value={totalProjects}
            icon={BarChart}
            gradient="from-blue-500 to-blue-600"
            iconColor="text-blue-200"
          />
          <ProjectStatusCard
            title="In Progress"
            value={inProgress}
            icon={Schedule}
            gradient="from-amber-500 to-amber-600"
            iconColor="text-amber-200"
          />
          <ProjectStatusCard
            title="Completed"
            value={completed}
            icon={CheckCircle}
            gradient="from-green-500 to-green-600"
            iconColor="text-green-200"
          />
          <ProjectStatusCard
            title="Total Tasks"
            value={totalTasks}
            icon={Assignment}
            gradient="from-purple-500 to-purple-600"
            iconColor="text-purple-200"
          />
        </div>

        {/* Search and Filter Controls */}
        <div className="rounded-xl shadow-lg p-4 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Status Filter Dropdown */}
            <div className="relative">
              <FilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
              >
                <option value="All">All Status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            {/* Priority Filter Dropdown */}
            <div className="relative">
              <FilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
              >
                <option value="All">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <Sort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
              >
                <option value="name">Sort by Name</option>
                <option value="dueDate">Sort by Due Date</option>
                <option value="priority">Sort by Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div
          className={`rounded-xl shadow-lg overflow-hidden transition-colors ${
            isDark ? "bg-gray-900" : "bg-white"
          }`}
        >
          {/* Table Header */}
          <div
            className={`px-6 py-4 border-b transition-colors ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Projects Overview ({filteredProjects.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Column Headers */}
              <thead className={isDark ? "bg-gray-800" : "bg-gray-50"}>
                <tr>
                  {[
                    "Project",
                    "Status",
                    "Priority",
                    "Progress",
                    "Due Date",
                    "Assignees",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Project Rows */}
              <tbody
                className={`divide-y ${
                  isDark ? "divide-gray-700" : "divide-gray-200"
                }`}
              >
                {filteredProjects.length === 0 ? (
                  // Empty state
                  <tr>
                    <td
                      colSpan="7"
                      className={`px-6 py-12 text-center ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      No projects found matching your filters
                    </td>
                  </tr>
                ) : (
                  // Project rows
                  filteredProjects.map((project) => {
                    const completion = calculateCompletion(project.tasks);

                    return (
                      <tr
                        key={project.id}
                        onClick={() => onProjectClick(project.id)}
                        className={`transition-colors cursor-pointer ${
                          isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"
                        }`}
                      >
                        {/* Project Name and Task Count */}
                        <td className="px-6 py-4">
                          <div>
                            <div
                              className={`font-semibold ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {project.name}
                            </div>
                            <div
                              className={`text-sm ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {project.tasks?.length || 0} tasks
                            </div>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              project.status === "Completed"
                                ? "bg-green-500/20 text-green-400"
                                : project.status === "In Progress"
                                ? "bg-blue-500/20 text-blue-400"
                                : project.status === "On Hold"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {project.status}
                          </span>
                        </td>

                        {/* Priority Badge */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              project.priority === "High"
                                ? "bg-red-500/20 text-red-400"
                                : project.priority === "Medium"
                                ? "bg-amber-500/20 text-amber-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {project.priority}
                          </span>
                        </td>

                        {/* Progress Bar */}
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`flex-1 rounded-full h-2 overflow-hidden ${
                                isDark ? "bg-gray-700" : "bg-gray-200"
                              }`}
                            >
                              <div
                                className={`h-full rounded-full transition-all ${
                                  completion === 100
                                    ? "bg-green-500"
                                    : completion >= 50
                                    ? "bg-blue-500"
                                    : "bg-amber-500"
                                }`}
                                style={{ width: `${completion}%` }}
                              />
                            </div>
                            <span
                              className={`text-sm font-medium w-12 ${
                                isDark ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              {completion}%
                            </span>
                          </div>
                        </td>

                        {/* Due Date */}
                        <td
                          className={`px-6 py-4 text-sm ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {formatDate(project.endDate)}
                        </td>

                        {/* Team Assignees Avatars */}
                        <td className="px-6 py-4">
                          <div className="flex -space-x-2">
                            {project.assignees
                              .slice(0, 3)
                              .map((assignee, idx) => (
                                <div
                                  key={idx}
                                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-medium ring-2"
                                  title={assignee}
                                >
                                  {assignee
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                              ))}
                            {project.assignees.length > 3 && (
                              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-200 text-xs font-medium ring-2">
                                +{project.assignees.length - 3}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Delete Button */}
                        <td className="px-6 py-4">
                          <button
                            onClick={(e) => handleDelete(e, project)}
                            className={`p-2 rounded-lg transition ${
                              isDark
                                ? "text-red-400 hover:bg-red-500/20"
                                : "text-red-600 hover:bg-red-50"
                            }`}
                          >
                            <Delete />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
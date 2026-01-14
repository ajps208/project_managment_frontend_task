import { useState } from "react";
import {
  calculateCompletion,
  formatDate,
  generateId,
  updateProjectStatusByTasks,
} from "../helper/helpers";
import {
  CalendarToday,
  People,
  Add,
  Edit,
  Delete,
  Warning,
  Assignment,
  Notifications,
} from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";

export const ProjectDetails = ({
  project,
  onBack,
  onEdit,
  onUpdateProject,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Task form visibility state
  const [showTaskForm, setShowTaskForm] = useState(false);

  // New task form data
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    assignee: "",
    status: "Todo",
  });

  // Calculate project completion percentage
  const completion = calculateCompletion(project.tasks);

  // Add new task to project
  const addTask = () => {
    if (newTask.name && newTask.assignee) {
      const updatedProject = updateProjectStatusByTasks({
        ...project,
        tasks: [...project.tasks, { ...newTask, id: generateId() }],
      });
      onUpdateProject(updatedProject);
      // Reset form
      setNewTask({ name: "", description: "", assignee: "", status: "Todo" });
      setShowTaskForm(false);
    }
  };

  // Update status of existing task
  const updateTaskStatus = (taskId, newStatus) => {
    const updatedProject = updateProjectStatusByTasks({
      ...project,
      tasks: project.tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      ),
    });
    onUpdateProject(updatedProject);
  };

  // Delete task from project
  const deleteTask = (taskId) => {
    const updatedProject = updateProjectStatusByTasks({
      ...project,
      tasks: project.tasks.filter((t) => t.id !== taskId),
    });
    onUpdateProject(updatedProject);
  };

  // Filter and sort upcoming reminders
  const upcomingReminders = project.reminders
    .filter((r) => new Date(r.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="space-y-6">
      {/* Header with Back and Edit buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className={`font-medium transition ${
            isDark
              ? "text-gray-300 hover:text-white"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          ← Back to Dashboard
        </button>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit style={{ fontSize: 16 }} />
          Edit Project
        </button>
      </div>

      {/* Project Overview Card */}
      <div
        className={`rounded-xl shadow-lg p-6 transition ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Project Name and Status Badges */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1
              className={`text-3xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              {project.name}
            </h1>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <div className="flex gap-2">
            {/* Status Badge */}
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                project.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : project.status === "In Progress"
                  ? "bg-blue-100 text-blue-800"
                  : project.status === "On Hold"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {project.status}
            </span>
            {/* Priority Badge */}
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                project.priority === "High"
                  ? "bg-red-100 text-red-800"
                  : project.priority === "Medium"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {project.priority}
            </span>
          </div>
        </div>

        {/* Project Metadata (Dates and Manager) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Start Date */}
          <div className="flex items-center gap-3">
            <CalendarToday className="text-gray-400" />
            <div>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Start Date
              </p>
              <p
                className={`font-semibold ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {formatDate(project.startDate)}
              </p>
            </div>
          </div>

          {/* Due Date */}
          <div className="flex items-center gap-3">
            <CalendarToday className="text-gray-400" />
            <div>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Due Date
              </p>
              <p
                className={`font-semibold ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {formatDate(project.endDate)}
              </p>
            </div>
          </div>

          {/* Project Manager */}
          <div className="flex items-center gap-3">
            <People className="text-gray-400" />
            <div>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Project Manager
              </p>
              <p
                className={`font-semibold ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {project.manager}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-sm font-semibold ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Overall Progress
            </span>
            <span
              className={`text-sm font-bold ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              {completion}%
            </span>
          </div>
          <div
            className={`w-full rounded-full h-3 ${
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
        </div>

        {/* Team Members List */}
        <div>
          <p className="text-sm font-semibold mb-3">Team Members</p>
          <div className="flex flex-wrap gap-2">
            {project.assignees.map((assignee, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                  isDark ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                {/* Avatar with initials */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                  {assignee
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {assignee}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div
        className={`rounded-xl shadow-lg p-6 ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Tasks Header with Add Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${isDark ? "text-white" : ""}`}>
            Tasks ({project.tasks.length})
          </h2>
          <button
            onClick={() => setShowTaskForm(!showTaskForm)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Add style={{ fontSize: 16 }} />
            Add Task
          </button>
        </div>

        {/* Add Task Form */}
        {showTaskForm && (
          <div
            className={`mb-6 p-4 rounded-lg space-y-3 ${
              isDark ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            {/* Task Name Input */}
            <input
              type="text"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              placeholder="Task name"
              className={`w-full px-4 py-2 rounded-lg outline-none transition ${
                isDark
                  ? "bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border border-gray-300 text-gray-900"
              }`}
            />

            {/* Task Description Input */}
            <input
              type="text"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder="Task description"
              className={`w-full px-4 py-2 rounded-lg outline-none transition ${
                isDark
                  ? "bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border border-gray-300 text-gray-900"
              }`}
            />

            {/* Assignee and Status Dropdowns */}
            <div className="flex gap-3">
              {/* Assignee Selector */}
              <select
                value={newTask.assignee}
                onChange={(e) =>
                  setNewTask({ ...newTask, assignee: e.target.value })
                }
                className={`w-full px-4 py-2 rounded-lg outline-none transition ${
                  isDark
                    ? "bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border border-gray-300 text-gray-900"
                }`}
              >
                <option value="">Select assignee</option>
                {project.assignees.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>

              {/* Status Selector */}
              <select
                value={newTask.status}
                onChange={(e) =>
                  setNewTask({ ...newTask, status: e.target.value })
                }
                className={`w-full px-4 py-2 rounded-lg outline-none transition ${
                  isDark
                    ? "bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border border-gray-300 text-gray-900"
                }`}
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            {/* Form Action Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowTaskForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        )}

        {/* Tasks List or Empty State */}
        {project.tasks.length === 0 ? (
          // Empty state when no tasks
          <div className="text-center py-12">
            <Assignment
              className="text-gray-300 mx-auto mb-4"
              style={{ fontSize: 64 }}
            />
            <p className="text-gray-500">
              No tasks yet. Add your first task to get started.
            </p>
          </div>
        ) : (
          // Tasks List
          <div className="space-y-3">
            {project.tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-lg transition ${
                  isDark
                    ? "border border-gray-700 hover:border-gray-600 bg-gray-900"
                    : "border border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                {/* Task Information */}
                <div className="flex-1">
                  {/* Task Name and Status Badge */}
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {task.name}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === "Done"
                          ? "bg-green-100 text-green-800"
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  {/* Task Description */}
                  <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                    {task.description}
                  </p>

                  {/* Task Assignee */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                      {task.assignee
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="text-sm text-gray-600">
                      {task.assignee}
                    </span>
                  </div>
                </div>

                {/* Task Actions (Status Update and Delete) */}
                <div className="flex items-center gap-2">
                  {/* Status Dropdown */}
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                    className={`px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? "border border-gray-700 hover:border-gray-600 bg-gray-900"
                        : "border border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Delete style={{ fontSize: 16 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reminders Section */}
      <div
        className={`rounded-xl shadow-lg p-6 ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Reminders Header */}
        <div className="flex items-center gap-2 mb-6">
          <Notifications className="text-purple-600" />
          <h2 className="text-xl font-bold">
            Reminders ({project.reminders.length})
          </h2>
        </div>

        {/* Reminders List or Empty State */}
        {project.reminders.length === 0 ? (
          // Empty state when no reminders
          <div className="text-center py-12">
            <Notifications
              className="text-gray-300 mx-auto mb-4"
              style={{ fontSize: 64 }}
            />
            <p className="text-gray-500">No reminders set for this project.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Upcoming Reminders */}
            {upcomingReminders.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Upcoming
                </h3>
                {upcomingReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className={`flex items-center gap-3 p-4 rounded-lg ${
                      isDark
                        ? "bg-purple-500/10 border border-purple-500/30"
                        : "bg-purple-50 border-purple-200"
                    }`}
                  >
                    <Warning className="text-purple-600" />
                    <div className="flex-1">
                      <p
                        className={`font-semibold${
                          isDark ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {reminder.description}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(reminder.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Past Reminders */}
            {project.reminders.filter((r) => new Date(r.date) < new Date())
              .length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Past
                </h3>
                {project.reminders
                  .filter((r) => new Date(r.date) < new Date())
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`flex items-center gap-3 p-4 rounded-lg ${
                        isDark
                          ? "bg-purple-500/10 border border-purple-500/30"
                          : "bg-purple-50 border-purple-200"
                      }`}
                    >
                      <Notifications className="text-gray-400" />
                      <div className="flex-1">
                        <p
                          className={`font-medium ${
                            isDark ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {reminder.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(reminder.date)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
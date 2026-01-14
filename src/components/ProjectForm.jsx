import { useState } from "react";
import { formatDate, generateId } from "../helper/helpers";

import {
  Dashboard as DashboardIcon,
  Add,
  Close,
  Delete,
  Notifications,
} from "@mui/icons-material";
import { Users } from "../data/users";
import { useTheme } from "../context/ThemeContext";

export const ProjectForm = ({ project, onSave, onCancel }) => {
  // Get current theme
  const { theme } = useTheme();
  const isDark = theme === "dark";
  //   state for form
  const [formData, setFormData] = useState(
    project || {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "Planned",
      priority: "Medium",
      manager: "",
      assignees: [],
      tasks: [],
      reminders: [],
    }
  );

  const [errors, setErrors] = useState({});
  const [newAssignee, setNewAssignee] = useState("");
  const [newReminder, setNewReminder] = useState({ date: "", description: "" });

  //   form validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Project name is required";
    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.endDate) <= new Date(formData.startDate)
    ) {
      newErrors.endDate = "End date must be after start date";
    }
    if (formData.assignees.length === 0)
      newErrors.assignees =
        "At least one assignee is required, (please select assignee and click add button)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  //   handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({ ...formData, id: formData.id || generateId() });
    }
  };
  // add assignee
  const addAssignee = () => {
    if (newAssignee && !formData.assignees.includes(newAssignee)) {
      setFormData({
        ...formData,
        assignees: [...formData.assignees, newAssignee],
      });
      setNewAssignee("");
    }
  };

  //   remove assignee
  const removeAssignee = (assignee) => {
    setFormData({
      ...formData,
      assignees: formData.assignees.filter((a) => a !== assignee),
    });
  };

  //   add reminder
  const addReminder = () => {
    if (newReminder.date && newReminder.description) {
      setFormData({
        ...formData,
        reminders: [
          ...formData.reminders,
          { ...newReminder, id: generateId() },
        ],
      });
      setNewReminder({ date: "", description: "" });
    }
  };

  //   remove reminder
  const removeReminder = (id) => {
    setFormData({
      ...formData,
      reminders: formData.reminders.filter((r) => r.id !== id),
    });
  };

  return (
    <div
      className={`rounded-xl shadow-lg p-6 transition-colors
    ${isDark ? "bg-gray-900" : "bg-white"}
  `}
    >
      <h2
        className={`text-2xl font-bold mb-6
      ${isDark ? "text-white" : "text-gray-800"}
    `}
      >
        {project ? "Edit Project" : "Create New Project"}
      </h2>

      {/* form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* project name */}
          <div className="md:col-span-2">
            <label
              className={`block text-sm font-semibold mb-2
            ${isDark ? "text-gray-300" : "text-gray-700"}
          `}
            >
              Project Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-lg outline-none transition
            ${
              isDark
                ? "bg-gray-800 text-white border border-gray-700 placeholder-gray-400"
                : "bg-white text-gray-900 border border-gray-300"
            }
            ${errors.name ? "border-red-500" : ""}
          `}
              placeholder="Enter project name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          {/* project description */}
          <div className="md:col-span-2">
            <label
              className={`block text-sm font-semibold mb-2
            ${isDark ? "text-gray-300" : "text-gray-700"}
          `}
            >
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="3"
              className={`w-full px-4 py-2 rounded-lg outline-none transition
            ${
              isDark
                ? "bg-gray-800 text-white border border-gray-700 placeholder-gray-400"
                : "bg-white text-gray-900 border border-gray-300 placeholder-gray-400"
            }
          `}
              placeholder="Project description"
            />
          </div>
          {/* start date */}
          <div>
            <label
              className={`block text-sm font-semibold mb-2
            ${isDark ? "text-gray-300" : "text-gray-700"}
          `}
            >
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-lg 
            ${
              isDark
                ? "bg-gray-800 text-white border border-gray-700"
                : "bg-white border border-gray-300"
            }
          `}
            />
          </div>
          {/* end date */}
          <div>
            <label
              className={`block text-sm font-semibold mb-2
            ${isDark ? "text-gray-300" : "text-gray-700"}
          `}
            >
              End Date *
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-lg
            ${
              isDark
                ? "bg-gray-800 text-white border border-gray-700"
                : "bg-white border border-gray-300"
            }
            ${errors.endDate ? "border-red-500" : ""}
          `}
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
            )}
          </div>
          {/* status */}
          <div>
            <label
              className={`block text-sm font-semibold mb-2
            ${isDark ? "text-gray-300" : "text-gray-700"}
          `}
            >
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-lg
              ${
                isDark
                  ? "bg-gray-800 text-white border border-gray-700"
                  : "bg-white border border-gray-300"
              }
          `}
            >
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          {/* priority */}
          <div>
            <label
              className={`block text-sm font-semibold mb-2
            ${isDark ? "text-gray-300" : "text-gray-700"}
          `}
            >
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              className={`w-full px-4 py-2 rounded-lg
              ${
                isDark
                  ? "bg-gray-800 text-white border border-gray-700"
                  : "bg-white border border-gray-300"
              }
          `}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          {/* project manager */}
          <div className="md:col-span-2">
            <label
              className={`block text-sm font-semibold mb-2
            ${isDark ? "text-gray-300" : "text-gray-700"}
          `}
            >
              Project Manager
            </label>
            <select
              value={formData.manager}
              onChange={(e) =>
                setFormData({ ...formData, manager: e.target.value })
              }
              className={`w-full px-4 py-2  rounded-lg 
                           ${
                             isDark
                               ? "bg-gray-800 text-white border border-gray-700"
                               : "bg-white border border-gray-300"
                           }`}
            >
              <option value="">Select manager</option>
              {Users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          {/* assignees */}
          <div className="md:col-span-2">
            <label
              className={`block text-sm font-semibold mb-2
            ${isDark ? "text-gray-300" : "text-gray-700"}
          `}
            >
              Assignees *
            </label>
            <div className="flex gap-2 mb-3">
              <select
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
                className={`w-full px-4 py-2  rounded-lg 
                           ${
                             isDark
                               ? "bg-gray-800 text-white border border-gray-700"
                               : "bg-white border border-gray-300"
                           }`}
              >
                <option value="">Select assignee</option>
                {Users.filter((u) => !formData.assignees.includes(u)).map(
                  (user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  )
                )}
              </select>
              <button
                type="button"
                onClick={addAssignee}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Add />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.assignees.map((assignee) => (
                <span
                  key={assignee}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {assignee}
                  <button
                    type="button"
                    onClick={() => removeAssignee(assignee)}
                    className="hover:text-blue-900"
                  >
                    <Close style={{ fontSize: 16 }} />
                  </button>
                </span>
              ))}
            </div>
            {errors.assignees && (
              <p className="mt-2 text-sm text-red-600">{errors.assignees}</p>
            )}
          </div>
          {/* reminders */}
          <div className="md:col-span-2">
            <label
              className={`block text-sm font-semibold mb-2
            ${isDark ? "text-gray-300" : "text-gray-700"}
          `}
            >
              Reminders
            </label>
            <div className="space-y-3 mb-3">
              <div className="flex gap-2">
                <input
                  type="date"
                  value={newReminder.date}
                  onChange={(e) =>
                    setNewReminder({ ...newReminder, date: e.target.value })
                  }
                  className={`flex-1 px-4 py-2 rounded-lg focus:ring-2
                    ${
                      isDark
                        ? "bg-gray-800 text-white border border-gray-700"
                        : "bg-white border border-gray-300"
                    } `}
                />
                <input
                  type="text"
                  value={newReminder.description}
                  onChange={(e) =>
                    setNewReminder({
                      ...newReminder,
                      description: e.target.value,
                    })
                  }
                  placeholder="Reminder description"
                  className={`flex-1 px-4 py-2 rounded-lg focus:ring-2
                    ${
                      isDark
                        ? "bg-gray-800 text-white border border-gray-700"
                        : "bg-white border border-gray-300"
                    } `}
                />
                <button
                  type="button"
                  onClick={addReminder}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Add />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {formData.reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition
            ${
              isDark
                ? "bg-gray-900 border-gray-700"
                : "bg-purple-50 border-purple-200"
            }
          `}
                >
                  <div className="flex items-center gap-3">
                    <Notifications
                      className="text-purple-600"
                      style={{ fontSize: 16 }}
                    />
                    <span
                      className={`text-sm font-medium
                ${isDark ? "text-gray-200" : "text-gray-700"}
              `}
                    >
                      {formatDate(reminder.date)}
                    </span>
                    <span
                      className={`text-sm font-medium
                ${isDark ? "text-gray-400" : "text-gray-600"}
              `}
                    >
                      {reminder.description}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeReminder(reminder.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Delete style={{ fontSize: 16 }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          {/* cancel */}
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          {/* submit */}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {project ? "Update Project" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

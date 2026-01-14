export const initialProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website",
    startDate: "2025-01-01",
    endDate: "2025-03-15",
    status: "In Progress",
    priority: "High",
    manager: "John Doe",
    assignees: ["John Doe", "Jane Smith", "Mike Johnson"],
    tasks: [
      { id: "t1", name: "Design UI", assignee: "Jane Smith", status: "Done" },
      { id: "t2", name: "Frontend", assignee: "Mike Johnson", status: "In Progress" },
    ],
    reminders: [{ id: "r1", date: "2025-01-20", description: "Design Review" }],
  },
  
   {
    id: "2",
    name: "Mobile Redesign",
    description: "Complete overhaul of company website",
    startDate: "2025-01-01",
    endDate: "2025-03-17",
    status: "In Progress",
    priority: "Low",
    manager: "John Doe",
    assignees: ["John Doe", "Jane Smith", "Mike Johnson"],
    tasks: [
      { id: "t1", name: "Design UI", assignee: "Jane Smith", status: "Done" },
      { id: "t2", name: "Frontend", assignee: "Mike Johnson", status: "In Progress" },
    ],
    reminders: [{ id: "r1", date: "2025-01-20", description: "Design Review" }],
  },
];

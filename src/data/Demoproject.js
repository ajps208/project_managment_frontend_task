export const initialProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website",
    startDate: "2025-01-01",
    endDate: "2025-03-15",
    status: "In Progress",
    priority: "High",
    manager: "Lionel Messi",
    assignees: ["Cristiano Ronaldo", "Virat Kohli", "Roger federer"],
    tasks: [
      { id: "t1", name: "Design UI", assignee: "Cristiano Ronaldo", status: "Done" },
      { id: "t2", name: "Frontend", assignee: "Virat Kohli", status: "In Progress" },
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
    manager: "Roger federer",
    assignees: ["Lionel Messi", "Cristiano Ronaldo", "Rohit Sharma"],
    tasks: [
      { id: "t1", name: "Design UI", assignee: "Lionel Messi", status: "Done" },
      { id: "t2", name: "Frontend", assignee: "Rohit Sharma", status: "In Progress" },
    ],
    reminders: [{ id: "r1", date: "2025-01-20", description: "Design Review" }],
  },
];

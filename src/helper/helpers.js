// generate random id
export const generateId = () => Math.random().toString(36).substr(2, 9);

// calculate completion
export const calculateCompletion = (tasks) => {
  if (!tasks || tasks.length === 0) return 0;
  const completed = tasks.filter((t) => t.status === "Done").length;
  return Math.round((completed / tasks.length) * 100);
};

// format date - month day, year
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// update project status
export const updateProjectStatusByTasks = (project) => {
  if (!project.tasks || project.tasks.length === 0) return project;

  const allDone = project.tasks.every((t) => t.status === "Done");

  return {
    ...project,
    status: allDone ? "Completed" : "In Progress",
  };
};

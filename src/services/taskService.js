/**
 * Persistence layer.
 *
 * Everything the UI needs from a backend lives behind these two functions.
 * To use a REST API instead of localStorage, replace the bodies with
 * fetch() calls (e.g. GET /api/tasks) – no component needs to change.
 */
const STORAGE_KEY = 'weekly-todo:tasks:v1';

export const loadTasks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    /* storage full or unavailable – app keeps working in memory */
  }
};

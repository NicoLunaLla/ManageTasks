// Utilidades para manejo de fechas
export const formatDateToISO = (dateString) => {
  if (!dateString) return new Date().toISOString();
  return new Date(dateString).toISOString();
};

export const getDateOnly = (dateString) => {
  if (!dateString) return null;
  return dateString.split('T')[0];
};

export const isDateToday = (dateString) => {
  if (!dateString) return false;
  const today = new Date().toISOString().split('T')[0];
  return getDateOnly(dateString) === today;
};

export const isDatePast = (dateString) => {
  if (!dateString) return false;
  const today = new Date().toISOString().split('T')[0];
  return getDateOnly(dateString) < today;
};


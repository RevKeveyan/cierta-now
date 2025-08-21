// src/hooks/useFormEdit.js
import { useState } from "react";

export const useFormEdit = () => {
  const [editId, setEditId] = useState(null);       // ID редактируемого элемента
  const [editData, setEditData] = useState(null);   // Данные, которые подставим в форму

  // Запуск режима редактирования
  const startEdit = (id, data) => {
    setEditId(id);
    setEditData(data);
  };

  // Выход из режима редактирования
  const cancelEdit = () => {
    setEditId(null);
    setEditData(null);
  };

  return {
    editId,
    editData,
    startEdit,
    cancelEdit,
  };
};

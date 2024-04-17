import { createContext, useEffect, useState } from 'react';
import authAxios from '../api/authAxios';
import { API_URL } from '../config';
import { useQuery } from '@tanstack/react-query';

export const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [selectedNote, setSelectedNote] = useState(null);

  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const filter = JSON.stringify({ isArchived: false })
      const { data } = await authAxios.get(`${API_URL}/notes?limit=1000&filter=${filter}`)
      return data.results;
    },
  });

  useEffect(() => {
    if (Array.isArray(notes) && notes.length > 0) {
      setSelectedNote(notes[0])
    }
  }, [notes])


  const value = {
    notes,
    selectedNote,
    setSelectedNote
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

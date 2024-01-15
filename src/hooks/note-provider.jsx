import { createContext, useState } from 'react';
import authAxios from '../api/authAxios';
import { API_URL } from '../config';
import { useQuery } from '@tanstack/react-query';

export const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [selectedNote, setSelectedNote] = useState(null);

  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data } = await authAxios.get(`${API_URL}/notes?limit=1000`)
      return data.results;
    },
  });


  const value = {
    notes,
    selectedNote,
    setSelectedNote
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

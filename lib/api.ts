import { Note } from "@/types/note";
import axios from "axios";

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

const api = axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
});


export const fetchNotes = async (page: number, search?: string): Promise<FetchNotesResponse> => {
    const { data } = await api.get<FetchNotesResponse>('/notes', {
        params: {
            page,
            perPage: 12,
            ...(search && {search}),
        }
    });
    return data;
};

export const createNote = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
    const {data} = await api.post<Note>('/notes', note);
    return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const {data}= await api.delete<Note>(`/notes/${id}`);
    return data;
};

export const getSingleNote = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};
'use client';

import { getSingleNote } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();

    const { data: note, isLoading, error } = useQuery({
        queryKey: ['note', id],
        queryFn: () => getSingleNote(id!),
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error || !note) return <p>Something went wrong.</p>
    
    return (
        <div>
    <h2>{note.title}</h2>
    <p>{note.content}</p>
    <p>{note.tag}</p>
    <p>{note.updatedAt || note.createdAt}</p>
  </div>
    )
}

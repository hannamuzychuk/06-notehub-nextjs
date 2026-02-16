"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from '../notes.module.css'
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error) return <p>Something went wrong.</p>;


  return (
        <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onChange={handleSearchChange} />
      </header>

      {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
};

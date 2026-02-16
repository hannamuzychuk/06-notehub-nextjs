"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes, type FetchNotesResponse } from '../../lib/api';
import css from './notes.module.css';
import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import NoteForm from '../../components/NoteForm/NoteForm';
import { useDebouncedCallback } from "use-debounce";
import Modal from "@/components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";
import { Toaster } from "react-hot-toast";
import { ErrorMessage } from "formik";
import Loader from '../loading';



export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
    
    const debouncedSearch = useDebouncedCallback((value: string) => {
        setSearch(value);
        setPage(1);
    }, 300);
    
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
    setSearchInput(value);
    debouncedSearch(value);
    };

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, search],
      queryFn: () => fetchNotes(page, search),
     placeholderData: keepPreviousData,
  });
    
  return (
    <div className={css.app}>
          <header className={css.toolbar}>
              
              <SearchBox value={searchInput} onChange={handleSearchChange} />
              {<Toaster position='top-right' />}
              {isLoading && <Loader />}
              {isError && <ErrorMessage name={""}/>} 
              
          {data && data.totalPages > 1 && (
          <Pagination pageCount={data.totalPages}
           currentPage={page} onPageChange={setPage} />
            )}
              
              <button className={css.button} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
      </header>

      {data && (data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : search ? (
          <p>No notes found for {search}</p>    
        ) : (
          <p>Loading notes...</p>
    ))}

      {isOpen && (
        <Modal onClose={()=> setIsOpen(false)}>
          <NoteForm onClose={()=> setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
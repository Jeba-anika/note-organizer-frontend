/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetNoteOfSelectedCategoryQuery } from "../redux/features/note/noteApi";
import Loader from "./Loader";
import NoteCard from "./NoteCard";
import TextEditor from "./TextEditor";
import { AiOutlinePlus } from "react-icons/ai";
import './EachCategoryNotes.css'



interface EachCategoryNotesProps {
    category: any
    selectedNote: any;
    setSelectedNote: any;
}
const EachCategoryNotes: React.FC<EachCategoryNotesProps> = ({ category, selectedNote, setSelectedNote }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const { data: notes, refetch, isLoading } = useGetNoteOfSelectedCategoryQuery({ categoryId: category.id, page: currentPage }, { refetchOnMountOrArgChange: true })
    //const [selectedNote, setSelectedNote] = useState({})
    const lastModiefiedDate = new Date(selectedNote.updatedAt)
    const [showEditor, setShowEditor] = useState(false)
    const [title, setTitle] = useState('')


    const getPreviousNotes = () => {
        setCurrentPage(currentPage - 1)
    }

    const getNextNotes = () => {
        setCurrentPage(currentPage + 1)
    }

    const isNoteChanged = () => {
        refetch()
        setTitle('')
    }

    return (
        <>
            {
                notes ?
                    <div className="drawer lg:drawer-open ">
                        <input id="each-category-drawer" type="checkbox" className="drawer-toggle" />

                        <div className="drawer-content">
                            {/* Page content here */}
                            {
                                category.id && <div className="flex justify-center">
                                    <label htmlFor="each-category-drawer" className="add-note btn btn-primary drawer-button mb-4">Click to Add Note or See Notes</label>
                                </div>
                            }

                            <div className=" border border-sky-700 rounded-e-lg">
                                {
                                    showEditor ?
                                        <div className="min-h-screen">
                                            {
                                                selectedNote.title ? <>
                                                    <h2 className="text-4xl font-bold p-4 ">{selectedNote.title}</h2>
                                                    <p className="px-4 pb-6">Last Modified: {lastModiefiedDate.toString()}</p></> :
                                                    <>
                                                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Type Title" className="input input-bordered w-full max-w-xs m-4" />
                                                    </>
                                            }
                                            {/* <hr /> */}

                                            <div className="min-h-full">
                                                <TextEditor selectedNote={selectedNote} setSelectedNote={setSelectedNote} selectedCategory={category.id} title={title} isNoteChanged={isNoteChanged} />
                                            </div>

                                        </div> :
                                        <div className="flex justify-center items-center h-full"><p>Add Note or Select Note</p></div>
                                }
                            </div>
                        </div>
                        <div className="drawer-side  ">
                            <label htmlFor="each-category-drawer" className="drawer-overlay"></label>
                            <ul style={{ flexWrap: 'nowrap' }} className="menu  p-4 w-80 h-full bg-sky-400 text-base-content">
                                {/* Sidebar content here */}
                                <div className=" px-6 py-4 rounded-lg mb-5 flex justify-start items-center text-2xl"><p className="font-bold">{category.categoryName}</p></div>
                                <button onClick={() => {
                                    setShowEditor(true)
                                    setSelectedNote({})
                                }} className="bg-base-200 px-6 py-4 rounded-lg mb-5 hover:bg-sky-200 font-bold flex justify-start items-center gap-2"><AiOutlinePlus></AiOutlinePlus>Add New Note</button>

                                <div className="flex justify-center mb-6">
                                    <div className="join grid grid-cols-2">
                                        <button disabled={currentPage === 1} onClick={
                                            getPreviousNotes
                                        } className="join-item btn btn-outline">Previous page</button>
                                        <button onClick={getNextNotes} className="join-item btn btn-outline">Next</button>
                                    </div>
                                </div>
                                {isLoading ? <div><Loader /></div> : <div className="flex flex-col">{notes?.data?.map((note: any) => <li onClick={() => {
                                    setShowEditor(true)
                                    setSelectedNote(note)
                                }} className="mb-3"><NoteCard note={note} isNoteChanged={isNoteChanged} /></li>)}</div>
                                }
                            </ul>

                        </div>
                    </div>

                    :
                    <div className="w-full flex justify-center items-center">
                        <Loader />
                    </div>
            }
        </>
    );
};

export default EachCategoryNotes;
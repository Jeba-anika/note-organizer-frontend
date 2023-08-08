import React from 'react';
import { useDeleteNoteMutation } from '../redux/features/note/noteApi';

const NoteCard = ({ note, isNoteChanged }) => {
    const createdAt = new Date(note.createdAt)
    const date = `${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`
    const [deleteNote] = useDeleteNoteMutation()

    const handleDeleteNote = async () => {
        const result = await deleteNote(note.id)
        if (result?.data?.statusCode === 200) {
            alert('deleted')
            isNoteChanged()
        }
    }

    return (
        <div className="card  bg-base-100 shadow-xl">
            <div className="card-body">
                <p>Created At: {date}</p>
                <h2 className="card-title">{note.title}</h2>
                <div className="card-actions justify-end">
                    <button onClick={handleDeleteNote} className=" border border-red-500 p-2 rounded hover:bg-red-500 hover:text-white font-bold">Delete Note</button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
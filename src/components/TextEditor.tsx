import ReactQuill from 'react-quill';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css'
import { useSaveNoteMutation, useUpdateNoteMutation } from '../redux/features/note/noteApi';
import { useAppSelector } from '../redux/hook';
import { toast } from 'react-toastify';


const TextEditor = ({ selectedNote, setSelectedNote, selectedCategory, title, isNoteChanged }) => {
    const [text, setText] = useState(selectedNote.note)
    useEffect(() => {
        setText(selectedNote.note)
    }, [selectedNote.note])


    const [saveNote] = useSaveNoteMutation()
    const [editNote] = useUpdateNoteMutation()
    const { id } = useAppSelector(state => state.user)
    const handleSaveNote = async () => {
        console.log(selectedNote)
        const payload = {
            title: selectedNote?.title ? selectedNote?.title : title,
            note: text,
            category: selectedNote.category ? selectedNote.category.id : selectedCategory,
            user: id
        }
        if (selectedNote.id) {
            const result = await editNote({ id: selectedNote.id, data: payload })
            if (result?.data.statusCode === 200) {
                toast("Note Updated")
                isNoteChanged()

            }
        } else {
            const result = await saveNote(payload)
            if (result.data.statusCode === 200) {
                toast('Note Saved')
                isNoteChanged()
                setSelectedNote(result.data.data)
            }
        }

    }





    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': ["red", "green", "blue", "orange", "violet"] }, { 'background': ["red", "green", "blue", "orange", "violet"] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                       // remove formatting button,
        ['link', 'image']
    ];

    const module = {
        toolbar: toolbarOptions
    }

    return (
        <div className='min-h-full'>
            {text && <div className='flex justify-end me-4 mb-4'><button onClick={handleSaveNote} className='border border-sky-400 hover:bg-sky-400 px-4 py-1 rounded'>Save</button></div>}
            <ReactQuill
                theme='snow'
                modules={module}
                value={text}
                onChange={setText}
                onBlur={handleSaveNote}

            //formats={formats}
            />
        </div>
    );
};

export default TextEditor;
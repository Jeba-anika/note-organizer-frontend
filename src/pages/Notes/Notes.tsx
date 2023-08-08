/* eslint-disable @typescript-eslint/no-explicit-any */
import EachCategoryNotes from "../../components/EachCategoryNotes";
import Loader from "../../components/Loader";
import { useGetCategoryQuery } from "../../redux/features/note/noteApi";
import { useAppSelector } from "../../redux/hook";
import { useState } from 'react'
import './Notes.css'

const Notes = () => {
    const [selectedCategory, setSelectedCategory] = useState<any>({})
    const { data: category } = useGetCategoryQuery(undefined, { refetchOnMountOrArgChange: true })
    const { email } = useAppSelector(state => state.user)
    const [selectedNote, setSelectedNote] = useState({})

    return (
        <>
            {
                category ? <div className={`drawer lg:drawer-open`}>
                    <input id="category-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        {/* Page content here */}
                        <div className="flex justify-center">
                            <label htmlFor="category-drawer" className="category-drawer btn btn-primary drawer-button mb-4">Click to select category</label>
                        </div>

                        {selectedCategory?.id ? <EachCategoryNotes category={selectedCategory} selectedNote={selectedNote} setSelectedNote={setSelectedNote} /> : <div>Select Category</div>}
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="category-drawer" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 h-full bg-sky-200 text-base-content">
                            {/* Sidebar content here */}
                            <div className="bg-base-200 px-6 py-4 rounded-lg mb-5 flex justify-center items-center"><p className="font-bold">{email}</p></div>
                            {
                                category?.data.map((category: any) => <li className="mb-2"><button className="btn" onClick={() => {
                                    setSelectedCategory(category)
                                    setSelectedNote({})
                                }}>{category.categoryName}</button></li>)
                            }
                        </ul>

                    </div>
                </div> : <div className="w-full flex justify-center items-center">
                    <Loader />
                </div>
            }
        </>
    );
};

export default Notes;
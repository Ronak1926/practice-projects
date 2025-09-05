import { useState,useEffect } from 'react'

function App() {
  // form state
  const [formDetails, setFormDetails] = useState({
    bookmark_name: "",
    bookmark_url: ""
  });

  // list of saved bookmarks (initialize from localStorage safely)
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem("bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse bookmarks from localStorage:", e);
      return [];
    }
  });// this value should be in the useState because we want the localStorage data first if it exist but instead of this if we use useEffect then we are in the react strict mode and the useEffect will be called twice, and setState is asyncronous so before setState changes the data after reading from the localStorage the write data from the other useEffect will be called and localStorage stays empty so data from localStorage will be lost.

  useEffect(() =>{
    try {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } catch (e) {
      console.error("Failed to save bookmarks to localStorage:", e);
    }
  },[bookmarks]) 

  const handleDeleteBookmark = (index) => {
    setBookmarks(prev => prev.filter((_, i) => i !== index));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formDetails.bookmark_name || !formDetails.bookmark_url) {
      alert("Please fill in both fields");
      return;
    }

    // add to bookmarks list
    setBookmarks(prev => [...prev, formDetails]);

    // reset form
    setFormDetails({ bookmark_name: "", bookmark_url: "" });
  };

  return (
    <div className='flex justify-center text-[#333] items-center bg-white h-screen flex-col gap-5'>
      <div className='min-w-96 bg-slate-200 p-5 rounded-xl min-h-56'>
        <h1 className='text-2xl text-center text-green-600 mb-3'>Bookmark Saver</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Bookmark Name"
          name="bookmark_name"
          value={formDetails.bookmark_name}
          onChange={handleChange}
          className="p-2 rounded"
        />

        <input
          type="url"
          placeholder="Bookmark URL"
          name="bookmark_url"
          value={formDetails.bookmark_url}
          onChange={handleChange}
          className="p-2 rounded"
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all hover:scale-[1.02]">
          Add Bookmark
        </button>
      </form>

      <div>
        <h2 className='text-xl py-2'>Saved Bookmarks</h2>
        {bookmarks.length === 0 ? (
          <p className='text-lg py-1'>No bookmarks saved yet.</p>
        ) : (
          bookmarks.map((bookmark, index) => (
            <div key={index} className='flex justify-between bg-white p-2 rounded-xl capitalize my-3 mx-auto border-[#333] border-opacity-70 border '>
              <a
                href={bookmark.bookmark_url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline p-1 text-xl text-[#333]"
              >
                {bookmark.bookmark_name}
              </a>
              <button onClick={() => handleDeleteBookmark(index)} className='hover:scale-[1.02] transition-all p-1 hover:bg-red-100 rounded-md'>
                ❌
              </button>
            </div>
          ))
        )}
      </div>
    </div>

    </div>
  );
}

export default App;

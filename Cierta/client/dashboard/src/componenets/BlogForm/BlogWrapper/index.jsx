import { useState } from "react";
import BlogForm from "..";
import BlogList from "../BlogList";

const BlogPage = () => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleEdit = (id, data) => {
    setEditId(id);
    setEditData(data);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData(null);
  };

  return (
    <div>
      <h2>Manage Blog Posts</h2>
      <BlogForm
        editId={editId}
        editData={editData}
        cancelEdit={handleCancelEdit}
        refresh={() => setRefreshCounter(prev => prev + 1)}
      />
      <BlogList 
        onEdit={handleEdit}
        key={refreshCounter}
      />
    </div>
  );
};

export default BlogPage;
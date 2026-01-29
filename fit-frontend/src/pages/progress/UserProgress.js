import React, { useEffect, useState } from "react";
import axios from "axios";

function UserProgress({ auth }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (!auth?.id) return;
    axios.get(`http://localhost:8080/api/progress/user/${auth.id}`)
      .then(res => setPhotos(res.data))
      .catch(err => console.error("Error fetching progress photos:", err));
  }, [auth.id]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select an image");

    // ✅ Upload using FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    formData.append("userId", auth.id);

    try {
      await axios.post("http://localhost:8080/api/progress/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Photo uploaded!");
      setFile(null);
      setCaption("");
      // Refresh list
      const res = await axios.get(`http://localhost:8080/api/progress/user/${auth.id}`);
      setPhotos(res.data);
    } catch (err) {
      console.error("Error uploading photo:", err);
      alert("Upload failed");
    }
  };

  return (
    <div className="container">
      <h2>My Progress</h2>
      <div className="card" style={{ marginTop: 12 }}>
        <form onSubmit={handleUpload}>
          <label>Upload Transformation Picture</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
          <label>Caption</label>
          <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Week update" />
          <div style={{ marginTop: 12 }}>
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        {photos.map(p => (
          <div className="col" key={p.id}>
            <div className="card">
              {p.url ? (
                <img src={p.url} alt={p.caption} style={{ width: "100%", borderRadius: 8 }} />
              ) : (
                <div className="helper">No preview</div>
              )}
              <div style={{ marginTop: 6 }}><strong>{p.caption}</strong></div>
            </div>
          </div>
        ))}
        {!photos.length && <div className="card">No photos yet.</div>}
      </div>
    </div>
  );
}

export default UserProgress;
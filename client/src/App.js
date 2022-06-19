import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import BookPage from "./pages/BookPage";
import CreateEditBookPage from "./pages/CreateEditBookPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/book/:id" element={<BookPage />} />
          <Route exact path="/book-create" element={<CreateEditBookPage />} />
          <Route exact path="/book-edit/:id" element={<CreateEditBookPage />} />
          <Route exact path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

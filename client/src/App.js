import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import BookPage from "./pages/BookPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/book/:bookId" element={<BookPage />} />
        <Route exact path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;

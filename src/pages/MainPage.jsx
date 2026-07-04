// =====================================================================
// BarangMain.jsx
// Komponen CONTAINER - "otak" dari halaman Barang.
// Isinya HANYA state & logic (fetch, create, update, delete).
// Tampilan detail (tabel, form) sudah dipindah ke BarangTable.jsx & BarangModal.jsx
// =====================================================================

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import BarangTable from "../components/ui/barang/BarangTable";
import BarangModal from "../components/ui/barang/BarangModal";
import DeleteConfirmModal from "../components/layouts/ConfirmModal";
import {
  getBarangList,
  createBarang,
  updateBarang,
  deleteBarang,
} from "../services/barangService";

export default function BarangMain() {
  // -------------------------------------------------------------------
  // STATE (semuanya tetap di sini, tidak pindah ke komponen lain)
  // -------------------------------------------------------------------
  const [barangList, setBarangList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    kode_barang: "",
    name: "",
    satuan: "",
    jumlah: 0,
    keterangan: "",
    tahun_pengadaan: new Date().getFullYear(),
    kategori_id: "",
    ruangan_id: "",
    cabang_id: "",
  });

  // -------------------------------------------------------------------
  // READ
  // -------------------------------------------------------------------
  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const rows = await getBarangList(page, 10);
      setBarangList(rows);
      setMeta(rows.meta);
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil data barang. Cek koneksi ke backend.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------------
  // MODAL FORM (Tambah / Edit)
  // -------------------------------------------------------------------
  const openCreateModal = () => {
    setEditingId(null);
    setForm({
      kode_barang: "",
      name: "",
      satuan: "",
      jumlah: 0,
      keterangan: "",
      tahun_pengadaan: new Date().getFullYear(),
      kategori_id: "",
      ruangan_id: "",
      cabang_id: "",
    });
    setShowModal(true);
  };

  // Dikirim ke BarangTable sebagai prop "onEdit"
  const handleEdit = (barang) => {
    setEditingId(barang.id);
    setForm({
      kode_barang: barang.kode_barang || "",
      name: barang.name || "",
      satuan: barang.satuan || "",
      jumlah: barang.jumlah || 0,
      keterangan: barang.keterangan || "",
      tahun_pengadaan: barang.tahun_pengadaan || new Date().getFullYear(),
      kategori_id: barang.kategori_id || "",
      ruangan_id: barang.ruangan_id || "",
      cabang_id: barang.cabang_id || "",
    });
    setShowModal(true);
  };

  // Dikirim ke BarangModal sebagai prop "onChange"
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Dikirim ke BarangModal sebagai prop "onSubmit"
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateBarang(editingId, form);
        toast.success("Barang berhasil diupdate");
      } else {
        await createBarang(form);
        toast.success("Barang berhasil ditambahkan");
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan data. Cek kembali isian form kamu.");
    }
  };

  // -------------------------------------------------------------------
  // DELETE
  // -------------------------------------------------------------------

  // Dikirim ke BarangTable sebagai prop "onDelete"
  const handleAskDelete = (barang) => {
    setDeleteTarget(barang);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      await deleteBarang(deleteTarget.id);
      toast.success("Barang berhasil dihapus");
      setDeleteTarget(null);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus data.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    if (isDeleting) return;
    setDeleteTarget(null);
  };

  // -------------------------------------------------------------------
  // RENDER
  // Perhatikan betapa "bersih" render-nya sekarang: tidak ada lagi
  // <table> atau <form> panjang di sini, semua sudah dipecah.
  // -------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-blue-600">Data Barang</h1>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Tambah Barang
          </button>
        </div>

        {/* Tabel dipindah ke komponen sendiri, tinggal kirim data + fungsi */}
        <BarangTable
          data={barangList}
          loading={loading}
          error={error}
          page={page}
          meta={meta}
          onPageChange={setPage}
          onEdit={handleEdit}
          onDelete={handleAskDelete}
        />
      </div>

      {/* Modal form juga dipindah ke komponen sendiri */}
      <BarangModal
        isOpen={showModal}
        isEdit={editingId !== null}
        form={form}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        onClose={() => setShowModal(false)}
      />

      {/* Modal konfirmasi hapus, tetap komponen terpisah seperti sebelumnya */}
      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        itemName={deleteTarget?.name}
        isLoading={isDeleting}
      />
    </div>
  );
}
// =====================================================================
// BarangTable.jsx
// Komponen PRESENTATIONAL - cuma nampilkan data, TIDAK punya state sendiri.
// Semua data dan fungsi datang dari props yang dikirim BarangMain.jsx
// =====================================================================

import { getImage } from "../../../services/barangService";

// Props yang diterima:
// - data: array barang yang mau ditampilkan
// - loading, error: status pengambilan data
// - page, meta: info pagination
// - onPageChange: fungsi dipanggil saat klik "Sebelumnya"/"Selanjutnya"
// - onEdit: fungsi dipanggil saat klik "Edit" (dikirim 1 baris data barang)
// - onDelete: fungsi dipanggil saat klik "Hapus" (dikirim 1 baris data barang)
export default function BarangTable({
  data,
  loading,
  error,
  page,
  meta,
  onPageChange,
  onEdit,
  onDelete,
}) {
  if (error) {
    return <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>;
  }

  if (loading) {
    return <p className="text-center text-gray-400 py-10">Memuat data...</p>;
  }

  return (
    <>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-blue-50 text-left text-blue-600">
            <th className="p-2 border-b">Gambar</th>
            <th className="p-2 border-b">Kode</th>
            <th className="p-2 border-b">Nama Barang</th>
            <th className="p-2 border-b">Satuan</th>
            <th className="p-2 border-b">Jumlah</th>
            <th className="p-2 border-b">Tahun</th>
            <th className="p-2 border-b text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-6 text-gray-400">
                Belum ada data barang.
              </td>
            </tr>
          ) : (
            data.map((barang) => (
              <tr key={barang.id} className="hover:bg-blue-50/50">
                <td className="p-2 border-b">
                  {barang.image ? (
                    <img
                      src={getImage(barang.image)}
                      alt={barang.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-300 text-xs">no image</span>
                  )}
                </td>
                <td className="p-2 border-b">{barang.kode_barang}</td>
                <td className="p-2 border-b">{barang.name}</td>
                <td className="p-2 border-b">{barang.satuan}</td>
                <td className="p-2 border-b">{barang.jumlah}</td>
                <td className="p-2 border-b">{barang.tahun_pengadaan}</td>
                <td className="p-2 border-b text-center space-x-2">
                  {/* Tabel TIDAK tau cara buka modal edit/hapus.
                      Dia cuma "lapor" ke Main lewat onEdit/onDelete,
                      Main yang urus logic-nya. */}
                  <button
                    onClick={() => onEdit(barang)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(barang)}
                    className="text-red-500 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {meta && (
        <div className="flex justify-between items-center mt-4 text-sm">
          <span className="text-gray-500">
            Halaman {meta.page || page} dari {meta.total_page || 1}
          </span>
          <div className="space-x-2">
            <button
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Sebelumnya
            </button>
            <button
              disabled={meta.total_page && page >= meta.total_page}
              onClick={() => onPageChange(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      )}
    </>
  );
}
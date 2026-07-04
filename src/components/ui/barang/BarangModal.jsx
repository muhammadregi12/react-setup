// =====================================================================
// BarangModal.jsx
// Komponen PRESENTATIONAL - form tambah/edit barang.
// TIDAK punya state form sendiri, semua "form" dan "onChange" datang dari
// BarangMain.jsx. Modal ini cuma bertugas menampilkan input dan meneruskan
// event ke Main.
// =====================================================================

// Props yang diterima:
// - isOpen: boolean, tampil/tidaknya modal
// - isEdit: boolean, true kalau mode edit (untuk judul modal)
// - form: object nilai form saat ini (dikelola di BarangMain)
// - onChange: fungsi dipanggil tiap input berubah
// - onSubmit: fungsi dipanggil saat form disubmit
// - onClose: fungsi dipanggil saat klik "Batal"
export default function BarangModal({ isOpen, isEdit, form, onChange, onSubmit, onClose }) {
  // Kalau tidak "isOpen", tidak usah render apa-apa sama sekali
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-blue-600 mb-4">
          {isEdit ? "Edit Barang" : "Tambah Barang"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Kode Barang</label>
            <input
              type="text"
              name="kode_barang"
              value={form.kode_barang}
              onChange={onChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Nama Barang</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-600">Satuan</label>
              <input
                type="text"
                name="satuan"
                value={form.satuan}
                onChange={onChange}
                required
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Jumlah</label>
              <input
                type="number"
                name="jumlah"
                value={form.jumlah}
                onChange={onChange}
                required
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Tahun Pengadaan</label>
            <input
              type="number"
              name="tahun_pengadaan"
              value={form.tahun_pengadaan}
              onChange={onChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-sm text-gray-600">Kategori ID</label>
              <input
                type="number"
                name="kategori_id"
                value={form.kategori_id}
                onChange={onChange}
                required
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Ruangan ID</label>
              <input
                type="number"
                name="ruangan_id"
                value={form.ruangan_id}
                onChange={onChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Cabang ID</label>
              <input
                type="number"
                name="cabang_id"
                value={form.cabang_id}
                onChange={onChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Keterangan</label>
            <textarea
              name="keterangan"
              value={form.keterangan}
              onChange={onChange}
              rows={2}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
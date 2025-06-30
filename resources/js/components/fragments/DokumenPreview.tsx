import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Edit, ArrowLeft } from "lucide-react"

interface NotulensiData {
  judul: string
  tanggal: string
  waktu: string
  tempat: string
  pimpinan_rapat: string
  notulis: string
  peserta: string
  agenda: string
  pembahasan: string
  keputusan: string
  tindak_lanjut: string
}

interface LelayuData {
  nama_almarhum: string
  usia: string
  alamat: string
  hari_meninggal: string
  tanggal_meninggal: string
  waktu_meninggal: string
  tempat_meninggal: string
  hari_pemakaman: string
  tanggal_pemakaman: string
  waktu_pemakaman: string
  tempat_pemakaman: string
  lokasi_berita: string
  tanggal_berita: string
}

interface KeluargaBerduka {
  id: number
  nama: string
  hubungan: string
}

interface DokumenPreviewProps {
  jenis: string
  notulensiData?: NotulensiData
  lelayuData?: LelayuData
  keluargaBerduka?: KeluargaBerduka[]
  isEditMode?: boolean
  onBack: () => void
  onEdit: () => void
  onSave: () => void
}

export function DokumenPreview({
  jenis,
  notulensiData,
  lelayuData,
  keluargaBerduka = [],
  isEditMode = false,
  onBack,
  onEdit,
  onSave,
}: DokumenPreviewProps) {
  const formatTanggal = (tanggal: string) => {
    if (!tanggal) return ""
    return new Date(tanggal).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Preview Dokumen</h2>
          <p className="text-muted-foreground">Tinjau dokumen sebelum menyimpan</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
          <Button variant="outline" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button className="bg-rose-600 hover:bg-rose-700" onClick={onSave}>
            <Download className="mr-2 h-4 w-4" />
            {isEditMode ? "Update Dokumen" : "Simpan Dokumen"}
          </Button>
        </div>
      </div>

      {/* Preview Notulensi */}
      {jenis === "notulensi" && notulensiData && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Preview Notulensi Rapat
              </CardTitle>
              <Badge className="bg-blue-100 text-blue-800">Format: DOCX</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 p-6 bg-white border rounded-lg font-serif">
              {/* Header Dokumen */}
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">NOTULENSI RAPAT</h1>
                <h2 className="text-xl font-semibold">{notulensiData.judul}</h2>
              </div>

              <Separator />

              {/* Info Rapat */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Hari/Tanggal:</strong> {formatTanggal(notulensiData.tanggal)}
                  </p>
                  <p>
                    <strong>Waktu:</strong> {notulensiData.waktu} WIB
                  </p>
                  <p>
                    <strong>Tempat:</strong> {notulensiData.tempat}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Pimpinan Rapat:</strong> {notulensiData.pimpinan_rapat}
                  </p>
                  <p>
                    <strong>Notulis:</strong> {notulensiData.notulis}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Peserta */}
              <div>
                <h3 className="text-lg font-semibold mb-2">PESERTA RAPAT</h3>
                <div className="whitespace-pre-line">{notulensiData.peserta}</div>
              </div>

              <Separator />

              {/* Agenda */}
              <div>
                <h3 className="text-lg font-semibold mb-2">AGENDA RAPAT</h3>
                <div className="whitespace-pre-line">{notulensiData.agenda}</div>
              </div>

              <Separator />

              {/* Pembahasan */}
              <div>
                <h3 className="text-lg font-semibold mb-2">PEMBAHASAN</h3>
                <div className="whitespace-pre-line">{notulensiData.pembahasan}</div>
              </div>

              <Separator />

              {/* Keputusan */}
              <div>
                <h3 className="text-lg font-semibold mb-2">KEPUTUSAN</h3>
                <div className="whitespace-pre-line">{notulensiData.keputusan}</div>
              </div>

              <Separator />

              {/* Tindak Lanjut */}
              <div>
                <h3 className="text-lg font-semibold mb-2">TINDAK LANJUT</h3>
                <div className="whitespace-pre-line">{notulensiData.tindak_lanjut}</div>
              </div>

              <Separator />

              {/* Penutup */}
              <div className="text-right">
                <p>Notulis,</p>
                <br />
                <br />
                <p className="font-semibold">{notulensiData.notulis}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Lelayu */}
      {jenis === "lelayu" && lelayuData && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Preview Berita Lelayu
              </CardTitle>
              <Badge className="bg-purple-100 text-purple-800">Format: PDF</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 p-8 bg-white border rounded-lg font-serif max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">BERITA LELAYU</h1>
                <p className="text-right text-lg">
                  {lelayuData.lokasi_berita}, {formatTanggal(lelayuData.tanggal_berita)}
                </p>
              </div>

              <div className="mt-8">
                <p className="text-lg mb-4">Telah meninggal dunia dengan tenang:</p>

                {/* Nama Almarhum */}
                <div className="text-center my-6">
                  <h2 className="text-2xl font-bold underline decoration-2 underline-offset-4">
                    {lelayuData.nama_almarhum}
                  </h2>
                  <p className="text-lg mt-2">Usia: {lelayuData.usia}</p>
                  <p className="text-lg">Alamat: {lelayuData.alamat}</p>
                </div>

                {/* Detail Meninggal */}
                <div className="my-6">
                  <p className="text-lg font-semibold mb-2">Meninggal dunia pada:</p>
                  <div className="ml-4 space-y-1">
                    <p>Hari: {lelayuData.hari_meninggal}</p>
                    <p>Tanggal: {formatTanggal(lelayuData.tanggal_meninggal)}</p>
                    <p>Pukul: {lelayuData.waktu_meninggal}</p>
                    <p>Di: {lelayuData.tempat_meninggal}</p>
                  </div>
                </div>

                {/* Detail Pemakaman */}
                <div className="my-6">
                  <p className="text-lg font-semibold mb-2">Jenazah akan dimakamkan pada:</p>
                  <div className="ml-4 space-y-1">
                    <p>Hari: {lelayuData.hari_pemakaman}</p>
                    <p>Tanggal: {formatTanggal(lelayuData.tanggal_pemakaman)}</p>
                    <p>Pukul: {lelayuData.waktu_pemakaman}</p>
                    <p>Di: {lelayuData.tempat_pemakaman}</p>
                  </div>
                </div>

                {/* Penutup */}
                <p className="text-lg my-6">
                  Demikian berita lelayu ini kami sampaikan, atas perhatiannya kami ucapkan terima kasih.
                </p>

                {/* Keluarga Berduka */}
                <div className="my-6">
                  <p className="text-lg font-semibold mb-3">Yang berduka cita:</p>
                  <div className="ml-4">
                    {keluargaBerduka.map((keluarga, index) => (
                      <p key={keluarga.id} className="mb-1">
                        {index + 1}. {keluarga.nama} ({keluarga.hubungan})
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

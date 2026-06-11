"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { probaToCreditScore, scoreToGrade } from "@/lib/credit-score";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Student = { nim: string; nama: string };
type Meta = {
  user_input: string[];
  db_lookup: string[];
  categorical: Record<string, string[]>;
  numeric_ranges: Record<string, { min: number; max: number; median: number }>;
  thresholds: { recall: number; f1: number };
  default_rate: number;
  metrics: Record<string, number>;
  students: Student[];
};
type Profile = { nim: string; nama: string; profile: Record<string, any> };
type Factor = { feature: string; shap: number; direction: string };
type Prediction = {
  nim: string;
  proba_default: number;
  threshold: number;
  mode: string;
  risk_band: "RENDAH" | "SEDANG" | "TINGGI";
  recommendation: string;
  default_rate: number;
  top_factors: Factor[];
};

const LABELS: Record<string, string> = {
  annual_inc: "Penghasilan tahunan (USD)",
  emp_length: "Lama bekerja (thn)",
  home_ownership: "Status tempat tinggal",
  dti: "Debt-to-Income (%)",
  fico_range_low: "Skor FICO",
  revol_util: "Utilisasi revolving (%)",
  delinq_2yrs: "Tunggakan 2 thn",
  inq_last_6mths: "Inquiry 6 bln",
  open_acc: "Akun terbuka",
  total_acc: "Total akun",
  pub_rec: "Catatan publik",
  pub_rec_bankruptcies: "Kebangkrutan",
  mort_acc: "Akun mortgage",
  credit_age_years: "Usia kredit (thn)",
  loan_amnt: "Jumlah pinjaman",
  term: "Tenor",
  purpose: "Tujuan pinjaman",
  application_type: "Tipe aplikasi",
};
const lab = (k: string) => LABELS[k] || k;

function fmt(v: any) {
  if (v === null || v === undefined) return "—";
  if (typeof v === "number") return Number.isInteger(v) ? v : v.toFixed(2);
  return String(v);
}

export default function DemoPage() {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [nim, setNim] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loanAmnt, setLoanAmnt] = useState(12000);
  const [term, setTerm] = useState(36);
  const [purpose, setPurpose] = useState("debt_consolidation");
  const [appType, setAppType] = useState("Individual");
  const mode = "recall";
  const [pred, setPred] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warming, setWarming] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let attempt = 0;
    const maxAttempts = 8;

    async function fetchMeta() {
      try {
        const r = await fetch(`${API}/meta`);
        const m: Meta = await r.json();
        setMeta(m);
        setWarming(false);
        setError(null);
        if (m.categorical?.purpose?.length) setPurpose(m.categorical.purpose[0]);
      } catch {
        attempt++;
        if (attempt === 1) setWarming(true);
        if (attempt < maxAttempts) {
          setTimeout(fetchMeta, 5000);
        } else {
          setWarming(false);
          setError("API tidak merespons setelah beberapa percobaan. Coba muat ulang halaman.");
        }
      }
    }

    fetchMeta();
  }, []);

  async function doLookup(value: string) {
    setProfile(null);
    setPred(null);
    if (!value) return;
    try {
      const r = await fetch(`${API}/lookup/${value}`);
      if (!r.ok) { setError(`NIM ${value} tidak ditemukan`); return; }
      setError(null);
      setProfile(await r.json());
    } catch { setError("Gagal konek ke API"); }
  }

  async function doPredict(scroll = true) {
    if (!nim) { setError("Pilih NIM dulu"); return; }
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`${API}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nim, loan: { loan_amnt: loanAmnt, term, purpose, application_type: appType }, mode }),
      });
      if (!r.ok) { const e = await r.json().catch(() => ({})); setError(e.detail || "Gagal prediksi"); return; }
      setPred(await r.json());
      if (scroll) setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch { setError("Gagal konek ke API"); }
    finally { setLoading(false); }
  }


  const ranges = meta?.numeric_ranges;
  const purposeOpts = meta?.categorical?.purpose || [];
  const creditScore = pred ? probaToCreditScore(pred.proba_default) : 0;
  const gradeInfo = scoreToGrade(creditScore);

  function factorValue(feature: string): string {
    if (feature === "loan_amnt") return `$${loanAmnt.toLocaleString()}`;
    if (feature === "term") return `${term} bulan`;
    if (feature === "purpose") return purpose.replace(/_/g, " ");
    if (feature === "application_type") return appType;
    if (profile?.profile && feature in profile.profile) return String(fmt(profile.profile[feature]));
    return "";
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/"><ArrowLeft className="size-4" /></Link>
            </Button>
            <span
              aria-label="CreditGuard"
              role="img"
              className="block h-7 w-32 bg-foreground"
              style={{
                maskImage: "url(/logo.png)",
                WebkitMaskImage: "url(/logo.png)",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "left center",
                WebkitMaskPosition: "left center",
              }}
            />
            <span className="text-muted-foreground text-sm hidden sm:block">/ Demo Prediksi</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto px-6 py-8 max-w-5xl">
        <div className="mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold">Prediksi Risiko Gagal Bayar</h1>
            <Badge variant="outline" className="text-xs">Ensemble Model</Badge>
          </div>
          <p className="text-muted-foreground text-sm mt-1">Decision-support · human-in-the-loop · estimasi credit score otomatis</p>
        </div>

        {warming && (
          <div className="mb-6 rounded-lg bg-primary/10 border border-primary/30 text-primary px-4 py-3 text-sm flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
            API sedang starting up, harap tunggu sebentar (~30 detik)...
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ── INPUT ── */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">1 · Input Pengajuan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>NIM Mahasiswa</Label>
                <Input
                  value={nim}
                  placeholder="Masukkan NIM kamu"
                  onChange={(e) => setNim(e.target.value)}
                  onBlur={(e) => doLookup(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>Jumlah Pinjaman: <span className="font-bold">${loanAmnt.toLocaleString()}</span></Label>
                <Slider
                  min={ranges?.loan_amnt?.min ?? 1000}
                  max={ranges?.loan_amnt?.max ?? 40000}
                  step={500}
                  value={[loanAmnt]}
                  onValueChange={([v]) => setLoanAmnt(v)}
                />
              </div>

              <div className="space-y-2">
                <Label>Tenor</Label>
                <div className="flex gap-2">
                  {[36, 60].map((t) => (
                    <Button
                      key={t}
                      variant={term === t ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTerm(t)}
                      className="flex-1"
                    >
                      {t} bulan
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tujuan Pinjaman</Label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {purposeOpts.map((p) => (
                      <SelectItem key={p} value={p}>{p.replace(/_/g, " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tipe Aplikasi</Label>
                <div className="flex gap-2">
                  {["Individual", "Joint App"].map((a) => (
                    <Button
                      key={a}
                      variant={appType === a ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAppType(a)}
                      className="flex-1"
                    >
                      {a}
                    </Button>
                  ))}
                </div>
              </div>

              <Button className="w-full" onClick={() => doPredict()} disabled={loading}>
                {loading ? "Memproses..." : "Prediksi Risiko"}
              </Button>
            </CardContent>
          </Card>

          {/* ── PROFIL ── */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">2 · Profil Database {profile && <span className="font-normal text-muted-foreground text-sm">(via NIM)</span>}</CardTitle>
            </CardHeader>
            <CardContent>
              {!profile ? (
                <p className="text-muted-foreground text-sm">Pilih NIM untuk menarik profil finansial.</p>
              ) : (
                <>
                  <div className="flex justify-between items-baseline pb-3 mb-4 border-b border-border">
                    <strong className="text-lg">{profile.nama}</strong>
                    <span className="text-muted-foreground text-sm">{profile.nim}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {meta?.db_lookup.map((k) => (
                      <div key={k} className="flex justify-between bg-muted/50 px-3 py-2 rounded-md text-xs">
                        <span className="text-muted-foreground truncate mr-2">{lab(k)}</span>
                        <strong>{fmt(profile.profile[k])}</strong>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── HASIL ── */}
        {pred && (
          <Card className="mt-6" ref={resultRef}>
            <CardHeader>
              <CardTitle className="text-base">3 · Hasil Prediksi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
                {/* Gauge */}
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="w-44 h-44 rounded-full grid place-items-center"
                    style={{
                      background: `conic-gradient(${gradeInfo.color} ${((creditScore - 300) / 550) * 360}deg, hsl(var(--muted)) 0deg)`,
                    }}
                  >
                    <div className="w-32 h-32 rounded-full bg-card flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold">{creditScore}</span>
                      <span className="text-muted-foreground text-xs">Credit Score</span>
                    </div>
                  </div>
                  <Badge style={{ backgroundColor: gradeInfo.color, color: "white", border: "none" }} className="text-sm px-4 py-1">
                    Grade {gradeInfo.grade} · {gradeInfo.label}
                  </Badge>
                  <div className="text-center text-xs text-muted-foreground space-y-0.5">
                    <p>Probabilitas Default: <strong>{(pred.proba_default * 100).toFixed(1)}%</strong></p>
                    <p>Risiko {pred.risk_band}</p>
                  </div>
                </div>

                {/* Reco + SHAP */}
                <div className="space-y-5">
                  <div className="rounded-lg bg-muted/50 border border-border p-4 space-y-1">
                    <p className="text-muted-foreground text-xs">Rekomendasi model</p>
                    <p className="text-xl font-bold" style={{ color: pred.proba_default >= pred.threshold ? "#dc2626" : "#16a34a" }}>
                      {pred.recommendation}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      threshold {pred.threshold} · base rate {(pred.default_rate * 100).toFixed(1)}%
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-3">Faktor penjelas (SHAP)</p>
                    <div className="space-y-2">
                      {pred.top_factors.map((f) => {
                        const maxAbs = Math.max(...pred.top_factors.map((x) => Math.abs(x.shap)));
                        const w = (Math.abs(f.shap) / maxAbs) * 100;
                        const up = f.shap > 0;
                        const val = factorValue(f.feature);
                        return (
                          <div key={f.feature} className="grid grid-cols-[170px_1fr_72px] items-center gap-2 text-xs">
                            <span className="text-muted-foreground text-right truncate">
                              {lab(f.feature)}{val && <strong className="text-foreground"> ({val})</strong>}
                            </span>
                            <div className="bg-muted rounded h-4 overflow-hidden">
                              <div className="h-full rounded" style={{ width: `${w}%`, background: up ? "#dc2626" : "#16a34a" }} />
                            </div>
                            <span style={{ color: up ? "#dc2626" : "#16a34a" }} className="font-medium text-right">
                              {up ? "↑" : "↓"} {(f.shap * 100).toFixed(1)}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-muted-foreground text-xs mt-2">Merah = menaikkan risiko · Hijau = menurunkan risiko</p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mt-6 text-center">
                Skor estimasi berdasarkan model prediksi — bukan skor kredit resmi (FICO/SLIK OJK).
              </p>
            </CardContent>
          </Card>
        )}

        <p className="mt-8 text-center text-muted-foreground text-xs">
          Dataset Lending Club 2007–2015 · NIM mahasiswa · alat edukasi, bukan keputusan kredit resmi.
        </p>
      </main>
    </div>
  );
}

import Link from "next/link";
import fs from "fs";
import path from "path";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Research — Eat The Sun",
  description:
    "Published research on orbital ring construction and incremental bootstrap architecture.",
};

interface PaperMeta {
  slug: string;
  title: string;
  authors: string;
  date: string;
  version: string;
  abstract: string;
  status: "published" | "draft" | "upcoming";
}

function extractPaperMeta(filename: string, content: string): PaperMeta {
  const slug = filename.replace(/\.md$/, "").replace(/^\d{8}-/, "");

  const titleMatch = content.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1] : filename;

  const authorsMatch = content.match(/^\*\*(.+?)\*\*/m);
  const authors = authorsMatch ? authorsMatch[1] : "";

  const versionMatch = content.match(/Draft (v[\d.]+)/);
  const version = versionMatch ? versionMatch[1] : "";

  const dateMatch = content.match(
    /(?:Draft v[\d.]+ — |^\*.*?— )(.+?)(?:\s*$|\*)/m,
  );
  const date = dateMatch ? dateMatch[1].replace(/\*/g, "").trim() : "";

  // Extract abstract: text between "## Abstract" and the next "##"
  const abstractMatch = content.match(
    /## Abstract\s*\n+([\s\S]*?)(?=\n## |\n---)/,
  );
  const abstract = abstractMatch
    ? abstractMatch[1].trim().slice(0, 400) +
      (abstractMatch[1].length > 400 ? "..." : "")
    : "";

  return { slug, title, authors, date, version, abstract, status: "draft" };
}

function PaperCard({ paper }: { paper: PaperMeta }) {
  const statusColors = {
    published: "bg-green-500/10 text-green-400 border-green-500/20",
    draft: "bg-solar/10 text-solar border-solar/20",
    upcoming: "bg-muted/10 text-muted border-muted/20",
  };

  return (
    <Link
      href={`/research/${paper.slug}`}
      className="block bg-surface border border-border rounded-xl p-8 hover:border-solar/30 transition-colors group"
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`text-xs font-mono px-2.5 py-1 rounded-full border ${statusColors[paper.status]}`}
        >
          {paper.status === "published"
            ? "Published"
            : paper.status === "draft"
              ? "Draft"
              : "Upcoming"}
        </span>
        {paper.version && (
          <span className="text-muted text-sm">{paper.version}</span>
        )}
        {paper.date && (
          <>
            <span className="text-muted text-sm">·</span>
            <span className="text-muted text-sm">{paper.date}</span>
          </>
        )}
      </div>
      <h2 className="text-xl font-bold mb-2 group-hover:text-solar transition-colors">
        {paper.title}
      </h2>
      {paper.authors && (
        <p className="text-muted text-sm mb-4">{paper.authors}</p>
      )}
      {paper.abstract && (
        <p className="text-muted text-sm leading-relaxed">{paper.abstract}</p>
      )}
    </Link>
  );
}

export default function ResearchPage() {
  const researchDir = path.join(process.cwd(), "research");
  const files = fs
    .readdirSync(researchDir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse(); // newest first by date prefix

  const papers = files.map((file) => {
    const content = fs.readFileSync(path.join(researchDir, file), "utf-8");
    return extractPaperMeta(file, content);
  });

  return (
    <>
      <Nav />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Research</h1>
          <p className="text-muted text-lg mb-12">
            White papers, technical analyses, and simulation results. All
            research is published openly.
          </p>

          <div className="space-y-6">
            {papers.map((paper) => (
              <PaperCard key={paper.slug} paper={paper} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

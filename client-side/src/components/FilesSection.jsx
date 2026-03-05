import RetrieveUploadedFiles from "./RetriveUploadedFiles";

export default function FilesSection({ wallet }) {
  return (
    <section className="py-20">
      <div className="section-title">
        <span className="section-number">02.</span>
        <span>My Encrypted Files</span>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent-primary)] to-transparent ml-8" />
      </div>

      <div>
        <RetrieveUploadedFiles wallet={wallet} />
      </div>
    </section>
  );
}
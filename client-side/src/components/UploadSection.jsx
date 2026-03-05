import SelectFolder from "./SelectFolder";
import { UploadButton } from "./UploadButton";

export default function UploadSection({ isSelected, setIsSelected, encryptedBlob, setEncryptedBlob }) {
  return (
    <section className="py-20">
      <div className="section-title">
        <span className="section-number">01.</span>
        <span>Upload Encrypted Folder</span>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent-primary)] to-transparent ml-8" />
      </div>

      <div className="card mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visual Side */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/20 to-transparent rounded-lg blur-3xl" />
              <div className="relative text-center">
                <div className="text-6xl mb-4 animate-float">🔒</div>
                <p className="font-mono text-sm text-[var(--accent-primary)]">Encrypt locally</p>
                <p className="font-mono text-sm text-[var(--accent-primary)]">Store globally</p>
              </div>
            </div>
          </div>

          {/* Upload Side */}
          <div className="flex items-center justify-center">
            <SelectFolder
              setIsSelected={setIsSelected}
              encryptedBlob={encryptedBlob}
              setEncryptedBlob={setEncryptedBlob}
            />
          </div>
        </div>

        {isSelected && (
          <div className="mt-8 pt-8 border-t border-[var(--bg-border)]">
            <UploadButton encryptedBlob={encryptedBlob} />
          </div>
        )}
      </div>
    </section>
  );
}
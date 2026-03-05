export default function NotConnectedSection() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-[var(--accent-secondary)] mb-4">
          Connect your wallet to begin
        </p>
        <div className="font-mono text-sm text-[var(--accent-secondary)] space-y-2">
          <p>✓ Securely encrypt your files</p>
          <p>✓ Store on IPFS decentralized network</p>
          <p>✓ Keep encryption keys on Solana blockchain</p>
        </div>
      </div>
    </section>
  );
}
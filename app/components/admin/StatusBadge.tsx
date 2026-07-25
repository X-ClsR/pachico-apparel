type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  switch (status) {
    case "PENDING":
      return <span>🟡 PENDING</span>;

    case "DIPROSES":
      return <span>⏳ DIPROSES</span>;

    case "DIKIRIM":
      return <span>📦 DIKIRIM</span>;

    case "SELESAI":
      return <span>🎉 SELESAI</span>;

    default:
      return <span>{status}</span>;
  }
}
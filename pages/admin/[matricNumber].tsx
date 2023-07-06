import { useRouter } from 'next/router';

export default function DownloadButton() {
  const router = useRouter();

  const handleDownload = () => {
    const { matricNumber } = router.query;
    const fileName = 'example.pdf'; // Set the desired file name here
    const downloadUrl = `/api/docs/getAll?matricNumber=${matricNumber}&fileName=${fileName}`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <button onClick={handleDownload}>Download File</button>
  );
}

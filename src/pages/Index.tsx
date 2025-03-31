
import PDFUploader from '@/components/PDFUploader';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pdf-background py-12 px-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            PDF Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your PDF documents for instant analysis and text extraction. Our system processes your documents and provides valuable insights.
          </p>
        </div>

        <PDFUploader />
      </div>
    </div>
  );
};

export default Index;

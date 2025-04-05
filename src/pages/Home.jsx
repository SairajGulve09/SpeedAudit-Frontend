import React, { useState } from "react";
import TabsContainer from "../components/TabsContainer";
import ResultTable from "../components/ResultTable";
import axios from "axios";
import { toast } from "react-hot-toast";
import logo from "../assets/image.png";

const Home = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);

  const handleTest = async () => {
    if (!urls.length) {
      toast.error("No URLs provided.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("https://speedaudit-backend.onrender.com/api/pagespeed/analyze", {
        urls: urls,
      });
      console.log(res.data)
      setResults(res.data);
    } catch (err) {
      toast.error("Something went wrong. Please check the file or URLs.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleDownload = async () => {
    const res = await axios.get("https://speedaudit-backend.onrender.com/api/pagespeed/download", {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "results.xlsx");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-10 text-gray-900">
      <header className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-extrabold text-blue-700 tracking-wide" style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
          SpeedAudit
        </h1>
        <span className="text-gray-500">Bulk URL Performance Testing</span>
      </header>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        {/* <h2 className="text-2xl font-semibold mb-4">Bulk PageSpeed Insights</h2> */}
        <p className="text-gray-600 mb-4">Choose option</p>

        <TabsContainer onUrlsSubmitted={setUrls} />

        <div className="text-gray-600 mt-4">{urls.length} URLs ready for testing</div>

        {loading ? (
  <div className="w-full mt-6 py-3 text-center text-blue-600 font-semibold">
    ⏳ Testing URLs... Please wait.
  </div>
) : (
  <button
    onClick={handleTest}
    className="w-full mt-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition"
  >
    🚀 Run PageSpeed Tests
  </button>
)}

      </div>

      {results.length > 0 && (
        <div className="mt-10">
          <ResultTable results={results} />
          <div className="flex justify-center">
            <button
              onClick={handleDownload}
              className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md"
            >
              📥 Download Excel
            </button>
          </div>
        </div>
      )}

    </div>

    <footer className="mt-16 bg-gray-100 text-gray-600 py-8 px-4 text-sm rounded-xl shadow-inner">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <p className="font-semibold text-lg text-blue-700">SpeedAudit</p>
          <p>Analyze your website performance with precision and clarity.</p>
          <p>Built for developers, marketers, and performance enthusiasts.</p>
          <div className="space-x-4">
            <a href="#" className="hover:underline text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:underline text-blue-600">Terms of Use</a>
            <a href="#" className="hover:underline text-blue-600">Contact</a>
          </div>
          <div className="pt-2">
            <p>© {new Date().getFullYear()} SpeedAudit. All rights reserved.</p>
          </div>
        </div>
      </footer>

</>
  );
};

export default Home;
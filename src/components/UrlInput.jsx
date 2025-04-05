import { useState } from 'react';
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Link } from 'lucide-react';

const UrlInput = ({ onUrlsSubmitted }) => {
  const [urlInput, setUrlInput] = useState('');

  const handleSubmit = () => {
    if (!urlInput.trim()) return;
    const urls = urlInput.split('\n').map(url => url.trim()).filter(url => url.length > 0);
    const validUrls = urls.filter(url => url.startsWith('http://') || url.startsWith('https://'));
    if (validUrls.length > 0) {
      onUrlsSubmitted(validUrls);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="h-5 w-5 text-blue-500" />
          Manual URL Input
        </CardTitle>
        <CardDescription>Enter one URL per line to test multiple pages</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="https://example.com\nhttps://another-example.com"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="min-h-[120px] font-mono text-sm"
        />
        <div className="mt-3 text-right">
          <Button
            onClick={handleSubmit}
            disabled={!urlInput.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Add URLs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UrlInput;

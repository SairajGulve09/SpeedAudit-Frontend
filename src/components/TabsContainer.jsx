import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import FileUpload from "./FileUpload";
import UrlInput from "./UrlInput";

const TabsContainer = ({ onUrlsSubmitted }) => {
  const [activeTab, setActiveTab] = useState("file");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="file">Upload File</TabsTrigger>
        <TabsTrigger value="manual">Manual Input</TabsTrigger>
      </TabsList>

      <TabsContent value="file">
        <FileUpload onFilesSelected={onUrlsSubmitted} />
      </TabsContent>

      <TabsContent value="manual">
        <UrlInput onUrlsSubmitted={onUrlsSubmitted} />
      </TabsContent>
    </Tabs>
  );
};

export default TabsContainer;

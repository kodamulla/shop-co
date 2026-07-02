import { useSearchParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Database, Wand2 } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";

export default function Documents() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "data";

  const handleTabChange = (value) => {
    setSearchParams({ tab: value });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("System Activity Report", 20, 10);
    doc.autoTable({ head: [['Item', 'Status']], body: [['Products', 'Active'], ['Users', 'Active']] });
    doc.save("report.pdf");
  };

  const downloadCSV = () => {
    const data = [{ Name: "Sample Data", Status: "Active" }];
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "data_library.csv";
    a.click();
  };

  return (
    <div className="p-8 bg-slate-50/50 min-h-screen">
      <h1 className="text-2xl font-black text-blue-950 mb-6">Documents</h1>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="bg-white p-1 rounded-2xl border border-slate-100 mb-6">
          <TabsTrigger value="data" className="rounded-xl data-[state=active]:bg-blue-50 font-bold"><Database className="w-4 h-4 mr-2"/> Data Library</TabsTrigger>
          <TabsTrigger value="reports" className="rounded-xl data-[state=active]:bg-blue-50 font-bold"><FileText className="w-4 h-4 mr-2"/> Reports</TabsTrigger>
          <TabsTrigger value="assistant" className="rounded-xl data-[state=active]:bg-blue-50 font-bold"><Wand2 className="w-4 h-4 mr-2"/> Word Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="data">
          <Card className="p-8 rounded-3xl border-slate-100 shadow-sm">
            <h2 className="font-black text-lg mb-2">Data Library</h2>
            <p className="text-slate-500 mb-6">Access and export system master data for offline analysis.</p>
            <Button onClick={downloadCSV} className="bg-blue-600 rounded-xl hover:bg-blue-700"><Download className="w-4 h-4 mr-2"/> Export Database to CSV</Button>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="p-8 rounded-3xl border-slate-100 shadow-sm">
            <h2 className="font-black text-lg mb-2">System Reports</h2>
            <p className="text-slate-500 mb-6">Generate and download comprehensive PDF reports on system activity.</p>
            <Button onClick={downloadPDF} className="bg-blue-600 rounded-xl hover:bg-blue-700"><Download className="w-4 h-4 mr-2"/> Download PDF Report</Button>
          </Card>
        </TabsContent>

        <TabsContent value="assistant">
          <Card className="p-8 rounded-3xl border-slate-100 shadow-sm">
            <h2 className="font-black text-lg mb-2">Word Assistant</h2>
            <p className="text-slate-500">Utilize AI-powered tools to draft documents, emails, and content effortlessly.</p>
            <Button className="bg-blue-600 rounded-xl hover:bg-blue-700 mt-4"><Wand2 className="w-4 h-4 mr-2"/> Launch Assistant</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
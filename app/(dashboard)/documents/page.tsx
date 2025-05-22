import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Download, FileText, ImageIcon, MoreHorizontal, FileIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample document data
const documents = [
  {
    id: "DOC-001",
    name: "Invoice Template.pdf",
    type: "PDF",
    size: "2.4 MB",
    category: "Templates",
    uploadDate: "2023-05-15",
    uploadedBy: "Ozoda",
    status: "active",
  },
  {
    id: "DOC-002",
    name: "Product Catalog 2023.xlsx",
    type: "Excel",
    size: "5.2 MB",
    category: "Catalogs",
    uploadDate: "2023-05-12",
    uploadedBy: "Admin",
    status: "active",
  },
  {
    id: "DOC-003",
    name: "Company Logo.png",
    type: "Image",
    size: "1.1 MB",
    category: "Branding",
    uploadDate: "2023-05-10",
    uploadedBy: "Ozoda",
    status: "active",
  },
  {
    id: "DOC-004",
    name: "Contract Template.docx",
    type: "Word",
    size: "856 KB",
    category: "Legal",
    uploadDate: "2023-05-08",
    uploadedBy: "Admin",
    status: "archived",
  },
  {
    id: "DOC-005",
    name: "Financial Report Q1.pdf",
    type: "PDF",
    size: "3.7 MB",
    category: "Reports",
    uploadDate: "2023-05-05",
    uploadedBy: "Ozoda",
    status: "active",
  },
]

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">Manage your business documents and files</p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search documents..." className="pl-8 w-full" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents
              .filter((doc) => doc.category === "Templates")
              .map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents
              .filter((doc) => doc.category === "Reports")
              .map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents
              .filter((doc) => doc.category === "Legal")
              .map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents
              .filter((doc) => doc.status === "archived")
              .map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface DocumentCardProps {
  document: {
    id: string
    name: string
    type: string
    size: string
    category: string
    uploadDate: string
    uploadedBy: string
    status: string
  }
}

function DocumentCard({ document }: DocumentCardProps) {
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />
      case "excel":
        return <FileIcon className="h-8 w-8 text-green-500" />
      case "word":
        return <FileText className="h-8 w-8 text-blue-500" />
      case "image":
        return <ImageIcon className="h-8 w-8 text-purple-500" />
      default:
        return <FileIcon className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800">
              {getFileIcon(document.type)}
            </div>
            <div>
              <div className="font-semibold">{document.name}</div>
              <div className="text-sm text-muted-foreground">
                {document.type} • {document.size}
              </div>
            </div>
          </div>
          <Badge variant={document.status === "active" ? "default" : "secondary"}>{document.status}</Badge>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Category:</span>
            <span>{document.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Uploaded:</span>
            <span>{document.uploadDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">By:</span>
            <span>{document.uploadedBy}</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 px-6 py-3 flex justify-between items-center">
        <Button variant="ghost" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Document</DropdownMenuItem>
            <DropdownMenuItem>Edit Details</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  )
}

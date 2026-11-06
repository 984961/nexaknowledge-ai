export type NavigationModule = 
  | 'dashboard'
  | 'assistant'
  | 'policies'
  | 'documents'
  | 'analytics'
  | 'datasources'
  | 'reports'
  | 'settings';

export type PolicyCategory = 
  | 'HR Policies'
  | 'Employee Policies'
  | 'IT and Security Policies'
  | 'Finance Policies'
  | 'Legal and Compliance Policies'
  | 'Workplace Policies'
  | 'Travel Policies';

export type PolicyStatus = 'Published' | 'Under Review' | 'Draft';

export interface PolicyVersion {
  version: string;
  updatedAt: string;
  author: string;
  changesSummary: string;
  content: string;
}

export interface CompanyPolicy {
  id: string;
  name: string;
  category: PolicyCategory;
  version: string;
  department: string;
  uploadedAt: string;
  lastUpdated: string;
  reviewDate: string;
  status: PolicyStatus;
  summary: string;
  content: string;
  fileType: 'pdf' | 'docx' | 'txt';
  fileSize: string;
  sections: {
    heading: string;
    page: number;
    text: string;
  }[];
  versions: PolicyVersion[];
}

export interface StructuredDataSummary {
  headers: string[];
  totalRows: number;
  totalColumns: number;
  rowsPreview: Record<string, any>[];
  numericMetrics?: { column: string; sum?: number; avg?: number; min?: number; max?: number }[];
}

export interface DocumentItem {
  id: string;
  name: string;
  fileType: 'pdf' | 'docx' | 'txt' | 'csv' | 'xlsx' | 'json';
  fileSize: string;
  fileSizeBytes?: number;
  category: string;
  uploadedAt: string;
  status: 'Indexed' | 'Processing' | 'Failed';
  extractedText: string;
  summary: string;
  chunkCount: number;
  structuredData?: StructuredDataSummary;
  rawSample?: string;
  errorMessage?: string;
}

export interface BusinessMetric {
  title: string;
  value: string;
  numericValue: number;
  change: string;
  isPositive: boolean;
  timeframe: string;
  subtext: string;
}

export interface RevenueDataPoint {
  period: string;
  revenue: number;
  expenses: number;
  target: number;
}

export interface CategorySalesDataPoint {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface ProductPerformanceDataPoint {
  product: string;
  revenue: number;
  unitsSold: number;
  margin: number;
}

export interface CustomerAnalyticsDataPoint {
  month: string;
  newCustomers: number;
  returningCustomers: number;
  churnRate: number;
}

export interface InventoryItemDataPoint {
  sku: string;
  productName: string;
  category: string;
  inStock: number;
  reorderPoint: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  turnoverRate: number;
}

export type QueryRoute = 
  | 'Company Policy RAG'
  | 'General Document RAG'
  | 'Business Analytics'
  | 'Dashboard Generator'
  | 'Report Generator'
  | 'Combined Intelligence';

export interface PolicyCitation {
  policyName: string;
  page: number;
  section: string;
  sourcePassage: string;
  version: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  route?: QueryRoute;
  citations?: PolicyCitation[];
  chartData?: {
    type: 'bar' | 'line' | 'pie';
    title: string;
    data: any[];
    dataKey?: string;
  };
  isLoading?: boolean;
}

export interface GeneratedReport {
  id: string;
  title: string;
  type: string;
  generatedAt: string;
  dateRange: string;
  executiveSummary: string;
  keyFindings: string[];
  metrics: { label: string; value: string; trend?: string }[];
  sourcesCited: string[];
  status: 'Ready' | 'Generating';
}

export interface DataSource {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'TXT' | 'CSV' | 'XLSX' | 'JSON' | 'PostgreSQL' | 'MySQL' | 'REST API';
  status: 'Connected' | 'Ready' | 'Configured' | 'Disconnected';
  lastSync: string;
  recordsCount: string;
  size: string;
  category: 'Document Storage' | 'Structured Database' | 'File System';
}

export interface DashboardFilterState {
  dateRange: 'last7' | 'last30' | 'q3' | 'ytd' | 'custom';
  region: 'all' | 'na' | 'emea' | 'apac' | 'latam';
  product: 'all' | 'enterprise' | 'cloud' | 'ai' | 'hardware';
}

import { 
  CompanyPolicy, 
  DocumentItem, 
  DataSource, 
  GeneratedReport, 
  RevenueDataPoint, 
  CategorySalesDataPoint, 
  ProductPerformanceDataPoint, 
  CustomerAnalyticsDataPoint, 
  InventoryItemDataPoint 
} from '../types';

export const INITIAL_POLICIES: CompanyPolicy[] = [
  {
    id: 'pol-01',
    name: 'Employee Leave & Time-Off Policy',
    category: 'HR Policies',
    version: 'v2.4',
    department: 'People & Culture',
    uploadedAt: '2026-09-15',
    lastUpdated: '2026-10-01',
    reviewDate: '2027-01-15',
    status: 'Published',
    summary: 'Details annual vacation entitlements (24 days), sick leave protocols, maternity/paternity leave (16 weeks paid), and compassionate leave provisions.',
    fileType: 'pdf',
    fileSize: '1.8 MB',
    content: `1. Purpose and Scope
This policy applies to all full-time and permanent employees of the organization.

2. Annual Vacation Leave
Full-time employees accrue 24 paid vacation days per calendar year, calculated on a pro-rata basis of 2.0 days per month. Unused leave up to a maximum of 5 days may be carried over into Q1 of the following year, expiring March 31st.

3. Sick and Medical Leave
Employees receive 12 days of paid medical leave per year. Medical certificates from a registered physician are mandatory for consecutive absences exceeding two working days.

4. Parental Leave
Primary caregivers are entitled to 16 weeks of fully paid parental leave. Secondary caregivers receive 6 weeks of paid leave, which can be taken within 12 months of childbirth or legal adoption.

5. Application Procedure
All leave requests must be submitted through the internal HR Portal at least 10 business days prior to scheduled time off for leaves exceeding 3 consecutive days.`,
    sections: [
      { heading: '1. Purpose and Scope', page: 1, text: 'This policy applies to all full-time and permanent employees across global entities.' },
      { heading: '2. Annual Vacation Leave (24 Days)', page: 2, text: 'Full-time employees accrue 24 paid vacation days per calendar year, calculated at 2.0 days per month. Carryover of up to 5 days allowed until March 31.' },
      { heading: '3. Sick and Medical Leave', page: 3, text: 'Employees receive 12 days paid medical leave annually. Medical certificates required for absences > 2 consecutive business days.' },
      { heading: '4. Parental Leave Provisions', page: 4, text: 'Primary caregivers receive 16 weeks of 100% paid parental leave. Secondary caregivers receive 6 weeks of paid leave within 12 months.' }
    ],
    versions: [
      {
        version: 'v2.4',
        updatedAt: '2026-10-01',
        author: 'Sarah Jenkins (Chief People Officer)',
        changesSummary: 'Increased annual vacation entitlement from 20 to 24 days. Extended secondary caregiver parental leave from 4 to 6 weeks.',
        content: 'Accrual increased to 24 days; parental leave updated.'
      },
      {
        version: 'v2.3',
        updatedAt: '2025-11-10',
        author: 'Elena Rostova (HR Director)',
        changesSummary: 'Initial digital policy revision with 20 days annual leave and standard medical cert rules.',
        content: 'Standard 20-day leave schedule.'
      }
    ]
  },
  {
    id: 'pol-02',
    name: 'Work-from-Home & Hybrid Working Framework',
    category: 'HR Policies',
    version: 'v3.1',
    department: 'People & Operations',
    uploadedAt: '2026-08-10',
    lastUpdated: '2026-09-20',
    reviewDate: '2026-12-31',
    status: 'Published',
    summary: 'Guidelines for 3-day office / 2-day remote hybrid schedule, home office ergonomics subsidy ($750), and core business collaboration hours.',
    fileType: 'docx',
    fileSize: '840 KB',
    content: `1. Hybrid Model Structure
Employees in eligible roles may work remotely up to 2 days per business week, with Tuesday and Thursday designated as mandatory core collaboration days in the office.

2. Core Hours
Core operational hours are between 10:00 AM and 4:00 PM local time. Remote staff must remain responsive via Slack, email, and scheduled video conferences during this window.

3. Home Office Equipment Stipend
A one-time equipment reimbursement of up to $750 is provided for dual monitors, ergonomic chairs, and peripheral accessories upon submission of valid receipts.`,
    sections: [
      { heading: '1. Hybrid Model Structure', page: 1, text: 'Eligible staff may work remotely up to 2 days per week. Tuesday and Thursday are designated anchor in-office collaboration days.' },
      { heading: '2. Core Collaboration Hours', page: 2, text: 'Core hours are 10:00 AM - 4:00 PM local timezone. Team members must be reachable via communication channels.' },
      { heading: '3. Home Workspace Allowance', page: 3, text: 'Eligible employees can claim up to $750 one-off stipend for certified ergonomic furniture and dual monitors.' }
    ],
    versions: [
      {
        version: 'v3.1',
        updatedAt: '2026-09-20',
        author: 'Markus Chen (COO)',
        changesSummary: 'Raised ergonomic equipment stipend from $500 to $750.',
        content: 'Stipend updated.'
      }
    ]
  },
  {
    id: 'pol-03',
    name: 'Information Security & Data Classification Policy',
    category: 'IT and Security Policies',
    version: 'v4.0',
    department: 'Information Security (InfoSec)',
    uploadedAt: '2026-07-01',
    lastUpdated: '2026-08-14',
    reviewDate: '2027-02-01',
    status: 'Published',
    summary: 'Zero-trust architecture mandates, multi-factor authentication (FIDO2/hardware tokens), data classification tiers (Public, Internal, Confidential, Restricted), and laptop encryption.',
    fileType: 'pdf',
    fileSize: '2.4 MB',
    content: `1. Data Classification Tiers
All organizational data must be categorized into one of four classifications: Public, Internal, Confidential, and Restricted (PII, Financials, Source Code).

2. Endpoint Security & Device Usage
Only company-issued laptops with FileVault / BitLocker 256-bit AES disk encryption and CrowdStrike EDR agents installed may access production infrastructure. USB storage drives are blocked by default.

3. Authentication Standards
Passwords must contain a minimum of 16 characters and undergo zero mandatory rotation unless compromised. FIDO2 / Passkey or TOTP hardware token MFA is required for all SSO logins.

4. Incident Reporting
Any suspected security anomaly or lost corporate device must be reported to security-ops@nexaknowledge.ai within 60 minutes of discovery.`,
    sections: [
      { heading: '1. Classification Matrix', page: 2, text: 'Four tiers: Public, Internal, Confidential, Restricted. Restricted includes PII, tokens, and financial ledgers.' },
      { heading: '2. Device Usage and Encryption', page: 3, text: 'Mandatory 256-bit AES full disk encryption. USB storage ports locked down by centralized MDM.' },
      { heading: '3. Authentication Protocol', page: 5, text: '16+ character passphrases with FIDO2 or biometric hardware MFA required for all systems.' }
    ],
    versions: [
      {
        version: 'v4.0',
        updatedAt: '2026-08-14',
        author: 'Dr. Tariq Al-Mansoor (CISO)',
        changesSummary: 'Transitioned from SMS MFA to mandatory hardware token / FIDO2 security keys.',
        content: 'Hardware MFA enforced.'
      }
    ]
  },
  {
    id: 'pol-04',
    name: 'Corporate Expense Reimbursement & Travel Policy',
    category: 'Finance Policies',
    version: 'v2.2',
    department: 'Finance & Treasury',
    uploadedAt: '2026-06-18',
    lastUpdated: '2026-09-05',
    reviewDate: '2026-12-15',
    status: 'Published',
    summary: 'Rules for business meals, per diem allowances ($85 domestic / $130 international), economy travel for flights under 6 hours, and expense report submission within 30 days.',
    fileType: 'pdf',
    fileSize: '1.5 MB',
    content: `1. Authorized Expenses
Legitimate business expenses incurred exclusively in pursuit of company activities will be reimbursed upon approval by the department head.

2. Daily Meal Allowances (Per Diem)
Domestic travel daily allowance: $85 per day. International travel allowance: $130 per day. Alcohol expenses must have prior VP-level authorization.

3. Flights and Accommodation
Commercial air travel under six hours must be booked in Economy or Premium Economy class. Flights exceeding six continuous flight hours are eligible for Business Class booking. Maximum hotel nightly ceiling is $240/night for Tier 1 cities and $175/night for Tier 2 cities.

4. Approval Thresholds
Expenses up to $1,000 require Manager approval; $1,001 - $10,000 require Department Director approval; expenses exceeding $10,000 require CFO sign-off.`,
    sections: [
      { heading: '2. Daily Meal Allowances', page: 2, text: 'Daily meal cap is $85 for domestic travel and $130 for international trips. Receipts required for claims over $25.' },
      { heading: '3. Air Travel Guidelines', page: 3, text: 'Flights under 6 hours duration must be Economy class. Flights >= 6 hours qualify for Business Class.' },
      { heading: '4. Financial Approval Thresholds', page: 4, text: 'Manager approval <= $1,000. Director approval <= $10,000. CFO authorization required for amounts > $10,000.' }
    ],
    versions: [
      {
        version: 'v2.2',
        updatedAt: '2026-09-05',
        author: 'Victoria Sterling (Finance Controller)',
        changesSummary: 'Increased international meal per diem from $110 to $130.',
        content: 'Per diem adjusted.'
      }
    ]
  },
  {
    id: 'pol-05',
    name: 'Code of Business Conduct & Ethics',
    category: 'Employee Policies',
    version: 'v1.5',
    department: 'Legal & Compliance',
    uploadedAt: '2026-05-10',
    lastUpdated: '2026-07-22',
    reviewDate: '2027-05-10',
    status: 'Published',
    summary: 'Standards on conflicts of interest, anti-bribery, non-retaliation for whistleblowers, and maintaining an inclusive harassment-free workplace.',
    fileType: 'pdf',
    fileSize: '1.2 MB',
    content: `1. Principles of Integrity
We operate under zero tolerance for bribery, commercial corruption, or discriminatory behaviour.

2. Conflicts of Interest
Employees must disclose any external commercial engagements, advisory roles, or family connections with vendors through the Compliance Disclosure form.

3. Whistleblower Protection
Reports of unethical conduct can be filed anonymously through ethics@nexaknowledge.ai. Zero retaliation is strictly enforced against reporters.`,
    sections: [
      { heading: '1. Anti-Bribery and Corruption', page: 1, text: 'Strict prohibition against offering or accepting improper kickbacks or gifts exceeding $50 in value.' },
      { heading: '3. Whistleblower Safeguards', page: 3, text: 'Anonymous reporting guaranteed with zero retaliation immunity for good-faith disclosures.' }
    ],
    versions: [
      {
        version: 'v1.5',
        updatedAt: '2026-07-22',
        author: 'Marcus Vance (Chief Legal Counsel)',
        changesSummary: 'Formalized anonymous whistleblower hotline integration.',
        content: 'Ethics hotline added.'
      }
    ]
  },
  {
    id: 'pol-06',
    name: 'Global Data Privacy & GDPR Compliance Charter',
    category: 'Legal and Compliance Policies',
    version: 'v2.0',
    department: 'Legal & Risk',
    uploadedAt: '2026-04-12',
    lastUpdated: '2026-06-30',
    reviewDate: '2026-11-30',
    status: 'Under Review',
    summary: 'Customer data retention periods (3 years maximum for inactive accounts), Right to be Forgotten workflows, and Data Protection Impact Assessments (DPIA).',
    fileType: 'pdf',
    fileSize: '3.1 MB',
    content: `1. Data Minimization
Customer personal identifiable information (PII) must only be captured when strictly necessary for contract fulfillment.

2. Retention Schedule
Inactive user telemetry is purged after 12 months. Primary user account records are permanently purged after 36 months of inactivity unless required for legal retention.

3. Subject Access Requests (DSAR)
All DSAR requests must be fulfilled within 30 calendar days by the Data Privacy Office.`,
    sections: [
      { heading: '1. Lawful Basis and Minimization', page: 1, text: 'Data collection restricted to defined operational scopes with explicit user consent.' },
      { heading: '2. Data Retention Schedules', page: 2, text: 'Telemetry purged at 12 months. Inactive records purged after 36 months.' }
    ],
    versions: [
      {
        version: 'v2.0',
        updatedAt: '2026-06-30',
        author: 'Amara Patel (Data Protection Officer)',
        changesSummary: 'Revised DSAR turnaround time to 30 days and added DPIA checklists.',
        content: 'GDPR workflows updated.'
      }
    ]
  },
  {
    id: 'pol-07',
    name: 'Workplace Health, Safety & Ergonomics Protocol',
    category: 'Workplace Policies',
    version: 'v1.2',
    department: 'Facilities & Workplace',
    uploadedAt: '2026-03-05',
    lastUpdated: '2026-05-15',
    reviewDate: '2027-03-01',
    status: 'Published',
    summary: 'Office evacuation routes, first-aid officer locations, desk ergonomics guidelines, and indoor air quality standards.',
    fileType: 'pdf',
    fileSize: '950 KB',
    content: `1. Emergency Evacuation
In the event of an audible alarm, all employees must proceed via emergency stairwells to designated Assembly Point B in Central Plaza. Do not use elevators.

2. Ergonomic Assessments
Staff may request a professional ergonomic workstation assessment from Facilities within their first 30 days of employment.`,
    sections: [
      { heading: '1. Evacuation Procedures', page: 1, text: 'Proceed via stairwells to Assembly Point B. Elevators automatically grounded.' },
      { heading: '2. Workstation Ergonomics', page: 2, text: 'Free assessment provided for adjustable standing desks and monitor arms.' }
    ],
    versions: [
      {
        version: 'v1.2',
        updatedAt: '2026-05-15',
        author: 'Robert Lee (Head of Facilities)',
        changesSummary: 'Added sit-stand desk request form protocol.',
        content: 'Facilities update.'
      }
    ]
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-01',
    name: 'Q3_2026_Global_Financial_Performance_Report.pdf',
    fileType: 'pdf',
    fileSize: '4.2 MB',
    category: 'Financial Analysis',
    uploadedAt: '2026-10-14',
    status: 'Indexed',
    chunkCount: 38,
    extractedText: 'Consolidated revenue for Q3 2026 reached $14.8M, representing a 22.4% YoY increase driven by Enterprise AI Suite expansion and high SaaS renewals.',
    summary: 'Executive analysis of Q3 2026 fiscal figures, OPEX breakdown, gross margin expansion to 74.2%, and regional growth in North America and EMEA.'
  },
  {
    id: 'doc-02',
    name: 'Enterprise_Sales_Master_Dataset_2026.csv',
    fileType: 'csv',
    fileSize: '12.5 MB',
    category: 'Sales Data',
    uploadedAt: '2026-10-12',
    status: 'Indexed',
    chunkCount: 142,
    extractedText: 'Order_ID, Customer_Name, Product_Line, Region, Quantity, Unit_Price, Total_Revenue, Status, Date\nORD-9021, Acme Corp, NexaAI Suite Pro, North America, 5, 24000, 120000, Delivered, 2026-09-28',
    summary: 'Comprehensive 4,800+ row transaction ledger covering enterprise software licenses, deployment services, and recurring maintenance contracts.'
  },
  {
    id: 'doc-03',
    name: 'Product_Architecture_and_Security_Whitepaper.docx',
    fileType: 'docx',
    fileSize: '2.1 MB',
    category: 'Engineering & Architecture',
    uploadedAt: '2026-09-25',
    status: 'Indexed',
    chunkCount: 24,
    extractedText: 'Technical overview of zero-trust microsegmentation, vector database embedding index design, and isolated multi-tenant data barriers.',
    summary: 'Detailed system architecture specification detailing RAG orchestration, ChromaDB vector indexing, and Gemini integration security boundaries.'
  },
  {
    id: 'doc-04',
    name: 'Inventory_Stock_Levels_Q4_Outlook.xlsx',
    fileType: 'xlsx',
    fileSize: '3.4 MB',
    category: 'Operations',
    uploadedAt: '2026-10-02',
    status: 'Indexed',
    chunkCount: 16,
    extractedText: 'SKU, Product, Warehouse, In_Stock, Reorder_Threshold, Lead_Time_Days, Status\nHW-902, QuantumEdge Gateway, Dallas Hub, 14, 25, 12, Low Stock',
    summary: 'Operational inventory sheet tracking hardware appliance stock, edge compute nodes, and sensor modules across 4 regional fulfillment warehouses.'
  },
  {
    id: 'doc-05',
    name: 'Customer_Success_Quarterly_QBR_Deck.pdf',
    fileType: 'pdf',
    fileSize: '6.7 MB',
    category: 'Customer Intelligence',
    uploadedAt: '2026-09-18',
    status: 'Indexed',
    chunkCount: 45,
    extractedText: 'Net Revenue Retention (NRR) reached 128% in enterprise cohort. Customer Satisfaction Score (CSAT) averaged 94.6% across 320 corporate accounts.',
    summary: 'Quarterly review examining customer retention metrics, enterprise churn factors, onboarding timeframes, and key satisfaction benchmarks.'
  }
];

export const INITIAL_DATA_SOURCES: DataSource[] = [
  {
    id: 'ds-01',
    name: 'Enterprise Document Knowledge Store',
    type: 'PDF',
    status: 'Connected',
    lastSync: '10 minutes ago',
    recordsCount: '18 Documents / 420 Chunks',
    size: '48.2 MB',
    category: 'Document Storage'
  },
  {
    id: 'ds-02',
    name: 'Production PostgreSQL Analytics Cluster',
    type: 'PostgreSQL',
    status: 'Connected',
    lastSync: '2 minutes ago',
    recordsCount: '48,210 Transaction Records',
    size: '184 MB',
    category: 'Structured Database'
  },
  {
    id: 'ds-03',
    name: 'Company Policies & Compliance Archive',
    type: 'DOCX',
    status: 'Connected',
    lastSync: '1 hour ago',
    recordsCount: '7 Active Policies / 14 Versions',
    size: '14.8 MB',
    category: 'Document Storage'
  },
  {
    id: 'ds-04',
    name: 'ERP Inventory & Supply Chain Stream',
    type: 'XLSX',
    status: 'Connected',
    lastSync: '25 minutes ago',
    recordsCount: '1,240 Stock Keep Units (SKUs)',
    size: '8.4 MB',
    category: 'File System'
  },
  {
    id: 'ds-05',
    name: 'Global CRM & Customer Records',
    type: 'REST API',
    status: 'Configured',
    lastSync: 'Ready to connect',
    recordsCount: 'Pending OAuth sync',
    size: '--',
    category: 'Structured Database'
  },
  {
    id: 'ds-06',
    name: 'Corporate Financial Ledger (MySQL)',
    type: 'MySQL',
    status: 'Configured',
    lastSync: 'Ready to connect',
    recordsCount: 'Awaiting credentials',
    size: '--',
    category: 'Structured Database'
  }
];

export const INITIAL_REPORTS: GeneratedReport[] = [
  {
    id: 'rep-01',
    title: 'Monthly Executive Business & Financial Overview',
    type: 'Monthly Business Report',
    generatedAt: '2026-11-01',
    dateRange: 'October 1 - October 31, 2026',
    executiveSummary: 'October closed with $1,420,800 in recognized revenue, representing an 18.2% outperformance versus budget forecast. Gross margin sustained at 74.5% due to cloud cost optimization and higher high-margin AI subscription adoption.',
    keyFindings: [
      'NexaAI Suite Pro generated 42% of total new monthly recurring revenue.',
      'Customer churn decreased to 1.1% in the Enterprise segment.',
      'APAC revenue expanded by 34% following the Singapore enterprise launch.',
      'Inventory reorder triggered for QuantumEdge hardware devices due to surge in demand.'
    ],
    metrics: [
      { label: 'Total Revenue', value: '$1,420,800', trend: '+18.2%' },
      { label: 'Net Profit', value: '$418,500', trend: '+22.4%' },
      { label: 'Active Enterprise Clients', value: '384', trend: '+14' },
      { label: 'Blended Gross Margin', value: '74.5%', trend: '+2.1%' }
    ],
    sourcesCited: [
      'Enterprise_Sales_Master_Dataset_2026.csv',
      'Q3_2026_Global_Financial_Performance_Report.pdf',
      'Production PostgreSQL Analytics Cluster'
    ],
    status: 'Ready'
  },
  {
    id: 'rep-02',
    title: 'Comprehensive Company Policy & Compliance Audit',
    type: 'Company Policy Summary',
    generatedAt: '2026-10-28',
    dateRange: 'Year 2026 Audited Cycle',
    executiveSummary: 'All 7 organizational policies were analyzed against SOC2 Type II and GDPR readiness standards. 6 policies are fully published with current approvals, and 1 policy (Global Data Privacy Charter) is undergoing scheduled bi-annual legal review.',
    keyFindings: [
      'Zero-trust hardware MFA policy has achieved 98.4% organizational adoption.',
      'Annual vacation leave entitlement increase to 24 days was successfully adopted in October.',
      'Travel and expense per diem adjustments reflect current global inflation indices.',
      'Upcoming review date for Remote Work framework scheduled for December 31, 2026.'
    ],
    metrics: [
      { label: 'Total Managed Policies', value: '7 Policies', trend: '100% catalogued' },
      { label: 'Published & Active', value: '6 / 7', trend: '85.7%' },
      { label: 'Under Review', value: '1 / 7', trend: '14.3%' },
      { label: 'Average Review Age', value: '4.2 Months', trend: 'Healthy' }
    ],
    sourcesCited: [
      'Employee Leave & Time-Off Policy (v2.4)',
      'Information Security & Data Classification Policy (v4.0)',
      'Corporate Expense Reimbursement & Travel Policy (v2.2)',
      'Global Data Privacy & GDPR Compliance Charter (v2.0)'
    ],
    status: 'Ready'
  }
];

export const REVENUE_TRENDS_DATA: RevenueDataPoint[] = [
  { period: 'May 2026', revenue: 980000, expenses: 620000, target: 920000 },
  { period: 'Jun 2026', revenue: 1120000, expenses: 680000, target: 1050000 },
  { period: 'Jul 2026', revenue: 1190000, expenses: 710000, target: 1150000 },
  { period: 'Aug 2026', revenue: 1280000, expenses: 740000, target: 1200000 },
  { period: 'Sep 2026', revenue: 1350000, expenses: 790000, target: 1300000 },
  { period: 'Oct 2026', revenue: 1420800, expenses: 815000, target: 1350000 },
  { period: 'Nov 2026 (Est)', revenue: 1510000, expenses: 840000, target: 1420000 }
];

export const CATEGORY_SALES_DATA: CategorySalesDataPoint[] = [
  { name: 'Enterprise AI Suite', value: 580000, color: '#8B5CF6', percentage: 41 },
  { name: 'Cloud Infrastructure', value: 340000, color: '#3B82F6', percentage: 24 },
  { name: 'Data Intelligence Tools', value: 240000, color: '#22D3EE', percentage: 17 },
  { name: 'Managed Security', value: 160000, color: '#10B981', percentage: 11 },
  { name: 'Hardware Gateways', value: 100800, color: '#F59E0B', percentage: 7 }
];

export const PRODUCT_PERFORMANCE_DATA: ProductPerformanceDataPoint[] = [
  { product: 'NexaAI Suite Pro', revenue: 580000, unitsSold: 420, margin: 78 },
  { product: 'CloudSecure Shield', revenue: 340000, unitsSold: 680, margin: 72 },
  { product: 'DataVortex Platform', revenue: 240000, unitsSold: 310, margin: 68 },
  { product: 'InsightPulse Analytics', revenue: 160000, unitsSold: 290, margin: 82 },
  { product: 'QuantumEdge Gateway', revenue: 100800, unitsSold: 140, margin: 44 }
];

export const CUSTOMER_ANALYTICS_DATA: CustomerAnalyticsDataPoint[] = [
  { month: 'Jun 2026', newCustomers: 38, returningCustomers: 260, churnRate: 1.4 },
  { month: 'Jul 2026', newCustomers: 44, returningCustomers: 285, churnRate: 1.3 },
  { month: 'Aug 2026', newCustomers: 52, returningCustomers: 312, churnRate: 1.2 },
  { month: 'Sep 2026', newCustomers: 61, returningCustomers: 348, churnRate: 1.1 },
  { month: 'Oct 2026', newCustomers: 68, returningCustomers: 384, churnRate: 1.0 }
];

export const INVENTORY_ANALYTICS_DATA: InventoryItemDataPoint[] = [
  { sku: 'HW-NX-100', productName: 'QuantumEdge AI Gateway v2', category: 'Hardware', inStock: 18, reorderPoint: 25, status: 'Low Stock', turnoverRate: 8.4 },
  { sku: 'HW-NX-220', productName: 'DataVortex Edge Appliance', category: 'Hardware', inStock: 8, reorderPoint: 20, status: 'Low Stock', turnoverRate: 6.2 },
  { sku: 'HW-SEC-01', productName: 'Hardware Token FIDO2 Keys', category: 'Security Hardware', inStock: 340, reorderPoint: 50, status: 'In Stock', turnoverRate: 14.1 },
  { sku: 'HW-SRV-90', productName: 'Rackmount Inference Server R1', category: 'Servers', inStock: 0, reorderPoint: 5, status: 'Out of Stock', turnoverRate: 4.8 },
  { sku: 'LIC-ENT-01', productName: 'NexaAI Enterprise Core Seat', category: 'Licenses', inStock: 9999, reorderPoint: 100, status: 'In Stock', turnoverRate: 32.0 },
  { sku: 'LIC-SEC-02', productName: 'CloudSecure Shield 1-Yr Node', category: 'Licenses', inStock: 4800, reorderPoint: 500, status: 'In Stock', turnoverRate: 21.5 }
];

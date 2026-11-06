import { DocumentItem } from '../types';

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function detectFileType(fileName: string): 'pdf' | 'docx' | 'csv' | 'xlsx' | 'json' | 'txt' | null {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return 'pdf';
    case 'docx':
      return 'docx';
    case 'csv':
      return 'csv';
    case 'xlsx':
    case 'xls':
      return 'xlsx';
    case 'json':
      return 'json';
    case 'txt':
      return 'txt';
    default:
      return null;
  }
}

export async function fetchAllDocuments(): Promise<DocumentItem[]> {
  try {
    const res = await fetch('/api/documents');
    if (!res.ok) {
      throw new Error(`Failed to fetch documents: ${res.statusText}`);
    }
    const data = await res.json();
    return data.documents || [];
  } catch (err) {
    console.warn('Could not fetch documents from server, using fallback:', err);
    return [];
  }
}

export async function uploadDocumentToServer(
  file: File,
  category: string,
  onProgress?: (stage: string, percent: number) => void
): Promise<DocumentItem> {
  // 1. Validate File Size Limit
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File '${file.name}' exceeds the maximum allowed size of 50 MB (File size: ${formatBytes(file.size)}).`);
  }

  // 2. Validate File Extension
  const detectedType = detectFileType(file.name);
  if (!detectedType) {
    throw new Error(`File '${file.name}' has an unsupported extension. Please upload PDF, DOCX, CSV, XLSX, JSON, or TXT.`);
  }

  onProgress?.('Reading file into memory...', 25);

  // 3. Read file as Base64 Data URL
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file from local filesystem.'));
    reader.readAsDataURL(file);
  });

  onProgress?.('Uploading and analyzing content...', 60);

  // 4. Send payload to server
  const response = await fetch('/api/documents/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: file.name,
      fileType: detectedType,
      category: category || 'General Knowledge',
      fileSize: formatBytes(file.size),
      fileSizeBytes: file.size,
      base64Data,
    }),
  });

  onProgress?.('Vectorizing and generating RAG embeddings...', 90);

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Upload failed with HTTP ${response.status}: ${response.statusText}`);
  }

  const result = await response.json();
  onProgress?.('Indexed successfully!', 100);
  return result.document;
}

export async function deleteDocumentFromServer(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' });
    return res.ok;
  } catch (err) {
    console.error('Failed to delete document:', err);
    return false;
  }
}

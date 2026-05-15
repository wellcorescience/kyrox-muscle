import * as XLSX from 'xlsx';

interface ExportData {
  Code: string;
  Product: string;
  'Batch Number': string;
  'Created Date': string;
}

export function exportCodesToExcel(data: ExportData[], fileName: string = 'kyrox-auth-codes-2026.xlsx') {
  // Create worksheet from JSON
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Create workbook and append worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Auth Codes');
  
  // Generate buffer and trigger download
  XLSX.writeFile(workbook, fileName);
}

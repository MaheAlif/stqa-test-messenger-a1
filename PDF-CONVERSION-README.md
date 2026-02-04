# PDF Conversion Tool

This tool converts the `SystemTestingReport.md` file to a professionally formatted PDF document.

## Prerequisites

Node.js must be installed on your system. This tool requires two npm packages:
- `marked` - Markdown to HTML converter
- `puppeteer` - Headless Chrome for PDF generation

## Installation

1. **Install dependencies:**
   ```bash
   npm install marked puppeteer
   ```

   Note: Puppeteer will download Chromium (~150MB) on first install.

## Usage

### Basic Usage

```bash
node convert-to-pdf.js
```

This will:
- Read `SystemTestingReport.md`
- Convert it to HTML with professional styling
- Generate `SystemTestingReport.pdf`

### Output

The generated PDF includes:
- Professional formatting with custom styles
- Color-coded tables
- Syntax-highlighted code blocks
- Page numbers and headers
- Proper page breaks
- A4 page format with standard margins

## Features

✅ **Professional Styling**
- Custom fonts and colors
- Formatted tables with alternating row colors
- Syntax highlighting for code blocks
- Proper headings hierarchy

✅ **Print Optimization**
- Page break control (no orphaned headers)
- Table integrity (tables don't split across pages)
- Proper margins (20mm all sides)
- Header and footer with page numbers

✅ **Accessibility**
- Clear text hierarchy
- High contrast colors
- Readable font sizes

## Customization

Edit `convert-to-pdf.js` to customize:

```javascript
const CONFIG = {
    inputFile: 'SystemTestingReport.md',    // Input markdown file
    outputFile: 'SystemTestingReport.pdf',  // Output PDF file
    pageFormat: 'A4',                       // Page size (A4, Letter, etc.)
    marginTop: '20mm',                      // Top margin
    marginBottom: '20mm',                   // Bottom margin
    marginLeft: '20mm',                     // Left margin
    marginRight: '20mm'                     // Right margin
};
```

## Troubleshooting

### Issue: "Cannot find module 'marked'" or "Cannot find module 'puppeteer'"
**Solution:** Install the dependencies:
```bash
npm install marked puppeteer
```

### Issue: Puppeteer fails to launch
**Solution:** Try running with these flags:
```javascript
const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
});
```

### Issue: PDF is too large
**Solution:** The tool automatically compresses the PDF. If it's still large, consider:
- Reducing image quality in the markdown
- Removing unnecessary sections
- Using simpler tables

### Issue: Tables are cut off
**Solution:** The tool includes `page-break-inside: avoid` for tables. If tables are very large, they may still overflow. Consider splitting large tables.

## Alternative: Online Converters

If you prefer not to install Node.js dependencies, you can use online converters:

1. **Markdown to PDF (Browser-based):**
   - https://www.markdowntopdf.com/
   - https://md2pdf.netlify.app/
   - https://cloudconvert.com/md-to-pdf

2. **VSCode Extensions:**
   - "Markdown PDF" extension by yzane
   - Install from VSCode marketplace
   - Right-click markdown file → "Markdown PDF: Export (pdf)"

## File Size

Expected output file size: ~100-200 KB (depending on content)

## Support

For issues or questions:
1. Check that Node.js is installed: `node --version`
2. Verify dependencies are installed: `npm list marked puppeteer`
3. Check input file exists: `ls SystemTestingReport.md`

## License

This tool is provided as-is for educational purposes as part of the System Testing assignment.

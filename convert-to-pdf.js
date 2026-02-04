#!/usr/bin/env node

/**
 * Markdown to PDF Converter
 * Converts SystemTestingReport.md to a professionally formatted PDF
 * 
 * Usage: node convert-to-pdf.js
 * 
 * Requirements: Install dependencies first
 * npm install marked puppeteer
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const puppeteer = require('puppeteer');

// Configuration
const CONFIG = {
    inputFile: 'SystemTestingReport.md',
    outputFile: 'SystemTestingReport.pdf',
    pageFormat: 'A4',
    marginTop: '20mm',
    marginBottom: '20mm',
    marginLeft: '20mm',
    marginRight: '20mm'
};

// Custom CSS for professional PDF styling
const CSS_STYLES = `
<style>
    @page {
        margin: ${CONFIG.marginTop} ${CONFIG.marginRight} ${CONFIG.marginBottom} ${CONFIG.marginLeft};
    }
    
    body {
        font-family: 'Segoe UI', Arial, sans-serif;
        font-size: 11pt;
        line-height: 1.6;
        color: #333;
        max-width: 100%;
    }
    
    h1 {
        color: #2c3e50;
        border-bottom: 3px solid #3498db;
        padding-bottom: 10px;
        margin-top: 0;
        font-size: 24pt;
        page-break-before: avoid;
    }
    
    h2 {
        color: #34495e;
        border-bottom: 2px solid #95a5a6;
        padding-bottom: 8px;
        margin-top: 30px;
        font-size: 18pt;
        page-break-after: avoid;
    }
    
    h3 {
        color: #2c3e50;
        margin-top: 20px;
        font-size: 14pt;
        page-break-after: avoid;
    }
    
    h4 {
        color: #34495e;
        margin-top: 15px;
        font-size: 12pt;
        page-break-after: avoid;
    }
    
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 15px 0;
        font-size: 10pt;
        page-break-inside: avoid;
    }
    
    table th {
        background-color: #3498db;
        color: white;
        padding: 8px;
        text-align: left;
        font-weight: bold;
        border: 1px solid #2980b9;
    }
    
    table td {
        padding: 6px 8px;
        border: 1px solid #ddd;
    }
    
    table tr:nth-child(even) {
        background-color: #f9f9f9;
    }
    
    table tr:hover {
        background-color: #f5f5f5;
    }
    
    code {
        background-color: #f4f4f4;
        padding: 2px 5px;
        border-radius: 3px;
        font-family: 'Consolas', 'Monaco', monospace;
        font-size: 9pt;
        color: #c7254e;
    }
    
    pre {
        background-color: #f4f4f4;
        padding: 10px;
        border-radius: 5px;
        border-left: 4px solid #3498db;
        overflow-x: auto;
        font-size: 9pt;
        page-break-inside: avoid;
    }
    
    pre code {
        background-color: transparent;
        padding: 0;
        color: #333;
    }
    
    blockquote {
        border-left: 4px solid #3498db;
        padding-left: 15px;
        margin: 15px 0;
        color: #555;
        font-style: italic;
    }
    
    ul, ol {
        margin: 10px 0;
        padding-left: 25px;
    }
    
    li {
        margin: 5px 0;
    }
    
    strong {
        color: #2c3e50;
        font-weight: 600;
    }
    
    em {
        color: #555;
    }
    
    hr {
        border: none;
        border-top: 2px solid #ecf0f1;
        margin: 30px 0;
    }
    
    /* Specific styling for test case tables */
    table td:nth-child(1) {
        font-weight: 500;
        white-space: nowrap;
    }
    
    /* Highlight failed tests */
    table td:contains("Fail") {
        color: #e74c3c;
        font-weight: bold;
    }
    
    /* Print-specific styles */
    @media print {
        body {
            font-size: 10pt;
        }
        
        h1 {
            page-break-before: always;
        }
        
        h1:first-of-type {
            page-break-before: avoid;
        }
        
        h2, h3, h4 {
            page-break-after: avoid;
        }
        
        table, pre, blockquote {
            page-break-inside: avoid;
        }
        
        img {
            page-break-inside: avoid;
        }
    }
    
    /* Table of Contents styling */
    nav ul {
        list-style: none;
        padding-left: 0;
    }
    
    nav ul li {
        margin: 8px 0;
    }
    
    nav a {
        color: #3498db;
        text-decoration: none;
    }
    
    nav a:hover {
        text-decoration: underline;
    }
    
    /* Severity badges */
    .severity-critical {
        background-color: #e74c3c;
        color: white;
        padding: 2px 8px;
        border-radius: 3px;
        font-weight: bold;
        font-size: 9pt;
    }
    
    .severity-high {
        background-color: #e67e22;
        color: white;
        padding: 2px 8px;
        border-radius: 3px;
        font-weight: bold;
        font-size: 9pt;
    }
    
    .severity-medium {
        background-color: #f39c12;
        color: white;
        padding: 2px 8px;
        border-radius: 3px;
        font-weight: bold;
        font-size: 9pt;
    }
    
    .severity-low {
        background-color: #95a5a6;
        color: white;
        padding: 2px 8px;
        border-radius: 3px;
        font-weight: bold;
        font-size: 9pt;
    }
</style>
`;

async function convertMarkdownToPDF() {
    try {
        console.log('📄 Starting Markdown to PDF conversion...');
        
        // Read the markdown file
        console.log(`📖 Reading ${CONFIG.inputFile}...`);
        const markdownContent = fs.readFileSync(CONFIG.inputFile, 'utf-8');
        
        // Convert markdown to HTML
        console.log('🔄 Converting Markdown to HTML...');
        const htmlContent = marked.parse(markdownContent);
        
        // Create complete HTML document with styling
        const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>System Testing Report - Messenger API</title>
    ${CSS_STYLES}
</head>
<body>
    ${htmlContent}
</body>
</html>
`;
        
        // Launch puppeteer
        console.log('🚀 Launching browser...');
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Set content
        console.log('📝 Setting HTML content...');
        await page.setContent(fullHTML, {
            waitUntil: 'networkidle0'
        });
        
        // Generate PDF
        console.log('📄 Generating PDF...');
        await page.pdf({
            path: CONFIG.outputFile,
            format: CONFIG.pageFormat,
            printBackground: true,
            margin: {
                top: CONFIG.marginTop,
                bottom: CONFIG.marginBottom,
                left: CONFIG.marginLeft,
                right: CONFIG.marginRight
            },
            displayHeaderFooter: true,
            headerTemplate: `
                <div style="font-size: 9pt; width: 100%; text-align: center; color: #777;">
                    <span>System Testing Report - Messenger API</span>
                </div>
            `,
            footerTemplate: `
                <div style="font-size: 9pt; width: 100%; text-align: center; color: #777; padding: 5px;">
                    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
                </div>
            `
        });
        
        await browser.close();
        
        console.log('✅ PDF generated successfully!');
        console.log(`📁 Output file: ${path.resolve(CONFIG.outputFile)}`);
        console.log(`📊 File size: ${(fs.statSync(CONFIG.outputFile).size / 1024).toFixed(2)} KB`);
        
    } catch (error) {
        console.error('❌ Error during conversion:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// Check if required packages are installed
function checkDependencies() {
    const requiredPackages = ['marked', 'puppeteer'];
    const missingPackages = [];
    
    for (const pkg of requiredPackages) {
        try {
            require.resolve(pkg);
        } catch (e) {
            missingPackages.push(pkg);
        }
    }
    
    if (missingPackages.length > 0) {
        console.error('❌ Missing required packages:', missingPackages.join(', '));
        console.log('\n💡 Install them with:');
        console.log(`   npm install ${missingPackages.join(' ')}`);
        process.exit(1);
    }
}

// Main execution
if (require.main === module) {
    checkDependencies();
    
    // Check if input file exists
    if (!fs.existsSync(CONFIG.inputFile)) {
        console.error(`❌ Input file not found: ${CONFIG.inputFile}`);
        process.exit(1);
    }
    
    convertMarkdownToPDF();
}

module.exports = { convertMarkdownToPDF };

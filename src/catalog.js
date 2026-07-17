// Generated from convertica.net /api/docs.json (2026-07-17), field names verified against source.
export const CATALOG = [
  {
    "slug": "compare-pdf",
    "path": "/api/v1/compare-pdf/",
    "summary": "Compare Two PDFs",
    "fileField": "pdf_file_1",
    "multiFile": false,
    "params": [
      {
        "name": "diff_threshold",
        "type": "integer",
        "required": false,
        "description": "Visual diff sensitivity threshold from 5 to 80 (lower value = more sensitive)"
      }
    ],
    "extraFileFields": [
      "pdf_file_2"
    ]
  },
  {
    "slug": "epub-to-pdf",
    "path": "/api/v1/epub-to-pdf/",
    "summary": "EPUB to PDF Converter",
    "fileField": "epub_file",
    "multiFile": false,
    "params": []
  },
  {
    "slug": "excel-to-pdf",
    "path": "/api/v1/excel-to-pdf/",
    "summary": "Convert Excel to PDF",
    "fileField": "excel_file",
    "multiFile": false,
    "params": []
  },
  {
    "slug": "html-to-pdf",
    "path": "/api/v1/html-to-pdf/",
    "summary": "Convert raw HTML content to a PDF document",
    "fileField": null,
    "multiFile": false,
    "params": [
      {
        "name": "html_content",
        "type": "string",
        "required": true,
        "description": "HTML content to convert to PDF"
      },
      {
        "name": "filename",
        "type": "string",
        "required": false,
        "description": "Base filename for the output PDF (default 'converted')"
      },
      {
        "name": "page_size",
        "type": "string",
        "required": false,
        "description": "PDF page size (e.g. A4, Letter)"
      },
      {
        "name": "margin_top",
        "type": "string",
        "required": false,
        "description": "Top margin, e.g. '1cm' or '0.5in'"
      },
      {
        "name": "margin_bottom",
        "type": "string",
        "required": false,
        "description": "Bottom margin"
      },
      {
        "name": "margin_left",
        "type": "string",
        "required": false,
        "description": "Left margin"
      },
      {
        "name": "margin_right",
        "type": "string",
        "required": false,
        "description": "Right margin"
      }
    ],
    "noFile": true
  },
  {
    "slug": "image/convert",
    "path": "/api/v1/image/convert/",
    "summary": "Convert an image to a different format. Supported input formats: JPEG, PNG, WebP, GIF, BMP, TIFF. Supported output formats: JPEG, PNG, WebP, GIF, BMP, TIFF. Alpha channel is handled automatically for ",
    "fileField": "image_file",
    "multiFile": false,
    "params": [
      {
        "name": "output_format",
        "type": "string",
        "required": true,
        "description": "Target format: JPEG, PNG, WebP, GIF, BMP, or TIFF."
      },
      {
        "name": "quality",
        "type": "integer",
        "required": false,
        "description": "Quality for lossy formats (JPEG, WebP) — 10-100, default 90."
      }
    ]
  },
  {
    "slug": "image/heic-convert",
    "path": "/api/v1/image/heic-convert/",
    "summary": "Convert an Apple HEIC / HEIF photo to JPG, PNG, or PDF. Premium feature: gated by active subscription. Common use: re-encode iPhone photos for compatibility with Windows, web, or print workflows.",
    "fileField": "image_file",
    "multiFile": false,
    "params": [
      {
        "name": "output_format",
        "type": "string",
        "required": false,
        "description": "Target format: JPEG (alias JPG), PNG, or PDF."
      },
      {
        "name": "quality",
        "type": "integer",
        "required": false,
        "description": "Quality for JPEG output (10-100, default 90)."
      }
    ]
  },
  {
    "slug": "image/optimize",
    "path": "/api/v1/image/optimize/",
    "summary": "Optimize an image by compressing it to reduce file size. Supports JPEG, PNG, WebP, and GIF formats. Optionally convert to a different format or resize to fit within max dimensions.",
    "fileField": "image_file",
    "multiFile": false,
    "params": [
      {
        "name": "quality",
        "type": "integer",
        "required": false,
        "description": "Compression quality (10-100, default 85)."
      },
      {
        "name": "output_format",
        "type": "string",
        "required": false,
        "description": "Output format: '' (keep original), 'JPEG', 'PNG', or 'WebP'."
      },
      {
        "name": "max_width",
        "type": "integer",
        "required": false,
        "description": "Maximum output width in pixels (optional, maintains aspect ratio)."
      },
      {
        "name": "max_height",
        "type": "integer",
        "required": false,
        "description": "Maximum output height in pixels (optional, maintains aspect ratio)."
      }
    ]
  },
  {
    "slug": "image/password-protect",
    "path": "/api/v1/image/password-protect/",
    "summary": "Turn one or more images into a single AES-256 password-protected PDF. The PDF requires the password to open.",
    "fileField": "image_files",
    "multiFile": true,
    "params": [
      {
        "name": "password",
        "type": "string",
        "required": true,
        "description": "Password to protect the output PDF"
      },
      {
        "name": "user_password",
        "type": "string",
        "required": false,
        "description": "User password (optional). If not provided, 'password' will be used"
      },
      {
        "name": "owner_password",
        "type": "string",
        "required": false,
        "description": "Owner password (optional). If not provided, 'password' will be used"
      }
    ]
  },
  {
    "slug": "jpg-to-pdf",
    "path": "/api/v1/jpg-to-pdf/",
    "summary": "Convert one or more JPG/JPEG images into a PDF document. Multiple images will be combined into a single PDF, with each image on a separate page. To upload multiple files, send multiple 'image_file' pa",
    "fileField": "image_file",
    "multiFile": true,
    "params": []
  },
  {
    "slug": "pdf-edit/add-page-numbers",
    "path": "/api/v1/pdf-edit/add-page-numbers/",
    "summary": "Add page numbers to PDF pages. You can customize position, font size, starting number, and format.",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "position",
        "type": "string",
        "required": false,
        "description": "Position of page numbers (bottom-center, bottom-left, bottom-right, top-center, top-left, top-right)"
      },
      {
        "name": "font_size",
        "type": "integer",
        "required": false,
        "description": "Font size for page numbers (8-72)"
      },
      {
        "name": "start_number",
        "type": "integer",
        "required": false,
        "description": "Starting page number"
      },
      {
        "name": "format_str",
        "type": "string",
        "required": false,
        "description": "Format string for page numbers (use {page} for page number, {total} for total pages)"
      }
    ]
  },
  {
    "slug": "pdf-edit/add-watermark",
    "path": "/api/v1/pdf-edit/add-watermark/",
    "summary": "Add a text or image watermark to a PDF",
    "fileField": "pdf_file",
    "multiFile": false,
    "optionalExtraFileFields": [
      "watermark_file"
    ],
    "params": [
      {
        "name": "watermark_text",
        "type": "string",
        "required": false,
        "description": "Watermark text (default 'CONFIDENTIAL'); ignored if a second file (watermark image) is passed"
      },
      {
        "name": "position",
        "type": "string",
        "required": false,
        "description": "'center', 'diagonal' (default) or 'custom'"
      },
      {
        "name": "x",
        "type": "number",
        "required": false,
        "description": "X coordinate for custom position (points)"
      },
      {
        "name": "y",
        "type": "number",
        "required": false,
        "description": "Y coordinate for custom position (points)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Hex color, e.g. #FF0000 (default #000000)"
      },
      {
        "name": "opacity",
        "type": "number",
        "required": false,
        "description": "0.1-1.0, default 0.3"
      },
      {
        "name": "font_size",
        "type": "integer",
        "required": false,
        "description": "12-200, default 72"
      },
      {
        "name": "rotation",
        "type": "number",
        "required": false,
        "description": "-360..360 degrees"
      },
      {
        "name": "scale",
        "type": "number",
        "required": false,
        "description": "Scale for image watermark, default 1.0"
      }
    ]
  },
  {
    "slug": "pdf-edit/crop",
    "path": "/api/v1/pdf-edit/crop/",
    "summary": "Crop PDF pages by specifying crop box coordinates. You can crop all pages or specific pages.",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "x",
        "type": "number",
        "required": false,
        "description": "X coordinate of crop box (left edge in points)"
      },
      {
        "name": "y",
        "type": "number",
        "required": false,
        "description": "Y coordinate of crop box (bottom edge in points)"
      },
      {
        "name": "width",
        "type": "number",
        "required": false,
        "description": "Width of crop box in points"
      },
      {
        "name": "height",
        "type": "number",
        "required": false,
        "description": "Height of crop box in points"
      },
      {
        "name": "pages",
        "type": "string",
        "required": false,
        "description": "Pages to crop ('all' or comma-separated page numbers)"
      }
    ]
  },
  {
    "slug": "pdf-edit/flatten",
    "path": "/api/v1/pdf-edit/flatten/",
    "summary": "Flatten PDF",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": []
  },
  {
    "slug": "pdf-edit/rotate",
    "path": "/api/v1/pdf-edit/rotate/",
    "summary": "Rotate PDF pages by 90, 180, or 270 degrees. You can rotate all pages or specific pages.",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "angle",
        "type": "integer",
        "required": false,
        "description": "Rotation angle in degrees (90, 180, or 270)"
      },
      {
        "name": "pages",
        "type": "string",
        "required": false,
        "description": "Pages to rotate ('all' or comma-separated page numbers)"
      }
    ]
  },
  {
    "slug": "pdf-edit/sign",
    "path": "/api/v1/pdf-edit/sign/",
    "summary": "Add one or more image signatures to a PDF at arbitrary positions. Premium only. The `signatures` field is a JSON-encoded array of placement objects; each object carries the target page (0-indexed), to",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "signatures",
        "type": "string",
        "required": true,
        "description": "JSON array, e.g. [{\"page\":0,\"x\":400,\"y\":700,\"width\":150,\"height\":60,\"image_data_uri\":\"data:image/png;base64,...\"}]"
      }
    ]
  },
  {
    "slug": "pdf-organize/compress",
    "path": "/api/v1/pdf-organize/compress/",
    "summary": "Compress PDF to reduce file size. Choose compression level: low (faster, less compression), medium (balanced), or high (slower, more compression).",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "compression_level",
        "type": "string",
        "required": false,
        "description": "Compression level (low, medium, or high)"
      }
    ]
  },
  {
    "slug": "pdf-organize/extract-pages",
    "path": "/api/v1/pdf-organize/extract-pages/",
    "summary": "Extract specific pages from PDF into a new file. Specify pages as comma-separated numbers or ranges.",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "pages",
        "type": "string",
        "required": true,
        "description": "Pages to extract (comma-separated numbers or ranges like '1-3,5-7')"
      }
    ]
  },
  {
    "slug": "pdf-organize/merge",
    "path": "/api/v1/pdf-organize/merge/",
    "summary": "Merge multiple PDF files into one. Upload 2-10 PDF files to merge them in order.",
    "fileField": "pdf_files",
    "multiFile": true,
    "params": [
      {
        "name": "order",
        "type": "string",
        "required": false,
        "description": "Merge order: 'upload' (as uploaded) or 'alphabetical'"
      }
    ]
  },
  {
    "slug": "pdf-organize/organize",
    "path": "/api/v1/pdf-organize/organize/",
    "summary": "General PDF organization operations. This endpoint can be extended for various organization tasks.",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "operation",
        "type": "string",
        "required": false,
        "description": "Organization operation type (reorder or sort)"
      }
    ]
  },
  {
    "slug": "pdf-organize/remove-pages",
    "path": "/api/v1/pdf-organize/remove-pages/",
    "summary": "Remove specific pages from PDF. Specify pages as comma-separated numbers or ranges.",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "pages",
        "type": "string",
        "required": true,
        "description": "Pages to remove (comma-separated numbers or ranges like '1-3,5-7')"
      }
    ]
  },
  {
    "slug": "pdf-organize/split",
    "path": "/api/v1/pdf-organize/split/",
    "summary": "Split PDF into multiple files. You can split by individual pages, page ranges, or every N pages.",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "split_type",
        "type": "string",
        "required": false,
        "description": "Split type: 'page' (one page per file), 'range' (by page ranges), 'every_n' (every N pages)"
      },
      {
        "name": "pages",
        "type": "string",
        "required": false,
        "description": "For 'page': comma-separated page numbers. For 'range': ranges like '1-3,5-7'. For 'every_n': number of pages per file"
      }
    ]
  },
  {
    "slug": "pdf-security/protect",
    "path": "/api/v1/pdf-security/protect/",
    "summary": "Protect PDF with password encryption. The PDF will be encrypted and require a password to open.",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "password",
        "type": "string",
        "required": true,
        "description": "Password to protect the PDF"
      },
      {
        "name": "user_password",
        "type": "string",
        "required": false,
        "description": "User password (optional). If not provided, 'password' will be used"
      },
      {
        "name": "owner_password",
        "type": "string",
        "required": false,
        "description": "Owner password (optional). If not provided, 'password' will be used"
      }
    ]
  },
  {
    "slug": "pdf-security/unlock",
    "path": "/api/v1/pdf-security/unlock/",
    "summary": "Unlock PDF by removing password protection. Requires the correct password to unlock the PDF.",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "password",
        "type": "string",
        "required": true,
        "description": "Password to unlock the PDF"
      }
    ]
  },
  {
    "slug": "pdf-to-epub",
    "path": "/api/v1/pdf-to-epub/",
    "summary": "PDF to EPUB Converter",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": []
  },
  {
    "slug": "pdf-to-excel",
    "path": "/api/v1/pdf-to-excel/",
    "summary": "Convert PDF to Excel by extracting tables. The PDF must contain tables for this conversion to work. Each table will be placed in a separate sheet.",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "pages",
        "type": "string",
        "required": false,
        "description": "Pages to extract (comma-separated, ranges, or 'all')"
      }
    ]
  },
  {
    "slug": "pdf-to-html",
    "path": "/api/v1/pdf-to-html/",
    "summary": "PDF to HTML Converter",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "extract_images",
        "type": "boolean",
        "required": false,
        "description": "Extract and embed images from PDF"
      },
      {
        "name": "preserve_layout",
        "type": "boolean",
        "required": false,
        "description": "Preserve original PDF layout"
      }
    ]
  },
  {
    "slug": "pdf-to-jpg",
    "path": "/api/v1/pdf-to-jpg/",
    "summary": "Convert a PDF page into a JPG image. By default converts the first page. You can specify page number and DPI for quality control.",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "page",
        "type": "integer",
        "required": false,
        "description": "Page number to convert (default: 1)"
      },
      {
        "name": "dpi",
        "type": "integer",
        "required": false,
        "description": "DPI for image quality (default: 300, range: 72-600)"
      }
    ]
  },
  {
    "slug": "pdf-to-markdown",
    "path": "/api/v1/pdf-to-markdown/",
    "summary": "PDF to Markdown Converter",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "detect_headings",
        "type": "boolean",
        "required": false,
        "description": "Detect heading hierarchy from font sizes"
      },
      {
        "name": "preserve_tables",
        "type": "boolean",
        "required": false,
        "description": "Extract tables and render as Markdown tables"
      }
    ]
  },
  {
    "slug": "pdf-to-pdfa",
    "path": "/api/v1/pdf-to-pdfa/",
    "summary": "Convert a PDF to archival PDF/A (ISO 19005). Premium feature. Choose the conformance level: pdfa-1b, pdfa-2b (default), or pdfa-3b.",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "conformance",
        "type": "string",
        "required": false,
        "description": "PDF/A level: pdfa-1b, pdfa-2b, or pdfa-3b"
      }
    ]
  },
  {
    "slug": "pdf-to-ppt",
    "path": "/api/v1/pdf-to-ppt/",
    "summary": "PDF to PowerPoint Converter",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "extract_images",
        "type": "boolean",
        "required": false,
        "description": "Extract and include images from PDF"
      }
    ]
  },
  {
    "slug": "pdf-to-text",
    "path": "/api/v1/pdf-to-text/",
    "summary": "PDF to Text Converter",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": [
      {
        "name": "include_page_numbers",
        "type": "boolean",
        "required": false,
        "description": "Add page number dividers between pages"
      },
      {
        "name": "preserve_layout",
        "type": "boolean",
        "required": false,
        "description": "Try to preserve text layout/columns"
      }
    ]
  },
  {
    "slug": "pdf-to-word",
    "path": "/api/v1/pdf-to-word/",
    "summary": "Convert a PDF file into a DOCX document.",
    "fileField": "pdf_file",
    "multiFile": false,
    "params": []
  },
  {
    "slug": "ppt-to-pdf",
    "path": "/api/v1/ppt-to-pdf/",
    "summary": "Convert PowerPoint to PDF",
    "fileField": "ppt_file",
    "multiFile": false,
    "params": []
  },
  {
    "slug": "url-to-pdf",
    "path": "/api/v1/url-to-pdf/",
    "summary": "Render a public web page URL as a PDF",
    "fileField": null,
    "multiFile": false,
    "params": [
      {
        "name": "url",
        "type": "string",
        "required": true,
        "description": "Publicly accessible URL to convert to PDF"
      },
      {
        "name": "filename",
        "type": "string",
        "required": false,
        "description": "Base filename for the output PDF"
      },
      {
        "name": "page_size",
        "type": "string",
        "required": false,
        "description": "PDF page size (e.g. A4, Letter)"
      },
      {
        "name": "margin_top",
        "type": "string",
        "required": false,
        "description": "Top margin, e.g. '1cm'"
      },
      {
        "name": "margin_bottom",
        "type": "string",
        "required": false,
        "description": "Bottom margin"
      },
      {
        "name": "margin_left",
        "type": "string",
        "required": false,
        "description": "Left margin"
      },
      {
        "name": "margin_right",
        "type": "string",
        "required": false,
        "description": "Right margin"
      }
    ],
    "noFile": true
  },
  {
    "slug": "word-to-pdf",
    "path": "/api/v1/word-to-pdf/",
    "summary": "Convert a DOCX file into a PDF document.",
    "fileField": "word_file",
    "multiFile": false,
    "params": []
  }
];

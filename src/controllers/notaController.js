const PDFDocument = require('pdfkit');
const path = require("path")

function gerarPdf(req, res) {
    const { edi } = req.body;

    const doc = new PDFDocument();
    const filename = `nota-${Date.now()}.pdf`;

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(16).text('📄 Documento EDI - Nota', { align: 'center' });
    doc.moveDown();

    edi.split('\n').forEach(linha => {
        doc.fontSize(12).text(linha);
        const fontPath = path.join(__dirname, '../public/fonts/DejaVuSans.ttf');
        doc.registerFont('DejaVu', fontPath);
        doc.font('DejaVu');
    });

    doc.end();
}

module.exports = {
    gerarPdf
};

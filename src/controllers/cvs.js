import { Document, Packer, Paragraph, TextRun } from 'docx';

export const createCvController = async (req, res) => {
  const { username, position, email, phone, city, exp, edu, add } = req.body;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: username, bold: true, size: 48 }),
              new TextRun({ text: position, bold: true, size: 32 }),
              new TextRun({ text: email }, { text: phone }, { text: city }),
            ],
          }),
          exp
            ? new Paragraph({ text: 'Work experience and skills:', bold: true })
            : null,
          exp ? new Paragraph(exp) : null,
          edu ? new Paragraph({ text: 'Education:', bold: true }) : null,
          edu ? new Paragraph(edu) : null,
          add ? new Paragraph({ text: 'Additional info:', bold: true }) : null,
          add ? new Paragraph(add) : null,
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${username}_${position}.docx"`,
  );
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  );

  res.send(buffer);
};

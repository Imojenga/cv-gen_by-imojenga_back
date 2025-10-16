import { Document, Packer, Paragraph, TextRun } from 'docx';

export const createCvController = async (req, res) => {
  const { username, position, email, phone, city, exp, edu, add } = req.body;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: 'center',
            spacing: { after: 360 },
            children: [new TextRun({ text: username, bold: true, size: 48 })],
          }),
          new Paragraph({
            alignment: 'center',
            spacing: { after: 240 },
            children: [new TextRun({ text: position, bold: true, size: 32 })],
          }),
          new Paragraph({
            alignment: 'center',
            spacing: { after: 720 },
            children: [
              new TextRun({ text: `${email}    ` }),
              new TextRun({ text: `${phone}    ` }),
              new TextRun({ text: city }),
            ],
          }),
          exp &&
            new Paragraph({
              spacing: { after: 160 },
              children: [
                new TextRun({
                  text: 'Work experience and skills:',
                  bold: true,
                  italics: true,
                  size: 24,
                }),
              ],
            }),
          exp &&
            new Paragraph({
              spacing: { after: 560 },
              children: [new TextRun({ text: exp, size: 22 })],
            }),
          edu &&
            new Paragraph({
              spacing: { after: 160 },
              children: [
                new TextRun({
                  text: 'Education:',
                  bold: true,
                  italics: true,
                  size: 24,
                }),
              ],
            }),
          edu &&
            new Paragraph({
              spacing: { after: 560 },
              children: [new TextRun({ text: edu, size: 22 })],
            }),
          add &&
            new Paragraph({
              spacing: { after: 160 },
              children: [
                new TextRun({
                  text: 'Additional info:',
                  bold: true,
                  italics: true,
                  size: 24,
                }),
              ],
            }),
          add &&
            new Paragraph({
              children: [new TextRun({ text: add, size: 22 })],
            }),
        ].filter(Boolean),
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

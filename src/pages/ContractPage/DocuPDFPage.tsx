import { Document, Page, View, Text, Image } from "@react-pdf/renderer";

const DocuPDFPage: React.FC = () => {
  return (
    <Document>
      <Page>
        <View>
          <Text>Hola Mundo</Text>
        </View>
      </Page>
    </Document>
  )
}

export default DocuPDFPage;

// import { Content, TDocumentDefinitions } from "pdfmake/interfaces";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;


// function DocuPDFPage() {
// // Definición del contenido del PDF
// const docDefinition: TDocumentDefinitions = {
//   content: [
//     { text: "Título del documento", fontSize: 18, margin: [0, 0, 0, 10] },
//     {
//       ul: ["Párrafo 1", "Párrafo 2", "Párrafo 3"],
//       margin: [0, 0, 0, 10],
//     },
//     { text: "Otro texto", fontSize: 12 },
//   ],
// };

// const pdfDoc = pdfMake.createPdf(docDefinition);
// pdfDoc.download("documento.pdf");
// }

// export default DocuPDFPage;
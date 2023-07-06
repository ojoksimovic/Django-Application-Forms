import { Button, Tooltip } from "@material-ui/core";
import {
  Document,
  PDFDownloadLink,
  Page,
  Text,
} from "@react-pdf/renderer";
import React from "react";

export default function DownloadPDF(formInfo) {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", options);

  const DocumentContent = () => (
    <Document>
      <Page style={{ padding: "80 50 0 50" }}>
        <Text style={{ marginBottom: 50 }}>{formattedDate}</Text>
        <Text>{formInfo?.award_letter}</Text>
      </Page>
    </Document>
  );

  return (
      
        <PDFDownloadLink document={<DocumentContent />} fileName={`${formInfo?.last_name}, ${formInfo?.first_name} - Award_Letter.pdf`}>
          {({ blob, url, loading, error }) =>
            loading ? (
              <></>
            ) : (
              <Tooltip title= "Click here to download the award letter as a PDF file.">
              <Button variant="contained" color='default'>
                Download
              </Button>
              </Tooltip>
            )
          }
        </PDFDownloadLink>

  );
}

import { Button, Tooltip } from "@material-ui/core";
import {
  Document,
  PDFDownloadLink,
  Page,
  Text,
  Image
} from "@react-pdf/renderer";
import React from "react";
import logo from '../app/logo.png'

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
      <Page style={{ padding: "40 50 0 50" }}>
        <Image style = {{width: '40%', marginBottom:50}}src={logo}/>
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
              formInfo?.award_letter?
              <Tooltip title= "Click here to download the award letter as a PDF file.">
              <Button variant="contained" color='default'>
                Download
              </Button>
              </Tooltip>
            :<></>)
          }
        </PDFDownloadLink>

  );
}

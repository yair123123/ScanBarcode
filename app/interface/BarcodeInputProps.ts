interface BarcodeInputProps {
    barcodeData: string;
    setBarcodeData: (data: string) => void;
    handleBarcode: (barcode: { type: string; data: string }) => void;
    scanned: boolean;
  }
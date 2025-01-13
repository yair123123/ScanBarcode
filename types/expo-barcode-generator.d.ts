declare module 'expo-barcode-generator' {
    import React from 'react';
  
    interface BarcodeGeneratorProps {
      value: string; // The barcode content
      width?: number; // Width of the barcode
      height?: number; // Height of the barcode
    }
  
    const BarcodeGenerator: React.FC<BarcodeGeneratorProps>;
    export default BarcodeGenerator;
  }
  

interface CameraScannerProps{
    onBarcodeScanned: (barcode: { type: string; data: string }) => void
     scanned : boolean
     flashMode: boolean
}
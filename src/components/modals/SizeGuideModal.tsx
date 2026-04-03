import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RING_SIZES } from "@/constants";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ open, onClose }: SizeGuideModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Size Guide</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="rings" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rings">Rings</TabsTrigger>
            <TabsTrigger value="bracelets">Bracelets</TabsTrigger>
            <TabsTrigger value="necklaces">Necklaces</TabsTrigger>
          </TabsList>

          <TabsContent value="rings" className="mt-6 space-y-6">
            <div>
              <h3 className="font-medium text-neutral-900 mb-3">Ring Size Conversion Chart</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 font-medium">US</th>
                      <th className="text-left py-3 font-medium">EU</th>
                      <th className="text-left py-3 font-medium">UK</th>
                      <th className="text-left py-3 font-medium">Diameter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RING_SIZES.map((size, index) => (
                      <tr key={index} className="border-b border-neutral-100">
                        <td className="py-3">{size.us}</td>
                        <td className="py-3">{size.eu}</td>
                        <td className="py-3">{size.uk}</td>
                        <td className="py-3">{size.diameter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="font-medium text-neutral-900 mb-3">How to Measure Your Ring Size</h3>
              <ol className="space-y-2 text-sm text-neutral-600">
                <li>
                  <strong>1.</strong> Cut a thin strip of paper, approximately 10cm long.
                </li>
                <li>
                  <strong>2.</strong> Wrap the paper around your finger, just below the knuckle.
                </li>
                <li>
                  <strong>3.</strong> Mark where the paper overlaps with a pen.
                </li>
                <li>
                  <strong>4.</strong> Measure the length from the end to your mark in millimeters.
                </li>
                <li>
                  <strong>5.</strong> Match your measurement to the diameter column above.
                </li>
              </ol>
            </div>

            <div className="border border-amber-200 bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Pro tip:</strong> Measure at the end of the day when fingers are at their largest. 
                If between sizes, choose the larger size. For wider bands, go up half a size.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="bracelets" className="mt-6 space-y-6">
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="font-medium text-neutral-900 mb-3">Bracelet Sizes</h3>
              <div className="space-y-4 text-sm text-neutral-600">
                <div className="flex justify-between border-b border-neutral-200 pb-3">
                  <span className="font-medium">Small</span>
                  <span>15-16cm wrist</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-3">
                  <span className="font-medium">Medium</span>
                  <span>16-17cm wrist</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Large</span>
                  <span>17-18cm wrist</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-neutral-900 mb-3">How to Measure Your Wrist</h3>
              <p className="text-sm text-neutral-600">
                Wrap a flexible measuring tape around your wrist, just above the wrist bone. 
                For chains, add 1-2cm for a comfortable fit. For bangles, measure the widest 
                part of your hand when fingers are squeezed together.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="necklaces" className="mt-6 space-y-6">
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="font-medium text-neutral-900 mb-3">Necklace Lengths</h3>
              <div className="space-y-4 text-sm text-neutral-600">
                <div className="flex justify-between border-b border-neutral-200 pb-3">
                  <span className="font-medium">Choker</span>
                  <span>35-40cm / Sits on collarbone</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-3">
                  <span className="font-medium">Princess</span>
                  <span>42-48cm / Just below collarbone</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-3">
                  <span className="font-medium">Matinee</span>
                  <span>50-60cm / Mid-chest</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Opera</span>
                  <span>70-85cm / Below bust</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-neutral-500">
              All Lumière necklaces feature adjustable lengths with extension chains for versatile styling.
            </p>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-sm text-neutral-500">
            Need help? Our concierge team is available for personalized sizing assistance.
          </p>
          <a 
            href="mailto:concierge@lumierediamonds.com" 
            className="text-sm font-medium text-neutral-900 hover:underline"
          >
            Contact Us
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
